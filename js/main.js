// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollEffects();
    initTestimonialCarousel();
    initAnimations();
    initScrollToTop();

      // 🆕 Inițializează Tawk.to
    initTawkToChat();
    injectTawkCustomStyles();
    addFooterLegalLinks();

      // 🍪 Cookie Consent
    initCookieConsent();
    setTimeout(addCookieManagementButton, 2000);
    
    console.log('J\'Info Training - Site loaded successfully');
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link highlighting
    highlightActiveNavLink();
}

// Highlight active navigation link
function highlightActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.card, .package-card, .section-title, .mission-content').forEach(el => {
        observer.observe(el);
    });
}

// Testimonial carousel
function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;
    let autoplayInterval;
    
    if (slides.length === 0) return;
    
    // Show specific slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds
    }
    
    // Stop autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            stopAutoplay();
            setTimeout(startAutoplay, 3000); // Restart autoplay after 3 seconds
        });
    });
    
    // Pause autoplay on hover
    const testimonialSection = document.querySelector('.testimonials');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', stopAutoplay);
        testimonialSection.addEventListener('mouseleave', startAutoplay);
    }
    
    // Initialize first slide and start autoplay
    showSlide(0);
    startAutoplay();
}

// Animation effects
function initAnimations() {
    // Floating animation for hero elements
    createFloatingElements();
    
    // Counter animation for numbers
    animateCounters();
    
    // Parallax effect for hero background
    initParallax();
}

// Create floating elements in hero
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create floating compass
    const compass = document.createElement('div');
    compass.className = 'hero-floating compass';
    compass.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
        </svg>
    `;
    
    // Create floating map
    const map = document.createElement('div');
    map.className = 'hero-floating map';
    map.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.5,3L20.34,3.03L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21L3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19.03 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3M10,5.47L14,6.87V18.53L10,17.13V5.47M5,6.46L8,5.45V17.15L5,18.31V6.46M16,18.55L19,17.54V5.84L16,6.9V18.55Z"/>
        </svg>
    `;
    
    // Create floating certificate
    const certificate = document.createElement('div');
    certificate.className = 'hero-floating certificate';
    certificate.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13,21L15.5,18.5L18,21V9H13V21M4,3H18A2,2 0 0,1 20,5V9H18V5H4V19H9V21H4A2,2 0 0,1 2,19V5A2,2 0 0,1 4,3M6,7H16V9H6V7M6,11H14V13H6V11M6,15H14V17H6V15Z"/>
        </svg>
    `;
    
    hero.appendChild(compass);
    hero.appendChild(map);
    hero.appendChild(certificate);
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const start = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    // Use Intersection Observer to trigger counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Parallax effect
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Scroll to top button
function initScrollToTop() {
    // Create scroll to top button if it doesn't exist
    let scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,6L7,11H10V16H14V11H17L12,6Z"/>
            </svg>
        `;
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Format number with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
};

// Performance optimizations
window.addEventListener('scroll', utils.debounce(function() {
    // Debounced scroll events here if needed
}, 16)); // ~60fps

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});




// 🎯 ADAUGĂ ACESTE FUNCȚII LA SFÂRȘITUL FIȘIERULUI main.js

