// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));

    // Parallax effect for hero section
    const heroImage = document.querySelector('.hero-img');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
        
        floatingCards.forEach((card, index) => {
            const cardRate = scrolled * (0.2 + index * 0.1);
            card.style.transform = `translateY(${cardRate}px)`;
        });
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate step numbers on scroll
    const stepNumbers = document.querySelectorAll('.step-number');
    const stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'bounceIn 0.6s ease-out';
            }
        });
    }, { threshold: 0.5 });

    stepNumbers.forEach(step => stepObserver.observe(step));

    // Add CSS for bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% {
                transform: scale(0.3);
                opacity: 0;
            }
            50% {
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .step-number {
            animation: none;
        }
    `;
    document.head.appendChild(style);

    // Smooth reveal animation for download section
    const downloadSection = document.querySelector('.download');
    if (downloadSection) {
        const downloadObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        downloadObserver.observe(downloadSection);
        
        // Set initial state
        downloadSection.style.opacity = '0';
        downloadSection.style.transform = 'translateY(50px)';
        downloadSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Ensure images are visible by default
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
        img.style.display = 'block';
        img.style.visibility = 'visible';
        
        // Add error handling
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.display = 'none';
            // Show fallback if available
            const fallback = this.nextElementSibling;
            if (fallback && fallback.style.display === 'none') {
                fallback.style.display = 'block';
            }
        });
        
        // Add load success handling
        img.addEventListener('load', function() {
            console.log('Image loaded successfully:', this.src);
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #000000, #6366f1);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add floating animation to device support badges
    const deviceBadges = document.querySelectorAll('.device-support span');
    deviceBadges.forEach((badge, index) => {
        badge.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });

    // Add hover effect to footer links
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add CSS for footer link transitions
    const footerStyle = document.createElement('style');
    footerStyle.textContent = `
        .footer-section a {
            transition: transform 0.3s ease, color 0.3s ease;
            display: inline-block;
        }
    `;
    document.head.appendChild(footerStyle);
});

// Add window resize handler for responsive behavior
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Add performance optimization for scroll events
let ticking = false;
function updateOnScroll() {
    // Update scroll-based animations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);
