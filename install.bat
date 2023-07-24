@echo off
cd ./m1
echo "Installing frontend dependencies..."
call npm i
cd ../m2
echo "Installing backend dependencies..."
call npm i
cd ..
echo "Setting up docker environment..."
docker-compose up -d
echo "Installation Finished"
pause