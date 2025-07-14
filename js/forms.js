// Forms functionality for J'Info Training
document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();
    initContactForm();
    initInscriereForm();
    initFormValidation();
    
    console.log('Forms module loaded successfully');
});

// Initialize EmailJS
function initEmailJS() {
    emailjs.init('9B5VIX054ZvaHolyX');
}

// EmailJS Configuration
const EMAIL_CONFIG = {
    serviceID: 'service_tcy7j6c',
    contactTemplateID: 'template_xirqwtf',
    registrationTemplateID: 'template_n4vdpoi',
    publicKey: '9B5VIX054ZvaHolyX'
};

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        try {
            // Show loading state
            setButtonLoading(submitBtn, true);
            
            // Get form data
            const formData = {
                from_name: this.nume.value.trim(),
                from_email: this.email.value.trim(),
                phone: this.telefon ? this.telefon.value.trim() : 'Nu a completat',
                subject: this.subiect ? this.subiect.value.trim() : 'Contact general',
                message: this.mesaj.value.trim(),
                form_type: 'contact',
                date: new Date().toLocaleString('ro-RO')
            };
            
            // Validate form
            if (!validateContactForm(formData)) {
                throw new Error('Vă rugăm să completați toate câmpurile obligatorii');
            }
            
            // Send email via EmailJS
            await emailjs.send(
                EMAIL_CONFIG.serviceID,
                EMAIL_CONFIG.contactTemplateID,
                formData
            );
            
            // Show success message
        showSuccessModal('formularul de contact', 'contact');

            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Contact form error:', error);
            showFormMessage('contact', 'error', error.message || 'A apărut o eroare. Vă rugăm să încercați din nou.');
        } finally {
            setButtonLoading(submitBtn, false, originalText);
        }
    });
}

// Inscription form functionality (cursuri + pachete)
function initInscriereForm() {
    // Handle course inscriptions
    const courseInscriereForm = document.getElementById('course-inscriere-form');
    if (courseInscriereForm) {
        courseInscriereForm.addEventListener('submit', handleCourseInscription);
    }
    
    // Handle package inscriptions
    const packageInscriereForm = document.getElementById('package-inscriere-form');
    if (packageInscriereForm) {
        packageInscriereForm.addEventListener('submit', handlePackageInscription);
    }
    
    // Handle general inscription modal
    const inscriereForm = document.getElementById('inscriere-form');
    if (inscriereForm) {
        inscriereForm.addEventListener('submit', handleGeneralInscription);
    }
}

// Handle course inscription
async function handleCourseInscription(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
        setButtonLoading(submitBtn, true);
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const templateParams = {
            from_name: data.nume,
            from_email: data.email,
            phone: data.telefon,
            registration_type: 'Curs Individual',
            course_or_package: data.curs,
            price: getCoursePrice(data.curs),
            experienta: data.experienta || 'Nu a specificat',
            obiective_motivatie: data.obiective || 'Nu a specificat',
            pozitie_actuala: data.pozitie_actuala || 'Nu a specificat',
            limba_straina: data.limba_straina || 'Nu a specificat',
            data_preferata: data.data_preferata || 'Nu a specificat',
            message: data.mesaj || 'Înscriere curs individual',
            form_type: 'course-inscription',
            date: new Date().toLocaleString('ro-RO')
        };
        
        await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.registrationTemplateID,
            templateParams
        );
        
        showFormMessage('course', 'success', 'Înscrierea a fost trimisă cu succes! Vă vom contacta în curând.');
        form.reset();
        
    } catch (error) {
        console.error('Course inscription error:', error);
        showFormMessage('course', 'error', 'A apărut o eroare. Vă rugăm să încercați din nou.');
    } finally {
        setButtonLoading(submitBtn, false, originalText);
    }
}

