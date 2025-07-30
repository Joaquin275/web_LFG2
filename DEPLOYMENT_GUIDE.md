# Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the La Familia Gastro S.L. landing page project to various hosting environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Build Process](#build-process)
4. [Deployment Options](#deployment-options)
5. [Environment Configuration](#environment-configuration)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring and Maintenance](#monitoring-and-maintenance)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

- **Node.js**: Version 14.0.0 or higher
- **npm**: Version 6.0.0 or higher
- **Git**: Latest version
- **Modern Web Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Optional Tools

- **Python 3.x**: For local development server
- **PHP 7.4+**: For PHP development server
- **Docker**: For containerized deployment

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## Local Development Setup

### 1. Clone Repository

```bash
# Clone the repository
git clone https://github.com/lafamiliagastro/landing-page.git

# Navigate to project directory
cd landing-page
```

### 2. Install Dependencies

```bash
# Install development dependencies
npm install

# Verify installation
npm list
```

### 3. Start Development Server

```bash
# Option 1: Python development server (recommended)
npm run dev

# Option 2: PHP development server
npm run serve-php

# Option 3: Node.js development server
npm start
```

### 4. Verify Setup

1. Open browser to `http://localhost:8000`
2. Verify all pages load correctly:
   - Main page (Spanish): `http://localhost:8000`
   - English: `http://localhost:8000/en.html`
   - French: `http://localhost:8000/fr.html`
   - Portuguese: `http://localhost:8000/port.html`
   - Gallery: `http://localhost:8000/galeria.html`

## Build Process

### 1. Production Build

```bash
# Create optimized production build
npm run build
```

This command:
- Cleans the `./dist` directory
- Optimizes HTML files
- Minifies CSS files
- Minifies JavaScript files
- Copies static assets
- Generates build report

### 2. Verify Build

```bash
# Start production server
npm start

# Open http://localhost:8000 to test
```

### 3. Build Output Structure

```
dist/
├── index.html              # Optimized main page
├── en.html                 # Optimized English page
├── fr.html                 # Optimized French page
├── port.html               # Optimized Portuguese page
├── galeria.html            # Optimized gallery page
├── CSS/
│   ├── styles.css          # Minified main styles
│   ├── normalize.css       # Minified CSS reset
│   └── wa.css             # Minified WhatsApp styles
├── JS/
│   └── main.js            # Minified JavaScript
├── images/                 # Copied images
├── galeria_img/           # Gallery images
└── build-report.json      # Build metrics
```

## Deployment Options

### Option 1: Static Hosting (Recommended)

#### Netlify Deployment

1. **Connect Repository**
   ```bash
   # Push to GitHub if not already done
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Configure Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Custom Domain Setup**
   ```bash
   # Add custom domain in Netlify dashboard
   # Configure DNS records:
   # A record: @ -> Netlify IP
   # CNAME: www -> your-site.netlify.app
   ```

#### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   ```

3. **Configuration** (`vercel.json`)
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": null,
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/$1"
       }
     ],
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-XSS-Protection",
             "value": "1; mode=block"
           }
         ]
       }
     ]
   }
   ```

#### GitHub Pages Deployment

1. **Create GitHub Action** (`.github/workflows/deploy.yml`)
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout
         uses: actions/checkout@v3
         
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18'
           cache: 'npm'
           
       - name: Install dependencies
         run: npm ci
         
       - name: Build
         run: npm run build
         
       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./dist
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Select source: "Deploy from a branch"
   - Select branch: `gh-pages`

### Option 2: Traditional Web Hosting

#### cPanel/Shared Hosting

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Upload Files**
   - Compress `dist` folder contents
   - Upload via FTP/File Manager
   - Extract to public_html directory

3. **Configure .htaccess**
   ```apache
   # Enable compression
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/plain
     AddOutputFilterByType DEFLATE text/html
     AddOutputFilterByType DEFLATE text/xml
     AddOutputFilterByType DEFLATE text/css
     AddOutputFilterByType DEFLATE application/xml
     AddOutputFilterByType DEFLATE application/xhtml+xml
     AddOutputFilterByType DEFLATE application/rss+xml
     AddOutputFilterByType DEFLATE application/javascript
     AddOutputFilterByType DEFLATE application/x-javascript
   </IfModule>
   
   # Set cache headers
   <IfModule mod_expires.c>
     ExpiresActive on
     ExpiresByType text/css "access plus 1 year"
     ExpiresByType application/javascript "access plus 1 year"
     ExpiresByType image/png "access plus 1 year"
     ExpiresByType image/jpg "access plus 1 year"
     ExpiresByType image/jpeg "access plus 1 year"
   </IfModule>
   
   # Security headers
   Header always set X-Content-Type-Options nosniff
   Header always set X-Frame-Options DENY
   Header always set X-XSS-Protection "1; mode=block"
   ```

### Option 3: Docker Deployment

#### Create Dockerfile

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Create nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        # Cache static assets
        location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        # Handle SPA routing
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Security
        location ~ /\. {
            deny all;
        }
    }
}
```

