# 🚀 EasyLoops Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    STATIC FRONTEND + BACKEND                   │
├─────────────────────────────────────────────────────────────────┤
│  Static Frontend (Vercel/Netlify)  │  Backend (VPS/Cloud)      │
│  • Next.js (Static Export)         │  • Express.js + Docker    │
│  • Firebase Auth                   │  • Go, C, C++ Execution   │
│  • No Server-Side Code             │  • Resource Management    │
│  • CDN + Edge Caching              │  • Security & Isolation   │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 Frontend Deployment (Static Export)

### 1. Build Static Files

```bash
# Install dependencies
npm install

# Build static files
npm run build

# The static files will be in the `out/` directory
```

### 2. Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo for automatic deployments
```

**Vercel Configuration:**

- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `out`
- Install Command: `npm install`

### 3. Deploy to Netlify

```bash
# Build locally
npm run build

# Deploy the `out/` directory to Netlify
# Or connect your GitHub repo
```

**Netlify Configuration:**

- Build Command: `npm run build`
- Publish Directory: `out`
- Node Version: 18.x

### 4. Environment Variables

Set these in your hosting platform:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

## 🖥️ Backend Deployment

### 1. VPS/Cloud Server Setup

**Recommended: DigitalOcean, AWS EC2, or Google Cloud**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install PM2 for process management
sudo npm install -g pm2
```

### 2. Deploy Backend Code

```bash
# Clone your repository
git clone https://github.com/your-username/easyloops-react.git
cd easyloops-react/backend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your Firebase service account and other configs

# Start with PM2
pm2 start server.js --name easyloops-backend
pm2 save
pm2 startup
```

### 3. Nginx Configuration

```nginx
# /etc/nginx/sites-available/easyloops-backend
server {
    listen 80;
    server_name your-backend-domain.com;

    location / {
        proxy_pass http://localhost:3001;
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

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/easyloops-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-backend-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔧 Docker Setup

### 1. Pull Required Images

```bash
# Pull Go image for code execution
docker pull golang:1.21-alpine

# Pull other language images as needed
docker pull gcc:latest
docker pull python:3.11-alpine
```

### 2. Docker Security Configuration

```bash
# Create Docker network for isolation
docker network create easyloops-execution

# Set up resource limits
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<EOF
{
  "default-ulimits": {
    "nofile": {
      "Hard": 1024,
      "Name": "nofile",
      "Soft": 1024
    }
  }
}
EOF

sudo systemctl restart docker
```

## 🔒 Security Configuration

### 1. Firewall Setup

```bash
# Install UFW
sudo apt install ufw

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. Rate Limiting

The backend includes rate limiting, but you can add additional layers:

```bash
# Install fail2ban
sudo apt install fail2ban

# Configure for API protection
sudo tee /etc/fail2ban/jail.local <<EOF
[api]
enabled = true
port = http,https
filter = apache-auth
logpath = /var/log/nginx/access.log
maxretry = 10
bantime = 3600
EOF

sudo systemctl restart fail2ban
```

## 📊 Monitoring & Logging

### 1. PM2 Monitoring

```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs easyloops-backend

# Setup PM2 monitoring
pm2 install pm2-server-monit
```

### 2. Docker Monitoring

```bash
# Monitor Docker containers
docker stats

# View Docker logs
docker logs <container-name>
```

## 🔄 CI/CD Pipeline

### 1. GitHub Actions (Frontend)

```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths: ["src/**", "public/**", "package.json"]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 2. Backend Deployment Script

```bash
#!/bin/bash
# deploy-backend.sh

echo "Deploying EasyLoops Backend..."

# Pull latest code
git pull origin main

# Install dependencies
npm install

# Restart PM2 process
pm2 restart easyloops-backend

# Check status
pm2 status

echo "Deployment complete!"
```

## 🚨 Troubleshooting

### Common Issues

1. **Frontend can't connect to backend**

   - Check `NEXT_PUBLIC_BACKEND_URL` environment variable
   - Verify CORS configuration in backend
   - Check firewall settings

2. **Docker permission errors**

   ```bash
   sudo usermod -aG docker $USER
   # Log out and back in
   ```

3. **PM2 process not starting**

   ```bash
   pm2 delete easyloops-backend
   pm2 start server.js --name easyloops-backend
   pm2 save
   ```

4. **SSL certificate issues**
   ```bash
   sudo certbot renew --dry-run
   sudo systemctl status certbot.timer
   ```

### Health Checks

```bash
# Backend health
curl https://your-backend-domain.com/api/health

# Docker status
docker ps

# PM2 status
pm2 status

# Nginx status
sudo systemctl status nginx
```

## 📈 Scaling Considerations

### 1. Load Balancer Setup

For high traffic, consider using a load balancer:

```bash
# Install HAProxy
sudo apt install haproxy

# Configure multiple backend instances
# See HAProxy documentation for configuration
```

### 2. Database Scaling

If you add user management or analytics:

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Or use managed services like AWS RDS, Google Cloud SQL
```

### 3. CDN Configuration

For global performance:

```bash
# Configure Cloudflare or AWS CloudFront
# Point to your static frontend domain
```

## 💰 Cost Optimization

### 1. VPS Sizing

- **Development**: 1GB RAM, 1 vCPU ($5-10/month)
- **Production**: 2GB RAM, 2 vCPU ($10-20/month)
- **High Traffic**: 4GB RAM, 4 vCPU ($20-40/month)

### 2. Static Hosting

- **Vercel**: Free tier (100GB bandwidth)
- **Netlify**: Free tier (100GB bandwidth)
- **GitHub Pages**: Free

### 3. Monitoring Costs

- **PM2**: Free
- **Docker**: Free
- **Let's Encrypt SSL**: Free

## 🎯 Production Checklist

- [ ] Frontend deployed to Vercel/Netlify
- [ ] Backend deployed to VPS with SSL
- [ ] Environment variables configured
- [ ] Firebase project configured
- [ ] Docker images pulled
- [ ] Firewall configured
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Domain DNS configured
- [ ] SSL certificates installed
- [ ] Rate limiting enabled
- [ ] Error logging configured

## 📞 Support

For deployment issues:

1. Check logs: `pm2 logs` and `docker logs`
2. Verify environment variables
3. Test connectivity between frontend and backend
4. Check firewall and security groups
5. Review this deployment guide

---

**Happy Deploying! 🚀**
