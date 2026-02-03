// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL ON NAV LINK CLICK
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// REVEAL ON SCROLL ANIMATION
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to reveal cards on scroll
document.querySelectorAll('.reveal-card').forEach(card => {
    observer.observe(card);
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.7)';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Create mailto link (alternative approach for static forms)
        const mailtoLink = `mailto:projeto.vidasemrestricio@ifpr.edu.br?subject=Mensagem do Site Vida Sem Restrição&body=Nome: ${encodeURIComponent(name)}%0AE-mail: ${encodeURIComponent(email)}%0A%0AMensagem:%0A${encodeURIComponent(message)}`;

        // Display success message
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Mensagem enviada com sucesso!';
        submitButton.style.background = 'linear-gradient(135deg, #27ae60, #16a085)';

        // Reset form
        contactForm.reset();

        // Restore button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);

        // Uncomment the line below if you have a backend endpoint
        // await sendFormData(name, email, message);

        // Alternative: Open default email client
        // window.location.href = mailtoLink;
    });
}

// ============================================
// FORM VALIDATION ON INPUT
// ============================================

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

if (nameInput) {
    nameInput.addEventListener('blur', function () {
        if (this.value.trim() === '') {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '';
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('blur', function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '';
        }
    });
}

// ============================================
// ACTIVE NAV LINK INDICATOR
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = '#2ecc71';
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// PARALLAX EFFECT (SUBTLE)
// ============================================

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ============================================
// INTERSECTION OBSERVER FOR CARD ANIMATIONS
// ============================================

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.glass-card').forEach(card => {
    cardObserver.observe(card);
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Add keyboard shortcut for main sections
    if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
            case '1':
                document.querySelector('#inicio').scrollIntoView({ behavior: 'smooth' });
                break;
            case '2':
                document.querySelector('#projeto').scrollIntoView({ behavior: 'smooth' });
                break;
            case '3':
                document.querySelector('#sobre').scrollIntoView({ behavior: 'smooth' });
                break;
            case '4':
                document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

// ============================================
// BACK TO TOP BUTTON (Optional)
// ============================================

function createBackToTopButton() {
    const button = document.createElement('button');
    button.id = 'backToTop';
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2ecc71, #3498db);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
createBackToTopButton();

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
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

// Format text input to title case
function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Projeto Vida Sem Restrição - Website Carregado');

    // Add any additional initialization code here
    // Example: Load external data, setup additional listeners, etc.
});

// ============================================
// OPTIONAL: FORM DATA SUBMISSION (Backend Integration)
// ============================================


async function sendFormData(name, email, message) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            })
        });

        if (response.ok) {
            console.log('Mensagem enviada com sucesso!');
            return true;
        } else {
            console.error('Erro ao enviar mensagem');
            return false;
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        return false;
    }
}


// ============================================
// ANALYTICS (Optional - Google Analytics integration)
// ============================================


window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');

// Track page sections
document.querySelectorAll('section[id]').forEach(section => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gtag('event', 'page_section_view', {
                    section_name: entry.target.id
                });
            }
        });
    });
    observer.observe(section);
});
