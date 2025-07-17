#!/bin/bash

# Judge0 Cloud Run Deployment Script
# This script deploys Judge0 to Google Cloud Run with proper security configuration

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

# Configuration
PROJECT_ID="elloloop-easyloops"
SERVICE_NAME="judge0-easyloops"
REGION="us-central1"
SERVICE_ACCOUNT="judge0-service@${PROJECT_ID}.iam.gserviceaccount.com"

print_status "Starting Judge0 Cloud Run deployment..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    print_error "Google Cloud CLI is not installed. Please install it first."
    exit 1
fi

# Check if we're authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    print_error "Not authenticated with Google Cloud. Please run:"
    echo "gcloud auth login"
    exit 1
fi

# Set the project
print_status "Setting Google Cloud project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
print_status "Enabling required APIs..."
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Create service account for Judge0
print_status "Creating service account for Judge0..."
gcloud iam service-accounts create judge0-service \
    --display-name="Judge0 Service Account" \
    --description="Service account for Judge0 Cloud Run service" \
    2>/dev/null || print_warning "Service account already exists"

# Grant necessary permissions
print_status "Granting permissions to service account..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/run.invoker"

# Build and deploy to Cloud Run
print_status "Building and deploying Judge0 to Cloud Run..."

# Create a temporary Dockerfile for Cloud Run
cat > Dockerfile.cloudrun << 'EOF'
FROM judge0/judge0:latest

# Copy configuration
COPY judge0.conf /judge0.conf

# Expose port
EXPOSE 2358

# Start Judge0
CMD ["./scripts/workers"]
EOF

# Build and deploy
gcloud run deploy $SERVICE_NAME \
    --source . \
    --platform managed \
    --region $REGION \
    --service-account $SERVICE_ACCOUNT \
    --memory 2Gi \
    --cpu 2 \
    --max-instances 10 \
    --timeout 300 \
    --concurrency 80 \
    --port 2358 \
    --set-env-vars="REDIS_HOST=localhost,REDIS_PORT=6379" \
    --no-allow-unauthenticated

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

print_success "Judge0 deployed successfully!"
print_status "Service URL: $SERVICE_URL"

# Create IAM policy to allow only Cloud Functions access
print_status "Configuring IAM to allow only Cloud Functions access..."

# Get the Cloud Functions service account
FUNCTIONS_SA="elloloop-easyloops@appspot.gserviceaccount.com"

# Grant Cloud Functions access to Judge0
gcloud run services add-iam-policy-binding $SERVICE_NAME \
    --region=$REGION \
    --member="serviceAccount:${FUNCTIONS_SA}" \
    --role="roles/run.invoker"

print_success "IAM configured successfully!"

# Display configuration information
echo ""
print_status "Deployment Summary:"
echo "Service Name: $SERVICE_NAME"
echo "Service URL: $SERVICE_URL"
echo "Region: $REGION"
echo "Project: $PROJECT_ID"

echo ""
print_status "Next steps:"
echo "1. Update your Firebase Functions environment with:"
echo "   firebase functions:config:set judge0.base_url=\"$SERVICE_URL\""
echo ""
echo "2. Test the Judge0 service:"
echo "   curl $SERVICE_URL/languages"
echo ""
echo "3. Deploy your Firebase Functions:"
echo "   ./scripts/deploy-functions.sh"

print_warning "The Judge0 service is now only accessible to Cloud Functions in your project" 