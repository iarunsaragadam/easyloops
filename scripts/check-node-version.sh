#!/bin/zsh

# Script to verify the correct Node.js version is being used
# Based on the .nvmrc file

# Get the required Node.js version from .nvmrc
REQUIRED_NODE_VERSION=$(cat .nvmrc)

# Get the current Node.js version (without the 'v' prefix)
CURRENT_NODE_VERSION=$(node -v | sed 's/^v//')

# Check if the current version matches the required version
if [[ $CURRENT_NODE_VERSION != $REQUIRED_NODE_VERSION* ]]; then
  echo "Warning: You are using Node.js $CURRENT_NODE_VERSION, but this project requires Node.js $REQUIRED_NODE_VERSION"
  
  # Check if nvm is available
  if command -v nvm &> /dev/null; then
    echo "Attempting to switch to the correct version using nvm..."
    nvm use
  elif command -v volta &> /dev/null; then
    echo "You're using Volta. Run 'volta pin node@$REQUIRED_NODE_VERSION' to set the correct version."
  else
    echo "Please install Node.js $REQUIRED_NODE_VERSION to work on this project."
    echo "We recommend using nvm (https://github.com/nvm-sh/nvm) or Volta (https://volta.sh/) to manage Node.js versions."
  fi
  
  exit 1
else
  echo "✅ Using the correct Node.js version: $CURRENT_NODE_VERSION"
fi 