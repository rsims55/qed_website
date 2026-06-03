// ── Sticky nav: add .scrolled class after scrolling past hero ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile nav toggle ─────────────────────────────────────────
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', links.classList.contains('open'));
});

// Close mobile nav when a link is tapped
links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => links.classList.remove('open'));
});

// ── Scroll-reveal: fade sections in as they enter viewport ─────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-card, .about__text, .about__mission, .why-qed__text, .stat-chip, .contact-card'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Inject the reveal styles dynamically so they only apply when JS is active
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                transform 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .service-card:nth-child(2) { transition-delay: 80ms; }
  .service-card:nth-child(3) { transition-delay: 160ms; }
  .service-card:nth-child(4) { transition-delay: 240ms; }
  .stat-chip:nth-child(2) { transition-delay: 80ms; }
  .stat-chip:nth-child(3) { transition-delay: 160ms; }
`;
document.head.appendChild(style);