// Global success modal pentru toate formularele
window.showSuccessModal = function(courseType = 'cursul selectat', messageType = 'course') {
    // Închide modalul de înscriere dacă este deschis
    const inscriereModal = document.getElementById('course-inscriere-modal');
    if (inscriereModal) {
        inscriereModal.style.display = 'none';
    }
    
    // Mesaje personalizate
    const messages = {
        course: {
            title: 'Înscriere trimisă cu succes!',
            subtitle: `Mulțumim pentru înscrierea la ${courseType}!`,
            description: 'Echipa J\'Info Training vă va contacta în curând pentru:',
            items: [
                'Confirmarea înscrierii',
                'Detalii despre program și calendar', 
                'Informații despre plată și certificare'
            ]
        },
        contact: {
            title: 'Mesaj trimis cu succes!',
            subtitle: 'Mulțumim pentru mesajul dumneavoastră!',
            description: 'Echipa J\'Info Training vă va răspunde în curând cu:',
            items: [
                'Răspuns detaliat la întrebări',
                'Informații suplimentare solicitate',
                'Recomandări personalizate'
            ]
        }
    };
    
    const msg = messages[messageType] || messages.course;
    
    // Creează modalul de succes
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-modal-overlay">
            <div class="success-modal-content">
                <div class="success-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                </div>
                
                <h3>${msg.title}</h3>
                
                <div class="success-message">
                    <p><strong>${msg.subtitle}</strong></p>
                    <p>${msg.description}</p>
                    <ul>
                        ${msg.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <p class="contact-info">
                        <strong>Timp de răspuns:</strong> Maximum 24 de ore<br>
                        <strong>Contact urgent:</strong> <a href="tel:+40723 394 515">0723 394 515</a>
                    </p>
                </div>
                
                <div class="success-actions">
                    <button class="btn-primary" onclick="closeSuccessModal()">
                        Perfect, am înțeles!
                    </button>
                    <button class="btn-secondary" onclick="goToHomepage()">
                        Înapoi la pagina principală
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Injectează stilurile dacă nu există
    injectSuccessModalStyles();
    
    // Adaugă modalul la pagină
    document.body.appendChild(successModal);
    document.body.style.overflow = 'hidden';
    
    // Închide la click pe overlay
    successModal.querySelector('.success-modal-overlay').addEventListener('click', closeSuccessModal);
};

window.closeSuccessModal = function() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.style.animation = 'fadeIn 0.2s ease-out reverse';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 200);
    }
};

window.goToHomepage = function() {
    closeSuccessModal();
    window.location.href = '/'; // sau calea către homepage
};

