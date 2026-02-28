// ============================================
// reportes.js — Reportes y Visualizaciones
// ============================================
import * as storage from '../js/storage.js';
import { calcularResultadosEnsayo, generarReporteGeneral } from '../js/calculations.js';
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
}
