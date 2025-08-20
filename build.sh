#!/bin/bash
set -e

echo "Current directory: $(pwd)"
echo "Listing files: $(ls -la)"

# Navigate to the correct client directory
if [ -d "client" ]; then
    echo "Found client directory, entering..."
    cd client
elif [ -d "project-showcase-hub/client" ]; then
    echo "Found project-showcase-hub/client directory, entering..."
    cd project-showcase-hub/client
else
    echo "Error: Cannot find client directory"
    find . -name "package.json" -type f
    exit 1
fi

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Build completed successfully!"
