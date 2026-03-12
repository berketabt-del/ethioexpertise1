// ===== MAIN JAVASCRIPT FILE =====

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Animate stats numbers
    animateStats();
});

// ===== LOGIN/SIGNUP FUNCTIONS =====

// Switch between login and signup tabs
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabs = document.querySelectorAll('.tab-btn');
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        tabs[1].classList.add('active');
        tabs[0].classList.remove('active');
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    // Reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    
    // Validation
    let isValid = true;
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        isValid = false;
    }
    
    if (isValid) {
        // Simulate login success
        // In a real app, this would make an API call
        alert('Login successful! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
    }
    
    return false;
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const terms = document.querySelector('input[name="terms"]').checked;
    
    // Validation
    if (fullname.trim().length < 2) {
        alert('Please enter your full name');
        return false;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return false;
    }
    
    if (!password.match(/[0-9]/) || !password.match(/[a-zA-Z]/)) {
        alert('Password must contain at least one letter and one number');
        return false;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }
    
    if (!terms) {
        alert('You must agree to the Terms of Service');
        return false;
    }
    
    // Simulate signup success
    alert('Account created successfully! Please login.');
    switchTab('login');
    
    return false;
}

// ===== CONTACT PAGE FUNCTIONS =====

// Character counter for message
function countChars() {
    const message = document.getElementById('message');
    const count = message.value.length;
    document.getElementById('charCount').textContent = count + '/500 characters';
    
    if (count > 500) {
        message.value = message.value.substring(0, 500);
        document.getElementById('charCount').textContent = '500/500 characters';
    }
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return false;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Show success message
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    
    // In a real app, this would send the data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    return false;
}

// ===== FAQ TOGGLE =====
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// ===== TESTIMONIAL SLIDER =====
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Auto advance slides every 5 seconds
setInterval(nextSlide, 5000);

// ===== STATS ANIMATION =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50; // Divide animation into 50 steps
        
        function updateNumber() {
            const current = parseInt(stat.innerText);
            
            if (current < target) {
                stat.innerText = Math.ceil(current + increment);
                setTimeout(updateNumber, 30);
            } else {
                stat.innerText = target;
            }
        }
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
}

// ===== DASHBOARD FUNCTIONS =====
function switchDashboardTab(tab) {
    const tabs = document.querySelectorAll('.dashboard-tab');
    const menuItems = document.querySelectorAll('.dashboard-sidebar li');
    
    tabs.forEach(t => t.classList.remove('active'));
    menuItems.forEach(item => item.classList.remove('active'));
    
    document.getElementById(tab + '-tab').classList.add('active');
    
    // Highlight active menu item
    menuItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(tab)) {
            item.classList.add('active');
        }
    });
}

// Set welcome message based on time of day
function setWelcomeMessage() {
    const hour = new Date().getHours();
    const welcomeSpan = document.querySelector('.welcome-user span');
    
    if (welcomeSpan) {
        let greeting = 'Good ';
        if (hour < 12) greeting += 'Morning';
        else if (hour < 18) greeting += 'Afternoon';
        else greeting += 'Evening';
        
        welcomeSpan.innerHTML = `${greeting}, <strong>John Doe</strong>`;
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'login.html';
    }
}

// ===== PORTFOLIO FILTER (for portfolio.html) =====
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// ===== PAGE SPECIFIC INITIALIZATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonial slider
    showSlide(0);
    
    // Set welcome message on dashboard
    setWelcomeMessage();
    
    // Check URL hash for signup tab
    if (window.location.hash === '#signup') {
        switchTab('signup');
    }
    
    // Add animation on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.service-card, .project-card, .team-member').forEach(el => {
        animateOnScroll.observe(el);
    });
});

// ===== FORM VALIDATION UTILITIES =====
function validateEmail(email) {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

function validatePassword(password) {
    return password.length >= 8 && /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
}

// ===== LOCAL STORAGE HELPERS (for demo without backend) =====
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// ===== DEMO DATA INITIALIZATION =====
// This simulates having some data without a database
function initDemoData() {
    if (!getFromLocalStorage('users')) {
        saveToLocalStorage('users', [
            { email: 'demo@aliexpertise.com', password: 'demo123', name: 'Demo User' }
        ]);
    }
}

// Call this when the app starts
initDemoData();
// ===== PORTFOLIO FILTER FUNCTION =====
function filterProjects(category) {
    const projects = document.querySelectorAll('.portfolio-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || 
            (category === 'all' && btn.textContent.includes('All'))) {
            btn.classList.add('active');
        }
    });
    
    // Filter projects
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            // Add animation
            project.style.animation = 'fadeIn 0.5s ease';
        } else {
            project.style.display = 'none';
        }
    });
}

