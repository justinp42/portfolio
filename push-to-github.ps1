Write-Host "Setting up Git repository and pushing to GitHub..." -ForegroundColor Green
Write-Host ""

Write-Host "Initializing Git repository..." -ForegroundColor Yellow
git init

Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Complete portfolio website with React, TailwindCSS, and Framer Motion"

Write-Host "Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/justinp42/portfolio-website.git

Write-Host "Setting main branch..." -ForegroundColor Yellow
git branch -M main

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "✅ Portfolio successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "🌐 Your repository: https://github.com/justinp42/portfolio-website" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to continue"
