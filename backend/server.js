const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const admin = require('firebase-admin');
const Docker = require('dockerode');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req) => req.ip,
  points: 10, // Number of requests
  duration: 60, // Per 60 seconds
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.status(429).json({ error: 'Too many requests' });
  }
};

// Initialize Firebase Admin
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'elloloop-easyloops'
});

// Initialize Docker
const docker = new Docker();

// Authorization middleware
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Check if user is authorized for Go language
const checkGoAuthorization = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    
    // Get authorized users from Firestore (or use hardcoded list for now)
    const authorizedUsers = [
      'arun@elloloop.com',
      'arun88m@gmail.com',
      'admin@easyloops.com',
      'developer@easyloops.com'
    ];

    if (!authorizedUsers.includes(userEmail)) {
      return res.status(403).json({ 
        error: 'Not authorized for Go language access',
        userEmail 
      });
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ error: 'Authorization check failed' });
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Execute Go code endpoint
app.post('/api/execute/go', 
  rateLimiterMiddleware, 
  authenticateUser, 
  checkGoAuthorization, 
  async (req, res) => {
    try {
      const { code, questionId } = req.body;
      const userEmail = req.user.email;

      if (!code || !questionId) {
        return res.status(400).json({ error: 'Code and questionId are required' });
      }

      console.log(`Executing Go code for user: ${userEmail}, question: ${questionId}`);

      // Create unique container name
      const containerName = `go-exec-${uuidv4()}`;
      
      // Create temporary directory for this execution
      const tempDir = path.join(__dirname, 'temp', containerName);
      await fs.ensureDir(tempDir);

      // Write Go code to file
      const goFilePath = path.join(tempDir, 'main.go');
      await fs.writeFile(goFilePath, code);

      // Get input files for the question
      const inputFiles = await getInputFiles(questionId);
      
      // Create Docker container and execute
      const result = await executeGoCode(containerName, tempDir, inputFiles);

      // Cleanup
      await cleanup(tempDir, containerName);

      res.json(result);
    } catch (error) {
      console.error('Go execution error:', error);
      res.status(500).json({ 
        error: 'Code execution failed', 
        details: error.message 
      });
    }
  }
);

// Get input files for a question
async function getInputFiles(questionId) {
  try {
    const questionDir = path.join(__dirname, '..', 'public', 'questions', questionId);
    const files = await fs.readdir(questionDir);
    
    const inputFiles = files.filter(file => file.startsWith('input') && file.endsWith('.txt'));
    const inputData = {};

    for (const file of inputFiles) {
      const filePath = path.join(questionDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      inputData[file] = content;
    }

    return inputData;
  } catch (error) {
    console.error('Error reading input files:', error);
    return {};
  }
}

// Execute Go code in Docker container
async function executeGoCode(containerName, tempDir, inputFiles) {
  return new Promise(async (resolve, reject) => {
    try {
      // Create container
      const container = await docker.createContainer({
        Image: 'golang:1.21-alpine',
        name: containerName,
        Cmd: ['sh', '-c', `
          cd /app &&
          go mod init main &&
          go run main.go
        `],
        HostConfig: {
          Binds: [`${tempDir}:/app`],
          Memory: 512 * 1024 * 1024, // 512MB limit
          MemorySwap: 0,
          CpuPeriod: 100000,
          CpuQuota: 50000, // 50% CPU limit
          NetworkMode: 'none', // No network access
          ReadonlyRootfs: false,
          SecurityOpt: ['no-new-privileges'],
          Ulimits: [
            { Name: 'nofile', Soft: 1024, Hard: 1024 }
          ]
        },
        WorkingDir: '/app',
        Tty: false,
        OpenStdin: true,
        StdinOnce: false
      });

      // Start container
      await container.start();

      // Prepare input data
      const inputData = Object.values(inputFiles).join('\n');
      
      // Execute with input
      const exec = await container.exec({
        Cmd: ['sh', '-c', `echo '${inputData.replace(/'/g, "'\"'\"'")}' | go run main.go`],
        AttachStdout: true,
        AttachStderr: true
      });

      const stream = await exec.start();
      
      let output = '';
      let errorOutput = '';

      stream.on('data', (chunk) => {
        const data = chunk.toString();
        if (data.startsWith('\u0001')) {
          errorOutput += data.slice(1);
        } else {
          output += data;
        }
      });

      stream.on('end', async () => {
        try {
          // Stop and remove container
          await container.stop({ t: 10 });
          await container.remove();
          
          resolve({
            output: output.trim(),
            error: errorOutput.trim() || null,
            executionTime: Date.now()
          });
        } catch (cleanupError) {
          console.error('Cleanup error:', cleanupError);
          resolve({
            output: output.trim(),
            error: errorOutput.trim() || null,
            executionTime: Date.now()
          });
        }
      });

      // Timeout after 30 seconds
      setTimeout(async () => {
        try {
          await container.stop({ t: 0 });
          await container.remove();
          reject(new Error('Execution timeout'));
        } catch (error) {
          reject(error);
        }
      }, 30000);

    } catch (error) {
      reject(error);
    }
  });
}

// Cleanup function
async function cleanup(tempDir, containerName) {
  try {
    await fs.remove(tempDir);
    
    // Try to remove container if it still exists
    try {
      const container = docker.getContainer(containerName);
      await container.remove({ force: true });
    } catch (error) {
      // Container might already be removed
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔒 Go execution: http://localhost:${PORT}/api/execute/go`);
}); 