# Component Implementation Guide

## Overview

This guide provides detailed implementation examples and usage patterns for all HTML components in the La Familia Gastro S.L. landing page project.

## Navigation Component

### Implementation

```html
<header class="header" role="banner">
  <nav class="nav container" role="navigation" aria-label="Navegación principal">
    <div class="nav__logo">
      <a href="#hero" aria-label="Ir al inicio">
        <img class="nav__logo-img" 
             src="./images/Imagen1-removebg-preview.png" 
             alt="La Familia Gastro S.L. Logo" 
             width="60" 
             height="60">
      </a>
    </div>
    
    <!-- Mobile menu button -->
    <button class="nav__menu-toggle" 
            id="menu-toggle" 
            aria-label="Abrir menú" 
            aria-expanded="false" 
            aria-controls="nav-links">
      <span class="hamburger" aria-hidden="true"></span>
    </button>
    
    <!-- Navigation menu -->
    <ul class="nav__links" id="nav-links" role="menubar">
      <li class="nav__item" role="none">
        <button class="nav__close" 
                id="menu-close" 
                aria-label="Cerrar menú" 
                aria-hidden="true">&times;</button>
      </li>
      <li class="nav__item" role="none">
        <a href="#hero" class="nav__link" role="menuitem">Inicio</a>
      </li>
      <li class="nav__item nav__item--dropdown" role="none">
        <button class="nav__link nav__link--dropdown" 
                role="menuitem" 
                aria-haspopup="true" 
                aria-expanded="false">
          Quiénes Somos <span class="dropdown-arrow" aria-hidden="true">▾</span>
        </button>
        <ul class="nav__dropdown" role="menu">
          <li role="none">
            <a href="#about" class="nav__dropdown-link" role="menuitem">Quiénes somos</a>
          </li>
          <li role="none">
            <a href="./galeria.html" class="nav__dropdown-link" role="menuitem">Galería</a>
          </li>
        </ul>
      </li>
      <li class="nav__item" role="none">
        <a href="#footer" class="nav__link" role="menuitem">Contacto</a>
      </li>
      <li class="nav__item nav__item--dropdown" role="none">
        <button class="nav__link nav__link--dropdown" 
                role="menuitem" 
                aria-haspopup="true" 
                aria-expanded="false">
          Idioma <span class="dropdown-arrow" aria-hidden="true">▾</span>
        </button>
        <ul class="nav__dropdown" role="menu">
          <li role="none">
            <a href="./en.html" class="nav__dropdown-link" role="menuitem">English</a>
          </li>
          <li role="none">
            <a href="./port.html" class="nav__dropdown-link" role="menuitem">Portugués</a>
          </li>
          <li role="none">
            <a href="./fr.html" class="nav__dropdown-link" role="menuitem">Francés</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</header>
```

### CSS Classes

| Class | Purpose | Usage |
|-------|---------|-------|
| `.header` | Main header container | Apply to `<header>` element |
| `.nav` | Navigation wrapper | Apply to `<nav>` element |
| `.nav__logo` | Logo container | Wrapper for logo link and image |
| `.nav__logo-img` | Logo image styling | Apply to logo `<img>` |
| `.nav__menu-toggle` | Mobile menu button | Hamburger menu button |
| `.nav__links` | Navigation menu container | Main menu `<ul>` |
| `.nav__item` | Individual menu item | Each `<li>` in menu |
| `.nav__link` | Menu link styling | Links and buttons in menu |
| `.nav__item--dropdown` | Dropdown menu item | Items with submenus |
| `.nav__link--dropdown` | Dropdown trigger | Button that opens submenu |
| `.nav__dropdown` | Dropdown submenu | Submenu `<ul>` |
| `.nav__dropdown-link` | Dropdown link | Links within submenu |
| `.nav__close` | Mobile menu close | Close button for mobile |

### JavaScript Integration

