#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Check if AWS CLI is installed
try {
  execSync('aws --version', { stdio: 'ignore' });
} catch {
  console.error('❌ AWS CLI is not installed. Please install it first.');
  process.exit(1);
}

// Check if build directory exists
const buildDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(buildDir)) {
  console.error(
    '❌ Build directory not found. Please run "npm run build" first.'
  );
  process.exit(1);
}

// Get environment variables
const bucket = process.env.S3_BUCKET;
const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID;

if (!bucket) {
  console.error('❌ S3_BUCKET environment variable is required.');
  process.exit(1);
}

try {
  console.log('🚀 Deploying to S3...');

  // Sync files to S3
  execSync(`aws s3 sync ${buildDir} s3://${bucket} --delete`, {
    stdio: 'inherit',
  });

  console.log('✅ Successfully deployed to S3');

  // Invalidate CloudFront cache if distribution ID is provided
  if (distributionId) {
    console.log('🔄 Invalidating CloudFront cache...');
    execSync(
      `aws cloudfront create-invalidation --distribution-id ${distributionId} --paths "/*"`,
      {
        stdio: 'inherit',
      }
    );
    console.log('✅ CloudFront cache invalidated');
  }

  console.log('🎉 Deployment completed successfully!');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
