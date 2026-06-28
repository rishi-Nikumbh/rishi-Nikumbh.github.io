/* ── Typing effect ───────────────────────────────────────────────────────── */
const phrases = [
  'Clean Energy Engineer',
  'Fuel Cell Specialist',
  'DVP&R Test Engineer',
  '3D Printing & Fixture Expert',
  'M.Sc. @ FAU Erlangen',
];

let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIdx];
  if (deleting) {
    typedEl.textContent = current.slice(0, --charIdx);
  } else {
    typedEl.textContent = current.slice(0, ++charIdx);
  }

  let delay = deleting ? 50 : 80;

  if (!deleting && charIdx === current.length) {
    delay = 2000;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 600);

  /* ── Scroll-based nav shadow ─────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── Active nav link highlighting ───────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── Fade-up on scroll ───────────────────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ── Hamburger menu ──────────────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksList.classList.toggle('open');
  });

  navLinksList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksList.classList.remove('open');
    });
  });
});