```javascript
class Navigation {
  constructor() {
    this.menuToggle = document.getElementById('menu-toggle');
    this.menuClose = document.getElementById('menu-close');
    this.navLinks = document.getElementById('nav-links');
    this.dropdowns = document.querySelectorAll('.nav__item--dropdown');
    this.isMenuOpen = false;
    
    this.bindEvents();
  }

  bindEvents() {
    this.menuToggle?.addEventListener('click', this.toggleMobileMenu.bind(this));
    this.menuClose?.addEventListener('click', this.closeMobileMenu.bind(this));
    
    this.dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('.nav__link--dropdown');
      button?.addEventListener('click', this.toggleDropdown.bind(this));
    });

    // Close menu when clicking outside
    document.addEventListener('click', this.handleOutsideClick.bind(this));
    
    // Handle escape key
    document.addEventListener('keydown', this.handleEscapeKey.bind(this));
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    this.navLinks.classList.toggle('nav__links--open', this.isMenuOpen);
    this.menuToggle.setAttribute('aria-expanded', this.isMenuOpen.toString());
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.navLinks.classList.remove('nav__links--open');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleDropdown(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const dropdown = button.parentElement;
    const submenu = dropdown.querySelector('.nav__dropdown');
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    
    // Close all other dropdowns
    this.closeAllDropdowns();
    
    if (!isOpen) {
      button.setAttribute('aria-expanded', 'true');
      submenu.classList.add('nav__dropdown--open');
    }
  }

  closeAllDropdowns() {
    this.dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('.nav__link--dropdown');
      const submenu = dropdown.querySelector('.nav__dropdown');
      
      button.setAttribute('aria-expanded', 'false');
      submenu.classList.remove('nav__dropdown--open');
    });
  }

  handleOutsideClick(event) {
    if (!event.target.closest('.nav')) {
      this.closeMobileMenu();
      this.closeAllDropdowns();
    }
  }

  handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this.closeMobileMenu();
      this.closeAllDropdowns();
    }
  }
}
```

## Hero Section Component

### Implementation

```html
<section id="hero" class="hero" role="banner">
  <div class="swiper hero-swiper">
    <div class="swiper-wrapper">
      <!-- Slide 1 -->
      <div class="swiper-slide hero-slide">
        <div class="hero-slide__background">
          <img src="./images/hero-bg-1.jpg" 
               alt="" 
               class="hero-slide__bg-image"
               loading="eager">
        </div>
        <div class="hero-slide__content">
          <div class="container">
            <h1 class="hero-slide__title">
              Gastronomía Gallega de Excelencia
            </h1>
            <p class="hero-slide__description">
              Comidas preparadas frescas con tecnología y tradición
            </p>
            <div class="hero-slide__actions">
              <a href="#services" class="btn btn--primary">
                Descubre Nuestros Servicios
              </a>
              <a href="#contact" class="btn btn--secondary">
                Contacta Con Nosotros
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Slide 2 -->
      <div class="swiper-slide hero-slide">
        <div class="hero-slide__background">
          <img src="./images/hero-bg-2.jpg" 
               alt="" 
               class="hero-slide__bg-image"
               loading="lazy">
        </div>
        <div class="hero-slide__content">
          <div class="container">
            <h1 class="hero-slide__title">
              Innovación en Cada Plato
            </h1>
            <p class="hero-slide__description">
              Tecnología avanzada al servicio de la tradición culinaria
            </p>
            <div class="hero-slide__actions">
              <a href="#about" class="btn btn--primary">
                Conoce Nuestra Historia
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Navigation -->
    <div class="swiper-pagination hero-pagination"></div>
    <div class="swiper-button-next hero-button-next"></div>
    <div class="swiper-button-prev hero-button-prev"></div>
  </div>
</section>
```

### CSS Classes

| Class | Purpose | Usage |
|-------|---------|-------|
| `.hero` | Main hero section | Apply to section element |
| `.hero-swiper` | Swiper container | Swiper.js wrapper |
| `.hero-slide` | Individual slide | Each slide in carousel |
| `.hero-slide__background` | Background container | Image background wrapper |
| `.hero-slide__bg-image` | Background image | Hero background images |
| `.hero-slide__content` | Content overlay | Text and buttons overlay |
| `.hero-slide__title` | Main heading | Primary hero text |
| `.hero-slide__description` | Subtitle text | Secondary hero text |
| `.hero-slide__actions` | Button container | Action buttons wrapper |
| `.hero-pagination` | Pagination dots | Swiper pagination |
| `.hero-button-next` | Next button | Swiper next navigation |
| `.hero-button-prev` | Previous button | Swiper prev navigation |

### JavaScript Integration

