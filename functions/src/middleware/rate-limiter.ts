import { ILogger } from '../interfaces';

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  skipSuccessfulRequests?: boolean; // Skip rate limiting for successful requests
  skipFailedRequests?: boolean; // Skip rate limiting for failed requests
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // Timestamp when the limit resets
  retryAfter?: number; // Seconds to wait before retrying
}

export class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map();
  private readonly config: RateLimitConfig;
  private readonly logger: ILogger;

  constructor(config: RateLimitConfig, logger: ILogger) {
    this.config = config;
    this.logger = logger;
  }

  /**
   * Check if request is within rate limits
   */
  checkLimit(identifier: string): RateLimitResult {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Get or create rate limit entry
    let entry = this.store.get(identifier);
    if (!entry) {
      entry = {
        requests: [],
        limit: this.config.maxRequests,
      };
      this.store.set(identifier, entry);
    }

    // Remove old requests outside the window
    entry.requests = entry.requests.filter(
      (timestamp) => timestamp > windowStart
    );

    // Check if limit is exceeded
    const currentRequests = entry.requests.length;
    const isExceeded = currentRequests >= this.config.maxRequests;

    if (isExceeded) {
      const oldestRequest = Math.min(...entry.requests);
      const resetTime = oldestRequest + this.config.windowMs;
      const retryAfter = Math.ceil((resetTime - now) / 1000);

      this.logger.warn('Rate limit exceeded', {
        identifier,
        currentRequests,
        limit: this.config.maxRequests,
        retryAfter,
        windowMs: this.config.windowMs,
      });

      return {
        allowed: false,
        info: {
          limit: this.config.maxRequests,
          remaining: 0,
          reset: resetTime,
          retryAfter,
        },
      };
    }

    // Add current request
    entry.requests.push(now);

    return {
      allowed: true,
      info: {
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests - (currentRequests + 1),
        reset: now + this.config.windowMs,
      },
    };
  }

  /**
   * Clean up old entries to prevent memory leaks
   */
  cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    for (const [identifier, entry] of this.store.entries()) {
      // Remove old requests
      entry.requests = entry.requests.filter(
        (timestamp) => timestamp > windowStart
      );

      // Remove empty entries
      if (entry.requests.length === 0) {
        this.store.delete(identifier);
      }
    }

    this.logger.debug('Rate limiter cleanup completed', {
      activeEntries: this.store.size,
    });
  }

  /**
   * Get current rate limit status for an identifier
   */
  getStatus(identifier: string): RateLimitInfo | null {
    const entry = this.store.get(identifier);
    if (!entry) {
      return {
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests,
        reset: Date.now() + this.config.windowMs,
      };
    }

    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    const currentRequests = entry.requests.filter(
      (timestamp) => timestamp > windowStart
    ).length;

    return {
      limit: this.config.maxRequests,
      remaining: Math.max(0, this.config.maxRequests - currentRequests),
      reset: now + this.config.windowMs,
    };
  }
}

interface RateLimitEntry {
  requests: number[];
  limit: number;
}

export interface RateLimitResult {
  allowed: boolean;
  info: RateLimitInfo;
}

// Factory function for creating rate limiters
export function createRateLimiter(
  config: RateLimitConfig,
  logger: ILogger
): RateLimiter {
  const limiter = new RateLimiter(config, logger);

  // Set up periodic cleanup
  setInterval(() => {
    limiter.cleanup();
  }, config.windowMs);

  return limiter;
}
