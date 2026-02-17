# 🚀 Quick Database Setup (2 Minutes)

## Step 1: Create Database in Vercel (You need to do this - 2 minutes)

1. **Open Vercel Dashboard**: https://vercel.com/dashboard
2. **Click on your project**: `hirezy-platform`
3. **Go to "Storage" tab** (in the top menu)
4. **Click "Create Database"**
5. **Select "Postgres"**
6. **Click "Create"** (wait ~30 seconds)
7. **Copy the Connection String** (it will show as `POSTGRES_PRISMA_URL` or `POSTGRES_URL`)

## Step 2: Add Environment Variable (I'll help with this)

After you get the connection string, run this command:

**For Windows PowerShell:**
```powershell
vercel env add DATABASE_URL production
# When prompted, paste your connection string
# Select: Production, Preview, Development (all three)
```

**For Linux/Mac:**
```bash
vercel env add DATABASE_URL production
# When prompted, paste your connection string
# Select: Production, Preview, Development (all three)
```

## Step 3: Run Setup Script (I'll do this)

After adding the environment variable, I'll run the migration script automatically.

---

## Alternative: Manual Setup

If you prefer to do it manually through the dashboard:

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. **Add new variable**:
   - **Key**: `DATABASE_URL`
   - **Value**: (paste connection string from Storage)
   - **Environments**: ✅ Production ✅ Preview ✅ Development
3. **Save**
4. **Redeploy** (or wait for auto-deploy)

Then run migrations:
```bash
vercel env pull .env.local
npx prisma migrate deploy
```

---

## ✅ Once Done

Your backend will be fully functional with database connection!

**Test it:**
- API Endpoint: `https://hirezy-platform-*.vercel.app/api/admin/gigs/list`
- Should return data (or empty array if no data yet)




