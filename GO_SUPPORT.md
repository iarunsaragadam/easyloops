# Go Language Support

This project now supports Go programming language with authentication-based access control.

## Features

- **Go Language Support**: Added Go as a programming language option alongside Python
- **Authentication Required**: Go language is only available to authenticated users
- **Email-based Authorization**: Only specific email addresses can access Go language
- **Firebase Integration**: Uses Firebase Authentication for user management

## Configuration

### Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Google Authentication in the Firebase console
3. Add your Firebase configuration to environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Authorized Users

Currently, authorized email addresses are hardcoded in `src/constants/index.ts`:

```typescript
export const AUTHORIZED_GO_USERS = [
  "admin@easyloops.com",
  "developer@easyloops.com",
  // Add more authorized emails here
];
```

**For production**, this should be moved to Firebase Firestore for better security and manageability.

## How It Works

1. **Language Selection**: Users can select between Python (always available) and Go (requires authentication)
2. **Authentication**: Users must login with Google to access Go language
3. **Authorization Check**: Only users with authorized email addresses can use Go
4. **Code Execution**: Go code execution is currently mocked (requires backend implementation)

## Implementation Details

### Components Added

- `LanguageSelector`: Manages language selection with authentication checks
- `AuthButton`: Handles login/logout functionality
- `useAuth`: Hook for authentication state management
- `useGoExecution`: Hook for Go code execution (mock implementation)

### Files Modified

- `src/constants/index.ts`: Updated supported languages and added Firebase config
- `src/components/Header.tsx`: Added language selector and auth button
- `src/components/App.tsx`: Integrated language selection and authentication
- `src/hooks/useAppState.ts`: Added language state management
- `src/types/index.ts`: Added new types for language and authentication

## Backend Implementation Required

For full Go support, you'll need to implement a backend service that can:

1. **Compile Go Code**: Use Go compiler to build the code
2. **Execute Safely**: Run code in a sandboxed environment
3. **Handle I/O**: Process stdin/stdout for test cases
4. **Return Results**: Send execution results back to frontend

### Example Backend Architecture

```typescript
// Example API endpoint for Go execution
POST /api/execute/go
{
  "code": "package main...",
  "testCases": [...],
  "input": "..."
}

// Response
{
  "output": "...",
  "testResults": [...],
  "error": null
}
```

## Security Considerations

1. **Email Authorization**: Currently hardcoded - should be moved to Firestore
2. **Code Execution**: Go execution requires backend implementation with proper sandboxing
3. **Rate Limiting**: Implement rate limiting for code execution
4. **Input Validation**: Validate and sanitize all user inputs

## Future Enhancements

1. **Firestore Integration**: Move authorized users to Firestore database
2. **Admin Panel**: Web interface to manage authorized users
3. **Real Go Execution**: Implement backend service for Go code execution
4. **Additional Languages**: Support for more programming languages
5. **User Roles**: Different permission levels for different features
