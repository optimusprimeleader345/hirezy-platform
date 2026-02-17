# Database Setup Script for Hirezy Platform (PowerShell)
# This script helps set up the database after you create it in Vercel

Write-Host "🗄️  Hirezy Database Setup" -ForegroundColor Cyan
Write-Host "==========================" -ForegroundColor Cyan
Write-Host ""

# Check if DATABASE_URL is set
if (-not $env:DATABASE_URL) {
    Write-Host "❌ DATABASE_URL environment variable is not set" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please follow these steps:" -ForegroundColor Yellow
    Write-Host "1. Go to https://vercel.com/dashboard"
    Write-Host "2. Open your project: hirezy-platform"
    Write-Host "3. Go to 'Storage' tab → Click 'Create Database' → Select 'Postgres'"
    Write-Host "4. Copy the connection string"
    Write-Host "5. Run: `$env:DATABASE_URL='your-connection-string'"
    Write-Host "6. Then run this script again"
    exit 1
}

Write-Host "✅ DATABASE_URL is set" -ForegroundColor Green
Write-Host ""

# Pull environment variables from Vercel
Write-Host "📥 Pulling environment variables from Vercel..." -ForegroundColor Cyan
vercel env pull .env.local

# Load environment variables from .env.local
if (Test-Path .env.local) {
    Get-Content .env.local | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
    Write-Host "✅ Environment variables loaded" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env.local not found, using current DATABASE_URL" -ForegroundColor Yellow
}

# Check if DATABASE_URL is still set
if (-not $env:DATABASE_URL) {
    Write-Host "❌ DATABASE_URL not found in .env.local" -ForegroundColor Red
    Write-Host "Please add it manually or set it as environment variable"
    exit 1
}

Write-Host ""
Write-Host "🔧 Running Prisma migrations..." -ForegroundColor Cyan
npx prisma migrate deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Database migrations completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Your database is now set up!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Your backend API is already deployed on Vercel"
    Write-Host "2. All API endpoints should now work with the database"
    Write-Host "3. Test your API: https://hirezy-platform-*.vercel.app/api/admin/gigs/list"
} else {
    Write-Host ""
    Write-Host "❌ Migration failed. Please check the error above." -ForegroundColor Red
    exit 1
}




