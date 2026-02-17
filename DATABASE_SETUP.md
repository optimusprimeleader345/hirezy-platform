# 🗄️ Database Setup Guide for Hirezy Platform

## ✅ Backend Status
**Your backend API routes are already deployed on Vercel!** 
- All API endpoints are live at: `https://hirezy-platform-*.vercel.app/api/*`
- The backend is part of your Next.js deployment

## 🔧 What You Need: PostgreSQL Database

Your app needs a PostgreSQL database. Here are the best options:

---

## Option 1: Vercel Postgres (Recommended - Easiest)

### Steps:
1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Click on your project: **hirezy-platform**
3. Go to **Storage** tab → Click **Create Database**
4. Select **Postgres** → Click **Create**
5. Copy the **Connection String** (it will look like: `postgres://...`)
6. Go to **Settings** → **Environment Variables**
7. Add new variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Paste the connection string
   - **Environment**: Production, Preview, Development (select all)
8. Click **Save**
9. Redeploy your project (or it will auto-deploy)

### Run Migrations:
After setting up the database, run migrations:

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy
```

---

## Option 2: Supabase (Free Tier Available)

### Steps:
1. Go to https://supabase.com
2. Sign up / Login
3. Click **New Project**
4. Fill in:
   - **Name**: hirezy-database
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to you
5. Wait for project creation (~2 minutes)
6. Go to **Project Settings** → **Database**
7. Copy the **Connection String** (URI format)
8. In Vercel:
   - Go to **Settings** → **Environment Variables**
   - Add `DATABASE_URL` with the connection string
9. Run migrations (same as Option 1)

---

## Option 3: Railway (Free Tier Available)

### Steps:
1. Go to https://railway.app
2. Sign up with GitHub
3. Click **New Project** → **Provision PostgreSQL**
4. Click on the PostgreSQL service
5. Go to **Variables** tab
6. Copy the **DATABASE_URL**
7. Add it to Vercel environment variables
8. Run migrations

---

## Option 4: Neon (Free Tier Available)

### Steps:
1. Go to https://neon.tech
2. Sign up / Login
3. Click **Create Project**
4. Fill in project details
5. Copy the **Connection String**
6. Add to Vercel environment variables
7. Run migrations

---

## 🚀 After Database Setup

### 1. Run Database Migrations

```bash
# Option A: Using Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy

# Option B: Direct connection (if you have connection string)
DATABASE_URL="your-connection-string" npx prisma migrate deploy
```

### 2. (Optional) Seed Database

```bash
npx prisma db seed
```

### 3. Verify Deployment

Visit your API endpoints:
- `https://hirezy-platform-*.vercel.app/api/admin/gigs/list`
- `https://hirezy-platform-*.vercel.app/api/student/applications/get`

---

## 📋 Environment Variables Checklist

Make sure these are set in Vercel:

- ✅ `DATABASE_URL` - PostgreSQL connection string (REQUIRED)
- ⚠️ `GOOGLE_AI_API_KEY` - For AI features (optional)
- ⚠️ `OPENAI_API_KEY` - For AI features (optional)
- ⚠️ `NEXTAUTH_SECRET` - For authentication (optional)
- ⚠️ `NEXTAUTH_URL` - Your Vercel URL (optional)

---

## 🎯 Quick Start (Recommended: Vercel Postgres)

1. **Vercel Dashboard** → Your Project → **Storage** → **Create Database** → **Postgres**
2. Copy connection string
3. **Settings** → **Environment Variables** → Add `DATABASE_URL`
4. Redeploy or wait for auto-deploy
5. Run migrations: `npx prisma migrate deploy`

---

## ✅ Verification

Once database is set up, your backend will be fully functional:
- ✅ API routes will connect to database
- ✅ User authentication will work
- ✅ Data persistence will work
- ✅ All features will be operational

---

**Need Help?** Check Vercel logs if you encounter issues.