```javascript
class HeroSlider {
  constructor() {
    this.swiperElement = document.querySelector('.hero-swiper');
    this.swiper = null;
    
    this.init();
  }

  init() {
    if (!this.swiperElement) return;

    this.swiper = new Swiper('.hero-swiper', {
      // Basic settings
      loop: true,
      speed: 800,
      effect: 'fade',
      
      // Autoplay
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      
      // Pagination
      pagination: {
        el: '.hero-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}">
                    <span class="sr-only">Ir a slide ${index + 1}</span>
                  </span>`;
        },
      },
      
      // Navigation
      navigation: {
        nextEl: '.hero-button-next',
        prevEl: '.hero-button-prev',
      },
      
      // Keyboard control
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      
      // Accessibility
      a11y: {
        prevSlideMessage: 'Slide anterior',
        nextSlideMessage: 'Siguiente slide',
        paginationBulletMessage: 'Ir a slide {{index}}',
      },
      
      // Events
      on: {
        init: this.onInit.bind(this),
        slideChange: this.onSlideChange.bind(this),
      },
    });
  }

  onInit() {
    // Add ARIA labels
    this.addAccessibilityAttributes();
    
    // Preload next slide images
    this.preloadImages();
  }

  onSlideChange() {
    // Track slide changes for analytics
    this.trackSlideChange();
    
    // Update ARIA live region
    this.updateLiveRegion();
  }

  addAccessibilityAttributes() {
    const slides = this.swiperElement.querySelectorAll('.swiper-slide');
    slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', `Slide ${index + 1} de ${slides.length}`);
    });
  }

  preloadImages() {
    const images = this.swiperElement.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      const imageLoader = new Image();
      imageLoader.src = img.src;
    });
  }

  trackSlideChange() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'hero_slide_change', {
        slide_index: this.swiper.activeIndex,
      });
    }
  }

  updateLiveRegion() {
    const activeSlide = this.swiper.slides[this.swiper.activeIndex];
    const title = activeSlide.querySelector('.hero-slide__title')?.textContent;
    
    // Create or update live region for screen readers
    let liveRegion = document.getElementById('hero-live-region');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'hero-live-region';
      liveRegion.className = 'sr-only';
      liveRegion.setAttribute('aria-live', 'polite');
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = `Slide actual: ${title}`;
  }

  destroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }
}
```

## Service Cards Component

### Implementation

```html
<section class="services" id="services">
  <div class="container">
    <header class="section-header">
      <h2 class="section-title">Nuestros Servicios</h2>
      <p class="section-description">
        Soluciones gastronómicas integrales para empresas, retail y hostelería
      </p>
    </header>
    
    <div class="services-grid">
      <!-- Service Card 1 -->
      <article class="service-card-3d" data-tilt>
        <div class="service-card-3d__icon">
          <img src="./images/icons/empresas.svg" 
               alt="" 
               aria-hidden="true"
               width="64" 
               height="64">
        </div>
        <h3 class="service-card-3d__title">Empresas</h3>
        <p class="service-card-3d__description">
          Menús ejecutivos y catering corporativo diseñados para satisfacer 
          las necesidades nutricionales de equipos de trabajo.
        </p>
        <div class="service-card-3d__features">
          <ul class="feature-list">
            <li>Menús personalizados</li>
            <li>Entrega diaria</li>
            <li>Opciones saludables</li>
            <li>Precios competitivos</li>
          </ul>
        </div>
        <div class="service-card-3d__action">
          <a href="#contact" class="btn btn--outline">
            Solicitar Información
          </a>
        </div>
      </article>
      
      <!-- Service Card 2 -->
      <article class="service-card-3d" data-tilt>
        <div class="service-card-3d__icon">
          <img src="./images/icons/retail.svg" 
               alt="" 
               aria-hidden="true"
               width="64" 
               height="64">
        </div>
        <h3 class="service-card-3d__title">Retail</h3>
        <p class="service-card-3d__description">
          Productos listos para la venta en supermercados y tiendas 
          especializadas con la máxima calidad y frescura.
        </p>
        <div class="service-card-3d__features">
          <ul class="feature-list">
            <li>Envasado al vacío</li>
            <li>Larga vida útil</li>
            <li>Etiquetado completo</li>
            <li>Distribución nacional</li>
          </ul>
        </div>
        <div class="service-card-3d__action">
          <a href="#contact" class="btn btn--outline">
            Ser Distribuidor
          </a>
        </div>
      </article>
      
      <!-- Service Card 3 -->
      <article class="service-card-3d" data-tilt>
        <div class="service-card-3d__icon">
          <img src="./images/icons/hosteleria.svg" 
               alt="" 
               aria-hidden="true"
               width="64" 
               height="64">
        </div>
        <h3 class="service-card-3d__title">Hostelería</h3>
        <p class="service-card-3d__description">
          Soluciones para restaurantes, hoteles y establecimientos 
          hosteleros que buscan calidad y eficiencia.
        </p>
        <div class="service-card-3d__features">
          <ul class="feature-list">
            <li>Productos premium</li>
            <li>Asesoramiento técnico</li>
            <li>Formación especializada</li>
            <li>Soporte continuo</li>
          </ul>
        </div>
        <div class="service-card-3d__action">
          <a href="#contact" class="btn btn--outline">
            Colaborar
          </a>
        </div>
      </article>
    </div>
  </div>
