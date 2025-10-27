/**
 * ReelNews AI ChatBot - Custom JavaScript
 * Handles additional functionality and interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('ReelNews AI ChatBot initialized');

    // Smooth scroll for navigation links
    initSmoothScroll();

    // Add scroll animations
    initScrollAnimations();

    // Track page interactions
    trackUserInteractions();
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

/**
 * Function to programmatically open the chat
 * Can be called from buttons or other interactions
 */
function openChat() {
    // The n8n chat widget typically adds a chat toggle button
    // We'll try to find and click it
    setTimeout(() => {
        const chatButton = document.querySelector('[data-n8n-chat-button], .n8n-chat-button, #n8n-chat');
        if (chatButton) {
            chatButton.click();
        } else {
            console.log('Chat widget is loading or already open');
            // If the chat widget hasn't loaded yet, show a message
            showNotification('Chat is loading... Please wait a moment and try again.');
        }
    }, 500);
}

/**
 * Show a notification message to the user
 */
function showNotification(message, duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #6366f1;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

/**
 * Track user interactions for analytics
 */
function trackUserInteractions() {
    // Track button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('CTA button clicked:', this.textContent);
            // You can integrate with analytics services here
        });
    });

    // Track navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Navigation clicked:', this.textContent);
        });
    });
}

/**
 * Add CSS animations
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

/**
 * Handle chat widget events (if supported by n8n chat)
 */
window.addEventListener('load', function() {
    // Check if chat widget is loaded
    setTimeout(() => {
        if (window.n8nChat) {
            console.log('n8n Chat widget loaded successfully');

            // You can listen to chat events if the widget supports it
            // This depends on the n8n chat widget API
        }
    }, 2000);
});

/**
 * Expose openChat function globally so it can be called from HTML
 */
window.openChat = openChat;