function injectSuccessModalStyles() {
    if (document.getElementById('success-modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'success-modal-styles';
    styles.textContent = `
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        }
        
        .success-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        
        .success-modal-content {
            position: relative;
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.4s ease-out;
        }
        
        .success-icon {
            color: #16a34a;
            margin-bottom: 1rem;
            display: flex;
            justify-content: center;
        }
        
        .success-modal h3 {
            color: #16a34a;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            font-weight: 600;
        }
        
        .success-message {
            text-align: left;
            margin-bottom: 2rem;
        }
        
        .success-message p {
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .success-message ul {
            margin: 1rem 0;
            padding-left: 1.5rem;
        }
        
        .success-message li {
            margin-bottom: 0.5rem;
            line-height: 1.5;
        }
        
        .contact-info {
            background: #f3f4f6;
            padding: 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
        }
        
        .contact-info a {
            color: var(--primary-orange, #ea580c);
            text-decoration: none;
            font-weight: 600;
        }
        
        .success-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .success-actions .btn-primary {
            background: var(--primary-orange, #ea580c);
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .success-actions .btn-primary:hover {
            background: var(--primary-orange-dark, #c2410c);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
        }
        
        .success-actions .btn-secondary {
            background: transparent;
            color: #6b7280;
            padding: 0.75rem 1.5rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .success-actions .btn-secondary:hover {
            border-color: #9ca3af;
            color: #374151;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @media (max-width: 480px) {
            .success-modal-content {
                padding: 1.5rem;
            }
            
            .success-actions {
                flex-direction: column;
            }
            
            .success-actions button {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(styles);
}

// 💬 TAWK.TO CHAT IMPLEMENTATION
// Initialize Tawk.to chat widget
function initTawkToChat() {
    // Verifică dacă Tawk.to nu e deja încărcat
    if (window.Tawk_API) {
        return;
    }
    
    // Configurare Tawk.to cu ID-ul tău real
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    // Încarcă script-ul Tawk.to cu ID-ul tău
    (function(){
        var s1 = document.createElement("script");
        var s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/6874f7233606072bf84a0827/1j04eaors';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
    })();
    
    // Configurare personalizată pentru J'Info Training
    window.Tawk_API = Tawk_API;
    
    Tawk_API.onLoad = function(){
        console.log('Tawk.to chat loaded successfully');
        
        // Personalizează mesajul de bun venit bazat pe pagină
        setupTawkContextualInfo();
    };
    
    // Când utilizatorul începe să scrie
    Tawk_API.onChatStarted = function(){
        console.log('Chat conversation started');
        
        // Google Analytics tracking dacă e disponibil
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_started', {
                'event_category': 'engagement',
                'event_label': 'tawk_to_chat'
            });
        }
    };
    
    // Când se primește un mesaj de la visitor
    Tawk_API.onChatMessageVisitor = function(message){
        console.log('Visitor sent message');
    };
}

// Configurare informații contextuale bazate pe pagină
// Adaugă în funcția setupTawkContextualInfo() din main.js:
function setupTawkContextualInfo() {
    if (!window.Tawk_API) return;
    
    const currentPath = window.location.pathname.toLowerCase();
    let pageContext = 'general';
    
    // Detectează pagina și setează mesaje personalizate
    if (currentPath.includes('cursuri') || currentPath.includes('ghid') || 
        currentPath.includes('agent') || currentPath.includes('director') || 
        currentPath.includes('administrator') || currentPath.includes('formator')) {
        pageContext = 'cursuri';
    } else if (currentPath.includes('pachete')) {
        pageContext = 'pachete';
    } else if (currentPath.includes('contact')) {
        pageContext = 'contact';
    }
    
    // Așteaptă încărcarea și setează comportament
    setTimeout(() => {
        if (window.Tawk_API) {
            // Setează limba română
            if (typeof window.Tawk_API.setLocale === 'function') {
                window.Tawk_API.setLocale('ro');
            }
            
            // Adaugă context despre pagină
            if (typeof window.Tawk_API.addEvent === 'function') {
                window.Tawk_API.addEvent('page_context', {
                    page_type: pageContext,
                    page_url: window.location.href,
                    page_title: document.title,
                    timestamp: new Date().toISOString()
                });
            }
        }
    }, 3000);
}

// Funcții helper pentru interacțiunea cu Tawk.to
const TawkHelpers = {
    // Deschide chat-ul programatic
    openChat: function() {
        if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
            window.Tawk_API.maximize();
        }
    },
    
    // Închide chat-ul
    closeChat: function() {
        if (window.Tawk_API && typeof window.Tawk_API.minimize === 'function') {
            window.Tawk_API.minimize();
        }
    },
    
    // Setează informații despre utilizator după completarea formularului
    setUserInfo: function(name, email, phone = '') {
        if (window.Tawk_API && typeof window.Tawk_API.setAttributes === 'function') {
            const attributes = {
                'name': name,
                'email': email
            };
            if (phone) {
                attributes['phone'] = phone;
            }
            
            window.Tawk_API.setAttributes(attributes, function(error) {
                if (!error) {
                    console.log('Tawk.to user info updated');
                }
            });
        }
    },
    
    // Trimite informații despre cursul de interes
    setCourseInterest: function(courseName, coursePrice = '') {
        if (window.Tawk_API && typeof window.Tawk_API.addEvent === 'function') {
            window.Tawk_API.addEvent('course_interest', {
                course: courseName,
                price: coursePrice,
                timestamp: new Date().toISOString()
            });
        }
    }
};

// CSS personalizat pentru Tawk.to
// 🔧 ACTUALIZEAZĂ CSS-ul din main.js pentru a evita suprapunerea

function injectTawkCustomStyles() {
    if (document.getElementById('tawk-custom-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'tawk-custom-styles';
    styles.textContent = `
        /* 💬 Poziționare Tawk.to în stânga jos */
        .tawk-chat-iframe {
            right: auto !important;
            left: 20px !important;
            bottom: 20px !important;
        }
        
        /* Alternative selector pentru Tawk.to */
        iframe[src*="tawk.to"] {
            right: auto !important;
            left: 20px !important;
            bottom: 20px !important;
        }
        
        /* Butonul Tawk.to în stânga */
        .tawk-min-container {
            right: auto !important;
            left: 20px !important;
        }
        
        /* 🔝 Scroll to top rămâne în dreapta */
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            width: 50px;
            height: 50px;
            background: var(--primary-orange, #ea580c);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: var(--primary-orange-dark, #c2410c);
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }
        
        /* 📱 Responsive pe mobile */
        @media (max-width: 768px) {
            .tawk-chat-iframe,
            iframe[src*="tawk.to"] {
                left: 10px !important;
                bottom: 10px !important;
                transform: scale(0.9);
            }
            
            .scroll-to-top {
                right: 10px;
                bottom: 10px;
                width: 45px;
                height: 45px;
            }
        }
        
        /* Asigură-te că modalele sunt deasupra */
        .success-modal {
            z-index: 10000 !important;
        }
        
        /* Stilizare suplimentară pentru chat */
        .tawk-chat-button {
            background: linear-gradient(135deg, #ea580c, #f97316) !important;
            border-radius: 25px !important;
            box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3) !important;
            transition: all 0.3s ease !important;
        }
        
        .tawk-chat-button:hover {
            transform: scale(1.05) !important;
            box-shadow: 0 6px 16px rgba(234, 88, 12, 0.4) !important;
        }
    `;
    document.head.appendChild(styles);
}

// Add footer legal links
function addFooterLegalLinks() {
    const footerBottoms = document.querySelectorAll('.footer-bottom p');
    
    footerBottoms.forEach(footerText => {
        if (footerText.textContent.includes('Toate drepturile rezervate')) {
            footerText.innerHTML = `
                &copy; 2025 J'Info Training. Toate drepturile rezervate. | 
                Dezvoltat cu ❤️ pentru educația în turism (G)
                <br class="mobile-break">
                <a href="/pages/politica-confidentialitate.html">Politica de confidențialitate</a> | 
                <a href="/pages/termeni-conditii.html">Termeni și condiții</a>
            `;
        }
    });
}



// 🍪 COOKIE CONSENT DIY - Adaugă în main.js după funcțiile Tawk.to
// Event listeners cu delegation
document.addEventListener('click', function(e) {
    if (e.target && e.target.closest('#cookie-accept-all')) {
        e.preventDefault();
        acceptCookies('all');
    }
    
    if (e.target && e.target.closest('#cookie-accept-necessary')) {
        e.preventDefault();
        acceptCookies('necessary');
    }
    
    if (e.target && e.target.closest('#cookie-settings')) {
        e.preventDefault();
        showCookieSettings();
    }
});
// Simple Cookie Consent Banner
function initCookieConsent() {
    // Verifică dacă utilizatorul a dat deja consimțământul
    if (localStorage.getItem('cookieConsent')) {
        enableServices(localStorage.getItem('cookieConsent'));
        return;
    }
    // Event listener pentru butonul "Setări" din banner
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'cookie-settings') {
        e.preventDefault();
        showCookieSettings();
    }
    
    if (e.target && e.target.id === 'cookie-accept-all') {
        e.preventDefault();
        acceptCookies('all');
    }
    
    if (e.target && e.target.id === 'cookie-accept-necessary') {
        e.preventDefault();
        acceptCookies('necessary');
    }
});
    // Creează banner-ul
    const cookieBanner = document.createElement('div');
    cookieBanner.id = 'cookie-banner';
    cookieBanner.innerHTML = `
        <div class="cookie-banner-content">
            <div class="cookie-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12C21,7.03 16.97,3 12,3M12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5M8,12A1.5,1.5 0 0,0 9.5,10.5A1.5,1.5 0 0,0 8,9A1.5,1.5 0 0,0 6.5,10.5A1.5,1.5 0 0,0 8,12M16,12A1.5,1.5 0 0,0 17.5,10.5A1.5,1.5 0 0,0 16,9A1.5,1.5 0 0,0 14.5,10.5A1.5,1.5 0 0,0 16,12Z"/>
                </svg>
            </div>
            <div class="cookie-text">
                <h3>🍪 Respectăm confidențialitatea ta!</h3>
                <p>Folosim cookie-uri pentru a îmbunătăți experiența ta pe site și pentru analiză. Toate cookie-urile sunt sigure și ne ajută să oferim servicii mai bune.</p>
                <p class="cookie-links">
                    <a href="/pages/politica-confidentialitate.html" target="_blank">Politica de confidențialitate</a> | 
                    <a href="/pages/termeni-conditii.html" target="_blank">Termeni și condiții</a>
                </p>
            </div>
            <div class="cookie-actions">
                <button id="cookie-accept-all" class="cookie-btn primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                    </svg>
                    Acceptă toate
                </button>
                <button id="cookie-accept-necessary" class="cookie-btn secondary">
                    Doar necesare
                </button>
                <button id="cookie-settings" class="cookie-btn tertiary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"/>
                    </svg>
                    Setări
                </button>
            </div>
        </div>
    `;
    
    // Adaugă stilurile
    injectCookieStyles();
    
    // Adaugă banner-ul la pagină
    document.body.appendChild(cookieBanner);
    
    // Event listeners
    document.getElementById('cookie-accept-all').addEventListener('click', function() {
        acceptCookies('all');
    });
    
    document.getElementById('cookie-accept-necessary').addEventListener('click', function() {
        acceptCookies('necessary');
    });
    
    document.getElementById('cookie-settings').addEventListener('click', function() {
        showCookieSettings();
    });
    
    // Modal event listeners
    document.getElementById('cookie-modal-close').addEventListener('click', hideCookieSettings);
    document.getElementById('cookie-save-preferences').addEventListener('click', savePreferences);
    document.getElementById('cookie-accept-all-modal').addEventListener('click', function() {
        acceptCookies('all');
    });
    
    // Close modal on backdrop click
    document.getElementById('cookie-settings-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideCookieSettings();
        }
    });
}

function acceptCookies(type) {
    // Salvează consimțământul
    localStorage.setItem('cookieConsent', type);
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // Activează serviciile
    enableServices(type);
    
    // Ascunde banner-ul
    hideCookieBanner();
}

function savePreferences() {
    const functional = document.getElementById('functional-cookies').checked;
    const analytics = document.getElementById('analytics-cookies').checked;
    
    let consentType = 'necessary';
    if (functional && analytics) {
        consentType = 'all';
    } else if (functional || analytics) {
        consentType = 'partial';
    }
    
    // Salvează preferințele detaliate
    localStorage.setItem('cookieConsent', consentType);
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    localStorage.setItem('functionalCookies', functional);
    localStorage.setItem('analyticsCookies', analytics);
    
    // Activează serviciile
    enableServices(consentType);
    
    // Ascunde modal și banner
    hideCookieSettings();
    hideCookieBanner();
}

function enableServices(type) {
    if (type === 'all' || localStorage.getItem('functionalCookies') === 'true') {
        // Activează Tawk.to
        if (window.TawkHelpers && typeof window.TawkHelpers.enableTracking === 'function') {
            window.TawkHelpers.enableTracking();
        }
        console.log('Functional cookies enabled');
    }
    
    if (type === 'all' || localStorage.getItem('analyticsCookies') === 'true') {
        // Activează Google Analytics dacă ai
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
        console.log('Analytics cookies enabled');
    }
}

function showCookieSettings() {
    let modal = document.getElementById('cookie-settings-modal');
    
    // Dacă modalul nu există, recreează-l
    if (!modal) {
        createCookieSettingsModal();
        modal = document.getElementById('cookie-settings-modal');
    }
    
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.animation = 'slideDown 0.4s ease-out';
        setTimeout(() => banner.remove(), 400);
    }
}

function hideCookieSettings() {
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Separate function to create the settings modal
function createCookieSettingsModal() {
    // Remove existing modal if any
    const existingModal = document.getElementById('cookie-settings-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'cookie-settings-modal';
    modal.className = 'cookie-modal hidden';
    modal.innerHTML = `
        <div class="cookie-modal-content">
            <div class="cookie-modal-header">
                <h3>Setări Cookie-uri</h3>
                <button id="cookie-modal-close" class="cookie-close-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                    </svg>
                </button>
            </div>
            <div class="cookie-modal-body">
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h4>🔒 Cookie-uri necesare</h4>
                        <span class="cookie-required">Obligatorii</span>
                    </div>
                    <p>Aceste cookie-uri sunt esențiale pentru funcționarea site-ului și nu pot fi dezactivate.</p>
                    <ul class="cookie-list">
                        <li>Sesiunea utilizatorului</li>
                        <li>Preferințele de limbă</li>
                        <li>Securitatea formularelor</li>
                    </ul>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h4>💬 Cookie-uri funcționale</h4>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="functional-cookies" checked>
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <p>Permit funcții avansate precum chat-ul live și reținerea preferințelor.</p>
                    <ul class="cookie-list">
                        <li>Tawk.to chat widget</li>
                        <li>Preferințe utilizator</li>
                        <li>Setări de afișare</li>
                    </ul>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h4>📊 Cookie-uri de analiză</h4>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="analytics-cookies" checked>
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <p>Ne ajută să înțelegem cum folosiți site-ul pentru a îmbunătăți experiența.</p>
                    <ul class="cookie-list">
                        <li>Google Analytics</li>
                        <li>Statistici de vizitare</li>
                        <li>Hărți de căldură</li>
                    </ul>
                </div>
            </div>
            <div class="cookie-modal-footer">
                <button id="cookie-save-preferences" class="cookie-btn primary">
                    Salvează preferințele
                </button>
                <button id="cookie-accept-all-modal" class="cookie-btn secondary">
                    Acceptă toate
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners to the new modal
    document.getElementById('cookie-modal-close').addEventListener('click', hideCookieSettings);
    document.getElementById('cookie-save-preferences').addEventListener('click', savePreferences);
    document.getElementById('cookie-accept-all-modal').addEventListener('click', function() {
        acceptCookies('all');
    });
    
    // Close modal on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideCookieSettings();
        }
    });
    
    // Load current preferences
    const functionalEnabled = localStorage.getItem('functionalCookies') !== 'false';
    const analyticsEnabled = localStorage.getItem('analyticsCookies') !== 'false';
    
    document.getElementById('functional-cookies').checked = functionalEnabled;
    document.getElementById('analytics-cookies').checked = analyticsEnabled;
}

