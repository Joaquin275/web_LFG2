# La Familia Gastro S.L. - API Documentation

## Overview

This document provides comprehensive documentation for all public APIs, functions, and components in the La Familia Gastro S.L. landing page project. The project is a modern, optimized multilingual website built with HTML5, CSS3, and JavaScript.

## Table of Contents

1. [Build System API](#build-system-api)
2. [Package Scripts](#package-scripts)
3. [HTML Components](#html-components)
4. [CSS Architecture](#css-architecture)
5. [JavaScript APIs](#javascript-apis)
6. [Configuration](#configuration)
7. [Usage Examples](#usage-examples)

---

## Build System API

The build system is implemented in `build.js` and provides utilities for development and production builds.

### Core Classes

#### `Builder`

Main build orchestration class that handles the complete build process.

```javascript
class Builder {
  constructor()
  async build()
  cleanBuildDir()
  async processFiles()
  copyStaticAssets()
  generateReport()
  calculateBuildSize()
}
```

**Constructor**
- **Description**: Initializes the builder with start time tracking
- **Parameters**: None
- **Returns**: Builder instance

**Methods**

##### `async build()`
- **Description**: Executes the complete build process including cleaning, processing files, copying assets, and generating reports
- **Parameters**: None
- **Returns**: Promise\<void>
- **Throws**: Process exits with code 1 on build failure
- **Example**:
```javascript
const builder = new Builder();
await builder.build();
```

##### `cleanBuildDir()`
- **Description**: Removes existing build directory and creates a clean one
- **Parameters**: None
- **Returns**: void
- **Side Effects**: Deletes `./dist` directory and recreates it

##### `async processFiles()`
- **Description**: Processes and optimizes HTML, CSS, and JavaScript files
- **Parameters**: None
- **Returns**: Promise\<void>
- **Process**:
  - Optimizes HTML files using `utils.optimizeHTML()`
  - Minifies CSS files using `utils.minifyCSS()`
  - Minifies JavaScript files using `utils.minifyJS()`

##### `copyStaticAssets()`
- **Description**: Copies static assets (images, directories) to build output
- **Parameters**: None
- **Returns**: void
- **Assets Copied**:
  - `images/` directory
  - `galeria_img/` directory
  - CSS and JS directory structures

##### `generateReport()`
- **Description**: Creates a build report with metrics and file information
- **Parameters**: None
- **Returns**: void
- **Output**: Creates `build-report.json` in build directory
- **Report Structure**:
```json
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "buildTime": 1500,
  "files": {
    "html": 5,
    "css": 3,
    "js": 1
  },
  "totalSize": 2048000
}
```

##### `calculateBuildSize()`
- **Description**: Recursively calculates total size of build directory
- **Parameters**: None
- **Returns**: number (size in bytes)

### Utility Functions

#### `utils` Object

Collection of utility functions for file operations and optimization.

```javascript
const utils = {
  ensureDir(dir),
  copyFile(src, dest),
  copyDir(src, dest),
  minifyCSS(css),
  minifyJS(js),
  optimizeHTML(html)
}
```

##### `ensureDir(dir)`
- **Description**: Creates directory if it doesn't exist
- **Parameters**: 
  - `dir` (string): Directory path to create
- **Returns**: void
- **Example**:
```javascript
utils.ensureDir('./dist/CSS');
```

##### `copyFile(src, dest)`
- **Description**: Copies a single file from source to destination
- **Parameters**:
  - `src` (string): Source file path
  - `dest` (string): Destination file path
- **Returns**: void
- **Side Effects**: Creates destination directory if needed, logs copy operation

##### `copyDir(src, dest)`
- **Description**: Recursively copies directory and all contents
- **Parameters**:
  - `src` (string): Source directory path
  - `dest` (string): Destination directory path
- **Returns**: void
- **Behavior**: Recursively processes subdirectories and files

##### `minifyCSS(css)`
- **Description**: Minifies CSS by removing comments and unnecessary whitespace
- **Parameters**:
  - `css` (string): CSS content to minify
- **Returns**: string (minified CSS)
- **Optimizations**:
  - Removes `/* */` comments
  - Collapses whitespace
  - Removes spaces around `{}:;,`
- **Example**:
```javascript
const minified = utils.minifyCSS(`
  .header {
    background: red; /* Main color */
    padding: 10px;
  }
`);
// Result: ".header{background:red;padding:10px;}"
```

##### `minifyJS(js)`
- **Description**: Minifies JavaScript by removing comments and unnecessary whitespace
- **Parameters**:
  - `js` (string): JavaScript content to minify
- **Returns**: string (minified JavaScript)
- **Optimizations**:
  - Removes `/* */` block comments
  - Removes `//` line comments
  - Collapses whitespace
  - Removes spaces around `{}:;,`

##### `optimizeHTML(html)`
- **Description**: Optimizes HTML by removing unnecessary whitespace
- **Parameters**:
  - `html` (string): HTML content to optimize
- **Returns**: string (optimized HTML)
- **Optimizations**:
  - Collapses whitespace
  - Removes spaces between tags

### CLI Commands

The build system provides a command-line interface with the following commands:

#### `node build.js build`
- **Description**: Builds optimized production files
- **Output**: Creates `./dist` directory with optimized assets
- **Process**: Complete build pipeline execution

#### `node build.js clean`
- **Description**: Cleans the build directory
- **Output**: Removes `./dist` directory
- **Use Case**: Preparing for fresh build

#### `node build.js serve`
- **Description**: Starts development server on port 8000
- **Features**:
  - Serves files from build directory
  - MIME type detection
  - 404 handling
  - Directory access protection
- **URL**: http://localhost:8000
- **Default Route**: `/` serves `/index.html`

### Configuration

#### `config` Object

Build configuration object defining source files and directories.

```javascript
const config = {
  sourceDir: './',
  buildDir: './dist',
  files: {
    html: ['index.html', 'en.html', 'fr.html', 'port.html', 'galeria.html'],
    css: ['CSS/styles.css', 'CSS/normalize.css', 'CSS/wa.css'],
    js: ['JS/main.js']
  }
}
```

**Properties**:
- `sourceDir`: Source directory for input files
- `buildDir`: Output directory for built files
- `files.html`: Array of HTML files to process
- `files.css`: Array of CSS files to minify
- `files.js`: Array of JavaScript files to minify

---

## Package Scripts

The project includes comprehensive npm scripts for development and production workflows.

### Development Scripts

#### `npm start`
- **Command**: `node build.js serve`
- **Description**: Starts production server from build directory
- **Port**: 8000
- **Use Case**: Testing production build locally

#### `npm run dev`
- **Command**: `python -m http.server 8000`
- **Description**: Starts development server for source files
- **Port**: 8000
- **Use Case**: Development with hot reload

#### `npm run serve-python`
- **Command**: `python -m http.server 8000`
- **Description**: Alternative Python-based development server
- **Requirements**: Python 3.x

#### `npm run serve-php`
- **Command**: `php -S localhost:8000`
- **Description**: PHP-based development server
- **Requirements**: PHP CLI

### Build Scripts

#### `npm run build`
- **Command**: `node build.js build`
- **Description**: Creates optimized production build
- **Output**: `./dist` directory with minified assets

#### `npm run clean`
- **Command**: `node build.js clean`
- **Description**: Removes build directory
- **Use Case**: Clean slate before building

### Quality Assurance Scripts

#### `npm run lint:html`
- **Command**: `htmlhint *.html`
- **Description**: Lints HTML files for syntax and best practices
- **Tool**: HTMLHint
- **Scope**: All HTML files in root directory

#### `npm run lint:css`
- **Command**: `stylelint CSS/*.css`
- **Description**: Lints CSS files for syntax and style guide compliance
- **Tool**: Stylelint
- **Scope**: All CSS files in CSS directory

#### `npm run lint:js`
- **Command**: `eslint JS/*.js`
- **Description**: Lints JavaScript files for syntax and code quality
- **Tool**: ESLint
- **Scope**: All JavaScript files in JS directory

#### `npm run validate`
- **Command**: `npm run lint:html && npm run lint:css && npm run lint:js`
- **Description**: Runs all linting tools in sequence
- **Use Case**: Pre-commit validation

### Testing Scripts

#### `npm run test:accessibility`
- **Command**: `pa11y index.html`
- **Description**: Tests accessibility compliance using pa11y
- **Tool**: Pa11y
- **Scope**: Main landing page
- **Standards**: WCAG 2.1 AA

#### `npm run test:performance`
- **Command**: `lighthouse index.html --output=json --output-path=./lighthouse-report.json`
- **Description**: Runs Lighthouse performance audit
- **Tool**: Google Lighthouse
- **Output**: JSON report file
- **Metrics**: Performance, Accessibility, Best Practices, SEO

### Optimization Scripts

#### `npm run optimize:images`
- **Command**: `imagemin images/* --out-dir=images/optimized`
- **Description**: Optimizes images for web delivery
- **Tool**: Imagemin with mozjpeg and pngquant
- **Input**: `images/*`
- **Output**: `images/optimized/`

---

## HTML Components

The project consists of five main HTML pages with shared component architecture.

### Page Structure

#### Main Pages
- `index.html` - Spanish (primary)
- `en.html` - English
- `fr.html` - French  
- `port.html` - Portuguese
- `galeria.html` - Gallery (Spanish)
- `gale_en.html` - Gallery (English)
- `gale_fr.html` - Gallery (French)
- `gale_port.html` - Gallery (Portuguese)

### Common Components

#### Header Component
```html
<header class="header" role="banner">
  <nav class="nav container" role="navigation" aria-label="Navegación principal">
    <!-- Logo, menu toggle, navigation links -->
  </nav>
</header>
```

**Features**:
- Responsive navigation with mobile menu
- Dropdown menus for language and sections
- ARIA accessibility attributes
- Logo with optimized image loading

**CSS Classes**:
- `.header` - Main header container
- `.nav` - Navigation wrapper
- `.nav__logo` - Logo container
- `.nav__menu-toggle` - Mobile menu button
- `.nav__links` - Navigation menu
- `.nav__item` - Menu item
- `.nav__link` - Menu link
- `.nav__dropdown` - Dropdown menu

#### Hero Section
```html
<section id="hero" class="hero" role="banner">
  <div class="swiper hero-swiper">
    <!-- Hero slider content -->
  </div>
</section>
```

**Features**:
- Swiper.js integration for hero slider
- Responsive background images
- Call-to-action buttons
- Accessibility support

#### Service Cards Component
```html
<div class="service-card-3d" data-tilt>
  <div class="service-card-3d__icon">
    <!-- Icon content -->
  </div>
  <h3 class="service-card-3d__title">Service Title</h3>
  <p class="service-card-3d__description">Service description</p>
</div>
```

**Features**:
- 3D tilt effects using Vanilla Tilt
- Hover animations
- Semantic HTML structure
- Responsive design

**CSS Classes**:
- `.service-card-3d` - Main card container
- `.service-card-3d__icon` - Icon container
- `.service-card-3d__title` - Card title
- `.service-card-3d__description` - Card description

#### Footer Component
```html
<footer id="footer" class="footer" role="contentinfo">
  <div class="container">
    <!-- Footer content: contact info, social links, etc. -->
  </div>
</footer>
```

**Features**:
- Contact information
- Social media links
- Company information
- Accessibility compliance

### Meta Tags and SEO

#### Standard Meta Tags
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="description" content="Company description">
<meta name="keywords" content="relevant, keywords">
<meta name="author" content="La Familia Gastro S.L.">
```

#### Open Graph Tags
```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://lafamiliagastro.com/">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="./images/logo.flg.png">
```

#### Twitter Card Tags
```html
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://lafamiliagastro.com/">
<meta property="twitter:title" content="Page Title">
<meta property="twitter:description" content="Page description">
<meta property="twitter:image" content="./images/logo.flg.png">
```

### Accessibility Features

#### ARIA Attributes
- `role` attributes for semantic meaning
- `aria-label` for descriptive labels
- `aria-expanded` for dropdown states
- `aria-hidden` for decorative elements
- `aria-controls` for element relationships

#### Keyboard Navigation
- Skip links for screen readers
- Logical tab order
- Focus management
- Keyboard-accessible dropdowns

#### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- Alternative text for images
- Descriptive link text

---

## CSS Architecture

The project uses a modular CSS architecture with three main stylesheets.

### Stylesheet Structure

#### `CSS/normalize.css`
- **Purpose**: Cross-browser CSS reset and normalization
- **Description**: Modern CSS reset based on normalize.css
- **Usage**: Loaded first to establish consistent baseline

#### `CSS/styles.css`
- **Purpose**: Main application styles
- **Architecture**: CSS custom properties (variables) for design system
- **Features**:
  - Mobile-first responsive design
  - CSS Grid and Flexbox layouts
  - Modern CSS features
  - Performance optimizations

#### `CSS/wa.css`
- **Purpose**: WhatsApp button specific styles
- **Scope**: Floating WhatsApp contact button
- **Features**: Fixed positioning, hover effects, responsive behavior

### CSS Custom Properties (Variables)

Expected CSS variables for consistent design system:

```css
:root {
  /* Colors */
  --primary-color: #b71c1c;
  --secondary-color: #fff;
  --accent-color: #ff5722;
  --text-color: #333;
  --background-color: #fff;
  
  /* Typography */
  --font-family-primary: 'System Font Stack';
  --font-size-base: 1rem;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
  
  /* Breakpoints */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
}
```

### Component Classes

#### Layout Classes
- `.container` - Main content wrapper with max-width
- `.section` - Section wrapper with consistent spacing
- `.grid` - CSS Grid container
- `.flex` - Flexbox container

#### Navigation Classes
- `.nav` - Navigation container
- `.nav__logo` - Logo styling
- `.nav__links` - Menu container
- `.nav__item` - Menu item
- `.nav__link` - Menu link styling
- `.nav__dropdown` - Dropdown menu
- `.nav__menu-toggle` - Mobile menu button

#### Component Classes
- `.hero` - Hero section styling
- `.service-card-3d` - 3D service card component
- `.testimonial` - Testimonial component
- `.footer` - Footer styling
- `.whatsapp-button` - Floating WhatsApp button

#### Utility Classes
- `.sr-only` - Screen reader only content
- `.skip-link` - Skip navigation link
- `.text-center` - Center text alignment
- `.mb-*` - Margin bottom utilities
- `.mt-*` - Margin top utilities

### Responsive Design

#### Mobile-First Approach
```css
/* Mobile styles (default) */
.component {
  /* Mobile styles */
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    /* Tablet styles */
  }
}

/* Desktop and up */
@media (min-width: 992px) {
  .component {
    /* Desktop styles */
  }
}
```

#### Flexible Grid System
- CSS Grid for complex layouts
- Flexbox for component alignment
- Responsive images with `max-width: 100%`
- Fluid typography using `clamp()`

---

## JavaScript APIs

The project uses modern JavaScript with external libraries for enhanced functionality.

### External Libraries

#### Swiper.js
- **Version**: 11.x
- **Purpose**: Hero slider and carousel functionality
- **CDN**: `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js`
- **Documentation**: https://swiperjs.com/

**Basic Usage**:
```javascript
const swiper = new Swiper('.hero-swiper', {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
```

#### GSAP (GreenSock)
- **Version**: 3.12.2
- **Purpose**: Advanced animations and scroll effects
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js`
- **Documentation**: https://greensock.com/docs/

**Basic Usage**:
```javascript
// Fade in animation
gsap.from('.service-card-3d', {
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.2
});

// Scroll-triggered animations
gsap.registerPlugin(ScrollTrigger);
gsap.to('.hero-title', {
  scrollTrigger: '.hero-title',
  scale: 1.1,
  duration: 2
});
```

#### Vanilla Tilt
- **Version**: 1.7.2
- **Purpose**: 3D tilt effects for service cards
- **CDN**: `https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js`
- **Documentation**: https://micku7zu.github.io/vanilla-tilt.js/

**Basic Usage**:
```javascript
VanillaTilt.init(document.querySelectorAll('.service-card-3d'), {
  max: 25,
  speed: 400,
  glare: true,
  'max-glare': 0.5,
});
```

### Custom JavaScript Structure

#### Expected `JS/main.js` Structure

```javascript
/**
 * Main Application JavaScript
 * Handles navigation, animations, and interactive features
 */

class App {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupAnimations();
    this.setupComponents();
    this.setupAccessibility();
  }

  setupNavigation() {
    // Mobile menu toggle
    // Dropdown menus
    // Smooth scrolling
  }

  setupAnimations() {
    // GSAP animations
    // Scroll triggers
    // Page load animations
  }

  setupComponents() {
    // Swiper initialization
    // Vanilla Tilt setup
    // Form handling
  }

  setupAccessibility() {
    // Keyboard navigation
    // Focus management
    // ARIA state updates
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
```

#### Navigation API

```javascript
class Navigation {
  constructor() {
    this.menuToggle = document.getElementById('menu-toggle');
    this.menuClose = document.getElementById('menu-close');
    this.navLinks = document.getElementById('nav-links');
    this.dropdowns = document.querySelectorAll('.nav__item--dropdown');
    
    this.bindEvents();
  }

  bindEvents() {
    this.menuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
    this.menuClose.addEventListener('click', this.closeMobileMenu.bind(this));
    this.dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', this.toggleDropdown.bind(this));
    });
  }

  toggleMobileMenu() {
    // Toggle mobile menu visibility
    // Update ARIA attributes
    // Handle body scroll lock
  }

  closeMobileMenu() {
    // Close mobile menu
    // Reset ARIA attributes
    // Restore body scroll
  }

  toggleDropdown(event) {
    // Toggle dropdown visibility
    // Update ARIA expanded state
    // Handle keyboard navigation
  }
}
```

#### Animation API

```javascript
class Animations {
  constructor() {
    this.setupScrollAnimations();
    this.setupPageLoadAnimations();
  }

  setupScrollAnimations() {
    // Intersection Observer for lazy loading
    // GSAP ScrollTrigger setup
    // Reveal animations on scroll
  }

  setupPageLoadAnimations() {
    // Hero section animations
    // Staggered card animations
    // Loading state handling
  }

  fadeInElements(selector, options = {}) {
    // Utility function for fade-in animations
    return gsap.from(selector, {
      duration: options.duration || 1,
      y: options.y || 50,
      opacity: 0,
      stagger: options.stagger || 0.2,
      ...options
    });
  }
}
```

### Performance Optimizations

#### Lazy Loading
```javascript
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this));
    this.init();
  }

  init() {
    this.images.forEach(img => this.observer.observe(img));
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadImage(img) {
    img.src = img.dataset.src;
    img.classList.add('loaded');
  }
}
```

#### Core Web Vitals Tracking
```javascript
class PerformanceMonitor {
  constructor() {
    this.trackCoreWebVitals();
  }

  trackCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('FID:', entry.processingStart - entry.startTime);
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log('CLS:', clsValue);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
}
```

---

## Configuration

### Build Configuration

The build system can be configured by modifying the `config` object in `build.js`:

```javascript
const config = {
  sourceDir: './',           // Source files directory
  buildDir: './dist',        // Build output directory
  files: {
    html: [                  // HTML files to process
      'index.html',
      'en.html',
      'fr.html',
      'port.html',
      'galeria.html'
    ],
    css: [                   // CSS files to minify
      'CSS/styles.css',
      'CSS/normalize.css',
      'CSS/wa.css'
    ],
    js: [                    // JavaScript files to minify
      'JS/main.js'
    ]
  }
};
```

### Package Configuration

#### Browser Support
```json
{
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "not ie 11"
  ]
}
```

#### Git Hooks (Husky)
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run validate",
      "pre-push": "npm run test:performance"
    }
  }
}
```

#### Engine Requirements
```json
{
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```

---

## Usage Examples

### Development Workflow

#### 1. Setup and Installation
```bash
# Clone repository
git clone https://github.com/lafamiliagastro/landing-page.git
cd landing-page

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 2. Development Process
```bash
# Lint code before committing
npm run validate

# Test accessibility
npm run test:accessibility

# Run performance audit
npm run test:performance

# Optimize images
npm run optimize:images
```

#### 3. Production Build
```bash
# Create production build
npm run build

# Test production build
npm start

# Clean build directory
npm run clean
```

### Customization Examples

#### Adding New Pages
1. Create new HTML file following existing structure
2. Add to `config.files.html` array in `build.js`
3. Update navigation menus in all pages
4. Test build process

#### Adding New Components
1. Create HTML structure with proper ARIA attributes
2. Add CSS classes following BEM methodology
3. Implement JavaScript functionality if needed
4. Test across all supported browsers

#### Modifying Animations
```javascript
// Custom GSAP animation
gsap.timeline()
  .from('.new-component', {
    duration: 1,
    y: 100,
    opacity: 0
  })
  .to('.new-component', {
    duration: 0.5,
    scale: 1.05
  });
```

#### Adding New Translations
1. Duplicate existing page (e.g., `index.html`)
2. Translate all text content
3. Update `lang` attribute in `<html>` tag
4. Add to navigation dropdowns
5. Update meta tags and titles

### Integration Examples

#### Adding Contact Forms
```html
<form class="contact-form" action="#" method="post">
  <div class="form-group">
    <label for="name">Nombre</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div class="form-group">
    <label for="message">Mensaje</label>
    <textarea id="message" name="message" required></textarea>
  </div>
  <button type="submit" class="btn btn--primary">Enviar</button>
</form>
```

#### Adding Analytics
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

#### Adding Service Worker
```javascript
// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
```

---

## Error Handling and Debugging

### Build System Errors

#### Common Issues
1. **Missing Files**: Ensure all files in `config.files` exist
2. **Permission Errors**: Check file/directory permissions
3. **Disk Space**: Ensure sufficient space for build output
4. **Node Version**: Verify Node.js version meets requirements

#### Debug Mode
```javascript
// Add debug logging to build.js
const DEBUG = process.env.NODE_ENV === 'development';

function debugLog(message, data) {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`, data || '');
  }
}
```

### Performance Monitoring

#### Lighthouse CI Integration
```bash
# Run Lighthouse CI for continuous performance monitoring
npm install -g @lhci/cli
lhci autorun
```

#### Custom Performance Metrics
```javascript
// Track custom performance metrics
function trackCustomMetric(name, value) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'timing_complete', {
      name: name,
      value: Math.round(value)
    });
  }
}
```

---

This documentation provides comprehensive coverage of all public APIs, functions, and components in the La Familia Gastro S.L. landing page project. For additional support or questions, please refer to the project repository or contact the development team.