// Handle package inscription
async function handlePackageInscription(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
        setButtonLoading(submitBtn, true);
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const templateParams = {
            from_name: data.nume,
            from_email: data.email,
            phone: data.telefon,
            registration_type: 'Pachet Promoțional',
            course_or_package: data.pachet,
            price: getPackagePrice(data.pachet),
            experienta: data.experienta || 'Nu a specificat',
            obiective_motivatie: data.motivatie || 'Nu a specificat',
            pozitie_actuala: data.pozitie_actuala || 'Nu a specificat',
            limba_straina: data.limba_straina || 'Nu a specificat',
            data_preferata: data.data_preferata || 'Nu a specificat',
            message: data.mesaj || 'Înscriere pachet promoțional',
            form_type: 'package-inscription',
            date: new Date().toLocaleString('ro-RO')
        };
        
        await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.registrationTemplateID,
            templateParams
        );
        
        showFormMessage('package', 'success', 'Înscrierea a fost trimisă cu succes! Vă vom contacta în curând.');
        form.reset();
        
    } catch (error) {
        console.error('Package inscription error:', error);
        showFormMessage('package', 'error', 'A apărut o eroare. Vă rugăm să încercați din nou.');
    } finally {
        setButtonLoading(submitBtn, false, originalText);
    }
}

// Handle general inscription (from modal)
async function handleGeneralInscription(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
        setButtonLoading(submitBtn, true);
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const templateParams = {
            from_name: data.nume,
            from_email: data.email,
            phone: data.telefon,
            registration_type: 'Înscriere Generală',
            course_or_package: data.curs || data.pachet,
            price: data.curs ? getCoursePrice(data.curs) : getPackagePrice(data.pachet),
            experienta: data.experienta || 'Nu a specificat',
            obiective_motivatie: data.obiective || data.motivatie || 'Nu a specificat',
            pozitie_actuala: data.pozitie_actuala || 'Nu a specificat',
            limba_straina: data.limba_straina || 'Nu a specificat',
            data_preferata: data.data_preferata || 'Nu a specificat',
            message: data.mesaj || 'Înscriere din modal general',
            form_type: 'general-inscription',
            date: new Date().toLocaleString('ro-RO')
        };
        
        await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.registrationTemplateID,
            templateParams
        );
        
        alert('Înscrierea a fost trimisă cu succes! Vă vom contacta în curând.');
        form.reset();
        
    } catch (error) {
        console.error('General inscription error:', error);
        alert('A apărut o eroare. Vă rugăm să încercați din nou.');
    } finally {
        setButtonLoading(submitBtn, false, originalText);
    }
}

// Get course price
function getCoursePrice(courseValue) {
    const prices = {
        'ghid-turism': '2.150 lei',
        'ghid-national-touroperator': '1.700 lei',
        'director-agentie-turism': '2.850 lei',
        'agent-turism': '2.150 lei',
        'director-hotel': '2.850 lei',
        'administrator-pensiune-turistica': '1.700 lei',
        'formator-autorizat': '1.350 lei'
    };
    return prices[courseValue] || 'Nespecificat';
}

// Get package price
function getPackagePrice(packageValue) {
    const prices = {
        'pachet-2000-ghid': '2.850 lei',
        'pachet-3000-i': '3.850 lei',
        'pachet-3000-ii': '3.850 lei'
    };
    return prices[packageValue] || 'Nespecificat';
}

// Form validation
function initFormValidation() {
    // Real-time validation for all forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Remove error styling on focus
            input.addEventListener('focus', function() {
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
            
            // Validate on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Real-time validation for email
            if (input.type === 'email') {
                input.addEventListener('input', debounce(function() {
                    validateEmail(this);
                }, 300));
            }
            
            // Real-time validation for phone
            if (input.type === 'tel') {
                input.addEventListener('input', function() {
                    formatPhoneNumber(this);
                });
            }
        });
    });
}

