#!/bin/bash
# Script to check if E2E tests should be skipped based on commit message

# Function to check if commit message contains skip E2E flag
check_skip_e2e() {
  local commit_msg="$1"
  
  # Check for skip E2E patterns in commit message
  if echo "$commit_msg" | grep -qiE "(skip.?e2e|no.?e2e|skip.?tests?|no.?tests?)"; then
    echo "true"
  else
    echo "false"
  fi
}

# Get commit message based on event type
if [[ "$GITHUB_EVENT_NAME" == "pull_request" ]]; then
  # For pull requests, use the PR title and body
  if [[ -f "$GITHUB_EVENT_PATH" ]]; then
    commit_msg=$(jq -r '.pull_request.title + "\n" + (.pull_request.body // "")' "$GITHUB_EVENT_PATH")
  else
    commit_msg=""
  fi
else
  # For pushes, use the commit message
  if [[ -f "$GITHUB_EVENT_PATH" ]]; then
    commit_msg=$(jq -r '.commits[0].message // ""' "$GITHUB_EVENT_PATH")
  else
    commit_msg=""
  fi
fi

# Check if we should skip E2E tests
should_skip=$(check_skip_e2e "$commit_msg")

if [[ "$should_skip" == "true" ]]; then
  echo "skip-e2e=true" >> "$GITHUB_OUTPUT"
  echo "Skipping E2E tests due to commit message"
else
  echo "skip-e2e=false" >> "$GITHUB_OUTPUT"
  echo "Running E2E tests"
fi 