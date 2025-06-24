# Simple deployment script for the wedding website
Write-Host "Deploying Eileen und Dennis Hochzeit Website..." -ForegroundColor Cyan

# Pull latest changes if working with git
if (Test-Path .git) {
    Write-Host "Pulling latest changes from git..." -ForegroundColor Yellow
    git pull
}

# Build and deploy with Docker Compose
Write-Host "Building and deploying with Docker Compose..." -ForegroundColor Yellow
docker-compose down
docker-compose build --no-cache
docker-compose up -d

Write-Host "Deployment complete! The website should now be accessible." -ForegroundColor Green
Write-Host "You can check the logs with: docker-compose logs -f hochzeit-app" -ForegroundColor Gray
