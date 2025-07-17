#!/bin/bash

# Easyloops Firebase Cloud Functions Deployment Script
# This script deploys the cloud functions and configures the environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "firebase.json" ]; then
    print_error "firebase.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Starting Firebase Cloud Functions deployment..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    print_error "Firebase CLI is not installed. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if we're logged into Firebase
if ! firebase projects:list &> /dev/null; then
    print_error "Not logged into Firebase. Please run:"
    echo "firebase login"
    exit 1
fi

# Navigate to functions directory and install dependencies
print_status "Installing function dependencies..."
cd functions

if [ ! -f "package.json" ]; then
    print_error "package.json not found in functions directory"
    exit 1
fi

npm install

# Build the functions
print_status "Building functions..."
npm run build

# Go back to project root
cd ..

# Deploy functions
print_status "Deploying functions to Firebase..."
firebase deploy --only functions

print_success "Functions deployed successfully!"

# Set environment variables if provided
if [ ! -z "$JUDGE0_BASE_URL" ]; then
    print_status "Setting Judge0 base URL..."
    firebase functions:config:set judge0.base_url="$JUDGE0_BASE_URL"
fi

if [ ! -z "$JUDGE0_API_KEY" ]; then
    print_status "Setting Judge0 API key..."
    firebase functions:config:set judge0.api_key="$JUDGE0_API_KEY"
fi

# Display function URLs
print_status "Function URLs:"
echo "Execute Code: https://us-central1-elloloop-easyloops.cloudfunctions.net/executeCode"
echo "Health Check: https://us-central1-elloloop-easyloops.cloudfunctions.net/healthCheck"
echo "Get Languages: https://us-central1-elloloop-easyloops.cloudfunctions.net/getLanguages"
echo "Get Supported Languages: https://us-central1-elloloop-easyloops.cloudfunctions.net/getSupportedLanguages"

print_success "Deployment completed successfully!"

# Display supported languages
print_status "Supported Programming Languages:"
echo "✅ Go (go)"
echo "✅ Java (java)"
echo "✅ C++ (cpp)"
echo "✅ C (c)"
echo "✅ Rust (rust)"
echo "✅ Python (python)"
echo "✅ JavaScript (javascript)"
echo "✅ TypeScript (typescript)"
echo "✅ C# (csharp)"
echo "✅ PHP (php)"
echo "✅ Ruby (ruby)"
echo "✅ Swift (swift)"
echo "✅ Kotlin (kotlin)"
echo "✅ Scala (scala)"

# Display next steps
echo ""
print_status "Next steps:"
echo "1. Configure Judge0 Cloud Run instance"
echo "2. Set up IAM permissions for Cloud Functions to access Judge0"
echo "3. Add authorized users to Firestore collection 'authorizedUsers'"
echo "4. Test the functions with a valid Firebase ID token"
echo "5. Use the language parameter in your requests (e.g., 'go', 'java', 'cpp')"

print_warning "Remember to set the JUDGE0_BASE_URL environment variable to your Cloud Run instance URL"

# Example usage
echo ""
print_status "Example Usage:"
echo "# Execute Go code"
echo 'curl -X POST https://us-central1-elloloop-easyloops.cloudfunctions.net/executeCode \'
echo '  -H "Content-Type: application/json" \'
echo '  -H "Authorization: Bearer YOUR_TOKEN" \'
echo '  -d '"'"'{"code":"package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello\")\n}","language":"go","questionId":"test"}'"'"''

echo ""
echo "# Execute Java code"
echo 'curl -X POST https://us-central1-elloloop-easyloops.cloudfunctions.net/executeCode \'
echo '  -H "Content-Type: application/json" \'
echo '  -H "Authorization: Bearer YOUR_TOKEN" \'
echo '  -d '"'"'{"code":"public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello\");\n    }\n}","language":"java","questionId":"test"}'"'"'' 