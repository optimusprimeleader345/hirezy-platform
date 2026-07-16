#!/bin/bash
# Database Setup Script for Hirezy Platform
# This script helps set up the database after you create it in Vercel

echo "🗄️  Hirezy Database Setup"
echo "=========================="
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set"
    echo ""
    echo "Please follow these steps:"
    echo "1. Go to https://vercel.com/dashboard"
    echo "2. Open your project: hirezy-platform"
    echo "3. Go to 'Storage' tab → Click 'Create Database' → Select 'Postgres'"
    echo "4. Copy the connection string"
    echo "5. Run: export DATABASE_URL='your-connection-string'"
    echo "6. Then run this script again"
    exit 1
fi

echo "✅ DATABASE_URL is set"
echo ""

# Pull environment variables from Vercel
echo "📥 Pulling environment variables from Vercel..."
vercel env pull .env.local

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
    echo "✅ Environment variables loaded"
else
    echo "⚠️  .env.local not found, using current DATABASE_URL"
fi

# Check if DATABASE_URL is still set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not found in .env.local"
    echo "Please add it manually or set it as environment variable"
    exit 1
fi

echo ""
echo "🔧 Running Prisma migrations..."
cd "$(dirname "$0")"
npx prisma migrate deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database migrations completed successfully!"
    echo ""
    echo "🎉 Your database is now set up!"
    echo ""
    echo "Next steps:"
    echo "1. Your backend API is already deployed on Vercel"
    echo "2. All API endpoints should now work with the database"
    echo "3. Test your API: https://hirezy-platform-*.vercel.app/api/admin/gigs/list"
else
    echo ""
    echo "❌ Migration failed. Please check the error above."
    exit 1
fi




