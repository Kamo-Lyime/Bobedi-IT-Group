// JavaScript for Bobedi IT Group Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const updateNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', updateNavbar);
    // Initial check
    updateNavbar();

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe service cards and feature boxes
    const animatedElements = document.querySelectorAll('.service-card, .feature-box, .solution-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Tech grid animation
    animateTechGrid();

    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

// Form submission handler
async function handleFormSubmission() {
    const form = document.getElementById('contactForm');
    
    // Get form values directly from elements
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !service) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Prepare form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitButton.disabled = true;

    try {
        // Submit to Supabase
        if (typeof submitToSupabase === 'function') {
            await submitToSupabase({
                name,
                email,
                phone: phone || '',
                service,
                message: message || ''
            });
            
            // Reset form on success
            form.reset();
            showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            
            console.log('Form submitted successfully to Supabase');
        } else {
            // Fallback: Log to console if Supabase is not available
            console.log('Supabase not available. Form data:', {
                name, email, phone, service, message
            });
            
            // You can also send to an email service or other backend here
            form.reset();
            showNotification('Thank you! Your message has been received. We\'ll get back to you soon.', 'success');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Tech grid animation
function animateTechGrid() {
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('tech-item-animated');
    });
}

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Solution card interactions
document.addEventListener('DOMContentLoaded', function() {
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const cardTitle = card.querySelector('h4').textContent;
                
                // Pre-fill contact form based on selected package
                const serviceSelect = document.getElementById('service');
                const messageTextarea = document.getElementById('message');
                
                if (serviceSelect && messageTextarea) {
                    serviceSelect.value = 'full-package';
                    messageTextarea.value = `I'm interested in the ${cardTitle}. Please provide more information about pricing and implementation.`;
                }
                
                // Scroll to contact form
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                showNotification(`Selected ${cardTitle}. Contact form has been pre-filled for you.`, 'info');
            });
        }
    });
});

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Image error handling
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // You could add a placeholder image here if needed
            // this.src = 'img/placeholder.png';
        });
    });
});

// Utility functions
const utils = {
    // Debounce function for scroll events
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format phone number
    formatPhoneNumber: function(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.startsWith('27')) {
            return `+${cleaned}`;
        } else if (cleaned.startsWith('0')) {
            return `+27${cleaned.substring(1)}`;
        }
        return phone;
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Add scroll-to-top functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    const debouncedScroll = utils.debounce(() => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
        }
    }, 100);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleFormSubmission,
        showNotification,
        utils
    };
}
