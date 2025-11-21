// Page loader
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }
}

// Enhanced magnetic buttons
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('[data-magnetic]');
    
    magneticButtons.forEach(btn => {
        let bounds;
        
        const rotateToMouse = (e) => {
            if (!bounds) bounds = btn.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            };
            
            const distance = Math.sqrt(center.x**2 + center.y**2);
            
            btn.style.transform = `
                scale3d(1.05, 1.05, 1.05)
                rotate3d(
                    ${center.y / 100},
                    ${-center.x / 100},
                    0,
                    ${Math.log(distance)* 2}deg
                )
            `;
            
            btn.style.setProperty('--tx', `${center.x / 2}px`);
            btn.style.setProperty('--ty', `${center.y / 2}px`);
        };
        
        const resetStyles = () => {
            btn.style.transform = '';
            btn.style.setProperty('--tx', '0px');
            btn.style.setProperty('--ty', '0px');
        };
        
        btn.addEventListener('mouseenter', () => {
            bounds = btn.getBoundingClientRect();
            document.addEventListener('mousemove', rotateToMouse);
        });
        
        btn.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', rotateToMouse);
            resetStyles();
        });
    });
}

// Enhanced counter animation
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.closest('.stat-item').getAttribute('data-count');
        const duration = 2500;
        const startTime = performance.now();
        
        if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(target * easeOutQuart);
                
                counter.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            requestAnimationFrame(updateCounter);
        }
    });
}

// Enhanced custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-follower');
    
    if (cursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(updateCursor);
        };
        
        updateCursor();
        
        const interactiveElements = document.querySelectorAll('button, a, .card-3d, .service-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(231, 76, 60, 0.3)';
                cursor.style.border = '1px solid rgba(231, 76, 60, 0.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(231, 76, 60, 0.2)';
                cursor.style.border = 'none';
            });
        });
    }
}

// Enhanced 3D card effects
function init3DCards() {
    const cards = document.querySelectorAll('.card-3d, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.02, 1.02, 1.02)
            `;
            
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(231, 76, 60, 0.15), transparent)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = '';
            }
        });
    });
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #e74c3c, #c0392b);
        z-index: 9998;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const trackLength = docHeight - winHeight;
        const progress = Math.floor(scrollTop / trackLength * 100);
        
        progressBar.style.width = progress + '%';
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initPageLoader();
    initMagneticButtons();
    initCustomCursor();
    init3DCards();
    initScrollProgress();
    initSmoothScroll();
    
    // Existing initialization code
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }
});

// Export functions for use in other files
window.animateCounter = animateCounter;

// Add this to your existing main.js

// Process section animations
function initProcessAnimations() {
    const processItems = document.querySelectorAll('.process-item');
    
    processItems.forEach((item, index) => {
        // Add delay for staggered animation
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Update your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    initProcessAnimations();
});
