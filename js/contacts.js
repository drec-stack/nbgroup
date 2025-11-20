// Contact page specific JavaScript
function initContact() {
    setupContactForm();
    setupContactInteractions();
    setupMapInteraction();
    setupFAQAccordion();
    setupFormTranslations();
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateContactForm()) {
                showFormMessage('error', 'contact.form.error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            const sendingText = window.i18n ? window.i18n.t('contact.form.sending') : 'Sending...';
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + sendingText;
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showFormMessage('success', 'contact.form.success');
                
                // Reset form
                contactForm.reset();
                resetFormValidation();
                
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Form validation enhancements
    const formInputs = contactForm?.querySelectorAll('input, select, textarea');
    if (formInputs) {
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
                validateField(input);
            });
            
            // Real-time validation
            input.addEventListener('input', () => {
                validateField(input);
            });
        });
    }
}

function validateContactForm() {
    const requiredFields = document.querySelectorAll('#contactForm [required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.parentElement.classList.add('invalid');
        }
    });
    
    // Validate email format
    const emailField = document.getElementById('email');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.parentElement.classList.add('invalid');
        }
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.parentElement;
    
    // Clear previous validation states
    formGroup.classList.remove('valid', 'invalid');
    
    if (!value && field.hasAttribute('required')) {
        formGroup.classList.add('invalid');
        return false;
    }
    
    if (!value) return true;
    
    // Email validation
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            formGroup.classList.add('valid');
            return true;
        } else {
            formGroup.classList.add('invalid');
            return false;
        }
    }
    
    // Required field validation
    if (field.hasAttribute('required') && value) {
        formGroup.classList.add('valid');
        return true;
    }
    
    return true;
}

function resetFormValidation() {
    const formGroups = document.querySelectorAll('#contactForm .form-group');
    formGroups.forEach(group => {
        group.classList.remove('valid', 'invalid', 'focused');
    });
}

function showFormMessage(type, messageKey) {
    const message = window.i18n ? window.i18n.t(messageKey) : 
        (type === 'success' ? 'Message sent successfully!' : 'Error sending message.');
    
    if (window.NBApp) {
        window.NBApp.showNotification(message, type);
    } else {
        // Fallback notification
        alert(message);
    }
}

function setupContactInteractions() {
    const contactMethods = document.querySelectorAll('.contact-method');
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Contact method interactions
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', () => {
            const icon = method.querySelector('.method-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        method.addEventListener('mouseleave', () => {
            const icon = method.querySelector('.method-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
        
        // Click to copy contact info
        method.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return;
            
            const text = method.querySelector('p').textContent;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    const tempMessage = window.i18n ? window.i18n.t('contact.info.copied') : 'Copied to clipboard!';
                    if (window.NBApp) {
                        window.NBApp.showNotification(tempMessage, 'success');
                    }
                });
            }
        });
    });
    
    // Social link interactions
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateY(-2px)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateY(0)';
            }
        });
    });
}

function setupMapInteraction() {
    const mapBtn = document.getElementById('openMapBtn');
    
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            // Open Google Maps with studio location
            window.open(
                'https://maps.google.com/?q=123+Design+Street+Moscow+Russia+101000', 
                '_blank', 
                'noopener,noreferrer'
            );
        });
    }
}

// FAQ accordion functionality
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        
        if (question) {
            question.style.cursor = 'pointer';
            
            // Add click handler
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Toggle current item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

function setupFormTranslations() {
    // This function would handle form field translations if needed
    // Implementation depends on your i18n setup
}