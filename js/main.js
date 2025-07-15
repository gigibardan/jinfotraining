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