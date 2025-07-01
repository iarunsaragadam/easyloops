# Backend Integration Setup Guide

This guide will help you set up the complete backend system for Go code execution with Docker and Firebase authentication.

## 🎯 What We've Built

### Frontend Changes

- ✅ Removed hardcoded authorization from frontend
- ✅ Updated Go execution to call backend API
- ✅ Added Firebase token authentication
- ✅ Integrated with backend for real Go code execution

### Backend Features

- ✅ **Node.js/Express** server with security middleware
- ✅ **Firebase Admin SDK** for authentication
- ✅ **Docker integration** for safe Go code execution
- ✅ **Rate limiting** and resource constraints
- ✅ **Automatic input file handling** from question directories
- ✅ **Authorization middleware** for Go language access

## 🚀 Quick Setup

### 1. Backend Dependencies

```bash
cd backend
npm install
```

### 2. Firebase Admin SDK Setup

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select project**: `elloloop-easyloops`
3. **Project Settings** → **Service Accounts**
4. **Generate new private key** → Download JSON file
5. **Save as**: `backend/firebase-service-account.json`

### 3. Environment Configuration

Create `backend/.env`:

```env
PORT=3001
FRONTEND_URL=http://localhost:3000
DOCKER_HOST=unix:///var/run/docker.sock
RATE_LIMIT_POINTS=10
RATE_LIMIT_DURATION=60
```

### 4. Start Backend

```bash
cd backend
npm run dev
```

### 5. Test Backend

```bash
# Health check
curl http://localhost:3001/health

# Should return: {"status":"OK","timestamp":"..."}
```

## 🐳 Docker Setup

### Prerequisites

```bash
# Install Docker (if not already installed)
# macOS: brew install docker
# Ubuntu: sudo apt-get install docker.io

# Add user to docker group
sudo usermod -aG docker $USER
# Log out and log back in
```

### Using Docker Compose (Recommended)

```bash
cd backend
docker-compose up -d
```

### Manual Docker Build

```bash
cd backend
docker build -t easyloops-backend .
docker run -d \
  --name easyloops-backend \
  -p 3001:3001 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(pwd)/temp:/usr/src/app/temp \
  -v $(pwd)/../public:/usr/src/app/public \
  easyloops-backend
```

## 🔐 Authorization Configuration

### Backend Authorization

The backend currently has hardcoded authorized users in `backend/server.js`:

```javascript
const authorizedUsers = [
  "arun@elloloop.com",
  "arun88m@gmail.com",
  "admin@easyloops.com",
  "developer@easyloops.com",
];
```

### Future: Firestore Integration

For production, move this to Firestore:

```javascript
// In checkGoAuthorization middleware
const authorizedUsersRef = admin.firestore().collection("authorizedUsers");
const snapshot = await authorizedUsersRef.where("email", "==", userEmail).get();
const isAuthorized = !snapshot.empty;
```

## 🧪 Testing the Complete System

### 1. Start Both Services

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd backend && npm run dev
```

### 2. Test Authentication

1. **Open browser**: http://localhost:3000
2. **Login with Google**: Use `arun88m@gmail.com`
3. **Select Go language**: Should be available after login

### 3. Test Go Code Execution

1. **Write Go code** in the editor
2. **Click Run**: Should execute via backend
3. **Check output**: Real Go compilation and execution

### 4. Test Authorization

1. **Logout** and login with unauthorized email
2. **Try to run Go code**: Should get 403 error
3. **Check backend logs**: Should show authorization failure

## 📊 API Endpoints

### Health Check

```
GET http://localhost:3001/health
```

### Go Code Execution

```
POST http://localhost:3001/api/execute/go
Headers:
  Authorization: Bearer <firebase-id-token>
  Content-Type: application/json

Body:
{
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}",
  "questionId": "01-variable-declaration"
}
```

## 🔒 Security Features

### Container Security

- **Memory Limit**: 512MB per execution
- **CPU Limit**: 50% CPU usage
- **Network**: No network access
- **File System**: Read-only root
- **Privileges**: No privilege escalation
- **Timeout**: 30 seconds max execution

### Rate Limiting

- **10 requests per minute** per IP
- **Configurable** via environment variables

### Authentication

- **Firebase ID Token** verification
- **User authorization** check
- **Secure token handling**

## 🐛 Troubleshooting

### Common Issues

1. **Docker Permission Error**

   ```bash
   sudo usermod -aG docker $USER
   # Restart terminal
   ```

2. **Backend Connection Error**

   ```bash
   # Check if backend is running
   curl http://localhost:3001/health

   # Check Docker daemon
   docker ps
   ```

3. **Firebase Authentication Error**

   ```bash
   # Verify service account file exists
   ls -la backend/firebase-service-account.json

   # Check Firebase project ID matches
   ```

4. **Go Execution Timeout**

   ```bash
   # Check Docker container logs
   docker logs <container-name>

   # Verify resource limits
   docker stats
   ```

### Debug Mode

Enable debug logging in backend:

```javascript
// In server.js, add:
console.log("Request details:", {
  user: req.user?.email,
  questionId: req.body.questionId,
  codeLength: req.body.code?.length,
});
```

## 📈 Monitoring

### Health Checks

```bash
# Backend health
curl http://localhost:3001/health

# Docker containers
docker ps

# Resource usage
docker stats
```

### Logs

```bash
# Backend logs
docker-compose logs backend

# Docker daemon logs
sudo journalctl -u docker.service -f
```

## 🚀 Production Deployment

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

- [ ] Firebase Admin SDK configured
- [ ] Docker daemon secured
- [ ] Rate limiting enabled
- [ ] Resource limits set
- [ ] Network isolation configured
- [ ] SSL/TLS certificates installed
- [ ] Firewall rules configured
- [ ] Logging and monitoring enabled

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ **Frontend shows Go language** after login
2. ✅ **Backend health check** returns OK
3. ✅ **Go code execution** works with real compilation
4. ✅ **Input files** are automatically loaded
5. ✅ **Authorization** blocks unauthorized users
6. ✅ **Docker containers** are created and cleaned up
7. ✅ **Rate limiting** prevents abuse

## 🔄 Next Steps

1. **Move authorization to Firestore** for dynamic user management
2. **Add more languages** (Java, C++, etc.)
3. **Implement caching** for better performance
4. **Add monitoring** and alerting
5. **Scale horizontally** with load balancing
