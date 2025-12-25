// Theme Toggle
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) html.setAttribute('data-theme', savedTheme);
updateThemeButton();

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
  updateThemeButton();
});

function updateThemeButton() {
  const isLight = html.getAttribute('data-theme') === 'light';
  const icon = themeToggle.querySelector('i');
  const label = themeToggle.querySelector('span');
  icon.className = isLight ? 'fa-regular fa-sun me-2' : 'fa-regular fa-moon me-2';
  label.textContent = isLight ? 'Light' : 'Dark';
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Typed Text Animation
const typedEl = document.getElementById('typed');
const phrases = [
  'Aspiring B.Tech AI & Data Science student',
  'Strong interest in software development',
  'Cloud technologies & Generative AI',
  'Cloud Enthusiast focused on impact'
];
let pi = 0, ci = 0, deleting = false;

function typeLoop() {
  const full = phrases[pi];
  if (!deleting) {
    ci++;
    typedEl.textContent = full.slice(0, ci);
    if (ci === full.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    ci--;
    typedEl.textContent = full.slice(0, ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  const speed = deleting ? 30 : 60;
  setTimeout(typeLoop, speed);
}
typeLoop();

// Parallax Effect on Hero Layers
const layers = document.querySelectorAll('.parallax-layer');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  layers.forEach((layer, idx) => {
    const depth = (idx + 1) * 0.06;
    layer.style.transform = `translateY(${y * depth}px)`;
  });
});

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Testimonial Slider
const track = document.querySelector('.slider-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dotsContainer = document.querySelector('.slider-dots');
let currentIndex = 0;
let autoplayId = null;

function buildDots() {
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });
}
buildDots();

function updateDots() {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}

function goTo(index) {
  currentIndex = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
  restartAutoplay();
}

nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
prevBtn.addEventListener('click', () => goTo(currentIndex - 1));

function startAutoplay() {
  autoplayId = setInterval(() => goTo(currentIndex + 1), 4000);
}
function restartAutoplay() {
  clearInterval(autoplayId);
  startAutoplay();
}
startAutoplay();

// Accessibility: pause autoplay on hover
const slider = document.querySelector('.testimonial-slider');
slider.addEventListener('mouseenter', () => clearInterval(autoplayId));
slider.addEventListener('mouseleave', startAutoplay);
