@echo off
echo Staging changes...
git add .

echo Committing changes...
git commit -m "Update meal plan and UI styling"

echo Pushing to main branch...
git push origin main

echo Deployment complete!
pause