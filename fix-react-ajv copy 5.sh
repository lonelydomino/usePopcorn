#!/bin/bash

# Fix React ajv compatibility issues globally
# This script resolves the "Cannot find module 'ajv/dist/compile/codegen'" error

echo "🔧 Fixing React ajv compatibility issues..."

# Check if we're in a React project directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: No package.json found. Please run this script from a React project directory."
    exit 1
fi

# Check if this is a React project
if ! grep -q "react" package.json; then
    echo "❌ Error: This doesn't appear to be a React project. Please run this script from a React project directory."
    exit 1
fi

echo "📦 Installing compatible react-scripts version..."
npm install react-scripts@5.1.0-next.26 --save

echo "🔧 Installing compatible ajv versions..."
npm install ajv@^6.12.6 ajv-keywords@^3.5.2 --save-dev

echo "🧹 Cleaning up node_modules..."
rm -rf node_modules package-lock.json

echo "📥 Reinstalling dependencies..."
npm install

echo "✅ Done! The ajv compatibility issues should now be resolved."
echo "🚀 You can now run 'npm start' to start your React project."

# Optional: Try to start the project
read -p "Would you like to try starting the project now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting React project..."
    npm start
fi
