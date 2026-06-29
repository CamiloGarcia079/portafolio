// ============================================================
//  Camilo García — Portafolio · interacciones
// ============================================================

// --- Menú móvil ---
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav__links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  toggle.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});

// Cerrar el menú al elegir una sección
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// --- Borde de la barra al hacer scroll ---
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// --- Aparición de elementos al entrar en pantalla ---
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => io.observe(el));
} else {
  // Respaldo si el navegador no soporta IntersectionObserver
  reveals.forEach(el => el.classList.add('is-visible'));
}
