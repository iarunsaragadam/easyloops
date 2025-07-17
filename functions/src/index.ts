import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DependencyContainer } from './dependency-injection/container';
import { ServiceConfiguration } from './interfaces';
import { AuthenticatedUser } from './interfaces';
import { createRateLimiter } from './middleware/rate-limiter';

// Initialize Firebase Admin
admin.initializeApp();

// Service configuration
const serviceConfig: ServiceConfiguration = {
  judge0: {
    baseUrl:
      process.env.JUDGE0_BASE_URL ||
      'https://judge0-easyloops-xxxxx-uc.a.run.app',
    apiKey: process.env.JUDGE0_API_KEY,
    timeout: 30000, // 30 seconds
  },
  limits: {
    maxCodeLength: 10000,
    maxExecutionTime: 30,
    maxMemoryUsage: 512000,
  },
};

// Initialize dependency container
const container = DependencyContainer.getInstance(serviceConfig);
const logger = container.getLogger();
const authService = container.getAuthenticationService();
const authzService = container.getAuthorizationService();
const controller = container.getCodeExecutionController();

// Initialize rate limiter
const rateLimiter = createRateLimiter(
  {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // 30 requests per minute per user
  },
  logger
);

/**
 * Extract and validate Firebase ID token from request
 */
async function extractUserFromRequest(
  req: functions.https.Request
): Promise<AuthenticatedUser | null> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Missing or invalid authorization header', {
        hasAuthHeader: !!authHeader,
        authHeaderType: typeof authHeader,
      });
      return null;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    return await authService.authenticateUser(token);
  } catch (error) {
    logger.error('Failed to extract user from request', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return null;
  }
}

/**
 * Improved Cloud Function following SOLID principles
 * This function:
 * 1. Handles HTTP concerns only (delegates business logic to services)
 * 2. Uses dependency injection for testability
 * 3. Follows single responsibility principle
 * 4. Has clear separation of concerns
 * 5. Includes rate limiting for abuse prevention
 */
export const executeCode = functions
  .region('us-central1')
  .runWith({
    timeoutSeconds: 60,
    memory: '256MB',
    maxInstances: 10,
  })
  .https.onRequest(
    async (req: functions.https.Request, res: functions.Response) => {
      // Enable CORS
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
      }

      // Only allow POST requests
      if (req.method !== 'POST') {
        logger.warn('Invalid HTTP method', { method: req.method });
        res.status(405).json({
          error: 'Method not allowed',
          message: 'Only POST requests are supported',
        });
        return;
      }

      try {
        logger.info('Execute code function called', {
          method: req.method,
          contentType: req.headers['content-type'],
          userAgent: req.headers['user-agent'],
        });

        // Authenticate user
        const user = await extractUserFromRequest(req);
        if (!user) {
          logger.warn('Authentication failed');
          res.status(401).json({
            error: 'Unauthorized',
            message: 'Valid Firebase ID token is required',
          });
          return;
        }

        // Check rate limiting
        const rateLimitResult = rateLimiter.checkLimit(user.uid);
        if (!rateLimitResult.allowed) {
          logger.warn('Rate limit exceeded', {
            uid: user.uid,
            retryAfter: rateLimitResult.info.retryAfter,
          });
          res.status(429).json({
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: rateLimitResult.info.retryAfter,
            limit: rateLimitResult.info.limit,
            reset: rateLimitResult.info.reset,
          });
          return;
        }

        // Add rate limit headers
        res.set('X-RateLimit-Limit', rateLimitResult.info.limit.toString());
        res.set(
          'X-RateLimit-Remaining',
          rateLimitResult.info.remaining.toString()
        );
        res.set('X-RateLimit-Reset', rateLimitResult.info.reset.toString());

        // Check authorization
        const isAuthorized = await authzService.isAuthorized(user);
        if (!isAuthorized) {
          logger.warn('User not authorized', {
            uid: user.uid,
            email: user.email,
          });
          res.status(403).json({
            error: 'Forbidden',
            message: 'User is not authorized for code execution',
          });
          return;
        }

        // Delegate to controller (separation of concerns)
        const result = await controller.handleExecuteCode(req.body, user);

        // Send response based on controller result
        const responsePayload: Record<string, unknown> = {
          success: result.success,
          statusCode: result.statusCode,
          error: result.error,
        };
        if (result.data) {
          responsePayload.data = result.data;
        }
        res.status(result.statusCode).json(responsePayload);
      } catch (error) {
        logger.error('Unexpected error in executeCode function', {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
        });

        res.status(500).json({
          error: 'Internal server error',
          message: 'An unexpected error occurred. Please try again later.',
        });
      }
    }
  );

