// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });
    
    // Active nav link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Form validation
            if (!name || !email || !message) {
                showFormAlert('Please fill in all required fields', 'danger');
                return;
            }
            
            // Here you would typically send data to a server
            // For now, just show success message
            showFormAlert('Thank you! Your message has been sent.', 'success');
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Function to show form submission alerts
    function showFormAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} mt-3 form-alert`;
        alertDiv.textContent = message;
        
        // Insert after form
        contactForm.insertAdjacentElement('afterend', alertDiv);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
    
    // Blog subscription button
    const subscribeBtn = document.querySelector('#blog .btn-outline-primary');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            // Could be replaced with a proper modal or form
            alert('Subscription feature coming soon! Stay tuned for updates.');
        });
    }
    
    // Initialize any tooltips if Bootstrap tooltip is used
    if (typeof(bootstrap) !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

// Three.js Neural Network Animation
class NeuralNetworkAnimation {
  constructor() {
    this.container = document.getElementById('three-container');
    this.mouseX = 0;
    this.mouseY = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    
    this.init();
  }
  
  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.z = 700;
    
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x0d0d0d, 1);
    this.container.appendChild(this.renderer.domElement);
    
    // Add particles (nodes)
    this.particles = new THREE.Object3D();
    this.scene.add(this.particles);
    this.particlesData = [];
    
    const particleCount = 150;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    const colorPrimary = new THREE.Color(0x00f0ff);
    const colorSecondary = new THREE.Color(0x39ff14);
    
    const particleGeometry = new THREE.BufferGeometry();
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Mix between primary and secondary colors
      const mixFactor = Math.random();
      const mixedColor = new THREE.Color().lerpColors(colorPrimary, colorSecondary, mixFactor);
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
      
      this.particlesData.push({
        velocity: new THREE.Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2
        ),
        numConnections: 0
      });
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 4,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    });
    
    this.points = new THREE.Points(particleGeometry, particleMaterial);
    this.particles.add(this.points);
    
    // Create connections (lines)
    this.linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.2
    });
    
    const linesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * particleCount * 3 * 2);
    const colors = new Float32Array(particleCount * particleCount * 3 * 2);
    
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    this.linesGeometry = linesGeometry;
    this.lines = new THREE.LineSegments(linesGeometry, this.linesMaterial);
    this.particles.add(this.lines);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00f0ff, 1, 1000);
    pointLight.position.set(0, 0, 100);
    this.scene.add(pointLight);
    
    // Add event listeners
    document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    
    // Start animation loop
    this.animate();
  }
  
  onMouseMove(event) {
    this.mouseX = event.clientX - this.windowHalfX;
    this.mouseY = event.clientY - this.windowHalfY;
  }
  
  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  updateParticles() {
    const posAttr = this.points.geometry.attributes.position;
    const positions = posAttr.array;
    
    for (let i = 0; i < positions.length / 3; i++) {
      const particleData = this.particlesData[i];
      
      // Apply velocity
      positions[i * 3] += particleData.velocity.x;
      positions[i * 3 + 1] += particleData.velocity.y;
      positions[i * 3 + 2] += particleData.velocity.z;
      
      // Boundary conditions
      if (positions[i * 3] < -1000) positions[i * 3] = 1000;
      if (positions[i * 3] > 1000) positions[i * 3] = -1000;
      
      if (positions[i * 3 + 1] < -1000) positions[i * 3 + 1] = 1000;
      if (positions[i * 3 + 1] > 1000) positions[i * 3 + 1] = -1000;
      
      if (positions[i * 3 + 2] < -1000) positions[i * 3 + 2] = 1000;
      if (positions[i * 3 + 2] > 1000) positions[i * 3 + 2] = -1000;
      
      // Reset connection count
      particleData.numConnections = 0;
    }
    
    posAttr.needsUpdate = true;
  }
  
  updateLines() {
    const maxConnections = 3;
    const limitDistance = 200;
    
    const particlePositions = this.points.geometry.attributes.position.array;
    const linePositions = this.linesGeometry.attributes.position.array;
    const lineColors = this.linesGeometry.attributes.color.array;
    
    const colorPrimary = new THREE.Color(0x00f0ff);
    const colorSecondary = new THREE.Color(0x39ff14);
    
    let lineIndex = 0;
    
    for (let i = 0; i < this.particlesData.length; i++) {
      const particleData = this.particlesData[i];
      
      // Limit connections per particle
      if (particleData.numConnections >= maxConnections) continue;
      
      const particlePosition = new THREE.Vector3(
        particlePositions[i * 3],
        particlePositions[i * 3 + 1],
        particlePositions[i * 3 + 2]
      );
      
      // Check connections with other particles
      for (let j = i + 1; j < this.particlesData.length; j++) {
        const particleDataB = this.particlesData[j];
        
        if (particleDataB.numConnections >= maxConnections) continue;
        
        const particlePositionB = new THREE.Vector3(
          particlePositions[j * 3],
          particlePositions[j * 3 + 1],
          particlePositions[j * 3 + 2]
        );
        
        const distance = particlePosition.distanceTo(particlePositionB);
        
        if (distance < limitDistance) {
          // Create line between particles
          linePositions[lineIndex++] = particlePosition.x;
          linePositions[lineIndex++] = particlePosition.y;
          linePositions[lineIndex++] = particlePosition.z;
          
          linePositions[lineIndex++] = particlePositionB.x;
          linePositions[lineIndex++] = particlePositionB.y;
          linePositions[lineIndex++] = particlePositionB.z;
          
          // Add connection count
          particleData.numConnections++;
          particleDataB.numConnections++;
          
          // Line color based on distance
          const alpha = 1.0 - distance / limitDistance;
          const colorIndex = (lineIndex - 6) * 3;
          
          // Mix colors based on distance
          const mixFactor = distance / limitDistance;
          const mixedColor = new THREE.Color().lerpColors(colorPrimary, colorSecondary, mixFactor);
          
          lineColors[colorIndex] = mixedColor.r;
          lineColors[colorIndex + 1] = mixedColor.g;
          lineColors[colorIndex + 2] = mixedColor.b;
          
          lineColors[colorIndex + 3] = mixedColor.r;
          lineColors[colorIndex + 4] = mixedColor.g;
          lineColors[colorIndex + 5] = mixedColor.b;
        }
      }
    }
    
    // Hide unused line segments
    for (let i = lineIndex; i < linePositions.length; i++) {
      linePositions[i] = 0;
    }
    
    this.linesGeometry.attributes.position.needsUpdate = true;
    this.linesGeometry.attributes.color.needsUpdate = true;
    this.linesGeometry.setDrawRange(0, lineIndex / 3);
  }
  
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    this.updateParticles();
    this.updateLines();
    
    // Update camera position based on mouse
    this.camera.position.x += (this.mouseX * 0.05 - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouseY * 0.05 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);
    
    // Rotate the particles
    this.particles.rotation.y += 0.0005;
    
    this.renderer.render(this.scene, this.camera);
  }
}

// Custom Cursor
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.custom-cursor');
    this.links = document.querySelectorAll('a, button, .btn, input, textarea');
    this.isVisible = false;
    
    this.init();
  }
  
  init() {
    // Show custom cursor after small delay to prevent initial flash
    setTimeout(() => {
      this.cursor.classList.add('active');
      this.isVisible = true;
    }, 500);
    
    // Mouse movement
    document.addEventListener('mousemove', (e) => {
      if (!this.isVisible) return;
      
      this.cursor.style.left = `${e.clientX}px`;
      this.cursor.style.top = `${e.clientY}px`;
    });
    
    // Cursor hover effects
    this.links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
      });
      
      link.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
      });
    });
    
    // Hide on window blur
    window.addEventListener('blur', () => {
      this.cursor.style.opacity = 0;
    });
    
    // Show on window focus
    window.addEventListener('focus', () => {
      this.cursor.style.opacity = 1;
    });
  }
}

// Typewriter Effect
class TypewriterEffect {
  constructor(elementId, words, typeSpeed = 100, backSpeed = 50, backDelay = 2000) {
    this.element = document.getElementById(elementId);
    if (!this.element) return;
    
    this.words = words;
    this.typeSpeed = typeSpeed;
    this.backSpeed = backSpeed;
    this.backDelay = backDelay;
    
    this.txt = '';
    this.wordIndex = 0;
    this.isDeleting = false;
    this.isWaiting = false;
    
    this.type();
  }
  
  type() {
    const currentIndex = this.wordIndex % this.words.length;
    const fullTxt = this.words[currentIndex];
    
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    
    this.element.innerHTML = `<span class="wrap">${this.txt}</span>`;
    
    let typeSpeed = this.typeSpeed;
    
    if (this.isDeleting) {
      typeSpeed = this.backSpeed;
    }
    
    // Switch to next word
    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.backDelay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Terminal Typewriter Effect
class TerminalTypewriterEffect {
  constructor(elementId, messages, typeSpeed = 50) {
    this.element = document.getElementById(elementId);
    if (!this.element) return;
    
    this.messages = messages;
    this.typeSpeed = typeSpeed;
    this.messageIndex = 0;
    this.currentText = '';
    this.isDeleting = false;
    this.isWaiting = false;
    
    this.type();
  }
  
  type() {
    // Current message
    const currentMessage = this.messages[this.messageIndex % this.messages.length];
    
    // Determine text to display
    if (this.isDeleting) {
      this.currentText = currentMessage.substring(0, this.currentText.length - 1);
    } else {
      this.currentText = currentMessage.substring(0, this.currentText.length + 1);
    }
    
    // Update element
    this.element.textContent = this.currentText;
    
    // Type speed
    let typeSpeed = this.typeSpeed;
    
    // If complete, start deleting after delay
    if (!this.isDeleting && this.currentText === currentMessage) {
      typeSpeed = this.typeSpeed * 5; // Pause at the end
      this.isWaiting = true;
      setTimeout(() => {
        this.isWaiting = false;
        this.isDeleting = true;
        this.type();
      }, 2000);
      return;
    }
    
    // If deleted, move to next message
    if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      this.messageIndex++;
      typeSpeed = 500; // Pause before typing next message
    }
    
    // Continue typing if not waiting
    if (!this.isWaiting) {
      setTimeout(() => this.type(), typeSpeed);
    }
  }
}

// Dark Mode Toggle
class ThemeToggle {
  constructor() {
    this.toggler = document.querySelector('.theme-toggle');
    this.body = document.body;
    this.icon = this.toggler.querySelector('i');
    this.isDark = true; // Start in dark mode for the cyberpunk theme
    
    this.init();
  }
  
  init() {
    this.toggler.addEventListener('click', () => this.toggle());
  }
  
  toggle() {
    if (this.isDark) {
      this.body.classList.add('light-mode');
      this.body.classList.remove('dark-mode');
      this.icon.classList.remove('fa-moon');
      this.icon.classList.add('fa-sun');
    } else {
      this.body.classList.add('dark-mode');
      this.body.classList.remove('light-mode');
      this.icon.classList.remove('fa-sun');
      this.icon.classList.add('fa-moon');
    }
    this.isDark = !this.isDark;
  }
}

// Scroll Animations
const scrollAnimations = {
  init() {
    const sections = document.querySelectorAll('section');
    
    // Add scroll-reveal class to all sections
    sections.forEach(section => {
      section.classList.add('scroll-reveal');
    });
    
    // Check position on scroll
    window.addEventListener('scroll', () => {
      const scrollPos = window.pageYOffset + window.innerHeight * 0.8;
      
      sections.forEach(section => {
        if (scrollPos > section.offsetTop) {
          section.classList.add('revealed');
        }
      });
    });
    
    // Trigger initial check
    window.dispatchEvent(new Event('scroll'));
  }
};

// Document Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Three.js animation
  const neuralNetwork = new NeuralNetworkAnimation();
  
  // Initialize custom cursor
  const cursor = new CustomCursor();
  
  // Initialize navbar effects
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Initialize AOS animations
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out',
    disable: 'mobile'
  });
  
  // Initialize typewriter effect
  const subtitle = document.getElementById('hero-subtitle');
  if (subtitle) {
    const typewriter = new TypewriterEffect(
      'hero-subtitle', 
      ['Cybersecurity Researcher', 'Full-Stack Developer', 'GSoC Aspirant'],
      100,
      50,
      2000
    );
  }
  
  // Initialize terminal typewriter effect
  const terminalText = document.getElementById('terminal-text');
  if (terminalText) {
    const terminalTypewriter = new TerminalTypewriterEffect('terminal-text', [
      'connecting to Aditya...',
      'access granted',
      'cybersecurity researcher detected',
      'loading skills...',
      'initializing connection...',
      'ready for collaboration'
    ], 80);
  }
  
  // Initialize theme toggle
  const themeToggle = new ThemeToggle();
  
  // Initialize scroll animations
  scrollAnimations.init();
});