// Typewriter Effect
function typeWriter(text, element, speed = 120) {
    let i = 0;
    element.innerHTML = '';
    element.classList.add('typing');
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove typing class, cursor will continue blinking via CSS
            element.classList.remove('typing');
        }
    }
    
    // Start typing immediately
    type();
}

// Initialize typewriter effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        // Start typing after a short delay to allow page to fully load
        setTimeout(() => {
            // Clear content and start typing animation
            typewriterElement.innerHTML = '';
            typeWriter('William Ni', typewriterElement, 120);
        }, 1200);
    }
});

// Photo Gallery Data - Add your own photos here
const photos = [
    {
        src: 'assets/images/gallery/hku-campus.jpg',
        alt: 'HKU Campus Life',
        category: 'personal',
        caption: 'Beautiful moments at The University of Hong Kong campus'
    },
    {
        src: 'assets/images/gallery/research-lab.jpg',
        alt: 'Bioinformatics Research',
        category: 'work',
        caption: 'Working on genomics data analysis in the research lab'
    },
    {
        src: 'assets/images/gallery/aia-internship.jpg',
        alt: 'AIA Internship',
        category: 'work',
        caption: 'Great experience during my internship at AIA P&H Analytics'
    },
    {
        src: 'assets/images/gallery/flutter-development.jpg',
        alt: 'Flutter App Development',
        category: 'work',
        caption: 'Working on the Revita health app with Flutter and Figma'
    },
    {
        src: 'assets/images/gallery/coding-session.jpg',
        alt: 'Late Night Coding',
        category: 'work',
        caption: 'Deep into bioinformatics analysis and algorithm development'
    },
    {
        src: 'assets/images/gallery/hong-kong-life.jpg',
        alt: 'Hong Kong Life',
        category: 'personal',
        caption: 'Enjoying the vibrant life in Hong Kong'
    },
    {
        src: 'assets/images/gallery/teaching-moments.jpg',
        alt: 'Teaching Science',
        category: 'work',
        caption: 'Tutoring students and sharing knowledge in science subjects'
    },
    {
        src: 'assets/images/gallery/friends-university.jpg',
        alt: 'University Friends',
        category: 'personal',
        caption: 'Good times with friends during university life'
    },
    {
        src: 'assets/images/gallery/data-visualization.jpg',
        alt: 'Data Analysis Work',
        category: 'work',
        caption: 'Creating visualizations and insights from genomics data'
    }
];

// Global Variables
let currentPhotoIndex = 0;
let filteredPhotos = [...photos];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const galleryGrid = document.getElementById('gallery-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('photo-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeGallery();
    initializeModal();
    initializeScrollAnimations();
    initializeTypingEffect();
    initializeLazyLoading();
    initializeThemeToggle();
    initializePerformanceMonitoring();
    handleContactForm();
    animateStats();
});

// Navigation Functions
function initializeNavigation() {
    // Logo click to scroll to top
    const navLogo = document.querySelector('.nav-logo a');
    if (navLogo) {
        navLogo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navMenu.classList.remove('active');
            
            // Add click animation
            addClickAnimation(link);
            
            // Add ripple effect
            createRippleEffect(e, link);
        });
    });
    
    // Enhanced active navigation state management with better alignment
    const sections = document.querySelectorAll('section[id], .hero');
    const navObserver = new IntersectionObserver((entries) => {
        let maxVisibleSection = null;
        let maxVisibleRatio = 0;
        
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > maxVisibleRatio) {
                maxVisibleSection = entry.target;
                maxVisibleRatio = entry.intersectionRatio;
            }
        });
        
        if (maxVisibleSection) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Determine which section is most visible
            let sectionId = maxVisibleSection.id;
            if (maxVisibleSection.classList.contains('hero')) {
                sectionId = 'home';
            }
            
            // Add active class to corresponding nav link
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink && activeLink.classList.contains('nav-link')) {
                activeLink.classList.add('active');
                
                // Add glass glow effect to active link
                activeLink.style.setProperty('--glow-intensity', '1');
            }
        }
    }, {
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
        rootMargin: '-10% 0px -10% 0px'
    });
    
    sections.forEach(section => navObserver.observe(section));
    

    
    // Smooth scrolling for internal navigation links with proper page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Check if it's an internal anchor link (starts with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Immediate visual feedback on click
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
                
                // Scroll to target section
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            } else if (href.includes('#')) {
                // Handle links to other pages with anchors (like index.html#contact)
                // Let the browser handle the navigation naturally
                // Don't prevent default for external page navigation
            } else {
                // Regular page navigation - let it proceed normally
                // Don't prevent default for page changes
            }
        });
    });
    
    // Update active nav link on scroll (backup for scroll behavior)
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    hamburger.classList.toggle('active');
}



