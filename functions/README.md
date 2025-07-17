# Easyloops Firebase Cloud Functions

This directory contains Firebase Cloud Functions for executing code in multiple programming languages using Judge0 running on Google Cloud Run.

## Overview

The cloud functions provide a secure, authenticated API for executing code in various programming languages through Judge0, with the following features:

- **Multi-language Support**: Go, Java, C++, C, Rust, Python, JavaScript, TypeScript, C#, PHP, Ruby, Swift, Kotlin, Scala
- **Authentication**: Firebase Auth token verification
- **Authorization**: User-based access control for code execution
- **Security**: Network isolation, resource limits, and input validation
- **Logging**: Comprehensive logging with Winston
- **Monitoring**: Execution metrics and health checks

## Functions

### `executeCode`

Main function for executing code in any supported programming language.

**Endpoint**: `POST /executeCode`

**Authentication**: Required (Firebase ID token)

**Request Body**:

```json
{
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}",
  "language": "go",
  "questionId": "01-variable-declaration",
  "input": "optional input data"
}
```

**Response**:

```json
{
  "success": true,
  "output": "Hello, World!",
  "error": null,
  "executionTime": 150,
  "memory": 1024,
  "status": "Accepted",
  "language": "go"
}
```

### `healthCheck`

Health check endpoint for monitoring.

**Endpoint**: `GET /healthCheck`

**Authentication**: Not required

**Response**:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "easyloops-code-executor",
  "version": "1.0.0",
  "supportedLanguages": [
    "go",
    "java",
    "cpp",
    "c",
    "rust",
    "python",
    "javascript",
    "typescript",
    "csharp",
    "php",
    "ruby",
    "swift",
    "kotlin",
    "scala"
  ]
}
```

### `getLanguages`

Get available programming languages from Judge0.

**Endpoint**: `GET /getLanguages`

**Authentication**: Required (Firebase ID token)

**Response**:

```json
{
  "success": true,
  "languages": [...],
  "count": 50,
  "supportedLanguages": {...}
}
```

### `getSupportedLanguages`

Get configuration for supported languages.

**Endpoint**: `GET /getSupportedLanguages`

**Authentication**: Required (Firebase ID token)

**Response**:

```json
{
  "success": true,
  "supportedLanguages": {
    "go": {
      "id": 60,
      "name": "Go",
      "identifier": "go",
      "cpuTimeLimit": 5,
      "memoryLimit": 512000,
      "enableNetwork": false
    },
    "java": {
      "id": 62,
      "name": "Java",
      "identifier": "java",
      "cpuTimeLimit": 5,
      "memoryLimit": 512000,
      "enableNetwork": false
    }
  },
  "count": 14
}
```

## Supported Languages

| Language   | Identifier   | Judge0 ID | Name                         |
| ---------- | ------------ | --------- | ---------------------------- |
| Go         | `go`         | 60        | Go                           |
| Java       | `java`       | 62        | Java                         |
| C++        | `cpp`        | 54        | C++ (GCC 9.2.0)              |
| C          | `c`          | 50        | C (GCC 9.2.0)                |
| Rust       | `rust`       | 73        | Rust                         |
| Python     | `python`     | 71        | Python (3.8.1)               |
| JavaScript | `javascript` | 63        | JavaScript (Node.js 12.14.0) |
| TypeScript | `typescript` | 74        | TypeScript (3.7.4)           |
| C#         | `csharp`     | 51        | C# (Mono 6.6.0.161)          |
| PHP        | `php`        | 68        | PHP (7.4.1)                  |
| Ruby       | `ruby`       | 72        | Ruby (2.7.0)                 |
| Swift      | `swift`      | 83        | Swift (5.2.3)                |
| Kotlin     | `kotlin`     | 78        | Kotlin (1.3.70)              |
| Scala      | `scala`      | 81        | Scala (2.13.2)               |

## Setup

### Prerequisites

1. Firebase CLI installed
2. Node.js 18+
3. Google Cloud project with Cloud Run enabled
4. Judge0 instance deployed on Cloud Run

### Installation

1. Install dependencies:

```bash
cd functions
npm install
```

2. Set environment variables:

```bash
cp env.example .env
# Edit .env with your configuration
```

3. Build the functions:

```bash
npm run build
```

### Deployment

1. Deploy to Firebase:

```bash
npm run deploy
```

2. Set environment variables in Firebase:

```bash
firebase functions:config:set judge0.base_url="https://your-judge0-instance.run.app"
firebase functions:config:set judge0.api_key="your-api-key"
```

## Configuration

### Environment Variables

- `JUDGE0_BASE_URL`: URL of your Judge0 Cloud Run instance
- `JUDGE0_API_KEY`: API key for Judge0 (if required)
- `NODE_ENV`: Environment (production/development)
- `LOG_LEVEL`: Logging level (info/debug/error)

### Judge0 Setup

1. Deploy Judge0 to Cloud Run:

```bash
# Use the docker-compose.yml in judge0-docker/
gcloud run deploy judge0-easyloops \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

