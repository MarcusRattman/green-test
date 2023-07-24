@echo off
cd ./m1
echo "\nInstalling frontend dependencies...\n"
call npm i
cd ../m2
echo "\nInstalling backend dependencies...\n"
call npm i
cd ..
echo "\nSetting up docker environment...\n"
docker-compose up -d
echo "\nInstallation Finished\n"
pause