// Gallery Functions
function initializeGallery() {
    renderGallery(photos);
    
    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
}

function handleFilterClick(e) {
    const filter = e.target.dataset.filter;
    
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter and render photos
    if (filter === 'all') {
        filteredPhotos = [...photos];
    } else {
        filteredPhotos = photos.filter(photo => photo.category === filter);
    }
    
    renderGallery(filteredPhotos);
}

function renderGallery(photosToRender) {
    galleryGrid.innerHTML = '';
    
    photosToRender.forEach((photo, index) => {
        const galleryItem = createGalleryItem(photo, index);
        galleryGrid.appendChild(galleryItem);
    });
}

function createGalleryItem(photo, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item fade-in-up';
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
        <img src="${photo.src}" alt="${photo.alt}" loading="lazy" onerror="handleImageError(this)">
        <div class="gallery-overlay">
            <i class="fas fa-expand"></i>
        </div>
    `;
    
    // Add click event to open modal
    div.addEventListener('click', () => openModal(index));
    
    return div;
}

// Handle image loading errors
function handleImageError(img) {
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEyMi4zODYgMTAwIDEwMCAxMjIuMzg2IDEwMCAxNTBTMTIyLjM4NiAyMDAgMTUwIDIwMFMyMDAgMTc3LjYxNCAyMDAgMTUwUzE3Ny42MTQgMTAwIDE1MCAxMDBaIiBmaWxsPSIjRDFENUQ5Ii8+CjxwYXRoIGQ9Ik0xMzUgMTM1SDE2NVYxNjVIMTM1VjEzNVoiIGZpbGw9IiNGM0Y0RjYiLz4KPC9zdmc+';
    img.alt = 'Image placeholder - Replace with your photo';
}

// Modal Functions
function initializeModal() {
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', showPreviousPhoto);
    modalNext.addEventListener('click', showNextPhoto);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                showPreviousPhoto();
            } else if (e.key === 'ArrowRight') {
                showNextPhoto();
            }
        }
    });
}

function openModal(photoIndex) {
    currentPhotoIndex = photoIndex;
    const photo = filteredPhotos[photoIndex];
    
    modalImg.src = photo.src;
    modalImg.alt = photo.alt;
    modalCaption.textContent = photo.caption;
    modal.style.display = 'block';
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPreviousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    updateModalPhoto();
}

function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
    updateModalPhoto();
}

function updateModalPhoto() {
    const photo = filteredPhotos[currentPhotoIndex];
    modalImg.src = photo.src;
    modalImg.alt = photo.alt;
    modalCaption.textContent = photo.caption;
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .timeline-content, .stat-card, .contact-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Typing Effect for Hero Title
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const nameSpan = heroTitle.querySelector('.highlight');
    
    if (nameSpan) {
        const name = nameSpan.textContent;
        const prefix = "Hello, I'm ";
        
        heroTitle.innerHTML = prefix + '<span class="highlight"></span>';
        const highlightSpan = heroTitle.querySelector('.highlight');
        
        let i = 0;
        function typeWriter() {
            if (i < name.length) {
                highlightSpan.textContent += name.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const parallaxSpeed = 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Smooth Reveal Animation for Stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent.trim();
                
                // Only animate if it's a pure number (like "5") - skip "Year 3", "3.61", etc.
                const isSimpleNumber = /^\d+$/.test(text);
                
                if (isSimpleNumber) {
                    const finalNumber = parseInt(text);
                    let currentNumber = 0;
                    const increment = finalNumber / 50;
                    
                    const updateNumber = () => {
                        if (currentNumber < finalNumber) {
                            currentNumber += increment;
                            target.textContent = Math.floor(currentNumber) + '+';
                            requestAnimationFrame(updateNumber);
                        } else {
                            target.textContent = finalNumber + '+';
                        }
                    };
                    
                    updateNumber();
                }
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Initialize stats animation
// Stats animation moved to main DOMContentLoaded

// Contact Form Handler (if you add a contact form later)
function handleContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Contact form submitted:', data);
        
        // Show success message
        showNotification('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Theme Toggle (Optional - for dark mode)
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}



// Navigation Click Animation Functions
function addClickAnimation(element) {
    // Add clicked class for animation
    element.classList.add('clicked');
    
    // Remove the class after animation
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 300);
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// All features now initialized in main DOMContentLoaded above

// Export functions for testing (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        photos,
        renderGallery,
        openModal,
        closeModal,
        showNotification
    };
}
