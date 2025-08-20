#!/bin/bash
set -e

echo "Building Angular application..."
cd client
npm install
npm run build
echo "Build completed successfully!"
