// Enhanced particles configuration
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 80, 
                    density: { 
                        enable: true, 
                        value_area: 1000 
                    }
                },
                color: { 
                    value: "#ffffff" 
                },
                shape: { 
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: { 
                    value: 0.2, 
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: { 
                    value: 2.5, 
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: "#ffffff",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { 
                        enable: true, 
                        mode: "grab" 
                    },
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.3
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});

// Enhanced scroll animations with intersection observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Staggered animation for stats
                if (entry.target.classList.contains('stats-section')) {
                    const statItems = entry.target.querySelectorAll('.stat-item');
                    statItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                            if (index === statItems.length - 1) {
                                setTimeout(() => {
                                    if (typeof animateCounter === 'function') {
                                        animateCounter();
                                    }
                                }, 500);
                            }
                        }, index * 200);
                    });
                }
                
                // Staggered animation for service cards
                if (entry.target.classList.contains('services-preview')) {
                    const cards = entry.target.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 150);
                    });
                }
                
                // Staggered animation for process items
                if (entry.target.classList.contains('process-section')) {
                    const items = entry.target.querySelectorAll('.process-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animateable elements
    const animateElements = document.querySelectorAll(
        '.fade-in-up, .stat-item, .service-card, .process-item, .cta-section'
    );
    
    animateElements.forEach(el => {
        el.classList.add('pre-animate');
        observer.observe(el);
    });
}

// Parallax effect for background elements
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Gradient animation for CTA section
function initGradientAnimation() {
    const ctaSection = document.querySelector('.cta-section');
    if (!ctaSection) return;
    
    let angle = 0;
    
    function updateGradient() {
        angle = (angle + 0.5) % 360;
        ctaSection.style.background = `
            linear-gradient(${angle}deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)
        `;
        requestAnimationFrame(updateGradient);
    }
    
    updateGradient();
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initParallax();
    initGradientAnimation();
});

// Reusable animation functions
window.fadeInUp = function(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                observer.unobserve(element);
            }
        });
    });
    
    observer.observe(element);
};

// Export for use in other files
window.initScrollAnimations = initScrollAnimations;
