import { RateLimiter, RateLimitConfig } from '../middleware/rate-limiter';
import { ILogger } from '../interfaces';

// Mock logger for testing
class MockLogger implements ILogger {
  info = jest.fn();
  warn = jest.fn();
  error = jest.fn();
  debug = jest.fn();
}

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;
  let mockLogger: MockLogger;
  let config: RateLimitConfig;

  beforeEach(() => {
    mockLogger = new MockLogger();
    config = {
      windowMs: 1000, // 1 second for testing
      maxRequests: 3, // 3 requests per second
    };
    rateLimiter = new RateLimiter(config, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('checkLimit', () => {
    it('should allow requests within limit', () => {
      // Act
      const result1 = rateLimiter.checkLimit('user1');
      const result2 = rateLimiter.checkLimit('user1');
      const result3 = rateLimiter.checkLimit('user1');

      // Assert
      expect(result1.allowed).toBe(true);
      expect(result1.info.remaining).toBe(2);
      expect(result2.allowed).toBe(true);
      expect(result2.info.remaining).toBe(1);
      expect(result3.allowed).toBe(true);
      expect(result3.info.remaining).toBe(0);
    });

    it('should reject requests when limit exceeded', () => {
      // Arrange - Make 3 requests (at limit)
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user1');

      // Act - 4th request should be rejected
      const result = rateLimiter.checkLimit('user1');

      // Assert
      expect(result.allowed).toBe(false);
      expect(result.info.remaining).toBe(0);
      expect(result.info.retryAfter).toBeDefined();
      expect(result.info.retryAfter).toBeGreaterThan(0);

      // Verify warning was logged
      expect(mockLogger.warn).toHaveBeenCalledWith('Rate limit exceeded', {
        identifier: 'user1',
        currentRequests: 3,
        limit: 3,
        retryAfter: expect.any(Number),
        windowMs: 1000,
      });
    });

    it('should track different users separately', () => {
      // Act
      const result1 = rateLimiter.checkLimit('user1');
      const result2 = rateLimiter.checkLimit('user2');

      // Assert
      expect(result1.allowed).toBe(true);
      expect(result1.info.remaining).toBe(2);
      expect(result2.allowed).toBe(true);
      expect(result2.info.remaining).toBe(2);
    });

    it('should reset after window expires', async () => {
      // Arrange - Make 3 requests (at limit)
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user1');

      // Verify limit is exceeded
      const result1 = rateLimiter.checkLimit('user1');
      expect(result1.allowed).toBe(false);

      // Wait for window to expire
      await new Promise((resolve) => setTimeout(resolve, 1100));

      // Act - Should be allowed again
      const result2 = rateLimiter.checkLimit('user1');

      // Assert
      expect(result2.allowed).toBe(true);
      expect(result2.info.remaining).toBe(2);
    });

    it('should provide correct rate limit info', () => {
      // Act
      const result = rateLimiter.checkLimit('user1');

      // Assert
      expect(result.info.limit).toBe(3);
      expect(result.info.remaining).toBe(2);
      expect(result.info.reset).toBeGreaterThan(Date.now());
      expect(result.info.retryAfter).toBeUndefined(); // Not exceeded yet
    });

    it('should handle multiple rapid requests', () => {
      // Act - Make multiple rapid requests
      const results = [];
      for (let i = 0; i < 5; i++) {
        results.push(rateLimiter.checkLimit('user1'));
      }

      // Assert
      expect(results[0].allowed).toBe(true);
      expect(results[1].allowed).toBe(true);
      expect(results[2].allowed).toBe(true);
      expect(results[3].allowed).toBe(false); // 4th request should be rejected
      expect(results[4].allowed).toBe(false); // 5th request should be rejected
    });
  });

  describe('getStatus', () => {
    it('should return status for user with no requests', () => {
      // Act
      const status = rateLimiter.getStatus('user1');

      // Assert
      expect(status).toBeDefined();
      expect(status?.limit).toBe(3);
      expect(status?.remaining).toBe(3);
      expect(status?.reset).toBeGreaterThan(Date.now());
    });

    it('should return status for user with some requests', () => {
      // Arrange
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user1');

      // Act
      const status = rateLimiter.getStatus('user1');

      // Assert
      expect(status).toBeDefined();
      expect(status?.limit).toBe(3);
      expect(status?.remaining).toBe(1);
      expect(status?.reset).toBeGreaterThan(Date.now());
    });

    it('should return status for user at limit', () => {
      // Arrange
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user1');

      // Act
      const status = rateLimiter.getStatus('user1');

      // Assert
      expect(status).toBeDefined();
      expect(status?.limit).toBe(3);
      expect(status?.remaining).toBe(0);
      expect(status?.reset).toBeGreaterThan(Date.now());
    });

    it('should return status for user over limit', () => {
      // Arrange
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user1'); // This will be rejected but still counted

      // Act
      const status = rateLimiter.getStatus('user1');

      // Assert
      expect(status).toBeDefined();
      expect(status?.limit).toBe(3);
      expect(status?.remaining).toBe(0);
      expect(status?.reset).toBeGreaterThan(Date.now());
    });
  });

  describe('cleanup', () => {
    it('should remove old entries after cleanup', async () => {
      // Arrange - Make requests and wait for window to expire
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user2');

      await new Promise((resolve) => setTimeout(resolve, 1100));

      // Act
      rateLimiter.cleanup();

      // Assert - Should be able to make new requests
      const result1 = rateLimiter.checkLimit('user1');
      const result2 = rateLimiter.checkLimit('user2');

      expect(result1.allowed).toBe(true);
      expect(result1.info.remaining).toBe(2);
      expect(result2.allowed).toBe(true);
      expect(result2.info.remaining).toBe(2);

      // Verify cleanup was logged
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Rate limiter cleanup completed',
        {
          activeEntries: expect.any(Number),
        }
      );
    });

    it('should not remove recent entries during cleanup', () => {
      // Arrange - Make recent requests
      rateLimiter.checkLimit('user1');
      rateLimiter.checkLimit('user2');

      // Act
      rateLimiter.cleanup();

      // Assert - Should still be able to make requests if under limit
      const result1 = rateLimiter.checkLimit('user1');
      const result2 = rateLimiter.checkLimit('user2');

      expect(result1.allowed).toBe(true); // Should be allowed (under limit)
      expect(result2.allowed).toBe(true); // Should be allowed (under limit)
    });
  });

  describe('edge cases', () => {
    it('should handle empty identifier', () => {
      // Act
      const result = rateLimiter.checkLimit('');

      // Assert
      expect(result.allowed).toBe(true);
      expect(result.info.remaining).toBe(2);
    });

    it('should handle very long identifier', () => {
      // Arrange
      const longId = 'a'.repeat(1000);

      // Act
      const result = rateLimiter.checkLimit(longId);

      // Assert
      expect(result.allowed).toBe(true);
      expect(result.info.remaining).toBe(2);
    });

    it('should handle special characters in identifier', () => {
      // Act
      const result = rateLimiter.checkLimit('user@example.com');

      // Assert
      expect(result.allowed).toBe(true);
      expect(result.info.remaining).toBe(2);
    });

    it('should handle concurrent requests for same user', () => {
      // Act - Simulate concurrent requests
      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(rateLimiter.checkLimit('user1'));
      }

      // Assert - Only first 3 should be allowed
      let allowedCount = 0;
      let rejectedCount = 0;

      results.forEach((result) => {
        if (result.allowed) allowedCount++;
        else rejectedCount++;
      });

      expect(allowedCount).toBe(3);
      expect(rejectedCount).toBe(7);
    });
  });

  describe('configuration', () => {
    it('should work with different window sizes', () => {
      // Arrange
      const customConfig: RateLimitConfig = {
        windowMs: 500, // 500ms window
        maxRequests: 2, // 2 requests per 500ms
      };
      const customLimiter = new RateLimiter(customConfig, mockLogger);

      // Act
      const result1 = customLimiter.checkLimit('user1');
      const result2 = customLimiter.checkLimit('user1');
      const result3 = customLimiter.checkLimit('user1');

      // Assert
      expect(result1.allowed).toBe(true);
      expect(result2.allowed).toBe(true);
      expect(result3.allowed).toBe(false);
    });

    it('should work with high request limits', () => {
      // Arrange
      const customConfig: RateLimitConfig = {
        windowMs: 1000,
        maxRequests: 100, // 100 requests per second
      };
      const customLimiter = new RateLimiter(customConfig, mockLogger);

      // Act - Make 50 requests
      let allowedCount = 0;
      for (let i = 0; i < 50; i++) {
        const result = customLimiter.checkLimit('user1');
        if (result.allowed) allowedCount++;
      }

      // Assert
      expect(allowedCount).toBe(50);
    });
  });
});