</section>
```

### CSS Classes

| Class | Purpose | Usage |
|-------|---------|-------|
| `.services` | Main services section | Section wrapper |
| `.services-grid` | Grid container | CSS Grid layout |
| `.service-card-3d` | Individual service card | Card component |
| `.service-card-3d__icon` | Icon container | Icon wrapper |
| `.service-card-3d__title` | Card title | Service name |
| `.service-card-3d__description` | Card description | Service details |
| `.service-card-3d__features` | Features list container | Features wrapper |
| `.service-card-3d__action` | Action button container | CTA wrapper |
| `.feature-list` | Features list styling | Bulleted list |
| `.section-header` | Section header | Title and description |
| `.section-title` | Section main title | H2 styling |
| `.section-description` | Section subtitle | Description text |

### JavaScript Integration

```javascript
class ServiceCards {
  constructor() {
    this.cards = document.querySelectorAll('.service-card-3d');
    this.observer = null;
    
    this.init();
  }

  init() {
    this.setupTiltEffect();
    this.setupIntersectionObserver();
    this.setupAnalytics();
  }

  setupTiltEffect() {
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(this.cards, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.05,
        transition: true,
        'mouse-event-element': null,
        'reset-to-start': false,
        'gyroscope-min-angle-x': -45,
        'gyroscope-max-angle-x': 45,
        'gyroscope-min-angle-y': -45,
        'gyroscope-max-angle-y': 45,
      });
    }
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCard(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.cards.forEach(card => {
      this.observer.observe(card);
    });
  }

  animateCard(card) {
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(card, 
        {
          y: 50,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    } else {
      // Fallback CSS animation
      card.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }
  }

  setupAnalytics() {
    this.cards.forEach((card, index) => {
      const button = card.querySelector('.btn');
      const title = card.querySelector('.service-card-3d__title')?.textContent;
      
      button?.addEventListener('click', () => {
        this.trackCardClick(title, index);
      });
    });
  }

  trackCardClick(serviceName, index) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'service_card_click', {
        service_name: serviceName,
        card_position: index + 1,
      });
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Destroy tilt effect
    this.cards.forEach(card => {
      if (card.vanillaTilt) {
        card.vanillaTilt.destroy();
      }
    });
  }
}
```

## Footer Component

### Implementation

```html
<footer id="footer" class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__content">
      <!-- Company Info -->
      <div class="footer__section footer__section--company">
        <div class="footer__logo">
          <img src="./images/logo-white.png" 
               alt="La Familia Gastro S.L." 
               width="120" 
               height="40">
        </div>
        <p class="footer__description">
          Empresa gallega especializada en soluciones gastronómicas 
          para empresas, retail y hostelería.
        </p>
        <div class="footer__social">
          <a href="https://facebook.com/lafamiliagastro" 
             class="social-link" 
             aria-label="Síguenos en Facebook"
             target="_blank" 
             rel="noopener noreferrer">
            <svg class="social-icon" aria-hidden="true">
              <use href="#icon-facebook"></use>
            </svg>
          </a>
          <a href="https://instagram.com/lafamiliagastro" 
             class="social-link" 
             aria-label="Síguenos en Instagram"
             target="_blank" 
             rel="noopener noreferrer">
            <svg class="social-icon" aria-hidden="true">
              <use href="#icon-instagram"></use>
            </svg>
          </a>
          <a href="https://linkedin.com/company/lafamiliagastro" 
             class="social-link" 
             aria-label="Síguenos en LinkedIn"
             target="_blank" 
             rel="noopener noreferrer">
            <svg class="social-icon" aria-hidden="true">
              <use href="#icon-linkedin"></use>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- Quick Links -->
      <div class="footer__section footer__section--links">
        <h3 class="footer__title">Enlaces Rápidos</h3>
        <nav class="footer__nav" aria-label="Enlaces del pie de página">
          <ul class="footer__nav-list">
            <li><a href="#hero" class="footer__link">Inicio</a></li>
            <li><a href="#about" class="footer__link">Quiénes Somos</a></li>
            <li><a href="#services" class="footer__link">Servicios</a></li>
            <li><a href="./galeria.html" class="footer__link">Galería</a></li>
            <li><a href="#contact" class="footer__link">Contacto</a></li>
          </ul>
        </nav>
      </div>
      
      <!-- Services -->
      <div class="footer__section footer__section--services">
        <h3 class="footer__title">Nuestros Servicios</h3>
        <ul class="footer__services-list">
          <li>Catering Empresarial</li>
          <li>Productos Retail</li>
          <li>Soluciones Hostelería</li>
          <li>Consultoría Gastronómica</li>
          <li>Formación Especializada</li>
        </ul>
      </div>
      
      <!-- Contact Info -->
      <div class="footer__section footer__section--contact">
        <h3 class="footer__title">Contacto</h3>
        <address class="footer__contact">
          <div class="contact-item">
            <svg class="contact-icon" aria-hidden="true">
              <use href="#icon-location"></use>
            </svg>
            <span>Rúa Exemplo, 123<br>15001 A Coruña, Galicia</span>
          </div>
          <div class="contact-item">
            <svg class="contact-icon" aria-hidden="true">
              <use href="#icon-phone"></use>
            </svg>
            <a href="tel:+34981123456" class="contact-link">+34 981 123 456</a>
          </div>
          <div class="contact-item">
            <svg class="contact-icon" aria-hidden="true">
              <use href="#icon-email"></use>
            </svg>
            <a href="mailto:info@lafamiliagastro.com" class="contact-link">
              info@lafamiliagastro.com
            </a>
          </div>
        </address>
      </div>
    </div>
    
    <!-- Footer Bottom -->
    <div class="footer__bottom">
      <div class="footer__legal">
        <p>&copy; 2024 La Familia Gastro S.L. Todos los derechos reservados.</p>
        <nav class="legal-nav" aria-label="Enlaces legales">
          <a href="/privacy" class="legal-link">Política de Privacidad</a>
          <a href="/terms" class="legal-link">Términos de Uso</a>
          <a href="/cookies" class="legal-link">Política de Cookies</a>
        </nav>
      </div>
    </div>
  </div>
