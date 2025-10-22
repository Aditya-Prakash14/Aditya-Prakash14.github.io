// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].style.transform = navMenu.classList.contains('active') ? 
        'rotate(-45deg) translate(-5px, 6px)' : 'none';
    bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    bars[2].style.transform = navMenu.classList.contains('active') ? 
        'rotate(45deg) translate(-5px, -6px)' : 'none';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(20, 29, 43, 0.98)';
    } else {
        navbar.style.background = 'rgba(20, 29, 43, 0.95)';
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
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

// Observe all sections for animation
document.querySelectorAll('section > .container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Skill cards animation
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Project cards animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Terminal typing effect for hero section
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const text = typingElement.textContent;
        setTimeout(() => {
            typeEffect(typingElement, text, 50);
        }, 1000);
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create terminal-style alert
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #273c2c;
            border: 2px solid #9fef00;
            padding: 20px;
            border-radius: 8px;
            color: #9fef00;
            font-family: 'Share Tech Mono', monospace;
            z-index: 10000;
            animation: slideInRight 0.5s ease;
            box-shadow: 0 0 20px rgba(159, 239, 0, 0.3);
        `;
        
        alertDiv.innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong>[SUCCESS]</strong> Message Sent!
            </div>
            <div style="font-size: 0.9rem; color: #a4b1cd;">
                Thank you, ${name}! Your message has been received.
            </div>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 500);
        }, 5000);
        
        // Reset form
        contactForm.reset();
        
        // Log to console (in a real application, you would send this to a server)
        console.log('Form submitted:', { name, email, message });
    });
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--htb-green);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Matrix rain effect (optional - can be enabled/disabled)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.1';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height;
    }

    function draw() {
        ctx.fillStyle = 'rgba(20, 29, 43, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#9fef00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Uncomment to enable matrix rain effect
    // setInterval(draw, 33);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize matrix rain (commented out by default for performance)
// createMatrixRain();

// Cursor trail effect
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
    
    // Remove old trail points
    cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 1000);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate matrix rain effect
        createMatrixRain();
        
        // Show message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #273c2c;
            border: 2px solid #9fef00;
            padding: 30px;
            border-radius: 8px;
            color: #9fef00;
            font-family: 'Share Tech Mono', monospace;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 0 30px rgba(159, 239, 0, 0.5);
        `;
        message.innerHTML = `
            <h2 style="margin-bottom: 15px;">🎮 KONAMI CODE ACTIVATED! 🎮</h2>
            <p>Matrix mode enabled!</p>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.transition = 'opacity 0.5s';
            message.style.opacity = '0';
            setTimeout(() => document.body.removeChild(message), 500);
        }, 3000);
        
        konamiCode = [];
    }
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('%c┌──(root㉿portfolio)-[~]', 'color: #9fef00; font-family: monospace; font-size: 14px;');
console.log('%c└─$ Welcome to my portfolio!', 'color: #9fef00; font-family: monospace; font-size: 14px;');
console.log('%cType "help" for available commands... just kidding! 😄', 'color: #a4b1cd; font-family: monospace; font-size: 12px;');
