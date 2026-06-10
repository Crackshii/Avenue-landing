// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// Reviews slider
let reviewOffset = 0;
function slideReviews(dir) {
    const track = document.getElementById('reviewsTrack');
    const card = track.querySelector('.review-card');
    const cardStyle = window.getComputedStyle(card);
    const cardW = card.offsetWidth + parseInt(cardStyle.marginRight || 0) + 20; // gap = 20px
    const maxOffset = track.scrollWidth - track.parentElement.offsetWidth;
    reviewOffset = Math.max(0, Math.min(reviewOffset + dir * cardW, maxOffset));
    track.style.transform = `translateX(-${reviewOffset}px)`;
}

// Сброс offset при ресайзе (чтобы слайдер не уезжал за пределы)
window.addEventListener('resize', () => {
    const track = document.getElementById('reviewsTrack');
    if (track) {
        const maxOffset = track.scrollWidth - track.parentElement.offsetWidth;
        reviewOffset = Math.min(reviewOffset, Math.max(0, maxOffset));
        track.style.transform = `translateX(-${reviewOffset}px)`;
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 40) {
        nav.style.boxShadow = '0 2px 20px rgba(44,36,22,0.08)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// ДОБАВЛЕНО: Бургер-меню
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    // Блокируем скролл при открытом меню
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Закрываем меню при клике на ссылку
document.querySelectorAll('.mobile-menu-links a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});