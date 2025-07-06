# EasyLoops Backend

Backend service for Go code execution with Docker containerization and Firebase authentication.

## Features

- 🔐 **Firebase Authentication**: Secure user authentication and authorization
- 🐳 **Docker Integration**: Safe Go code execution in isolated containers
- 🚀 **Real-time Execution**: Compile and run Go code with input/output handling
- 🛡️ **Security**: Rate limiting, resource limits, and sandboxed execution
- 📊 **Health Monitoring**: Built-in health checks and monitoring

## Prerequisites

- Node.js 18+
- Docker Engine
- Firebase project with Authentication enabled
- Firebase Admin SDK service account key

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set up Firebase Admin SDK

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`elloloop-easyloops`)
3. Go to Project Settings → Service Accounts
4. Click "Generate new private key"
5. Save the JSON file as `firebase-service-account.json` in the backend directory

### 3. Environment Configuration

Create a `.env` file in the backend directory:

```env
PORT=3001
FRONTEND_URL=http://localhost:3000
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
DOCKER_HOST=unix:///var/run/docker.sock
```

### 4. Start the Backend

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
# Build the image
docker build -t easyloops-backend .

# Run the container
docker run -d \
  --name easyloops-backend \
  -p 3001:3001 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(pwd)/temp:/usr/src/app/temp \
  -v $(pwd)/../public:/usr/src/app/public \
  easyloops-backend
```

## API Endpoints

### Health Check

```
GET /health
```

### Go Code Execution

```
POST /api/execute/go
Authorization: Bearer <firebase-id-token>
Content-Type: application/json

{
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}",
  "questionId": "01-variable-declaration"
}
```

## Security Features

### Container Security

- **Resource Limits**: 512MB memory, 50% CPU
- **Network Isolation**: No network access
- **Read-only Root**: Immutable container filesystem
- **Privilege Escalation**: Disabled
- **File Descriptor Limits**: Restricted to 1024

### Rate Limiting

- **10 requests per minute** per IP address
- Configurable via environment variables

### Authentication

- **Firebase ID Token** verification
- **User authorization** check for Go access
- **Secure token handling**

## Architecture

```
Frontend (React) → Backend (Node.js) → Docker Container (Go)
     ↓                    ↓                    ↓
Firebase Auth    →  Auth Middleware   →  Go Compiler
     ↓                    ↓                    ↓
User Token       →  Authorization     →  Code Execution
```

## Input/Output Handling

The backend automatically:

1. **Reads input files** from the question directory
2. **Feeds input** to the Go program via stdin
3. **Captures output** from stdout/stderr
4. **Returns results** to the frontend

## Monitoring

### Health Check

```bash
curl http://localhost:3001/health
```

### Docker Container Status

```bash
docker ps
docker logs <container-name>
```

## Troubleshooting

### Common Issues

1. **Docker Permission Error**

   ```bash
   sudo usermod -aG docker $USER
   # Log out and log back in
   ```

2. **Firebase Authentication Error**
   - Verify service account key is correct
   - Check Firebase project ID matches

3. **Go Execution Timeout**
   - Check Docker daemon is running
   - Verify container resource limits

4. **Input Files Not Found**
   - Ensure question directory exists
   - Check file permissions

### Logs

```bash
# Backend logs
docker-compose logs backend

# Docker daemon logs
sudo journalctl -u docker.service
```

## Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

### Adding New Features

1. **New Language Support**: Add new Docker images and execution logic
2. **Enhanced Security**: Implement additional sandboxing measures
3. **Performance**: Add caching and optimization layers

## Production Deployment

### Environment Variables

```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
DOCKER_HOST=unix:///var/run/docker.sock
RATE_LIMIT_POINTS=10
RATE_LIMIT_DURATION=60
```

### Security Checklist

- [ ] Firebase Admin SDK properly configured
- [ ] Docker daemon secured
- [ ] Rate limiting enabled
- [ ] Resource limits set
- [ ] Network isolation configured
- [ ] Logging and monitoring enabled
- [ ] SSL/TLS certificates installed
- [ ] Firewall rules configured

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
