#!/bin/bash

echo "🚀 Starting Hirezy Platform Deployment to Vercel..."

# Check if logged in to Vercel
echo "Checking Vercel authentication..."
vercel whoami

if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Vercel. Please run 'vercel login' first."
    exit 1
fi

echo "✅ Vercel authentication successful!"

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check your code and try again."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed. Please check your configuration."
    exit 1
fi

echo "✅ Deployment successful!"
echo "🎉 Your Hirezy platform is now live on Vercel!"
echo ""
echo "Next steps:"
echo "1. Set up environment variables in Vercel Dashboard"
echo "2. Configure custom domain (optional)"
echo "3. Create LinkedIn post to showcase your platform"
echo ""
echo "For environment variables, use the .env.production template as reference."