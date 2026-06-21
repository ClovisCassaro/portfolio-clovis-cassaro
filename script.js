/* =============================================
   MENU HAMBURGUER (mobile)
   Abre/fecha o menu de navegação em telas pequenas
   ============================================= */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

/* Fecha o menu ao clicar em um link (mobile) */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

/* =============================================
   ALTERNÂNCIA DE TEMA CLARO / ESCURO
   Persiste a preferência no localStorage
   ============================================= */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');

/* Aplica tema salvo (ou preferência do sistema) ao carregar */
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

/* =============================================
   DESTAQUE ATIVO DO MENU conforme scroll
   Usa IntersectionObserver para detectar qual
   seção está visível e marcar o link correto
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', isActive);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(sec => observer.observe(sec));

/* =============================================
   VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   Verifica campos obrigatórios e formato de e-mail
   ============================================= */
const form          = document.getElementById('contact-form');
const successModal  = document.getElementById('success-modal');
const modalClose    = document.getElementById('modal-close');

/* Regex para validação básica de e-mail */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Exibe ou limpa mensagem de erro de um campo */
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

/* Retorna true se o formulário inteiro for válido */
function validateForm() {
  const nome     = document.getElementById('nome').value.trim();
  const email    = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  let valid = true;

  if (!nome) {
    setError('nome', 'Por favor, informe seu nome.');
    valid = false;
  } else {
    setError('nome', '');
  }

  if (!email) {
    setError('email', 'Por favor, informe seu e-mail.');
    valid = false;
  } else if (!emailRegex.test(email)) {
    setError('email', 'Informe um e-mail válido (ex: usuario@dominio.com).');
    valid = false;
  } else {
    setError('email', '');
  }

  if (!mensagem) {
    setError('mensagem', 'Por favor, escreva uma mensagem.');
    valid = false;
  } else {
    setError('mensagem', '');
  }

  return valid;
}

/* Intercepta o envio do formulário */
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  /* Simulação de envio: limpa campos e exibe modal de confirmação */
  form.reset();
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  successModal.classList.add('open');
});

/* Fecha o modal ao clicar no botão */
modalClose.addEventListener('click', () => {
  successModal.classList.remove('open');
});

/* Fecha o modal ao clicar fora da caixa */
successModal.addEventListener('click', (e) => {
  if (e.target === successModal) {
    successModal.classList.remove('open');
  }
});

/* Fecha o modal com a tecla Escape */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && successModal.classList.contains('open')) {
    successModal.classList.remove('open');
  }
});