function injectCookieStyles() {
    if (document.getElementById('cookie-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'cookie-styles';
    styles.textContent = `
        /* Cookie Banner Styles */
        #cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98));
            backdrop-filter: blur(12px);
            border-top: 3px solid var(--primary-orange, #ea580c);
            padding: 1.5rem;
            box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.12);
            z-index: 9999;
            animation: slideUp 0.5s ease-out;
        }
        
        .cookie-banner-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            gap: 1.5rem;
        }
        
        .cookie-icon {
            color: var(--primary-orange, #ea580c);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            background: rgba(234, 88, 12, 0.1);
            border-radius: 50%;
            flex-shrink: 0;
        }
        
        .cookie-text {
            min-width: 0;
        }
        
        .cookie-text h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: #1e293b;
        }
        
        .cookie-text p {
            margin: 0 0 0.75rem 0;
            line-height: 1.6;
            color: #475569;
            font-size: 0.95rem;
        }
        
        .cookie-links {
            margin-top: 0.5rem;
        }
        
        .cookie-links a {
            color: var(--primary-orange, #ea580c);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
        }
        
        .cookie-links a:hover {
            text-decoration: underline;
        }
        
        .cookie-actions {
            display: flex;
            gap: 0.75rem;
            flex-shrink: 0;
            flex-wrap: wrap;
        }
        
        .cookie-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.25rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            white-space: nowrap;
            text-decoration: none;
        }
        
        .cookie-btn.primary {
            background: var(--primary-orange, #ea580c);
            color: white;
        }
        
        .cookie-btn.primary:hover {
            background: #c2410c;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
        }
        
        .cookie-btn.secondary {
            background: #f1f5f9;
            color: #475569;
            border: 1px solid #e2e8f0;
        }
        
        .cookie-btn.secondary:hover {
            background: #e2e8f0;
            color: #334155;
        }
        
        .cookie-btn.tertiary {
            background: transparent;
            color: #6b7280;
            border: 1px solid #d1d5db;
        }
        
        .cookie-btn.tertiary:hover {
            background: #f9fafb;
            color: #374151;
        }
        
        /* Cookie Settings Modal */
        .cookie-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            animation: fadeIn 0.3s ease-out;
        }
        
        .cookie-modal.hidden {
            display: none;
        }
        
        .cookie-modal-content {
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            animation: slideUp 0.4s ease-out;
        }
        
        .cookie-modal-header {
            display: flex;
            justify-content: between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e2e8f0;
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        }
        
        .cookie-modal-header h3 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e293b;
            flex: 1;
        }
        
        .cookie-close-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: #6b7280;
            padding: 0.5rem;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .cookie-close-btn:hover {
            background: #f3f4f6;
            color: #374151;
        }
        
        .cookie-modal-body {
            padding: 1.5rem;
        }
        
        .cookie-category {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        
        .cookie-category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .cookie-category h4 {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 600;
            color: #1e293b;
        }
        
        .cookie-required {
            background: #fef3c7;
            color: #92400e;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        .cookie-toggle {
            position: relative;
            display: inline-block;
            width: 44px;
            height: 24px;
        }
        
        .cookie-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .cookie-toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #cbd5e1;
            transition: 0.3s;
            border-radius: 24px;
        }
        
        .cookie-toggle-slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background: white;
            transition: 0.3s;
            border-radius: 50%;
        }
        
        .cookie-toggle input:checked + .cookie-toggle-slider {
            background: var(--primary-orange, #ea580c);
        }
        
        .cookie-toggle input:checked + .cookie-toggle-slider:before {
            transform: translateX(20px);
        }
        
        .cookie-category p {
            margin: 0 0 1rem 0;
            color: #64748b;
            line-height: 1.6;
            font-size: 0.95rem;
        }
        
        .cookie-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .cookie-list li {
            padding: 0.5rem 0;
            color: #475569;
            font-size: 0.9rem;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .cookie-list li:before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--primary-orange, #ea580c);
            font-weight: bold;
        }
        
        .cookie-modal-footer {
            padding: 1.5rem;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            background: #f8fafc;
        }
        
        /* Animations */
        @keyframes slideUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
            #cookie-banner {
                padding: 1rem;
            }
            
            .cookie-banner-content {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 1rem;
            }
            
            .cookie-actions {
                justify-content: center;
                width: 100%;
            }
            
            .cookie-btn {
                flex: 1;
                min-width: 120px;
                justify-content: center;
            }
            
            .cookie-modal {
                padding: 0.5rem;
            }
            
            .cookie-modal-content {
                border-radius: 12px;
            }
            
            .cookie-modal-header,
            .cookie-modal-body,
            .cookie-modal-footer {
                padding: 1rem;
            }
            
            .cookie-category {
                padding: 1rem;
                margin-bottom: 1rem;
            }
            
            .cookie-category-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }
            
            .cookie-modal-footer {
                flex-direction: column;
            }
            
            .cookie-modal-footer .cookie-btn {
                width: 100%;
            }
        }
        
        @media (max-width: 480px) {
            .cookie-text h3 {
                font-size: 1.1rem;
            }
            
            .cookie-text p {
                font-size: 0.9rem;
            }
            
            .cookie-actions {
                flex-direction: column;
            }
            
            .cookie-btn {
                width: 100%;
                padding: 1rem;
            }
        }
    `;
    document.head.appendChild(styles);
}

// Add cookie consent management button (optional)
function addCookieManagementButton() {
    if (localStorage.getItem('cookieConsent') && !document.getElementById('manage-cookies-btn')) {
        const manageCookies = document.createElement('button');
        manageCookies.id = 'manage-cookies-btn';
        manageCookies.innerHTML = '🍪 Setări Cookie-uri';
        manageCookies.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: var(--primary-orange, #ea580c);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.8rem;
            z-index: 1000;
            opacity: 0.8;
            transition: all 0.3s ease;
        `;
        
        manageCookies.addEventListener('click', function() {
            showCookieSettings();
        });
        
        manageCookies.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        });
        
        manageCookies.addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
        });
        
        document.body.appendChild(manageCookies);
    }
}




// Export for use in other files
window.JInfoTraining = {
    utils,
    initNavbar,
    initScrollEffects,
    initTestimonialCarousel,
    initAnimations,

       TawkHelpers,  // 🆕 Adaugă asta
    initTawkToChat  // 🆕 Și asta
};