</footer>
```

### CSS Classes

| Class | Purpose | Usage |
|-------|---------|-------|
| `.footer` | Main footer container | Footer element |
| `.footer__content` | Main content grid | Content wrapper |
| `.footer__section` | Footer column | Each section |
| `.footer__section--company` | Company info section | Modifier class |
| `.footer__section--links` | Quick links section | Modifier class |
| `.footer__section--services` | Services section | Modifier class |
| `.footer__section--contact` | Contact section | Modifier class |
| `.footer__logo` | Footer logo | Logo container |
| `.footer__description` | Company description | About text |
| `.footer__social` | Social media links | Social container |
| `.footer__title` | Section headings | H3 titles |
| `.footer__nav` | Navigation wrapper | Nav element |
| `.footer__nav-list` | Navigation list | Menu list |
| `.footer__link` | Footer links | Navigation links |
| `.footer__contact` | Contact information | Address element |
| `.footer__bottom` | Bottom section | Legal info |
| `.footer__legal` | Legal text and links | Copyright area |
| `.social-link` | Social media link | Individual social link |
| `.social-icon` | Social media icon | SVG icons |
| `.contact-item` | Contact info item | Address item |
| `.contact-icon` | Contact icon | Contact SVG |
| `.contact-link` | Contact link | Phone/email links |
| `.legal-nav` | Legal navigation | Legal links nav |
| `.legal-link` | Legal page links | Privacy, terms, etc. |

## WhatsApp Button Component

### Implementation

```html
<a href="https://wa.me/1234567890" 
   target="_blank" 
   rel="noopener noreferrer" 
   class="whatsapp-button" 
   aria-label="Contactar por WhatsApp">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
       alt="" 
       aria-hidden="true"
       width="24" 
       height="24">
  <span class="whatsapp-button__text">WhatsApp</span>