// ===== PROJECT MODAL FUNCTIONS =====
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    // Project data (in real app, this would come from a database)
    const projects = {
        1: {
            title: 'E-Commerce Platform',
            category: 'Web Development',
            image: 'https://via.placeholder.com/800x400/0A2540/FFFFFF?text=E-Commerce+Platform',
            client: 'FashionHub Inc.',
            date: 'January 2026',
            technologies: 'React, Node.js, MongoDB',
            description: 'A full-featured e-commerce platform with product management, shopping cart, payment integration, and admin dashboard.',
            features: [
                'Product catalog with filters',
                'Secure payment gateway',
                'User accounts and orders',
                'Inventory management'
            ]
        },
        2: {
            title: 'Fitness Tracker App',
            category: 'Mobile Application',
            image: 'https://via.placeholder.com/800x400/00A896/FFFFFF?text=Fitness+Tracker+App',
            client: 'FitLife',
            date: 'December 2025',
            technologies: 'React Native, Firebase',
            description: 'A mobile app that tracks workouts, nutrition, and progress with personalized training plans.',
            features: [
                'Workout tracking',
                'Meal planning',
                'Progress photos',
                'Social sharing'
            ]
        },
        3: {
            title: 'Banking App Design',
            category: 'UI/UX Design',
            image: 'https://via.placeholder.com/800x400/FF6B4A/FFFFFF?text=Banking+App+Design',
            client: 'SecureBank',
            date: 'November 2025',
            technologies: 'Figma, Adobe XD',
            description: 'A modern, user-friendly banking app design with focus on security and ease of use.',
            features: [
                'User research',
                'Wireframing',
                'Interactive prototype',
                'Usability testing'
            ]
        },
        4: {
            title: 'Organic Food Store',
            category: 'E-Commerce Website',
            image: 'https://via.placeholder.com/800x400/2D3E50/FFFFFF?text=Organic+Food+Store',
            client: 'GreenEats',
            date: 'October 2025',
            technologies: 'WooCommerce, WordPress',
            description: 'An online store for organic food products with subscription options and delivery scheduling.',
            features: [
                'Product categories',
                'Subscription plans',
                'Delivery scheduling',
                'Customer reviews'
            ]
        },
        5: {
            title: 'Real Estate Portal',
            category: 'Web Application',
            image: 'https://via.placeholder.com/800x400/0A2540/FFFFFF?text=Real+Estate+Portal',
            client: 'DreamHome Realty',
            date: 'September 2025',
            technologies: 'Vue.js, Laravel, MySQL',
            description: 'A comprehensive real estate platform with property listings, virtual tours, and agent management.',
            features: [
                'Property search with filters',
                'Virtual tours',
                'Agent dashboards',
                'Mortgage calculator'
            ]
        },
        6: {
            title: 'Food Delivery App',
            category: 'Mobile Application',
            image: 'https://via.placeholder.com/800x400/00A896/FFFFFF?text=Food+Delivery+App',
            client: 'QuickBite',
            date: 'August 2025',
            technologies: 'Flutter, Firebase',
            description: 'A food delivery app connecting users with local restaurants with real-time tracking.',
            features: [
                'Restaurant discovery',
                'Order tracking',
                'Payment integration',
                'Reviews and ratings'
            ]
        },
        7: {
            title: 'Travel Website Design',
            category: 'UI/UX Design',
            image: 'https://via.placeholder.com/800x400/FF6B4A/FFFFFF?text=Travel+Website+Design',
            client: 'Wanderlust Travel',
            date: 'July 2025',
            technologies: 'Sketch, InVision',
            description: 'A travel booking website design focused on immersive experiences and easy navigation.',
            features: [
                'Destination guides',
                'Booking flow',
                'User dashboard',
                'Responsive design'
            ]
        },
        8: {
            title: 'Fashion Store',
            category: 'E-Commerce Platform',
            image: 'https://via.placeholder.com/800x400/2D3E50/FFFFFF?text=Fashion+Store',
            client: 'StyleHub',
            date: 'June 2025',
            technologies: 'Shopify, Liquid',
            description: 'A modern fashion e-commerce store with virtual try-on and size recommendation features.',
            features: [
                'Virtual try-on',
                'Size recommendations',
                'Wishlist',
                'Social commerce'
            ]
        }
    };
    
    const project = projects[projectId];
    
    if (project) {
        modalContent.innerHTML = `
            <div class="modal-body">
                <img src="${project.image}" alt="${project.title}">
                <h2>${project.title}</h2>
                <p><strong>Category:</strong> ${project.category}</p>
                <p><strong>Client:</strong> ${project.client}</p>
                <p><strong>Date:</strong> ${project.date}</p>
                <p><strong>Technologies:</strong> ${project.technologies}</p>
                <p>${project.description}</p>
                <h3>Key Features:</h3>
                <ul>
                    ${project.features.map(feature => `<li><i class="fas fa-check" style="color: var(--secondary);"></i> ${feature}</li>`).join('')}
                </ul>
                <div style="margin-top: 2rem;">
                    <a href="contact.html" class="btn btn-primary">Discuss Similar Project</a>
                </div>
            </div>
        `;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeProjectModal();
    }
}

// ===== ADD TO EXISTING DOM CONTENT LOADED =====
// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize portfolio with all projects visible
    if (document.querySelector('.portfolio-grid')) {
        filterProjects('all');
    }
});