2. Configure IAM to allow only Cloud Functions access:

```bash
# Create service account for Cloud Functions
gcloud iam service-accounts create easyloops-functions \
  --display-name="Easyloops Cloud Functions"

# Grant access to Judge0
gcloud run services add-iam-policy-binding judge0-easyloops \
  --member="serviceAccount:easyloops-functions@your-project.iam.gserviceaccount.com" \
  --role="roles/run.invoker"
```

## Security

### Authentication

- All functions (except health check) require Firebase ID tokens
- Tokens are verified using Firebase Admin SDK
- Invalid or expired tokens are rejected

### Authorization

- Users must be explicitly authorized for code execution
- Authorization is checked against Firestore collection `authorizedUsers`
- Fallback to hardcoded list for development

### Code Execution Security

- Network access disabled in Judge0 submissions
- CPU and memory limits enforced per language
- Input validation and sanitization
- Code length limits (10,000 characters)

## Monitoring

### Logging

All functions use Winston for structured logging:

- **Info**: Normal operations, successful executions
- **Warn**: Invalid requests, authorization failures
- **Error**: Execution failures, system errors
- **Debug**: Detailed execution information

### Metrics

The following metrics are logged:

- Execution time per language
- Memory usage per language
- Success/failure rates
- User activity
- Error types

### Health Monitoring

Use the health check endpoint for monitoring:

```bash
curl https://us-central1-elloloop-easyloops.cloudfunctions.net/healthCheck
```

## Development

### Local Development

1. Start Firebase emulator:

```bash
npm run serve
```

2. Test functions locally:

```bash
# Test Go code
curl -X POST http://localhost:5001/elloloop-easyloops/us-central1/executeCode \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -d '{"code":"package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello\")\n}","language":"go","questionId":"test"}'

# Test Java code
curl -X POST http://localhost:5001/elloloop-easyloops/us-central1/executeCode \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -d '{"code":"public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}","language":"java","questionId":"test"}'
```

### Testing

1. Run linting:

```bash
npm run lint
```

2. Build and test:

```bash
npm run build
npm test
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify Firebase ID token is valid
   - Check user is authorized in Firestore

2. **Judge0 Connection Errors**
   - Verify JUDGE0_BASE_URL is correct
   - Check Cloud Run service is running
   - Verify IAM permissions

3. **Execution Timeouts**
   - Check Judge0 service health
   - Verify resource limits are appropriate

4. **Unsupported Language Errors**
   - Check language identifier is correct
   - Verify language is in supported list

### Debug Mode

Enable debug logging:

```bash
firebase functions:config:set logging.level="debug"
```

## API Reference

### Error Responses

All functions return consistent error responses:

```json
{
  "error": "Error type",
  "message": "Human-readable error message"
}
```

### Status Codes

- `200`: Success
- `400`: Bad request (invalid input, unsupported language)
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (not authorized for code execution)
- `405`: Method not allowed
- `500`: Internal server error

## Contributing

1. Follow TypeScript best practices
2. Add comprehensive logging
3. Include error handling
4. Update documentation
5. Test thoroughly before deployment
6. Add new languages to SUPPORTED_LANGUAGES configuration
