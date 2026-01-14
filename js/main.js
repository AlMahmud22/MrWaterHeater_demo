// ==========================================
// Mr. WaterHeater - Main JavaScript
// ==========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initFormValidation();
    
});

// ==========================================
// Scroll Animations (Intersection Observer)
// ==========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// Mobile Menu Toggle
// ==========================================
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarToggler || !navbarCollapse) return;
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// ==========================================
// Smooth Scroll
// ==========================================
function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// Back to Top Button
// ==========================================
function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// Form Validation
// ==========================================
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });
}

// ==========================================
// Navbar Scroll Effect
// ==========================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// Hero Video Handling
// ==========================================
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    
    if (!heroVideo) return;
    
    // Ensure video autoplays (muted for browser compatibility)
    heroVideo.muted = true;
    heroVideo.play().catch(error => {
        console.log('Video autoplay failed:', error);
    });
}

// Initialize hero video if present
if (document.querySelector('.hero-video')) {
    initHeroVideo();
}

// ==========================================
// Utility Functions
// ==========================================

// Phone number formatting (optional enhancement)
function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Export functions if needed
window.mrWaterHeater = {
    formatPhoneNumber,
    isValidEmail
};
