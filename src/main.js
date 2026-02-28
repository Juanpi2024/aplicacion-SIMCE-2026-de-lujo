// ============================================
// main.js — App Router & Core Logic
// ============================================
import './styles/main.css';
import * as dashboard from './pages/dashboard.js';
import * as cursos from './pages/cursos.js';
import * as nuevoEnsayo from './pages/nuevo-ensayo.js';
import * as tabulacion from './pages/tabulacion.js';
import * as reportes from './pages/reportes.js';
import * as biblioteca from './pages/biblioteca.js';
import { getSchool, setSchool } from './js/storage.js';

// ---- Pages Registry ----
const pages = {
  'dashboard': { module: dashboard, title: 'Dashboard' },
  'cursos': { module: cursos, title: 'Cursos' },
  'nuevo-ensayo': { module: nuevoEnsayo, title: 'Nuevo Ensayo' },
  'tabulacion': { module: tabulacion, title: 'Tabulación' },
  'reportes': { module: reportes, title: 'Reportes' },
  'biblioteca': { module: biblioteca, title: 'Biblioteca de Ensayos' },
};

let currentPage = 'dashboard';
let currentParams = {};

// ---- Navigation ----
function navigateTo(pageName, params = {}) {
  currentPage = pageName;
  currentParams = params;
  renderPage();
}

async function renderPage() {
  const page = pages[currentPage];
  if (!page) return;

  // Update title
  document.getElementById('pageTitle').textContent = page.title;

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === currentPage);
  });

  // Render page content
  const content = document.getElementById('pageContent');
  if (typeof page.module.render === 'function') {
    const result = page.module.render(currentParams);
    if (result instanceof Promise) {
      content.innerHTML = await result;
    } else {
      content.innerHTML = result;
    }
  }

  // Initialize page interactivity
  page.module.init(navigateTo, showToast, currentParams);

  // Scroll to top
  content.scrollTop = 0;
}

// ---- Toast Notifications ----
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  toast.innerHTML = `<span>${icons[type] || 'ℹ'}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- Modal ----
function showModal(title, bodyHtml, footerHtml) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyHtml;
  document.getElementById('modalFooter').innerHTML = footerHtml || '';
  document.getElementById('modalOverlay').classList.add('show');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
}

// ---- Sidebar ----
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menuBtn');
  const sidebarToggle = document.getElementById('sidebarToggle');

  menuBtn?.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });

  sidebarToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    sidebar.classList.remove('show');
  });

  // Click outside to close on mobile
  document.getElementById('mainContent')?.addEventListener('click', () => {
    if (window.innerWidth <= 1024) {
      sidebar.classList.remove('show');
    }
  });
}

// ---- Nav Links ----
function initNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      if (page) {
        navigateTo(page);
        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
          document.getElementById('sidebar').classList.remove('show');
        }
      }
    });
  });
}

// ---- Modal Close ----
function initModal() {
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
}

// ---- School Name ----
function initSchool() {
  const school = getSchool();
  const badge = document.getElementById('schoolBadge');
  if (badge) {
    badge.textContent = school.name;
    badge.addEventListener('click', () => {
      const name = prompt('Nombre del colegio:', school.name);
      if (name && name.trim()) {
        setSchool({ name: name.trim() });
        badge.textContent = name.trim();
        showToast('Nombre del colegio actualizado', 'success');
      }
    });
    badge.style.cursor = 'pointer';
    badge.title = 'Click para cambiar nombre';
  }
}

// ---- Init App ----
function initApp() {
  initSidebar();
  initNav();
  initModal();
  initSchool();
  renderPage();
}

// Start
document.addEventListener('DOMContentLoaded', initApp);

// Also run if already loaded
if (document.readyState !== 'loading') {
  initApp();
}
