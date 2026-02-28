// ============================================
// cursos.js — Gestión de Cursos y Nóminas
// ============================================
import * as storage from '../js/storage.js';

export function render() {
    const cursos = storage.getCursos();

    return `
    <div class="fade-in">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <div>
          <h2 style="font-size: var(--fs-xl); font-weight: 700;">Gestión de Cursos</h2>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm);">Administra tus cursos y nóminas de alumnos</p>
        </div>
        <button class="btn btn-primary" id="btnAddCurso">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
          Nuevo Curso
        </button>
      </div>

      <!-- New Curso Form (hidden by default) -->
      <div class="card" id="cursoForm" style="display: none; margin-bottom: 1.5rem;">
        <div class="card-header">
          <h3 class="card-title" id="cursoFormTitle">Nuevo Curso</h3>
          <button class="btn btn-ghost btn-sm" id="btnCancelCurso">&times; Cancelar</button>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Nombre del Curso</label>
            <input type="text" class="form-input" id="inputCursoNombre" placeholder="Ej: 6ºA" />
          </div>
          <div class="form-group">
            <label class="form-label">Año</label>
            <input type="number" class="form-input" id="inputCursoYear" value="${new Date().getFullYear()}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Nómina de Alumnos</label>
          <p class="form-sublabel">Ingresa un alumno por línea (APELLIDO APELLIDO NOMBRE). Puedes pegar desde Excel.</p>
          <textarea class="form-textarea" id="inputAlumnos" rows="10" placeholder="AGURTO AGURTO VICENTE&#10;ALVAREZ CASTILLO HELLEN&#10;ANTIA CUBILLOS NICOLAS&#10;..."></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
          <button class="btn btn-primary" id="btnSaveCurso">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Guardar Curso
          </button>
        </div>
      </div>

      <!-- Cursos List -->
      ${cursos.length === 0 ? `
        <div class="card">
          <div class="empty-state">
            <div class="empty-state-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="empty-state-title">Sin cursos</div>
            <div class="empty-state-desc">Crea tu primer curso e ingresa la nómina de alumnos para comenzar con los ensayos.</div>
          </div>
        </div>
      ` : `
        <div class="ensayo-grid">
          ${cursos.map(curso => {
        const alumnos = storage.getAlumnos(curso.id);
        const ensayos = storage.getEnsayos(curso.id);
        return `
              <div class="card" style="cursor: default;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h3 style="font-size: var(--fs-lg); font-weight: 700;">${curso.nombre}</h3>
                    <p style="font-size: var(--fs-xs); color: var(--text-muted);">${curso.year || new Date().getFullYear()}</p>
                  </div>
                  <div style="display: flex; gap: 0.25rem;">
                    <button class="btn btn-ghost btn-sm btn-edit-curso" data-id="${curso.id}" title="Editar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="btn btn-ghost btn-sm btn-delete-curso" data-id="${curso.id}" title="Eliminar" style="color: var(--danger);">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
                <div style="margin-top: 1rem; display: flex; gap: 1.5rem;">
                  <div>
                    <div style="font-size: var(--fs-2xl); font-weight: 800;">${alumnos.length}</div>
                    <div style="font-size: var(--fs-xs); color: var(--text-secondary);">Alumnos</div>
                  </div>
                  <div>
                    <div style="font-size: var(--fs-2xl); font-weight: 800;">${ensayos.length}</div>
                    <div style="font-size: var(--fs-xs); color: var(--text-secondary);">Ensayos</div>
                  </div>
                </div>
                ${alumnos.length > 0 ? `
                  <div style="margin-top: 1rem; max-height: 150px; overflow-y: auto; border-top: 1px solid var(--border-light); padding-top: 0.75rem;">
                    ${alumnos.slice(0, 8).map((a, i) => `
                      <div style="font-size: var(--fs-xs); color: var(--text-secondary); padding: 0.2rem 0;">
                        <span style="color: var(--text-muted); font-weight: 600; margin-right: 0.5rem;">${i + 1}.</span>${a.nombre}
                      </div>
                    `).join('')}
                    ${alumnos.length > 8 ? `<div style="font-size: var(--fs-xs); color: var(--text-muted); padding-top: 0.25rem;">... y ${alumnos.length - 8} más</div>` : ''}
                  </div>
                ` : ''}
              </div>
            `;
    }).join('')}
        </div>
      `}
    </div>
  `;
}

export function init(navigateTo, showToast) {
    let editingId = null;
    const form = document.getElementById('cursoForm');
    const btnAdd = document.getElementById('btnAddCurso');
    const btnCancel = document.getElementById('btnCancelCurso');
    const btnSave = document.getElementById('btnSaveCurso');
    const formTitle = document.getElementById('cursoFormTitle');

    btnAdd?.addEventListener('click', () => {
        editingId = null;
        formTitle.textContent = 'Nuevo Curso';
        document.getElementById('inputCursoNombre').value = '';
        document.getElementById('inputAlumnos').value = '';
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
    });

    btnCancel?.addEventListener('click', () => {
        form.style.display = 'none';
        editingId = null;
    });

    btnSave?.addEventListener('click', () => {
        const nombre = document.getElementById('inputCursoNombre').value.trim();
        const year = document.getElementById('inputCursoYear').value;
        const alumnosText = document.getElementById('inputAlumnos').value.trim();

        if (!nombre) {
            showToast('Ingresa el nombre del curso', 'error');
            return;
        }

        const curso = storage.saveCurso({
            id: editingId || undefined,
            nombre,
            year: parseInt(year),
        });

        if (alumnosText) {
            const alumnosList = alumnosText.split('\n')
                .map(l => l.trim())
                .filter(l => l.length > 0)
                .map(nombre => ({ nombre }));
            storage.saveAlumnos(curso.id, alumnosList);
        }

        showToast(`Curso "${nombre}" guardado con éxito`, 'success');
        navigateTo('cursos');
    });

    // Edit buttons
    document.querySelectorAll('.btn-edit-curso').forEach(btn => {
        btn.addEventListener('click', () => {
            const curso = storage.getCurso(btn.dataset.id);
            const alumnos = storage.getAlumnos(curso.id);
            editingId = curso.id;
            formTitle.textContent = 'Editar Curso';
            document.getElementById('inputCursoNombre').value = curso.nombre;
            document.getElementById('inputCursoYear').value = curso.year || new Date().getFullYear();
            document.getElementById('inputAlumnos').value = alumnos.map(a => a.nombre).join('\n');
            form.style.display = 'block';
            form.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Delete buttons
    document.querySelectorAll('.btn-delete-curso').forEach(btn => {
        btn.addEventListener('click', () => {
            const curso = storage.getCurso(btn.dataset.id);
            if (confirm(`¿Eliminar el curso "${curso.nombre}" y todos sus datos?`)) {
                storage.deleteCurso(btn.dataset.id);
                showToast(`Curso "${curso.nombre}" eliminado`, 'info');
                navigateTo('cursos');
            }
        });
    });
}