</a>
```

### CSS Classes

| Class | Purpose | Usage |
|-------|---------|-------|
| `.whatsapp-button` | Main button styling | Fixed position button |
| `.whatsapp-button__text` | Button text | Optional text label |

### JavaScript Integration

```javascript
class WhatsAppButton {
  constructor() {
    this.button = document.querySelector('.whatsapp-button');
    this.phoneNumber = '1234567890'; // Replace with actual number
    
    this.init();
  }

  init() {
    if (!this.button) return;
    
    this.setupDynamicLink();
    this.setupAnalytics();
    this.setupVisibility();
  }

  setupDynamicLink() {
    // Update href with custom message
    const message = encodeURIComponent(
      'Hola, me gustaría obtener más información sobre sus servicios.'
    );
    this.button.href = `https://wa.me/${this.phoneNumber}?text=${message}`;
  }

  setupAnalytics() {
    this.button.addEventListener('click', () => {
      this.trackWhatsAppClick();
    });
  }

  setupVisibility() {
    // Show/hide button based on scroll position
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 300) {
        this.button.classList.add('whatsapp-button--visible');
      } else {
        this.button.classList.remove('whatsapp-button--visible');
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 500) {
        this.button.classList.add('whatsapp-button--hidden');
      } else {
        this.button.classList.remove('whatsapp-button--hidden');
      }
      
      lastScrollY = currentScrollY;
    });
  }

  trackWhatsAppClick() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_click', {
        event_category: 'Contact',
        event_label: 'WhatsApp Button',
      });
    }
  }
}
```

## Accessibility Features

### Skip Links

```html
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>
```

### ARIA Live Regions

```html
<div id="announcements" 
     class="sr-only" 
     aria-live="polite" 
     aria-atomic="true">
</div>
```

### Focus Management

```javascript
class FocusManager {
  constructor() {
    this.focusableElements = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
  }

  trapFocus(container) {
    const focusable = container.querySelectorAll(this.focusableElements);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  setFocusToElement(element) {
    element.focus();
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
```

## Performance Optimizations

### Lazy Loading Implementation

```javascript
class LazyLoader {
  constructor() {
    this.imageObserver = null;
    this.images = document.querySelectorAll('img[data-src]');
    
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver(
        this.handleImageIntersection.bind(this),
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );

      this.images.forEach(img => {
        this.imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers
      this.loadAllImages();
    }
  }

  handleImageIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.imageObserver.unobserve(entry.target);
      }
    });
  }

  loadImage(img) {
    img.src = img.dataset.src;
    img.classList.add('loaded');
    
    img.addEventListener('load', () => {
      img.classList.add('fade-in');
    });
  }

  loadAllImages() {
    this.images.forEach(img => {
      this.loadImage(img);
    });
  }
}
```

## Error Handling

### Graceful Degradation

```javascript
class ComponentLoader {
  constructor() {
    this.components = new Map();
  }

  register(name, ComponentClass, dependencies = []) {
    this.components.set(name, {
      ComponentClass,
      dependencies,
      instance: null,
      loaded: false
    });
  }

  async load(name) {
    const component = this.components.get(name);
    if (!component || component.loaded) return;

    try {
      // Check dependencies
      const dependenciesLoaded = component.dependencies.every(dep => 
        window[dep] !== undefined
      );

      if (!dependenciesLoaded) {
        console.warn(`Dependencies not loaded for ${name}`);
        return;
      }

      // Initialize component
      component.instance = new component.ComponentClass();
      component.loaded = true;
      
      console.log(`Component ${name} loaded successfully`);
    } catch (error) {
      console.error(`Failed to load component ${name}:`, error);
    }
  }

  loadAll() {
    this.components.forEach((component, name) => {
      this.load(name);
    });
  }
}

// Usage
const loader = new ComponentLoader();
loader.register('Navigation', Navigation);
loader.register('HeroSlider', HeroSlider, ['Swiper']);
loader.register('ServiceCards', ServiceCards, ['VanillaTilt', 'gsap']);
loader.loadAll();
```

This component guide provides detailed implementation examples and usage patterns for all major components in the La Familia Gastro S.L. landing page project. Each component includes HTML structure, CSS classes, JavaScript integration, and accessibility considerations.