#### Build and Run

```bash
# Build Docker image
docker build -t lafamilia-gastro .

# Run container
docker run -d -p 80:80 --name lafamilia-site lafamilia-gastro

# Or with docker-compose
docker-compose up -d
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

## Environment Configuration

### Environment Variables

Create `.env` file for environment-specific settings:

```bash
# .env
NODE_ENV=production
SITE_URL=https://lafamiliagastro.com
WHATSAPP_NUMBER=1234567890
ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Build Configuration

Update `build.js` for environment-specific builds:

```javascript
const config = {
  sourceDir: './',
  buildDir: process.env.BUILD_DIR || './dist',
  environment: process.env.NODE_ENV || 'development',
  siteUrl: process.env.SITE_URL || 'http://localhost:8000',
  files: {
    html: ['index.html', 'en.html', 'fr.html', 'port.html', 'galeria.html'],
    css: ['CSS/styles.css', 'CSS/normalize.css', 'CSS/wa.css'],
    js: ['JS/main.js']
  }
};
```

### Analytics Configuration

Add Google Analytics to HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Performance Optimization

### Image Optimization

```bash
# Install imagemin globally
npm install -g imagemin-cli

# Optimize images
npm run optimize:images

# Or manually
imagemin images/* --out-dir=images/optimized --plugin=mozjpeg --plugin=pngquant
```

### CDN Configuration

Update HTML to use CDN for external libraries:

```html
<!-- Swiper.js -->
<link rel="stylesheet" 
      href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
      integrity="sha384-..." 
      crossorigin="anonymous">

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        integrity="sha384-..." 
        crossorigin="anonymous"></script>
```

### Service Worker Setup

Create `sw.js` for offline functionality:

```javascript
const CACHE_NAME = 'lafamilia-gastro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/en.html',
  '/fr.html',
  '/port.html',
  '/CSS/styles.css',
  '/CSS/normalize.css',
  '/CSS/wa.css',
  '/JS/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

Register service worker in main JavaScript:

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
```

## Monitoring and Maintenance

### Performance Monitoring

```bash
# Run Lighthouse audit
npm run test:performance

# Run accessibility test
npm run test:accessibility

# Validate code
npm run validate
```

### Automated Testing

Create GitHub Action for continuous testing:

```yaml
name: Quality Assurance

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint HTML
      run: npm run lint:html
      
    - name: Lint CSS
      run: npm run lint:css
      
    - name: Lint JavaScript
      run: npm run lint:js
      
    - name: Test accessibility
      run: npm run test:accessibility
      
    - name: Build
      run: npm run build
```

### Uptime Monitoring

Set up monitoring with services like:
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Performance monitoring
- **Google Search Console**: SEO monitoring

### Backup Strategy

```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/lafamilia-gastro"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup source code
tar -czf $BACKUP_DIR/source_$DATE.tar.gz .

# Backup build
tar -czf $BACKUP_DIR/build_$DATE.tar.gz dist/

echo "Backup completed: $DATE"
```

## Troubleshooting

### Common Issues

#### Build Fails

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version
```

#### Images Not Loading

1. Check file paths in HTML
2. Verify images exist in source directory
3. Check build process copies images correctly
4. Verify server MIME types

#### CSS/JS Not Applied

1. Check file paths in HTML
2. Verify files are minified correctly
3. Check browser cache (hard refresh)
4. Verify server headers

#### Performance Issues

```bash
# Analyze bundle size
npm run build
ls -la dist/

# Check image sizes
find images/ -name "*.jpg" -o -name "*.png" | xargs ls -lh

# Run performance audit
npm run test:performance
```

### Debug Mode

Enable debug logging in build process:

```bash
# Set debug environment
NODE_ENV=development npm run build

# Or add debug flag
DEBUG=true npm run build
```

### Browser Testing

Test across different browsers:

```bash
# Install browser testing tools
npm install -g browser-sync

# Start browser sync
browser-sync start --server dist --files "dist/**/*"
```

### Rollback Procedure

If deployment fails:

1. **Identify last working commit**
   ```bash
   git log --oneline
   ```

2. **Revert to previous version**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Rebuild and redeploy**
   ```bash
   npm run build
   # Follow deployment steps
   ```

### Support Contacts

- **Technical Issues**: tech@lafamiliagastro.com
- **Hosting Provider**: [Provider Support]
- **Domain Registrar**: [Registrar Support]

---

This deployment guide provides comprehensive instructions for deploying the La Familia Gastro S.L. landing page to various hosting environments with proper optimization and monitoring.