/**
 * Health check endpoint
 */
export const health = functions
  .region('us-central1')
  .runWith({
    timeoutSeconds: 10,
    memory: '128MB',
  })
  .https.onRequest(
    async (req: functions.https.Request, res: functions.Response) => {
      try {
        const languageProvider = container.getLanguageProvider();
        const supportedLanguages = Object.keys(
          languageProvider.getSupportedLanguages()
        );

        res.status(200).json({
          status: 'healthy',
          timestamp: new Date().toISOString(),
          supportedLanguages,
          service: 'code-execution-service',
          version: '2.0.0',
          architecture: 'SOLID-principles',
        });
      } catch (error) {
        logger.error('Health check failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        res.status(503).json({
          status: 'unhealthy',
          timestamp: new Date().toISOString(),
          error: 'Service is not responding properly',
        });
      }
    }
  );

/**
 * Get supported languages endpoint
 */
export const getLanguages = functions
  .region('us-central1')
  .runWith({
    timeoutSeconds: 10,
    memory: '128MB',
  })
  .https.onRequest(
    async (req: functions.https.Request, res: functions.Response) => {
      // Enable CORS
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type');

      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
      }

      // Only allow GET requests
      if (req.method !== 'GET') {
        res.status(405).json({
          error: 'Method not allowed',
          message: 'Only GET requests are supported',
        });
        return;
      }

      try {
        const languageProvider = container.getLanguageProvider();
        const languages = languageProvider.getSupportedLanguages();

        // Transform to a more user-friendly format
        const languageList = Object.entries(languages).map(
          ([identifier, config]) => ({
            identifier,
            name: config.name,
            id: config.id,
            cpuTimeLimit: config.cpuTimeLimit,
            memoryLimit: config.memoryLimit,
            enableNetwork: config.enableNetwork,
          })
        );

        res.status(200).json({
          success: true,
          languages: languageList,
          count: languageList.length,
        });
      } catch (error) {
        logger.error('Failed to get languages', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        res.status(500).json({
          error: 'Internal server error',
          message: 'Failed to retrieve supported languages',
        });
      }
    }
  );

/**
 * Rate limit status endpoint
 */
export const rateLimitStatus = functions
  .region('us-central1')
  .runWith({
    timeoutSeconds: 10,
    memory: '128MB',
  })
  .https.onRequest(
    async (req: functions.https.Request, res: functions.Response) => {
      // Enable CORS
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
      }

      // Only allow GET requests
      if (req.method !== 'GET') {
        res.status(405).json({
          error: 'Method not allowed',
          message: 'Only GET requests are supported',
        });
        return;
      }

      try {
        // Authenticate user
        const user = await extractUserFromRequest(req);
        if (!user) {
          res.status(401).json({
            error: 'Unauthorized',
            message: 'Valid Firebase ID token is required',
          });
          return;
        }

        // Get rate limit status
        const status = rateLimiter.getStatus(user.uid);

        res.status(200).json({
          success: true,
          rateLimit: status,
          userId: user.uid,
        });
      } catch (error) {
        logger.error('Failed to get rate limit status', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        res.status(500).json({
          error: 'Internal server error',
          message: 'Failed to retrieve rate limit status',
        });
      }
    }
  );
