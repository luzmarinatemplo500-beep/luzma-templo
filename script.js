/* ============================================================
   TEMPLO ESPIRITUAL LUZ MARINA — script.js
   ============================================================ */

/* ── FLOATING PARTICLES ─────────────────────────────────── */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const COUNT = 55;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${Math.random() * 100}%;
      animation-duration:   ${Math.random() * 18 + 12}s;
      animation-delay:      ${Math.random() * -20}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
})();

/* ── NAVBAR SCROLL EFFECT ────────────────────────────────── */
const navbar = document.getElementById('navbar');
function onScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightNavLink();
}
window.addEventListener('scroll', onScroll, { passive: true });

/* ── MOBILE NAV TOGGLE ───────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  navToggle.textContent = isOpen ? '✕' : '☰';
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.textContent = '☰';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    navToggle.textContent = '☰';
  }
});

/* ── ACTIVE NAV LINK (Intersection) ─────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNavLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 100) current = sec.getAttribute('id');
  });
  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
}

/* ── SCROLL REVEAL ───────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.about-card, .service-card, .principle-card, .contact-card, ' +
  '.about-stats, .section-header, .contact-disclaimer'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  // stagger within same parent
  const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
  const idx = siblings.indexOf(el);
  if (idx === 1) el.classList.add('reveal-delay-1');
  if (idx === 2) el.classList.add('reveal-delay-2');
  if (idx === 3) el.classList.add('reveal-delay-3');
  if (idx === 4) el.classList.add('reveal-delay-4');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── FLOATING WA BUTTON PULSE RING ───────────────────────── */
const floatWa = document.getElementById('float-wa');
if (floatWa) {
  const ring = document.createElement('div');
  ring.className = 'float-wa-pulse';
  floatWa.appendChild(ring);
}

/* ── SMOOTH SCROLL for internal links ───────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── SERVICE CARDS: click = open WhatsApp ────────────────── */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Only if not clicking the button itself
    if (e.target.closest('.service-btn')) return;
    const btn = card.querySelector('.service-btn');
    if (btn) btn.click();
  });
});

/* ── INIT ────────────────────────────────────────────────── */
onScroll(); // run once on load
