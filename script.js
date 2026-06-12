// ─── Theme toggle (persisted; respects prefers-color-scheme on first visit) ───
const themeBtn = document.getElementById('theme-toggle');
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'light' ? 'Dark' : 'Light';
};
const stored = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(stored || (prefersLight ? 'light' : 'dark'));
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// ─── Scroll-triggered entrance animations ───
const animatedEls = document.querySelectorAll('.animate-in');
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
animatedEls.forEach(el => animObserver.observe(el));

// ─── Active nav link on scroll (scroll-spy) ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.side-nav a[href^="#"]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => navObserver.observe(s));

// ─── Copy-to-clipboard on contact links ───
document.querySelectorAll('.contact-link[data-copy]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(link.dataset.copy).then(() => {
      link.classList.add('copied');
      setTimeout(() => link.classList.remove('copied'), 1800);
    });
  });
});
