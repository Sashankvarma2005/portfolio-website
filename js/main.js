// ========================================
// Mobile Navigation
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// Portfolio Filter
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// Active Navigation Link on Scroll
// ========================================

const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('class');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Set active based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Contact Form Submission
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const formMessage = document.getElementById('formMessage');

        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Send form data (you can integrate with a backend service here)
        try {
            // Simulate form submission
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();

            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('success', 'error');
            }, 5000);
        } catch (error) {
            showFormMessage('Error sending message. Please try again.', 'error');
        }
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.classList.remove('success', 'error');
    formMessage.classList.add(type);
}

// ========================================
// FAQ Accordion
// ========================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ========================================
// Scroll to Top Button
// ========================================

function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show button when scrolled down
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
            scrollToTopBtn.style.alignItems = 'center';
            scrollToTopBtn.style.justifyContent = 'center';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'scale(1.1)';
    });

    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'scale(1)';
    });
}

createScrollToTopButton();

// ========================================
// Intersection Observer for Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply observer to cards and elements
document.querySelectorAll('.project-card, .education-item, .portfolio-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// Animate Skill Bars on View
// ========================================

const skillProgress = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            // Animation already handled by CSS
        }
    });
}, { threshold: 0.5 });

document.querySelector('.skills-section') && skillObserver.observe(document.querySelector('.skills-section'));

// ========================================
// Prevent Multiple Form Submissions
// ========================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn.disabled) {
            e.preventDefault();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }, 2000);
    });
}

// ========================================
// Dark mode toggle (optional)
// ========================================

function initDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.style.colorScheme = 'dark';
    }
}

initDarkMode();

// ========================================
// Analytics or Custom Events
// ========================================

function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // You can integrate with Google Analytics or other services here
}

// Track page views
window.addEventListener('load', () => {
    trackEvent('pageView', {
        page: window.location.pathname,
        title: document.title
    });
});

// Track link clicks
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('linkClick', {
            href: link.href,
            text: link.textContent
        });
    });
});

// ========================================
// Initialize all functions on DOM load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded!');

    // Set current page active in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
});