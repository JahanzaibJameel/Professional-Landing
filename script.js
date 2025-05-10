
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

document.documentElement.style.setProperty('--primary-rgb', '108, 92, 231');
document.documentElement.style.setProperty('--secondary-rgb', '86, 73, 192');
document.documentElement.style.setProperty('--accent-rgb', '0, 206, 255');

const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

body.classList.add(`${savedTheme}-mode`);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light');
    }
    updateThemeIcon();
});

function updateThemeIcon() {
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

const mobileMenuBtn = document.getElementById('mobileMenu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    if (index >= testimonials.length) index = 0;
    if (index < 0) index = testimonials.length - 1;
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;

    resetSlideInterval();
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 7000);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
resetSlideInterval();

const statItems = document.querySelectorAll('.stat-item h3');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;

    statItems.forEach(item => {
        const target = parseFloat(item.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            if (target % 1 === 0) {
                item.textContent = Math.floor(progress * target);
            } else {
                item.textContent = (progress * target).toFixed(progress < 1 ? 0 : 2);
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                item.textContent = target === 99.9 ? '99.9' : target;
            }
        };

        requestAnimationFrame(animate);
    });

    countersAnimated = true;
}

function createParticles() {
    const particlesBg = document.getElementById('particlesBg');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;

        particle.style.animationDelay = `${Math.random() * 5}s`;

        const hue = Math.random() * 60 + 240;
        particle.style.backgroundColor = `hsla(${hue}, 80%, 60%, 0.3)`;

        particlesBg.appendChild(particle);
    }
}

function animateText() {
    const textElement = document.getElementById('animatedText');
    const words = textElement.querySelectorAll('span');
    let delay = 0;

    words.forEach((word, index) => {
        word.style.animation = `fadeInUp 0.5s ${delay}s forwards`;
        delay += 0.2;

        word.addEventListener('mouseover', () => {
            word.style.transform = 'scale(1.1)';
            word.style.transition = 'transform 0.3s ease';
        });

        word.addEventListener('mouseout', () => {
            word.style.transform = 'scale(1)';
        });
    });

    setInterval(() => {
        words.forEach(word => {
            word.style.animation = 'none';
            void word.offsetWidth;
            word.style.animation = `fadeInUp 0.5s ${delay}s forwards`;
        });
    }, 6000);
}

const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;

            if (element.classList.contains('section-title') ||
                element.classList.contains('hero-content') ||
                element.classList.contains('hero-image') ||
                element.classList.contains('cta') ||
                element.classList.contains('stat-item')) {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
                element.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
            }

            if (element.classList.contains('feature-card')) {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
                element.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
            }

            if (element.classList.contains('stats-grid')) {
                animateCounters();
            }

            observer.unobserve(element);
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
});

document.querySelectorAll('.section-title, .hero-content, .hero-image, .feature-card, .stat-item, .cta .container').forEach((el) => {
    observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

createParticles();
animateText();