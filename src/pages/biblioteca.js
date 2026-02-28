// ============================================
// biblioteca.js — Catálogo de Ensayos Locales
// ============================================

export async function render() {
    return `
    <div class="fade-in">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <div>
          <h2 style="font-size: var(--fs-xl); font-weight: 700;">Biblioteca de Ensayos</h2>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm);">Catálogo de modelos SIMCE precargados. Úsalos como base o descárgalos en PDF.</p>
        </div>
      </div>

      <!-- Filtros -->
      <div class="card" style="margin-bottom: 1.5rem; padding: 1rem;">
         <div class="form-row" style="align-items: end;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Asignatura</label>
              <select class="form-select" id="filtroAsignatura">
                <option value="todos">Todas las asignaturas</option>
                <option value="Matemática">Matemática</option>
                <option value="Lenguaje y Comunicación">Lenguaje y Comunicación</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Nivel</label>
              <select class="form-select" id="filtroNivel">
                <option value="todos">Todos los niveles</option>
                <option value="2º Básico">2º Básico</option>
                <option value="4º Básico">4º Básico</option>
                <option value="8º Básico">8º Básico</option>
                <option value="2º Medio">2º Medio</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <button class="btn btn-primary btn-block" id="btnFiltrar">Aplicar Filtros</button>
            </div>
         </div>
      </div>

      <div id="bibliotecaContainer">
        <!-- Loader / Content injected here -->
        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
           <svg class="spin" style="animation: spin 1s linear infinite;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
           <p style="margin-top: 1rem;">Cargando catálogo...</p>
        </div>
      </div>
    </div>
    <style>
      @keyframes spin { 100% { transform: rotate(360deg); } }
    </style>
  `;
}

export async function init(navigateTo, showToast) {
    const container = document.getElementById('bibliotecaContainer');
    let catalogo = [];

    try {
        const res = await fetch('/ensayos_catalogo.json');
        if (!res.ok) throw new Error('No se pudo cargar el catálogo.');
        catalogo = await res.json();
        renderCatalogo(catalogo);
    } catch (err) {
        console.error(err);
        container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon" style="color: var(--danger);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="empty-state-title">Error al cargar la Biblioteca</div>
        <div class="empty-state-desc">No se encontró el archivo de catálogo base. Ejecuta el script de procesamiento primero.</div>
      </div>
    `;
        return;
    }

    // Filtrado
    const btnFiltrar = document.getElementById('btnFiltrar');
    const fAsig = document.getElementById('filtroAsignatura');
    const fNivel = document.getElementById('filtroNivel');

    btnFiltrar?.addEventListener('click', () => {
        const asigVal = fAsig.value;
        const nivelVal = fNivel.value;

        const filtered = catalogo.filter(item => {
            const matchAsig = asigVal === 'todos' || item.asignatura === asigVal;
            const matchNivel = nivelVal === 'todos' || item.nivel === nivelVal;
            return matchAsig && matchNivel;
        });

        renderCatalogo(filtered);
    });

    function renderCatalogo(data) {
        if (data.length === 0) {
            container.innerHTML = `
        <div class="empty-state card">
          <div class="empty-state-icon">
             <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <div class="empty-state-title">No hay resultados</div>
          <div class="empty-state-desc">Prueba cambiando los filtros de búsqueda.</div>
        </div>
      `;
            return;
        }

        const html = data.map(item => `
      <div class="ensayo-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="ensayo-meta">
            <span class="badge ${item.asignatura.includes('Matem') ? 'badge-intermedio' : 'badge-info'}">${item.asignatura}</span>
            <span class="badge" style="background: var(--bg-input); border: 1px solid var(--border);">${item.nivel}</span>
          </div>
          <div class="ensayo-title" style="margin-bottom: 0.5rem; font-size: var(--fs-lg);">${item.titulo}</div>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-bottom: 1rem;">
             Archivo original: <a href="${item.archivo}" target="_blank" style="color: var(--accent); text-decoration: underline;">Descargar documento</a>
          </p>
        </div>
        
        <div style="border-top: 1px solid var(--border-light); padding-top: 1rem; margin-top: auto;">
           <button class="btn btn-secondary btn-block btn-usar-ensayo" data-ensayo-id="${item.id}">
             Usar este modelo en la App
           </button>
        </div>
      </div>
    `).join('');

        container.innerHTML = `<div class="ensayo-grid">${html}</div>`;

        // Botones de usar modelo
        document.querySelectorAll('.btn-usar-ensayo').forEach(btn => {
            btn.addEventListener('click', () => {
                const dId = btn.dataset.ensayoId;
                // TODO: Guardar ensayoid temporalmente e ir a la página de nuevo-ensayo
                // para que lo agarre como base
                sessionStorage.setItem('biblio_modelo_seleccionado', dId);
                navigateTo('nuevo-ensayo');
            });
        });
    }
}
