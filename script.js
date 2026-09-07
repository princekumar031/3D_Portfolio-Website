/* ========================================
   3D Portfolio - JavaScript Interactions
   Scroll Animations, Parallax & Effects
======================================== */

// ========================================
// SVG Gradient Definition
// ========================================

function addSVGGradient() {
    const style = document.createElement('style');
    style.textContent = `
        #progressGradient {
            stop:first-child { stop-color: #00d4ff; }
            stop:last-child { stop-color: #7c3aed; }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// DOM Elements
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add SVG gradient for progress rings
    addSVGGradient();
    
    // Initialize all features
    initNavigation();
    initHeroParallax();
    initScrollAnimations();
    initSkillCards();
    initProjectCards();
    initTimeline();
    initContactForm();
    initMouseParallax();
    initSmoothScroll();
});

// ========================================
// Navigation
// ========================================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ========================================
// Hero Parallax & Mouse Effects
// ========================================

function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const cube = document.querySelector('.cube');
    
    if (!hero || !cube) return;
    
    // Mouse move effect for 3D elements
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Apply subtle tilt to cube
        cube.style.transform = `rotateX(${y * 20}deg) rotateY(${x * 20}deg)`;
    });
    
    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
        cube.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================

function initScrollAnimations() {
    // Create observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-content, .skill-card, .project-card, .timeline-item, .contact-content'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-card.in-view:nth-child(1) { transition-delay: 0.1s; }
        .skill-card.in-view:nth-child(2) { transition-delay: 0.2s; }
        .skill-card.in-view:nth-child(3) { transition-delay: 0.3s; }
        .skill-card.in-view:nth-child(4) { transition-delay: 0.4s; }
        .skill-card.in-view:nth-child(5) { transition-delay: 0.5s; }
        .skill-card.in-view:nth-child(6) { transition-delay: 0.6s; }
        
        .project-card.in-view:nth-child(1) { transition-delay: 0.1s; }
        .project-card.in-view:nth-child(2) { transition-delay: 0.2s; }
        .project-card.in-view:nth-child(3) { transition-delay: 0.3s; }
        .project-card.in-view:nth-child(4) { transition-delay: 0.4s; }
        
        .timeline-item.in-view:nth-child(1) { transition-delay: 0.1s; }
        .timeline-item.in-view:nth-child(2) { transition-delay: 0.3s; }
        .timeline-item.in-view:nth-child(3) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
}

// ========================================
// Skill Cards Progress Rings
// ========================================

function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const progressCircle = card.querySelector('.progress-ring .progress');
        if (!progressCircle) return;
        
        // Get skill percentage from text
        const percentText = card.querySelector('.progress-ring span');
        if (percentText) {
            const percent = parseInt(percentText.textContent);
            const circumference = 2 * Math.PI * 45; // r=45
            const offset = circumference - (percent / 100) * circumference;
            
            card.style.setProperty('--progress-offset', offset);
        }
        
        // Tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// ========================================
// Project Cards 3D Tilt Effect
// ========================================

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) translateZ(0)';
        });
    });
}

// ========================================
// Timeline Scroll Animation
// ========================================

function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Staggered animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => observer.observe(item));
}

// ========================================
// Contact Form
// ========================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
    
    // Floating label effect
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// ========================================
// Mouse Parallax Effect for Background
// ========================================

function initMouseParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const xPos = x * speed;
            const yPos = y * speed;
            
            shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Active Navigation Highlight
// ========================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Particles Effect (Optional Enhancement)
// ========================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 215, 0, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles after a short delay
setTimeout(createParticles, 1000);

// ========================================
// Typing Effect for Hero Title (Optional)
// ========================================

function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let index = 0;
    
    function type() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 30);
        }
    }
    
    setTimeout(type, 1500);
}

// ========================================
// Loading Animation
// ========================================

function initLoadingScreen() {
    const body = document.body;
    body.style.overflow = 'hidden';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .loader {
            position: fixed;
            inset: 0;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .loader.hidden {
            opacity: 0;
            visibility: hidden;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid var(--glass-border);
            border-top-color: var(--accent-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .loader p {
            color: var(--text-secondary);
        }
    `;
    document.head.appendChild(style);
    body.appendChild(loader);
    
    // Hide loader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
}

// Uncomment to enable loading screen
// initLoadingScreen();
