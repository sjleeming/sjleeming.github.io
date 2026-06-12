// ─── Theme toggle (initial theme is set by the inline <head> script to avoid FOUC) ───
const themeBtn = document.getElementById('theme-toggle');
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'light' ? 'Dark' : 'Light';
  themeBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
};
applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('theme', next); } catch (err) {}
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
}, { rootMargin: '-30% 0px -55% 0px' });
sections.forEach(s => navObserver.observe(s));

// ─── Copy-to-clipboard on contact links ───
document.querySelectorAll('.contact-link[data-copy]').forEach(link => {
  link.addEventListener('click', (e) => {
    if (!navigator.clipboard) return; // fall back to native mailto:/tel: behaviour
    e.preventDefault();
    navigator.clipboard.writeText(link.dataset.copy).then(() => {
      clearTimeout(link._copiedTimer);
      link.classList.add('copied');
      link._copiedTimer = setTimeout(() => link.classList.remove('copied'), 1800);
    }).catch(() => { window.location.href = link.href; });
  });
});
