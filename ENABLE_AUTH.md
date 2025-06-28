# Enable Google Authentication in Firebase Console

The Firebase configuration has been updated with the correct project settings, but you need to enable Google Authentication in the Firebase Console.

## Steps to Enable Google Authentication:

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `elloloop-easyloops`
3. **Navigate to Authentication**: Click "Authentication" in the left sidebar
4. **Get Started**: Click "Get started" if you haven't set up Authentication yet
5. **Sign-in method**: Click on the "Sign-in method" tab
6. **Enable Google**: Click on "Google" provider
7. **Configure Google Auth**:
   - **Enable**: Toggle the switch to enable Google Authentication
   - **Project support email**: Select your email (arun@elloloop.com)
   - **Authorized domains**: Add `localhost` for development
   - **Save**: Click "Save" to enable Google Authentication

## Current Firebase Configuration:

Your Firebase project is now configured with:

- **Project ID**: elloloop-easyloops
- **API Key**: AIzaSyA32EoTmr7nRaq26rDBbIjPNDxOMX5g0B8
- **Auth Domain**: elloloop-easyloops.firebaseapp.com
- **App ID**: 1:785642431768:web:289ffa24f524cc5849ea6d

## Authorized Users for Go Language:

The following emails are currently authorized to access Go language:

- arun@elloloop.com
- admin@easyloops.com
- developer@easyloops.com

## Testing the Setup:

1. After enabling Google Authentication in the console
2. Restart your development server: `npm run dev`
3. Try to select "Go" from the language dropdown
4. Click "Login with Google"
5. Sign in with arun@elloloop.com
6. You should now be able to access Go language features

## Troubleshooting:

If you still get authentication errors:

1. Make sure Google Authentication is enabled in Firebase Console
2. Check that you're using the correct email (arun@elloloop.com)
3. Clear browser cache and cookies
4. Restart the development server
