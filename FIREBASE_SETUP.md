# Firebase Setup Guide

To enable Go language support with authentication, you need to set up Firebase Authentication.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Google Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Google" provider
5. Enable it and configure:
   - Project support email: your email
   - Authorized domains: your domain (for production)
6. Save the configuration

## Step 3: Get Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname
6. Copy the configuration object

## Step 4: Set Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id-here
```

Replace the values with your actual Firebase configuration.

## Step 5: Configure Authorized Users

Edit `src/constants/index.ts` and update the `AUTHORIZED_GO_USERS` array:

```typescript
export const AUTHORIZED_GO_USERS = [
  "your-email@example.com",
  "admin@yourcompany.com",
  // Add more authorized emails here
];
```

## Step 6: Test the Setup

1. Start the development server: `npm run dev`
2. Open the application in your browser
3. Try to select "Go" from the language dropdown
4. You should see a "Login with Google" button
5. Click it and sign in with an authorized email
6. After login, you should be able to select and use Go language

## Troubleshooting

### Common Issues

1. **"Firebase is not defined" error**: Make sure all environment variables are set correctly
2. **Authentication popup blocked**: Allow popups for your domain
3. **"Go requires authentication" message**: Make sure your email is in the `AUTHORIZED_GO_USERS` array
4. **Build errors**: Check that Firebase dependency is installed (`npm install firebase`)

### Security Notes

- Never commit your `.env.local` file to version control
- For production, consider moving authorized users to Firestore database
- Implement proper rate limiting and input validation
- Use Firebase Security Rules to protect your data

## Next Steps

For production deployment:

1. Set up proper Firebase Security Rules
2. Move authorized users to Firestore database
3. Implement backend service for Go code execution
4. Add proper error handling and logging
5. Set up monitoring and analytics
