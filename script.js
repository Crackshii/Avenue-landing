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

// Reviews slider — работает только когда трек горизонтальный
let reviewOffset = 0;

function isMobileReviews() {
    const track = document.getElementById('reviewsTrack');
    if (!track) return false;
    const style = window.getComputedStyle(track);
    return style.flexDirection === 'column';
}

function slideReviews(dir) {
    // На мобильных слайдер отключён — отзывы показаны списком
    if (isMobileReviews()) return;

    const track = document.getElementById('reviewsTrack');
    const card = track.querySelector('.review-card');
    if (!card) return;

    const gap = 20;
    const cardW = card.offsetWidth + gap;
    const maxOffset = Math.max(0, track.scrollWidth - track.parentElement.offsetWidth);

    reviewOffset = Math.max(0, Math.min(reviewOffset + dir * cardW, maxOffset));
    track.style.transform = `translateX(-${reviewOffset}px)`;
}

// Сброс слайдера при ресайзе
window.addEventListener('resize', () => {
    const track = document.getElementById('reviewsTrack');
    if (!track) return;

    // Если переключились на мобильный вид — сбрасываем transform
    if (isMobileReviews()) {
        reviewOffset = 0;
        track.style.transform = 'none';
        return;
    }

    // Иначе корректируем offset чтобы не ушёл за пределы
    const maxOffset = Math.max(0, track.scrollWidth - track.parentElement.offsetWidth);
    reviewOffset = Math.min(reviewOffset, maxOffset);
    track.style.transform = `translateX(-${reviewOffset}px)`;
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

// Бургер-меню
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}