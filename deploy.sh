#!/bin/bash

# Simple deployment script for the wedding website
echo "Deploying Eileen und Dennis Hochzeit Website..."

# Pull latest changes if working with git
if [ -d .git ]; then
  echo "Pulling latest changes from git..."
  git pull
fi

# Build and deploy with Docker Compose
echo "Building and deploying with Docker Compose..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo "Deployment complete! The website should now be accessible."
echo "You can check the logs with: docker-compose logs -f hochzeit-app"
