// ==================== PDF Download Function ====================
function downloadResume(e) {
    if (e) e.preventDefault();
    
    // Create a link to download from public folder
    const resumePath = './public/RiyaUpadhyay_AI-1.pdf';
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'RiyaUpadhyay_AI-1.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ==================== Smooth Scrolling & Active Navigation ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Navbar Functionality ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== Navbar Background on Scroll ====================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== Active Navigation Link ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-primary)';
        }
    });
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and other elements
document.querySelectorAll('.project-card, .cert-card, .volunteer-card, .skill-category').forEach(el => {
    observer.observe(el);
});

// ==================== Contact Form Handling ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const button = contactForm.querySelector('button');
        const originalHTML = button.innerHTML;
        
        // Show success message
        button.innerHTML = '<span>✓ Message Sent!</span>';
        button.style.background = 'linear-gradient(135deg, #00c853, #00e676)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
        }, 3000);
    });
}

// ==================== Skill Progress Animation ====================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// ==================== Typing Animation Effect ====================
function typeEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typing effect to hero title (optional - uncomment to use)
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle && heroTitle.textContent) {
//     const titleText = heroTitle.textContent;
//     typeEffect(heroTitle, titleText, 30);
// }

// ==================== Counter Animation ====================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stat boxes and animate counters
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            const text = h3.textContent;
            
            // Extract number from text
            const number = parseFloat(text);
            if (!isNaN(number)) {
                animateCounter(h3, number);
            }
            
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(box => {
    statObserver.observe(box);
});

// ==================== Parallax Effect ====================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// ==================== Tooltip Functionality ====================
const tooltips = document.querySelectorAll('[title]');
tooltips.forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('title');
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            white-space: nowrap;
            pointer-events: none;
            z-index: 1000;
        `;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    });

    element.addEventListener('mouseleave', function() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// ==================== Print Functionality ====================
function printResume() {
    window.print();
}

// Add keyboard shortcut for print (Ctrl+P handled by browser)

// ==================== Dark Mode Toggle (Optional) ====================
function toggleDarkMode() {
    const html = document.documentElement;
    html.style.colorScheme = html.style.colorScheme === 'dark' ? 'light' : 'dark';
}

// ==================== Scroll to Top Button ====================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0066ff, #00d4ff);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 15px rgba(0, 102, 255, 0.4);
        transition: all 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 25px rgba(0, 102, 255, 0.6)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 15px rgba(0, 102, 255, 0.4)';
    });
}

createScrollToTopButton();

// ==================== Page Load Animation ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== Lazy Loading Images ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
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

// ==================== Debugging/Console Messages ====================
console.log('%cWelcome to Riya Upadhyay\'s Portfolio!', 'font-size: 20px; color: #0066ff; font-weight: bold;');
console.log('%cFeel free to connect on LinkedIn or GitHub!', 'font-size: 14px; color: #00d4ff;');

// ==================== Add More Interactivity ====================
// Highlight text on selection
document.addEventListener('selectstart', () => {
    document.body.style.userSelect = 'text';
});

// Prevent right-click context menu (optional - comment out if you want it)
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// ==================== Mobile Responsive Enhancements ====================
if (window.innerWidth <= 768) {
    // Add mobile-specific optimizations
    document.querySelectorAll('.social-links a').forEach(link => {
        link.style.width = '40px';
        link.style.height = '40px';
    });
}

// Listen for window resize
window.addEventListener('resize', () => {
    // Re-calculate responsive elements if needed
    const width = window.innerWidth;
    if (width <= 768) {
        // Mobile adjustments
    } else {
        // Desktop adjustments
    }
});

// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Initialize all elements
    const sections = document.querySelectorAll('section');
    console.log(`Found ${sections.length} sections`);
});
