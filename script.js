// ─── Scroll-triggered entrance animations ───
const animatedEls = document.querySelectorAll('.animate-in');
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
animatedEls.forEach(el => animObserver.observe(el));

// ─── Active nav link on scroll ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
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

// ─── Theme toggle ───
const themeBtn = document.getElementById('theme-toggle');
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'light' ? 'Dark' : 'Light';
};
applyTheme(localStorage.getItem('theme') || 'dark');
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// ─── Scroll progress bar ───
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
}, { passive: true });

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

// ─── Mobile nav toggle ───
const toggle = document.querySelector('.nav-menu-toggle');
const navUl = document.querySelector('nav ul');
if (toggle && navUl) {
  toggle.addEventListener('click', () => navUl.classList.toggle('open'));
  // Close on link click
  navUl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navUl.classList.remove('open'));
  });
}
