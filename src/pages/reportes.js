// ============================================
// reportes.js — Reportes y Visualizaciones
// ============================================
import * as storage from '../js/storage.js';
import { calcularResultadosEnsayo, generarReporteGeneral } from '../js/calculations.js';
import { generarAnalisisPedagogico } from '../js/ai-insights.js';
import Chart from 'chart.js/auto';

let charts = [];

export function render(params) {
    const ensayos = storage.getEnsayos();

    // If no ensayo selected, show selector
    if (!params?.ensayoId) {
        const tabulados = ensayos.filter(e => e.status === 'tabulado');
        return `
      <div class="fade-in">
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: var(--fs-xl); font-weight: 700;">Reportes</h2>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm);">Selecciona un ensayo tabulado para ver los resultados</p>
        </div>
        ${tabulados.length === 0 ? `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
              </div>
              <div class="empty-state-title">Sin resultados aún</div>
              <div class="empty-state-desc">Tabula al menos un ensayo para generar reportes automáticos.</div>
            </div>
          </div>
        ` : `
          <div class="ensayo-grid">
            ${tabulados.map(e => {
            const curso = storage.getCurso(e.cursoId);
            return `
                <div class="ensayo-card" data-ensayo-id="${e.id}" style="cursor: pointer;">
                  <div class="ensayo-meta">
                    <span class="badge badge-info">${curso ? curso.nombre : '?'}</span>
                    <span class="badge badge-avanzado">Tabulado</span>
                  </div>
                  <div class="ensayo-title">Ensayo Nº${e.numero} — ${e.asignatura}</div>
                  <div class="ensayo-info">
                    <span>${e.totalPreguntas} preguntas</span>
                    <span>${new Date(e.updatedAt || e.createdAt).toLocaleDateString('es-CL')}</span>
                  </div>
                </div>
              `;
        }).join('')}
          </div>
        `}
      </div>
    `;
    }

    // Render report for a specific ensayo
    const ensayo = storage.getEnsayo(params.ensayoId);
    if (!ensayo) return '<div class="card"><p>Ensayo no encontrado</p></div>';

    const curso = storage.getCurso(ensayo.cursoId);
    const alumnos = storage.getAlumnos(ensayo.cursoId);
    const respuestas = storage.getRespuestas(params.ensayoId);
    const resultados = calcularResultadosEnsayo(ensayo, alumnos, respuestas);
    const reporte = generarReporteGeneral(resultados, ensayo);

    return `
    <div class="fade-in">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="btn btn-ghost btn-sm" id="btnBackReportes">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <h2 style="font-size: var(--fs-xl); font-weight: 700;">
              Ensayo Nº${ensayo.numero} — ${curso ? curso.nombre : ''}
            </h2>
          </div>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-left: 3rem;">
            ${ensayo.asignatura} · ${reporte.cantidadEvaluados} alumnos evaluados
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-primary btn-sm" id="btnGenerarAI">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.25rem;"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path><path d="M12 12L2.69 7"></path><path d="M12 12l5.63 8.16"></path><path d="M12 12l8.21-4.64"></path></svg>
            Generar Análisis IA
          </button>
        </div>
      </div>

      <!-- AI Insights Card (Hidden by default) -->
      <div id="aiInsightsContainer" style="display: none; margin-bottom: 1.5rem;">
        <div class="card" style="border-left: 5px solid var(--accent); background: linear-gradient(135deg, white, rgba(255, 107, 53, 0.03));">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <h3 class="card-title" style="display: flex; align-items: center; gap: 0.5rem;">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path></svg>
               Reporte de Análisis Pedagógico (IA)
            </h3>
            <button class="btn-ghost" id="btnCloseAI" style="padding: 0.25rem;">&times;</button>
          </div>
          <div id="aiInsightsContent" class="markdown-content" style="font-size: var(--fs-sm); line-height: 1.6;">
            <!-- Content here -->
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid stagger">
        <div class="stat-card">
          <div class="stat-icon blue"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
          <div>
            <div class="stat-value">${reporte.cantidadEvaluados}</div>
            <div class="stat-label">Alumnos evaluados</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg></div>
          <div>
            <div class="stat-value">${reporte.promedioNota}</div>
            <div class="stat-label">Promedio Nota</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <div>
            <div class="stat-value">${reporte.promedioPuntaje}</div>
            <div class="stat-label">Ptje SIMCE Simulado</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon ${reporte.nivelGeneral === 'Avanzado' ? 'green' : reporte.nivelGeneral === 'Intermedio' ? 'orange' : 'red'}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <div class="stat-value">${reporte.promedioLogro}%</div>
            <div class="stat-label">% Logro · <span class="badge badge-${reporte.nivelGeneral.toLowerCase()}">${reporte.nivelGeneral}</span></div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="card">
          <h3 class="card-title" style="margin-bottom: 1rem;">% Logro por Habilidad</h3>
          <div class="chart-container" style="height: 250px;"><canvas id="chartHabilidades"></canvas></div>
        </div>
        <div class="card">
          <h3 class="card-title" style="margin-bottom: 1rem;">Segmentación del Curso</h3>
          <div class="chart-container" style="height: 250px;"><canvas id="chartSegmentacion"></canvas></div>
        </div>
      </div>

      ${reporte.porContenido.length > 0 ? `
      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 class="card-title" style="margin-bottom: 1rem;">% Logro por Contenido</h3>
        <div class="chart-container" style="height: 220px;"><canvas id="chartContenidos"></canvas></div>
      </div>
      ` : ''}

      <!-- Segmentation -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 class="card-title" style="margin-bottom: 1rem;">Segmentación de Alumnos</h3>
        <div class="segmentation-grid">
          <div class="seg-column inicial">
            <div class="seg-header">
              <span class="seg-title" style="color: var(--danger);">🔴 Inicial</span>
              <span class="seg-count badge badge-inicial">${reporte.segmentacion.Inicial.length}</span>
            </div>
            ${reporte.segmentacion.Inicial.map(a => `<div class="seg-student">${a.numero}. ${a.nombre} <span style="float: right; font-weight: 600;">${a.puntaje}</span></div>`).join('') || '<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
          </div>
          <div class="seg-column intermedio">
            <div class="seg-header">
              <span class="seg-title" style="color: #b45309;">🟡 Intermedio</span>
              <span class="seg-count badge badge-intermedio">${reporte.segmentacion.Intermedio.length}</span>
            </div>
            ${reporte.segmentacion.Intermedio.map(a => `<div class="seg-student">${a.numero}. ${a.nombre} <span style="float: right; font-weight: 600;">${a.puntaje}</span></div>`).join('') || '<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
          </div>
          <div class="seg-column avanzado">
            <div class="seg-header">
              <span class="seg-title" style="color: #059669;">🟢 Avanzado</span>
              <span class="seg-count badge badge-avanzado">${reporte.segmentacion.Avanzado.length}</span>
            </div>
            ${reporte.segmentacion.Avanzado.map(a => `<div class="seg-student">${a.numero}. ${a.nombre} <span style="float: right; font-weight: 600;">${a.puntaje}</span></div>`).join('') || '<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
          </div>
        </div>
      </div>

      <!-- Student Table -->
      <div class="card">
        <h3 class="card-title" style="margin-bottom: 1rem;">Detalle por Alumno</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>Alumno</th>
                <th>Correctas</th>
                <th>% Logro</th>
                <th>Nota</th>
                <th>Ptje SIMCE</th>
                <th>Nivel</th>
              </tr>
            </thead>
            <tbody>
              ${resultados.sort((a, b) => a.alumnoNumero - b.alumnoNumero).map(r => `
                <tr>
                  <td style="font-weight: 600; color: var(--text-muted);">${r.alumnoNumero}</td>
                  <td style="font-weight: 500;">${r.alumnoNombre}</td>
                  <td>${r.correctasTotales}/${r.totalPreguntas}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <div class="progress-bar" style="width: 60px; height: 6px;">
                        <div class="progress-fill ${r.porcentajeLogro < 40 ? 'low' : r.porcentajeLogro < 70 ? 'mid' : 'high'}" style="width: ${r.porcentajeLogro}%;"></div>
                      </div>
                      <span>${r.porcentajeLogro}%</span>
                    </div>
                  </td>
                  <td style="font-weight: 700;">${r.nota.toFixed(1)}</td>
                  <td style="font-weight: 600;">${r.puntajeSimce}</td>
                  <td><span class="badge badge-${r.nivel.toLowerCase()}">${r.nivel}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function init(navigateTo, showToast, params) {
    // Destroy previous charts
    charts.forEach(c => c.destroy());
    charts = [];

    // Ensayo selector
    document.querySelectorAll('.ensayo-card[data-ensayo-id]').forEach(card => {
        card.addEventListener('click', () => {
            navigateTo('reportes', { ensayoId: card.dataset.ensayoId });
        });
    });

    document.getElementById('btnBackReportes')?.addEventListener('click', () => navigateTo('reportes'));

    if (!params?.ensayoId) return;

    const ensayo = storage.getEnsayo(params.ensayoId);
    if (!ensayo) return;

    const alumnos = storage.getAlumnos(ensayo.cursoId);
    const respuestas = storage.getRespuestas(params.ensayoId);
    const resultados = calcularResultadosEnsayo(ensayo, alumnos, respuestas);
    const reporte = generarReporteGeneral(resultados, ensayo);

    // Chart defaults
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 12;

    // Habilidades chart
    const habCanvas = document.getElementById('chartHabilidades');
    if (habCanvas && reporte.porHabilidad.length > 0) {
        const habChart = new Chart(habCanvas, {
            type: 'bar',
            data: {
                labels: reporte.porHabilidad.map(h => h.habilidad),
                datasets: [{
                    data: reporte.porHabilidad.map(h => h.porcentaje),
                    backgroundColor: reporte.porHabilidad.map(h =>
                        h.porcentaje >= 70 ? 'rgba(16, 185, 129, 0.7)' :
                            h.porcentaje >= 40 ? 'rgba(245, 158, 11, 0.7)' :
                                'rgba(239, 68, 68, 0.7)'
                    ),
                    borderRadius: 6,
                    barPercentage: 0.6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: { label: ctx => `${ctx.raw}% de logro` }
                    }
                },
                scales: {
                    x: { max: 100, grid: { color: 'rgba(0,0,0,0.04)' } },
                    y: { grid: { display: false }, ticks: { font: { size: 11 } } }
                }
            }
        });
        charts.push(habChart);
    }

    // Segmentation chart
    const segCanvas = document.getElementById('chartSegmentacion');
    if (segCanvas) {
        const segChart = new Chart(segCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Inicial', 'Intermedio', 'Avanzado'],
                datasets: [{
                    data: [
                        reporte.segmentacion.Inicial.length,
                        reporte.segmentacion.Intermedio.length,
                        reporte.segmentacion.Avanzado.length,
                    ],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.75)',
                        'rgba(245, 158, 11, 0.75)',
                        'rgba(16, 185, 129, 0.75)',
                    ],
                    borderWidth: 0,
                    spacing: 3,
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '55%',
                plugins: {
                    legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true, pointStyle: 'circle' } },
                }
            }
        });
        charts.push(segChart);
    }

    // Contenidos chart
    const contCanvas = document.getElementById('chartContenidos');
    if (contCanvas && reporte.porContenido.length > 0) {
        const contChart = new Chart(contCanvas, {
            type: 'bar',
            data: {
                labels: reporte.porContenido.map(c => c.contenido),
                datasets: [{
                    data: reporte.porContenido.map(c => c.porcentaje),
                    backgroundColor: reporte.porContenido.map(c =>
                        c.porcentaje >= 70 ? 'rgba(16, 185, 129, 0.7)' :
                            c.porcentaje >= 40 ? 'rgba(245, 158, 11, 0.7)' :
                                'rgba(239, 68, 68, 0.7)'
                    ),
                    borderRadius: 6,
                    barPercentage: 0.6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: { legend: { display: false } },
                scales: {
                    x: { max: 100, grid: { color: 'rgba(0,0,0,0.04)' } },
                    y: { grid: { display: false } }
                }
            }
        });
        charts.push(contChart);
    }

    // AI Analysis Button
    const btnAI = document.getElementById('btnGenerarAI');
    const aiContainer = document.getElementById('aiInsightsContainer');
    const aiContent = document.getElementById('aiInsightsContent');

    btnAI?.addEventListener('click', async () => {
        if (!storage.getOpenAIApiKey()) {
            showToast('Configura tu llave de OpenAI para usar esta función.', 'error');
            return;
        }

        btnAI.disabled = true;
        btnAI.innerHTML = `<span class="spinner" style="width: 14px; height: 14px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; display: inline-block; animation: spin 0.8s linear infinite; margin-right: 0.5rem;"></span> Procesando...`;

        try {
            const analisis = await generarAnalisisPedagogico(reporte, ensayo);
            // Simple markdown-ish to html conversion for the few elements we use
            const html = analisis
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/### (.*)/g, '<h4 style="margin-top: 1rem; color: var(--primary);">$1</h4>')
                .replace(/\n\n/g, '<p style="margin-bottom: 0.75rem;"></p>')
                .replace(/^- (.*)/gm, '<li style="margin-left: 1rem;">$1</li>');

            aiContent.innerHTML = html;
            aiContainer.style.display = 'block';
            aiContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            showToast('¡Análisis generado exitosamente!', 'success');
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            btnAI.disabled = false;
            btnAI.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.25rem;"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path><path d="M12 12L2.69 7"></path><path d="M12 12l5.63 8.16"></path><path d="M12 12l8.21-4.64"></path></svg>
                Generar Análisis IA
            `;
        }
    });

    document.getElementById('btnCloseAI')?.addEventListener('click', () => {
        aiContainer.style.display = 'none';
    });
}