// Validation functions
function validateContactForm(data) {
    const required = ['from_name', 'from_email', 'message'];
    return required.every(field => data[field] && data[field].length > 0) && 
           isValidEmail(data.from_email);
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Check if required
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Acest câmp este obligatoriu';
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Vă rugăm să introduceți o adresă de email validă';
    }
    
    // Phone validation
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Vă rugăm să introduceți un număr de telefon valid';
    }
    
    // Update field styling
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
        removeErrorMessage(field);
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function validateEmail(field) {
    const email = field.value.trim();
    if (email && !isValidEmail(email)) {
        field.classList.add('error');
        showFieldError(field, 'Adresa de email nu este validă');
    } else if (email) {
        field.classList.remove('error');
        field.classList.add('valid');
        removeErrorMessage(field);
    }
}

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Romanian phone number validation
    const phoneRegex = /^(\+4|4|0)?[0-9]{9}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone);
}

function formatPhoneNumber(field) {
    let value = field.value.replace(/\D/g, '');
    
    // Limit to 10 digits for Romanian numbers
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    // Format as XXX XXX XXX
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{0,4})/, '$1 $2 $3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '$1 $2');
    }
    
    field.value = value.trim();
}

function updateCoursePrice() {
    const priceDisplay = document.getElementById('course-price') || document.getElementById('course-price-display');
    if (!priceDisplay) return;
    
    const selectedPrice = getCoursePrice(this.value);
    if (selectedPrice !== 'Nespecificat') {
        priceDisplay.textContent = `Preț: ${selectedPrice}`;
        priceDisplay.style.display = 'block';
    } else {
        priceDisplay.style.display = 'none';
    }
}

function setButtonLoading(button, loading, originalText = 'Trimite') {
    if (loading) {
        button.disabled = true;
        button.innerHTML = `
            <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
            </svg>
            Se trimite...
        `;
    } else {
        button.disabled = false;
        button.textContent = originalText;
    }
}

function showFormMessage(formType, type, message) {
    // Remove existing messages
    const existingMsg = document.querySelector(`.form-message-${formType}`);
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${formType} ${type}`;
    messageEl.innerHTML = `
        <div class="message-content">
            <div class="message-icon">
                ${type === 'success' ? 
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>' :
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/></svg>'
                }
            </div>
            <div class="message-text">${message}</div>
            <button type="button" class="message-close" onclick="this.parentElement.parentElement.remove()">
                &times;
            </button>
        </div>
    `;
    
    // Insert message
    const form = document.getElementById(`${formType}-form`) || 
                 document.getElementById(`${formType}-inscriere-form`) ||
                 document.querySelector('form');
    
    if (form) {
        form.parentNode.insertBefore(messageEl, form);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
        
        // Scroll to message
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function showFieldError(field, message) {
    removeErrorMessage(field);
    
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    
    field.parentNode.appendChild(errorEl);
}

function removeErrorMessage(field) {
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// CSS for form validation (add to CSS)
const formStyles = `
<style>
.form-message {
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    border: 2px solid;
}

.form-message.success {
    background: #d1fae5;
    color: #065f46;
    border-color: #16a34a;
}

.form-message.error {
    background: #fee2e2;
    color: #991b1b;
    border-color: #dc2626;
}

.message-content {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
}

.message-icon {
    flex-shrink: 0;
    margin-top: 0.125rem;
}

.message-text {
    flex: 1;
}

.message-close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.25rem;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
    flex-shrink: 0;
}

.message-close:hover {
    background: rgba(0, 0, 0, 0.1);
}

.error-message {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

input.error, textarea.error, select.error {
    border-color: #dc2626 !important;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
}

input.valid, textarea.valid, select.valid {
    border-color: #16a34a !important;
    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1) !important;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

#course-price, #course-price-display {
    display: none;
    color: var(--primary-orange);
    font-weight: 600;
    margin-top: 0.5rem;
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', formStyles);

// Export for global access
window.JInfoForms = {
    validateField,
    validateEmail,
    formatPhoneNumber,
    updateCoursePrice,
    showFormMessage,
    EMAIL_CONFIG
};