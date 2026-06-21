const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');

(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.body.className = theme;
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
})();

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  document.body.classList.toggle('light', !isDark);
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(sec => observer.observe(sec));

const form         = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');
const modalClose   = document.getElementById('modal-close');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  if (message) {
    field.classList.add('invalid');
    error.textContent = message;
  } else {
    field.classList.remove('invalid');
    error.textContent = '';
  }
}

function validateForm() {
  const nome     = document.getElementById('nome').value.trim();
  const email    = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  let valid = true;

  if (!nome) { setError('nome', 'Por favor, informe seu nome.'); valid = false; }
  else setError('nome', '');

  if (!email) { setError('email', 'Por favor, informe seu e-mail.'); valid = false; }
  else if (!emailRegex.test(email)) { setError('email', 'Informe um e-mail válido (ex: usuario@dominio.com).'); valid = false; }
  else setError('email', '');

  if (!mensagem) { setError('mensagem', 'Por favor, escreva uma mensagem.'); valid = false; }
  else setError('mensagem', '');

  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  form.reset();
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  successModal.classList.add('open');
});

modalClose.addEventListener('click', () => successModal.classList.remove('open'));

successModal.addEventListener('click', (e) => {
  if (e.target === successModal) successModal.classList.remove('open');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && successModal.classList.contains('open')) successModal.classList.remove('open');
});
