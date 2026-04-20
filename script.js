/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

const toggleMenu = () => {
    navMenu.classList.toggle('active');
    // Aesthetic adjustment for hamburger gap when active
    if (hamburger) {
        hamburger.style.gap = navMenu.classList.contains('active') ? '8px' : '6px';
    }
};

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

// Close menu when a link is clicked (Improved UX)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

/* ============================================
   SMOOTH SCROLL BEHAVIOR
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   BUTTON CLICK HANDLERS
   ============================================ */
const primaryBtn = document.querySelector('.btn-primary');
const secondaryBtn = document.querySelector('.btn-secondary');
const ctaBtn = document.querySelector('.cta-button');

const handleButtonClick = (buttonName, message) => {
    console.log(`${buttonName}: ${message}`);
};

if (primaryBtn) {
    primaryBtn.addEventListener('click', () => handleButtonClick('Start Building', 'Redirecting...'));
}

if (secondaryBtn) {
    secondaryBtn.addEventListener('click', () => handleButtonClick('View Our Work', 'Coming soon!'));
}

if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        handleButtonClick('Contact Us', 'Scrolling to contact...');
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* ============================================
   INTERSECTION OBSERVER (FADE-IN)
   ============================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .arch-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

/* ============================================
   NAVBAR & PARALLAX EFFECTS
   ============================================ */
const navbar = document.querySelector('.navbar');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar Background Toggle
    if (navbar) {
        if (scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Hero Parallax
    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 1.2);
    }
});

/* ============================================
   MOUSE MOVEMENT EFFECT ON ORBS
   ============================================ */
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 30; // Centered offset
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 30;

    orbs.forEach((orb, index) => {
        const factor = (index + 1) * 0.5;
        orb.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
    });
});

/* ============================================
   ACTIVE NAVIGATION HIGHLIGHTING (Throttled)
   ============================================ */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const highlightActiveLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

        if (targetLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                targetLink.style.color = '#00d4ff';
            } else {
                targetLink.style.color = 'rgba(255, 255, 255, 0.7)';
            }
        }
    });
};

window.addEventListener('scroll', throttle(highlightActiveLink, 100));

/* ============================================
   PAGE LOAD & EXTERNAL LINKS
   ============================================ */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial state for load animation
document.body.style.transition = 'opacity 0.8s ease';
document.body.style.opacity = '0';

// External link safety
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

console.log('🤖 EMX AI Labs - Intelligent Systems Architecture Loaded');