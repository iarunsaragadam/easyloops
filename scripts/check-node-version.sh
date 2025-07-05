#!/bin/bash

# Check Node.js version
REQUIRED_VERSION="20"
CURRENT_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)

echo "🔍 Checking Node.js version..."
echo "Current version: $(node -v)"
echo "Required version: $REQUIRED_VERSION.x"

if [ "$CURRENT_VERSION" -lt "$REQUIRED_VERSION" ]; then
  echo "❌ Node.js version $REQUIRED_VERSION.x or higher is required"
  echo "Please update Node.js to version $REQUIRED_VERSION.x or higher"
  exit 1
fi

echo "✅ Node.js version check passed!" 