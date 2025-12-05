# 🚀 HIREZY Deployment Guide

**Complete step-by-step guide to deploy the Hirezy freelancing platform**

## 📋 Prerequisites

### System Requirements
- **Node.js**: 18.0+ (LTS recommended)
- **PostgreSQL**: 15.x+ (with PostGIS support)
- **Docker**: Latest (optional, for containerized deployment)
- **Nginx/Apache**: For reverse proxy (production only)
- **SSL Certificate**: Let's Encrypt or commercial

### Network Requirements
- **Domain Name**: Pointing to your server
- **DNS Configuration**: A and CNAME records
- **Firewall**: Open ports 80, 443, 22
- **SSL/TLS**: Full encryption setup

## 🎯 Deployment Options

### 1. **Vercel (Recommended for Quick Start)**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel --prod

# Add environment variables in Vercel Dashboard:
# DATABASE_URL=postgresql://...
# NEXTAUTH_SECRET=...
# NEXTAUTH_URL=https://your-domain.vercel.app
# OPENAI_API_KEY=...(optional)
```

### 2. **Railway (Managed PostgreSQL)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up

# Database URL is automatically provided
# Other environment variables can be set in Railway dashboard
```

### 3. **Docker Migration (Production-Grade)**
```bash
# Build and run with Docker
docker build -t hirezy-platform .
docker run -p 3000:3000 \
  --env-file .env.production \
  --name hirezy-app \
  hirezy-platform

# Or use the deployment script
./deploy.sh
```

### 4. **Traditional Server Deployment**
```bash
# Production build
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "hirezy" -- start
pm2 startup
pm2 save

# Configure Nginx reverse proxy
sudo cp nginx.conf /etc/nginx/sites-available/hirezy
sudo ln -s /etc/nginx/sites-available/hirezy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 📋 Configuration Files

### Environment Variables (.env.production)
```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Authentication
NEXTAUTH_SECRET="your-secure-random-string"
NEXTAUTH_URL="https://yourdomain.com"

# AI Services (Optional)
OPENAI_API_KEY="sk-..."
GOOGLE_AI_KEY="your-key"

# Application
NEXT_PUBLIC_API_URL="https://yourdomain.com"
PLATFORM_NAME="Hirezy Freelancing"

# Security
CORS_ORIGIN="https://yourdomain.com"
RATE_LIMIT_ENABLED="true"

# Monitoring
ENABLE_METRICS="true"
ERROR_REPORTING_ENABLED="true"
```

### Nginx Configuration
```nginx
# /etc/nginx/sites-available/hirezy
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🚀 Post-Deployment Checklist

### Immediate Checks
- [ ] **Application Loads**: `https://yourdomain.com`
- [ ] **Database Connection**: Check application logs
- [ ] **Authentication Works**: Try login/signup
- [ ] **SSL Certificate**: Valid HTTPS
- [ ] **No Console Errors**: Browser dev tools

### Feature Testing
- [ ] **Student Dashboard**: Loads properly
- [ ] **Recruiter Dashboard**: Accessible
- [ ] **AI Features**: Test AI assistant (purple brain icon)
- [ ] **Navigation**: All sidebar links work
- [ ] **Forms**: Registration, applications, settings

### Performance Verification
- [ ] **Page Load Speed**: <3 seconds
- [ ] **API Response Times**: <500ms
- [ ] **Mobile Responsiveness**: Works on mobile
- [ ] **Caching**: Static assets cached

### Security Audit
- [ ] **Environment Variables**: No secrets exposed
- [ ] **API Routes**: Authentication required
- [ ] **Database**: No sensitive data exposed
- [ ] **SSL**: Full encryption enabled

## 🔧 Troubleshooting Common Issues

### Application Won't Start
```bash
# Check environment variables
echo $DATABASE_URL

# Verify database connection
npx prisma db push

# Check logs
npm run logs
```

### Database Connection Failures
```bash
# Test connection
psql "$DATABASE_URL"

# Verify schema
npx prisma db push --force-reset
```

### SSL Certificate Issues
```bash
# Generate SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal check
sudo crontab -l | grep certbot
```

### Performance Issues
```bash
# Enable production builds
NODE_ENV=production npm run build

# Check memory usage
pm2 monit

# Database slow queries
npx prisma studio
```

## 📊 Monitoring & Maintenance

### Health Checks Setup
```bash
# API health endpoint
curl https://yourdomain.com/api/health

# Database health
psql -h your-host -d your-db -U your-user

# Application logs
pm2 logs hirezy
```

### Backup Strategy
```bash
# Database backup
pg_dump "$DATABASE_URL" > "backup-$(date +%Y%m%d).sql"

# File uploads backup
rsync -av /path/to/uploads/ /backups/uploads/

# Environment variables (encrypted)
gpg -c .env.production > .env.production.gpg
```

### Updates & Maintenance
```bash
# Update dependencies securely
npm audit
npm update --save-dev
npm audit fix

# Database migrations
npx prisma migrate deploy

# Zero-downtime deployment
pm2 reload hirezy
```

## 🌐 Scaling & Advanced Configuration

### Horizontal Scaling
```bash
# Multiple application instances
pm2 start npm --name "hirezy-1" -- start
pm2 start npm --name "hirezy-2" -- start
pm2 start pm2.conf.js  # Load balancer

# Nginx load balancer with IP hash
upstream hirezy_backend {
    ip_hash;
    server localhost:3000;
    server localhost:3001;
    server localhost:3002;
}
```

### Database Optimization
```bash
# Connection pooling
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20"

# Query optimization
npx prisma studio
# Analyze slow queries and add indexes

# Redis caching for API responses
REDIS_URL="redis://localhost:6379"
CACHE_ENABLED=true
```

### CDN Integration
```bash
# Cloudflare Pages + Functions
# Vercel Edge Network
# AWS CloudFront + Lambda@Edge

# Static asset optimization
next.config.js:
module.exports = {
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

## 🔒 Security Best Practices

### Production Checklist
- [ ] **HTTPS Only**: No HTTP endpoints
- [ ] **Rate Limiting**: API protection
- [ ] **Input Validation**: All forms sanitized
- [ ] **Error Messages**: No sensitive info
- [ ] **Headers**: Security headers enabled
- [ ] **Updates**: Dependencies up-to-date
- [ ] **Auditing**: Access logs enabled

## 📞 Support & Contacts

- **Documentation**: [https://docs.hirezy.com](https://docs.hirezy.com)
- **GitHub Issues**: For bugs and feature requests
- **Email Support**: support@hirezy.com
- **Community**: Discord server

---

## 🎯 Final Verification

After deployment, run this verification script:

```bash
#!/bin/bash
echo "🔍 HIREZY Deployment Verification"
echo "=================================="

# Check application
if curl -f -s https://yourdomain.com > /dev/null; then
    echo "✅ Application responsive"
else
    echo "❌ Application not responding"
fi

# Check HTTPS
if curl -f -s https://yourdomain.com > /dev/null; then
    echo "✅ HTTPS working"
else
    echo "❌ HTTPS not working"
fi

# Check API
if curl -f -s https://yourdomain.com/api/health > /dev/null; then
    echo "✅ API health check passed"
else
    echo "❌ API health check failed"
fi

echo ""
echo "🚀 Deployment verification complete!"
echo "Visit: https://yourdomain.com"
```

---

**🎉 Deployment Complete!**

Your **enterprise-grade freelancing platform** with AI-powered career intelligence is now live!

*Built with ❤️ for the next generation of talent*
