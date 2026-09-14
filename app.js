const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.app-section');
const modal = document.getElementById('user-modal');
const closeButtons = document.querySelectorAll('.modal-close');
const actionButtons = document.querySelectorAll('.action-menu-button');
const openUserModalButtons = document.querySelectorAll('.open-user-modal');

function setTheme(theme) {
  const isDark = theme === 'dark';
  root.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('agenthub-theme', theme);
}

const savedTheme = localStorage.getItem('agenthub-theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
  setTheme(nextTheme);
});

navItems.forEach((button) => {
  button.addEventListener('click', () => {
    navItems.forEach((item) => item.classList.remove('active'));
    sections.forEach((section) => {
      section.classList.toggle('active', section.id === button.dataset.section);
    });
    button.classList.add('active');
  });
});

function closeAllMenus() {
  document.querySelectorAll('.action-menu').forEach((menu) => menu.classList.add('hidden'));
}

actionButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const menu = button.parentElement.querySelector('.action-menu');
    const isVisible = !menu.classList.contains('hidden');
    closeAllMenus();
    if (!isVisible) menu.classList.remove('hidden');
  });
});

document.addEventListener('click', () => closeAllMenus());

function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

openUserModalButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    closeAllMenus();
    openModal();
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});

modal.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'modal' || event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const failureValue = document.querySelector('.metric-failures');
const panelButton = document.querySelector('.metric-card.metric-rose');
if (failureValue && panelButton) {
  panelButton.addEventListener('click', () => {
    const current = Number(failureValue.textContent.replace(',', ''));
    const next = Math.max(0, current - 1);
    failureValue.textContent = next.toLocaleString();
  });
}
