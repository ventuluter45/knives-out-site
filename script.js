// ===== АНИМАЦИЯ ЧАСТИЦ НА ФОНЕ =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.7 ? '#8b0000' : '#d4af37';
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(canvas.width / 20));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    // Соединяем близкие частицы линиями
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                ctx.strokeStyle = '#d4af37';
                ctx.globalAlpha = (1 - distance / 120) * 0.15;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ===== SCROLL REVEAL АНИМАЦИИ =====
const revealElements = document.querySelectorAll('.reveal');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

revealElements.forEach(el => observer.observe(el));

// ===== АНИМАЦИЯ СЧЁТЧИКОВ =====
const statNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => statsObserver.observe(num));

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== КАРУСЕЛЬ ЦИТАТ =====
const quotes = document.querySelectorAll('.quote-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentQuote = 0;

function showQuote(index) {
    quotes.forEach(q => q.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    currentQuote = (index + quotes.length) % quotes.length;
    quotes[currentQuote].classList.add('active');
    dots[currentQuote].classList.add('active');
}

prevBtn.addEventListener('click', () => showQuote(currentQuote - 1));
nextBtn.addEventListener('click', () => showQuote(currentQuote + 1));

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showQuote(index));
});

// Автопрокрутка
setInterval(() => showQuote(currentQuote + 1), 6000);

// ===== МОБИЛЬНОЕ МЕНЮ =====
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== ЭФФЕКТ ПАРАЛЛАКСА ДЛЯ HERO =====
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / window.innerHeight;
    }
});

// ===== ЭФФЕКТ НАВИГАЦИИ ПРИ СКРОЛЛЕ =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.padding = '1rem 3rem';
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.padding = '1.5rem 3rem';
        navbar.style.background = 'rgba(10, 10, 10, 0.85)';
    }
});

// ===== ЭФФЕКТ КУРСОРА (СВЕЧЕНИЕ) =====
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.borderRadius = '50%';
    cursor.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.5), transparent)';
    cursor.style.left = e.clientX - 5 + 'px';
    cursor.style.top = e.clientY - 5 + 'px';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'opacity 0.5s';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.style.opacity = '0';
        setTimeout(() => cursor.remove(), 500);
    }, 100);
});

// ===== ПЛАВНАЯ ПРОКРУТКА =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== ЭФФЕКТ "ДОЖДЯ" ИЗ НОЖЕЙ (ПАСХАЛКА) =====
let easterEggEnabled = true;

document.addEventListener('keydown', (e) => {
    if (e.key === 'k' && easterEggEnabled) {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const knife = document.createElement('div');
                knife.textContent = '🗡️';
                knife.style.position = 'fixed';
                knife.style.left = Math.random() * 100 + 'vw';
                knife.style.top = '-50px';
                knife.style.fontSize = (Math.random() * 20 + 20) + 'px';
                knife.style.zIndex = '9998';
                knife.style.pointerEvents = 'none';
                knife.style.transition = 'all 3s linear';
                document.body.appendChild(knife);
                
                setTimeout(() => {
                    knife.style.top = '100vh';
                    knife.style.transform = `rotate(${Math.random() * 720 - 360}deg)`;
                }, 10);
                
                setTimeout(() => knife.remove(), 3000);
            }, i * 100);
        }
    }
});

console.log('%c🗡️ Добро пожаловать в мир "Достать ножи"!', 
    'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cНажмите "K" для сюрприза...', 
    'color: #8b0000; font-size: 14px;');