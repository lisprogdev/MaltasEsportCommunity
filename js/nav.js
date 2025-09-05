// Gaming Navigation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation Elements
    const nav = document.querySelector('.gaming-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile Menu Toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!nav.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.gaming-nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Active link highlighting
    function setActiveLink() {
        const currentPage = window.location.pathname;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Check if link href matches current page
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPage || (currentPage === '/' && link.href.includes('#beranda'))) {
                link.classList.add('active');
            }
        });
    }
    
    // Set active link on page load
    setActiveLink();
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        }
    });
    
    // Gaming effects
    const logoImg = document.querySelector('.logo-img');
    const logoText = document.querySelector('.logo-text');
    
    // Logo rotation effect on hover
    if (logoImg) {
        logoImg.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(360deg) scale(1.1)';
        });
        
        logoImg.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    }
    
    // Glitch effect for logo text
    if (logoText) {
        logoText.addEventListener('click', function() {
            this.classList.add('glitch-active');
            setTimeout(() => {
                this.classList.remove('glitch-active');
            }, 500);
        });
    }
    
    // Social media links with special effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.15) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Enter key activates mobile menu button
        if (e.key === 'Enter' && document.activeElement === mobileMenuBtn) {
            mobileMenuBtn.click();
        }
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe navigation items for animations
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        observer.observe(item);
    });
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Resize handler for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu state on desktop
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Gaming cursor effect (optional)
    const cursor = document.createElement('div');
    cursor.classList.add('gaming-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add cursor styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .gaming-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0, 255, 136, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        }
        
        .nav-link:hover ~ .gaming-cursor,
        .social-link:hover ~ .gaming-cursor {
            transform: translate(-50%, -50%) scale(1.5);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // Modern Gold Theme Effects
    function addGoldSparkles() {
        const nav = document.querySelector('.gaming-nav');
        const sparkle = document.createElement('div');
        sparkle.className = 'gold-sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle 2s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 10px #FFD700;
        `;
        
        nav.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
    
    // Add sparkle effect periodically
    setInterval(addGoldSparkles, 3000);
    
    // Enhanced logo effects
    const logoContainer = document.querySelector('.nav-logo');
    if (logoContainer) {
        logoContainer.addEventListener('mouseenter', function() {
            // Add multiple sparkles on hover
            for (let i = 0; i < 5; i++) {
                setTimeout(() => addGoldSparkles(), i * 100);
            }
        });
    }
    
    // Smooth parallax effect for shapes
    window.addEventListener('scroll', function() {
        const shapes = document.querySelectorAll('.nav-shape');
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Add CSS for sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
        
        .gold-sparkle {
            z-index: 999;
        }
    `;
    document.head.appendChild(sparkleStyle);
    
    console.log('✨ Modern Gold Gaming Navigation Loaded with Sparkles!');
});
