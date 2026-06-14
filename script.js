// Scroll reveal with stagger
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(r => observer.observe(r));

// Stagger children in grids
document.querySelectorAll('.services-grid, .gallery-grid, .why-list').forEach(grid => {
    [...grid.children].forEach((child, i) => {
        child.classList.add('reveal');
        child.style.transitionDelay = `${Math.min(i * 0.12, 0.48)}s`;
        observer.observe(child);
    });
});

// Navbar: transparent on hero, solid on scroll
const nav = document.getElementById('navbar');
const hero = document.querySelector('.hero');
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

function updateNav() {
    if (!nav) return;
    const heroBottom = hero ? hero.offsetHeight - 80 : 0;
    const scrolled = window.scrollY > 40;
    const menuOpen = mobileMenu && mobileMenu.classList.contains('active');

    nav.classList.toggle('scrolled', scrolled);
    nav.classList.toggle('hero-nav', window.scrollY < heroBottom && !menuOpen);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Cursor glow (desktop only)
const glow = document.getElementById('cursorGlow');
if (glow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let glowX = 0, glowY = 0;
    let curX = 0, curY = 0;

    document.addEventListener('mousemove', (e) => {
        glowX = e.clientX;
        glowY = e.clientY;
    }, { passive: true });

    function animateGlow() {
        curX += (glowX - curX) * 0.08;
        curY += (glowY - curY) * 0.08;
        glow.style.left = curX + 'px';
        glow.style.top = curY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// Parallax on hero frames
if (hero && window.matchMedia('(min-width: 901px)').matches) {
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        const main = document.querySelector('.hero-frame-main');
        const accent = document.querySelector('.hero-frame-accent');
        if (main) main.style.transform = `translateY(${y * 0.06}px)`;
        if (accent) accent.style.transform = `translateY(${y * -0.04}px)`;
    }, { passive: true });
}

// Burger menu
if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        nav.classList.remove('hero-nav');
        if (!mobileMenu.classList.contains('active')) updateNav();
    });

    document.querySelectorAll('.mobile-menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            updateNav();
        });
    });
}
