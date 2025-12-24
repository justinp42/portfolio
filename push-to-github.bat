@echo off
echo Setting up Git repository and pushing to GitHub...
echo.

echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: Complete portfolio website with React, TailwindCSS, and Framer Motion"

echo Adding remote repository...
git remote add origin https://github.com/justinp42/portfolio-website.git

echo Setting main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Portfolio successfully pushed to GitHub!
echo 🌐 Your repository: https://github.com/justinp42/portfolio-website
echo.
pause