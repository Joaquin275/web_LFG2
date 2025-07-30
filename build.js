#!/usr/bin/env node

/**
 * Build Script for La Familia Gastro S.L.
 * Production optimization and asset processing
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  sourceDir: './',
  buildDir: './dist',
  files: {
    html: ['index.html', 'en.html', 'fr.html', 'port.html', 'galeria.html'],
    css: ['CSS/styles.css', 'CSS/normalize.css', 'CSS/wa.css'],
    js: ['JS/main.js']
  }
};

// Utility functions
const utils = {
  ensureDir(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  },

  copyFile(src, dest) {
    const destDir = path.dirname(dest);
    utils.ensureDir(destDir);
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied: ${src} → ${dest}`);
  },

  copyDir(src, dest) {
    utils.ensureDir(dest);
    const items = fs.readdirSync(src);
    
    items.forEach(item => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        utils.copyDir(srcPath, destPath);
      } else {
        utils.copyFile(srcPath, destPath);
      }
    });
  },

  minifyCSS(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*{\s*/g, '{') // Remove spaces around braces
      .replace(/\s*}\s*/g, '}') // Remove spaces around braces
      .replace(/\s*:\s*/g, ':') // Remove spaces around colons
      .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
      .replace(/\s*,\s*/g, ',') // Remove spaces around commas
      .trim();
  },

  minifyJS(js) {
    return js
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*$/gm, '') // Remove line comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*{\s*/g, '{') // Remove spaces around braces
      .replace(/\s*}\s*/g, '}') // Remove spaces around braces
      .replace(/\s*:\s*/g, ':') // Remove spaces around colons
      .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
      .replace(/\s*,\s*/g, ',') // Remove spaces around commas
      .trim();
  },

  optimizeHTML(html) {
    return html
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/>\s+</g, '><') // Remove spaces between tags
      .trim();
  }
};

// Build process
class Builder {
  constructor() {
    this.startTime = Date.now();
  }

  async build() {
    console.log('🚀 Starting build process...\n');
    
    try {
      // Clean build directory
      this.cleanBuildDir();
      
      // Copy and optimize files
      await this.processFiles();
      
      // Copy static assets
      this.copyStaticAssets();
      
      // Generate build report
      this.generateReport();
      
      console.log('\n✅ Build completed successfully!');
      console.log(`⏱️  Build time: ${Date.now() - this.startTime}ms`);
      
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  }

  cleanBuildDir() {
    if (fs.existsSync(config.buildDir)) {
      fs.rmSync(config.buildDir, { recursive: true, force: true });
    }
    utils.ensureDir(config.buildDir);
    console.log('🧹 Cleaned build directory');
  }

  async processFiles() {
    // Process HTML files
    for (const htmlFile of config.files.html) {
      if (fs.existsSync(htmlFile)) {
        const content = fs.readFileSync(htmlFile, 'utf8');
        const optimized = utils.optimizeHTML(content);
        const destPath = path.join(config.buildDir, htmlFile);
        utils.ensureDir(path.dirname(destPath));
        fs.writeFileSync(destPath, optimized);
        console.log(`✓ Processed HTML: ${htmlFile}`);
      }
    }

    // Process CSS files
    for (const cssFile of config.files.css) {
      if (fs.existsSync(cssFile)) {
        const content = fs.readFileSync(cssFile, 'utf8');
        const minified = utils.minifyCSS(content);
        const destPath = path.join(config.buildDir, cssFile);
        utils.ensureDir(path.dirname(destPath));
        fs.writeFileSync(destPath, minified);
        console.log(`✓ Minified CSS: ${cssFile}`);
      }
    }

    // Process JS files
    for (const jsFile of config.files.js) {
      if (fs.existsSync(jsFile)) {
        const content = fs.readFileSync(jsFile, 'utf8');
        const minified = utils.minifyJS(content);
        const destPath = path.join(config.buildDir, jsFile);
        utils.ensureDir(path.dirname(destPath));
        fs.writeFileSync(destPath, minified);
        console.log(`✓ Minified JS: ${jsFile}`);
      }
    }
  }

  copyStaticAssets() {
    // Copy images directory
    if (fs.existsSync('images')) {
      utils.copyDir('images', path.join(config.buildDir, 'images'));
    }

    // Copy gallery images
    if (fs.existsSync('galeria_img')) {
      utils.copyDir('galeria_img', path.join(config.buildDir, 'galeria_img'));
    }

    // Copy CSS directory structure
    utils.ensureDir(path.join(config.buildDir, 'CSS'));
    utils.ensureDir(path.join(config.buildDir, 'JS'));
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      buildTime: Date.now() - this.startTime,
      files: {
        html: config.files.html.length,
        css: config.files.css.length,
        js: config.files.js.length
      },
      totalSize: this.calculateBuildSize()
    };

    const reportPath = path.join(config.buildDir, 'build-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log('📊 Generated build report');
  }

  calculateBuildSize() {
    let totalSize = 0;
    
    const calculateDirSize = (dir) => {
      if (!fs.existsSync(dir)) return 0;
      
      const items = fs.readdirSync(dir);
      let size = 0;
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          size += calculateDirSize(itemPath);
        } else {
          size += stat.size;
        }
      });
      
      return size;
    };

    totalSize = calculateDirSize(config.buildDir);
    return totalSize;
  }
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'build':
    new Builder().build();
    break;
    
  case 'clean':
    if (fs.existsSync(config.buildDir)) {
      fs.rmSync(config.buildDir, { recursive: true, force: true });
      console.log('🧹 Cleaned build directory');
    }
    break;
    
  case 'serve':
    console.log('🌐 Starting development server...');
    console.log('📁 Serving files from:', config.buildDir);
    console.log('🔗 Open http://localhost:8000 in your browser');
    console.log('⏹️  Press Ctrl+C to stop');
    
    // Simple HTTP server
    const http = require('http');
    const url = require('url');
    const mime = require('mime-types');
    
    const server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url);
      let pathname = parsedUrl.pathname;
      
      if (pathname === '/') {
        pathname = '/index.html';
      }
      
      const filePath = path.join(config.buildDir, pathname);
      
      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          res.writeHead(403);
          res.end('Directory access not allowed');
          return;
        }
        
        const contentType = mime.lookup(filePath) || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(fs.readFileSync(filePath));
      } else {
        res.writeHead(404);
        res.end('File not found');
      }
    });
    
    server.listen(8000, () => {
      console.log('🚀 Server running on http://localhost:8000');
    });
    break;
    
  default:
    console.log(`
🔧 La Familia Gastro S.L. - Build Tool

Usage:
  node build.js <command>

Commands:
  build    Build optimized production files
  clean    Clean build directory
  serve    Start development server

Examples:
  node build.js build
  node build.js clean
  node build.js serve
    `);
    break;
} 