// ============================================
// dashboard.js — Dashboard Page
// ============================================
import * as storage from '../js/storage.js';

export function render() {
    const cursos = storage.getCursos();
    const ensayos = storage.getEnsayos();
    const totalAlumnos = storage.getAlumnos().length;

    return `
    <div class="fade-in">
      <!-- Stats -->
      <div class="stats-grid stagger">
        <div class="stat-card">
          <div class="stat-icon blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <div class="stat-value">${cursos.length}</div>
            <div class="stat-label">Cursos activos</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div>
            <div class="stat-value">${ensayos.length}</div>
            <div class="stat-label">Ensayos creados</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
          <div>
            <div class="stat-value">${totalAlumnos}</div>
            <div class="stat-label">Alumnos registrados</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon red">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          </div>
          <div>
            <div class="stat-value">${ensayos.filter(e => e.status === 'tabulado').length}</div>
            <div class="stat-label">Con resultados</div>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <h2 class="card-title">Acciones rápidas</h2>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button class="btn btn-primary" data-action="nuevo-ensayo" id="btnNuevoEnsayo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
            Nuevo Ensayo
          </button>
          <button class="btn btn-secondary" data-action="nuevo-curso" id="btnNuevoCurso">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Nuevo Curso
          </button>
        </div>
      </div>

      <!-- Recent Ensayos -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Ensayos recientes</h2>
        </div>
        ${ensayos.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div class="empty-state-title">Sin ensayos aún</div>
            <div class="empty-state-desc">Crea tu primer ensayo SIMCE para comenzar a tabular y obtener resultados al instante.</div>
            <button class="btn btn-primary" data-action="nuevo-ensayo" id="btnEmptyNuevoEnsayo">Crear primer ensayo</button>
          </div>
        ` : `
          <div class="ensayo-grid">
            ${ensayos.slice(-6).reverse().map(e => {
        const curso = storage.getCurso(e.cursoId);
        const respuestas = storage.getRespuestas(e.id);
        const alumnos = storage.getAlumnos(e.cursoId);
        const tabulados = respuestas.filter(r => Object.keys(r.respuestas || {}).length > 0).length;
        return `
                <div class="ensayo-card" data-ensayo-id="${e.id}" data-action="ver-ensayo">
                  <div class="ensayo-meta">
                    <span class="badge badge-info">${curso ? curso.nombre : 'Curso'}</span>
                    <span class="badge ${e.status === 'tabulado' ? 'badge-avanzado' : 'badge-intermedio'}">${e.status === 'tabulado' ? 'Tabulado' : 'Pendiente'}</span>
                  </div>
                  <div class="ensayo-title">Ensayo Nº${e.numero} — ${e.asignatura}</div>
                  <div class="ensayo-info">
                    <span>${e.totalPreguntas} preguntas</span>
                    <span>${tabulados}/${alumnos.length} tabulados</span>
                    <span>${new Date(e.createdAt).toLocaleDateString('es-CL')}</span>
                  </div>
                </div>
              `;
    }).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

export function init(navigateTo) {
    document.querySelectorAll('[data-action="nuevo-ensayo"]').forEach(btn => {
        btn.addEventListener('click', () => navigateTo('nuevo-ensayo'));
    });
    document.querySelectorAll('[data-action="nuevo-curso"]').forEach(btn => {
        btn.addEventListener('click', () => navigateTo('cursos'));
    });
    document.querySelectorAll('[data-action="ver-ensayo"]').forEach(card => {
        card.addEventListener('click', () => {
            const ensayoId = card.dataset.ensayoId;
            navigateTo('tabulacion', { ensayoId });
        });
    });
}
