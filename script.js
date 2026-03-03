// ========================= //
// NAVIGATION FUNCTIONS
// ========================= //
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(`${page}-page`).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[onclick="navigateTo('${page}')"]`).classList.add('active');
    
    // Scroll to top with smooth behavior
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Close mobile menu if open
    document.querySelector('.nav-menu').classList.remove('active');
    document.querySelector('.hamburger').classList.remove('active');
    
    // Add to history
    history.pushState({ page: page }, '', `#${page}`);
}

// ========================= //
// MOBILE MENU
// ========================= //
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// ========================= //
// NAVBAR SCROLL EFFECT
// ========================= //
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 249, 240, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 249, 240, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
});

// ========================= //
// ORDER FUNCTION
// ========================= //
function orderNow(item, price) {
    const message = `Halo kak, saya mau pesan *${item}* harga Rp ${price.toLocaleString('id-ID')}\n\nMohon info ketersediaan dan estimasi waktu pesanan ya kak 🙏`;
    const whatsappUrl = `https://wa.me/6289635620494?text=${encodeURIComponent(message)}`;
    
    // Add animation effect
    const btn = event.target;
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
        window.open(whatsappUrl, '_blank');
    }, 200);
}

// ========================= //
// FILTER MENU
// ========================= //
function filterMenu(category) {
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter menu items with animation
    const menuItems = document.querySelectorAll('.menu-card');
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8) translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        }, index * 50); // Staggered animation
    });
}

// ========================= //
// CONTACT FORM
// ========================= //
function sendMessage(event) {
    event.preventDefault();
    
    const name = event.target[0].value;
    const email = event.target[1].value;
    const message = event.target[2].value;
    
    const fullMessage = `Halo kak, saya *${name}* (${email})\n\nPesan: ${message}\n\nMohon direspon ya kak 🙏`;
    const whatsappUrl = `https://wa.me/6289635620494?text=${encodeURIComponent(fullMessage)}`;
    
    // Button animation
    const btn = event.target.querySelector('button');
    btn.textContent = 'Mengirim...';
    btn.disabled = true;
    
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        event.target.reset();
        btn.textContent = 'Kirim Pesan';
        btn.disabled = false;
        
        // Show success notification
        showNotification('Pesan berhasil dikirim! Terima kasih 🙏');
    }, 1000);
}

// ========================= //
// NOTIFICATION FUNCTION
// ========================= //
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-gradient);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification animation to style
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// ========================= //
// SMOOTH SCROLL
// ========================= //
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

// ========================= //
// INTERSECTION OBSERVER
// ========================= //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ========================= //
// LOADING ANIMATION
// ========================= //
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Selamat datang di Dapur Nirmala! 🍽️');
    }, 1000);
});

// ========================= //
// KEYBOARD NAVIGATION
// ========================= //
document.addEventListener('keydown', function(e) {
    // Alt + number for navigation
    if (e.altKey) {
        e.preventDefault();
        if (e.key === '1') navigateTo('home');
        if (e.key === '2') navigateTo('tentang');
        if (e.key === '3') navigateTo('menu');
        if (e.key === '4') navigateTo('kontak');
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        document.querySelector('.nav-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========================= //
// BROWSER BACK/FORWARD
// ========================= //
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        navigateTo(event.state.page);
    } else {
        navigateTo('home');
    }
});

// ========================= //
// INITIALIZE
// ========================= //
document.addEventListener('DOMContentLoaded', function() {
    // Check URL hash for initial page
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'tentang', 'menu', 'kontak'].includes(hash)) {
        navigateTo(hash);
    } else {
        navigateTo('home');
    }
    
    // Add history state
    history.replaceState({ page: 'home' }, '', '#home');
});

// ========================= //
// CLICK OUTSIDE TO CLOSE MOBILE MENU
// ========================= //
document.addEventListener('click', function(event) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========================= //
// TOUCH EVENTS FOR MOBILE
// ========================= //
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const pages = ['home', 'tentang', 'menu', 'kontak'];
    const currentPage = document.querySelector('.page.active').id.replace('-page', '');
    const currentIndex = pages.indexOf(currentPage);
    
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next page
        if (currentIndex < pages.length - 1) {
            navigateTo(pages[currentIndex + 1]);
        }
    }
    
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous page
        if (currentIndex > 0) {
            navigateTo(pages[currentIndex - 1]);
        }
    }
}

// ========================= //
// PARALLAX EFFECT
// ========================= //
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ========================= //
// LAZY LOADING FOR IMAGES
// ========================= //
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================= //
// DYNAMIC YEAR IN FOOTER
// ========================= //
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('footer p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Dapur Nirmala. Semua hak dilindungi.`;
    }
});