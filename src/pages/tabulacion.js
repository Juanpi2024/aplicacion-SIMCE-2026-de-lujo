// ============================================
// tabulacion.js — Grilla de Tabulación
// THE CORE FEATURE
// ============================================
import * as storage from '../js/storage.js';
import { calcularResultadoAlumno } from '../js/calculations.js';
import { startRecording, stopRecording } from '../js/audio-recorder.js';
import { processDictation } from '../js/openai-service.js';

let currentEnsayoId = null;

export function render(params) {
  const ensayos = storage.getEnsayos();

  if (params?.ensayoId) {
    currentEnsayoId = params.ensayoId;
    return renderGrid(params.ensayoId);
  }

  // Ensayo selector
  return `
    <div class="fade-in">
      <div style="margin-bottom: 1.5rem;">
        <h2 style="font-size: var(--fs-xl); font-weight: 700;">Tabulación de Respuestas</h2>
        <p style="color: var(--text-secondary); font-size: var(--fs-sm);">Selecciona un ensayo para tabular las respuestas</p>
      </div>
      ${ensayos.length === 0 ? `
        <div class="card">
          <div class="empty-state">
            <div class="empty-state-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3h18v18H3z"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
            </div>
            <div class="empty-state-title">Sin ensayos para tabular</div>
            <div class="empty-state-desc">Crea un ensayo primero para poder tabular las respuestas de tus alumnos.</div>
            <button class="btn btn-primary" id="btnGoNuevo">Crear Ensayo</button>
          </div>
        </div>
      ` : `
        <div class="ensayo-grid">
          ${ensayos.map(e => {
    const curso = storage.getCurso(e.cursoId);
    const respuestas = storage.getRespuestas(e.id);
    const alumnos = storage.getAlumnos(e.cursoId);
    const tabulados = respuestas.filter(r => r.respuestas && Object.keys(r.respuestas).length > 0).length;
    const prog = alumnos.length > 0 ? Math.round((tabulados / alumnos.length) * 100) : 0;
    return `
              <div class="ensayo-card" data-ensayo-id="${e.id}" style="cursor: pointer;">
                <div class="ensayo-meta">
                  <span class="badge badge-info">${curso ? curso.nombre : '?'}</span>
                </div>
                <div class="ensayo-title">Ensayo Nº${e.numero} — ${e.asignatura}</div>
                <div class="ensayo-info" style="margin-bottom: 0.75rem;">
                  <span>${e.totalPreguntas} preguntas</span>
                  <span>${tabulados}/${alumnos.length} tabulados</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill ${prog < 40 ? 'low' : prog < 80 ? 'mid' : 'high'}" style="width: ${prog}%;"></div>
                </div>
              </div>
            `;
  }).join('')}
        </div>
      `}
    </div>
  `;
}

function renderGrid(ensayoId) {
  const ensayo = storage.getEnsayo(ensayoId);
  if (!ensayo) return '<div class="card"><p>Ensayo no encontrado</p></div>';

  const curso = storage.getCurso(ensayo.cursoId);
  const alumnos = storage.getAlumnos(ensayo.cursoId);
  const respuestas = storage.getRespuestas(ensayoId);

  const tabulados = respuestas.filter(r => r.respuestas && Object.keys(r.respuestas).length > 0).length;

  return `
    <div class="fade-in">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="btn btn-ghost btn-sm" id="btnBackToList">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              Volver
            </button>
            <h2 style="font-size: var(--fs-xl); font-weight: 700;">
              Ensayo Nº${ensayo.numero} — ${curso ? curso.nombre : ''}
            </h2>
          </div>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-left: 4.5rem;">
            ${ensayo.asignatura} · ${ensayo.totalPreguntas} preguntas · ${tabulados}/${alumnos.length} tabulados
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary btn-sm" id="btnVerResultados">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
            Ver Resultados
          </button>
        </div>
      </div>

      <!-- Instructions -->
      <div style="background: rgba(59, 130, 246, 0.06); border: 1px solid rgba(59, 130, 246, 0.15); border-radius: var(--radius-md); padding: 0.75rem 1rem; margin-bottom: 1rem; font-size: var(--fs-xs); color: var(--info); display: flex; align-items: center; gap: 0.5rem;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        <span>Usa las teclas <strong>A, B, C, D</strong> para ingresar respuestas. <strong>Tab</strong> para avanzar. <strong>Supr/Delete</strong> para borrar. Auto-guardado activado.</span>
      </div>

      <!-- Grid -->
      <div class="tab-grid-container" id="gridContainer">
        <table class="tab-grid" id="tabGrid">
          <thead>
            <tr>
              <th>#</th>
              <th>Alumno</th>
              ${Array.from({ length: ensayo.totalPreguntas }, (_, i) => `<th>${i + 1}</th>`).join('')}
              <th class="result-header">OK</th>
              <th class="result-header">Nota</th>
              <th class="result-header">Ptje</th>
              <th class="result-header">Nivel</th>
            </tr>
          </thead>
          <tbody>
            <!-- Answer key row -->
            <tr class="answer-key-row">
              <td style="background: rgba(255, 107, 53, 0.08); font-weight: 700; color: var(--accent);">★</td>
              <td style="background: rgba(255, 107, 53, 0.08); font-weight: 700; color: var(--accent); font-size: var(--fs-xs);">CLAVE</td>
              ${ensayo.claveRespuestas.map(c => `
                <td style="font-weight: 700; color: var(--accent); font-size: var(--fs-xs);">${c.respuestaCorrecta}</td>
              `).join('')}
              <td class="result-col"></td>
              <td class="result-col"></td>
              <td class="result-col"></td>
              <td class="result-col"></td>
            </tr>
            ${alumnos.map(alumno => {
    const resp = respuestas.find(r => r.alumnoId === alumno.id);
    const respMap = resp?.respuestas || {};
    return `
                <tr data-alumno-id="${alumno.id}">
                  <td>${alumno.numero}</td>
                  <td title="${alumno.nombre}">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <span>${alumno.nombre}</span>
                        <button class="icon-btn btn-dictar" data-alumno="${alumno.id}" title="Dictar Respuestas con IA" style="padding: 0.25rem;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                        </button>
                    </div>
                  </td>
                  ${Array.from({ length: ensayo.totalPreguntas }, (_, i) => {
      const pregNum = i + 1;
      const val = respMap[pregNum] || '';
      const clave = ensayo.claveRespuestas[i]?.respuestaCorrecta?.toUpperCase();
      let cls = 'empty';
      if (val) cls = val.toUpperCase() === clave ? 'correct' : 'incorrect';
      return `
                      <td>
                        <input
                          class="tab-cell ${cls}"
                          data-alumno="${alumno.id}"
                          data-pregunta="${pregNum}"
                          value="${val}"
                          maxlength="1"
                          autocomplete="off"
                        />
                      </td>
                    `;
    }).join('')}
                  <td class="result-col result-ok" data-alumno="${alumno.id}">—</td>
                  <td class="result-col result-nota" data-alumno="${alumno.id}">—</td>
                  <td class="result-col result-ptje" data-alumno="${alumno.id}">—</td>
                  <td class="result-col result-nivel" data-alumno="${alumno.id}">—</td>
                </tr>
              `;
  }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function init(navigateTo, showToast) {
  // Ensayo selector
  document.querySelectorAll('.ensayo-card[data-ensayo-id]').forEach(card => {
    card.addEventListener('click', () => {
      navigateTo('tabulacion', { ensayoId: card.dataset.ensayoId });
    });
  });

  document.getElementById('btnGoNuevo')?.addEventListener('click', () => navigateTo('nuevo-ensayo'));
  document.getElementById('btnBackToList')?.addEventListener('click', () => navigateTo('tabulacion'));

  // If we're showing the grid
  if (!currentEnsayoId) return;

  const ensayo = storage.getEnsayo(currentEnsayoId);
  if (!ensayo) return;

  let saveTimeout = null;

  // ---- Audio Dictation (Whisper) ----
  const dictarBtns = document.querySelectorAll('.btn-dictar');
  dictarBtns.forEach(btn => {
    let recording = false;

    btn.addEventListener('click', async () => {
      if (!recording) {
        // Check if API key exists first
        if (!storage.getOpenAIApiKey()) {
          showToast('Configura tu llave de OpenAI (⚙️ arriba a la derecha) para usar la Corrección por Voz.', 'error');
          return;
        }
        const success = await startRecording();
        if (success) {
          recording = true;
          btn.classList.add('recording-active');
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect></svg>`;
          showToast('🎤 Escuchando... Haz clic de nuevo para detener y procesar.', 'info');
        } else {
          showToast('No se pudo acceder al micrófono.', 'error');
        }
      } else {
        // Stop recording
        recording = false;
        btn.classList.remove('recording-active');
        btn.style.opacity = '0.5';
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`; // Clock/wait icon

        showToast('🧠 Procesando dictado con IA (Whisper)...', 'info');

        try {
          const audioBlob = await stopRecording();
          if (audioBlob) {
            const jsonArr = await processDictation(audioBlob, ensayo.totalPreguntas);
            if (Array.isArray(jsonArr)) {
              const alumnoId = btn.dataset.alumno;
              let dictadas = 0;
              jsonArr.forEach(item => {
                if (item.p && typeof item.r === 'string') {
                  const c = document.querySelector(`.tab-cell[data-alumno="${alumnoId}"][data-pregunta="${item.p}"]`);
                  if (c) {
                    c.value = item.r.toUpperCase();
                    c.dispatchEvent(new Event('input')); // Triggers color change and autosave
                    dictadas++;
                  }
                }
              });
              showToast(`¡Dictado procesado! ${dictadas} respuestas asignadas.`, 'success');
            }
          }
        } catch (error) {
          showToast(error.message, 'error');
        } finally {
          btn.style.opacity = '1';
          // Reset to mic icon
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`;
        }
      }
    });
  });

  // Handle cell input
  const cells = document.querySelectorAll('.tab-cell');
  cells.forEach(cell => {
    cell.addEventListener('keydown', (e) => {
      const validKeys = ['a', 'b', 'c', 'd', 'e', 'A', 'B', 'C', 'D', 'E'];

      if (validKeys.includes(e.key)) {
        e.preventDefault();
        cell.value = e.key.toUpperCase();
        cell.dispatchEvent(new Event('input'));
        // Move to next cell
        moveToNextCell(cell);
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        cell.value = '';
        cell.dispatchEvent(new Event('input'));
      } else if (e.key === 'Tab') {
        e.preventDefault();
        if (e.shiftKey) moveToPrevCell(cell);
        else moveToNextCell(cell);
      } else if (e.key === 'ArrowRight') {
        moveToNextCell(cell);
      } else if (e.key === 'ArrowLeft') {
        moveToPrevCell(cell);
      } else if (e.key === 'ArrowDown') {
        moveToNextRow(cell);
      } else if (e.key === 'ArrowUp') {
        moveToPrevRow(cell);
      } else if (e.key === 'Enter') {
        moveToNextRow(cell);
      } else if (!['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
        e.preventDefault();
      }
    });

    cell.addEventListener('input', () => {
      const val = cell.value.toUpperCase();
      if (val && !['A', 'B', 'C', 'D', 'E'].includes(val)) {
        cell.value = '';
        return;
      }

      // Update class
      const pregNum = parseInt(cell.dataset.pregunta);
      const clave = ensayo.claveRespuestas[pregNum - 1]?.respuestaCorrecta?.toUpperCase();
      cell.classList.remove('correct', 'incorrect', 'empty');
      if (!val) cell.classList.add('empty');
      else if (val === clave) cell.classList.add('correct');
      else cell.classList.add('incorrect');

      // Debounced save
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => saveAllResponses(), 300);

      // Update row results
      updateRowResults(cell.dataset.alumno);
    });

    cell.addEventListener('focus', () => {
      cell.select();
    });

    // Prevent paste of non-valid chars
    cell.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text');
      const val = text.trim().toUpperCase().charAt(0);
      if (['A', 'B', 'C', 'D', 'E'].includes(val)) {
        cell.value = val;
        cell.dispatchEvent(new Event('input'));
      }
    });
  });

  function moveToNextCell(current) {
    const allCells = Array.from(cells);
    const idx = allCells.indexOf(current);
    if (idx < allCells.length - 1) {
      allCells[idx + 1].focus();
    }
  }

  function moveToPrevCell(current) {
    const allCells = Array.from(cells);
    const idx = allCells.indexOf(current);
    if (idx > 0) {
      allCells[idx - 1].focus();
    }
  }

  function moveToNextRow(current) {
    const alumnoId = current.dataset.alumno;
    const pregunta = current.dataset.pregunta;
    const rows = document.querySelectorAll(`[data-alumno][data-pregunta="${pregunta}"]`);
    const rowArr = Array.from(rows);
    const idx = rowArr.findIndex(c => c.dataset.alumno === alumnoId);
    if (idx < rowArr.length - 1) rowArr[idx + 1].focus();
  }

  function moveToPrevRow(current) {
    const alumnoId = current.dataset.alumno;
    const pregunta = current.dataset.pregunta;
    const rows = document.querySelectorAll(`[data-alumno][data-pregunta="${pregunta}"]`);
    const rowArr = Array.from(rows);
    const idx = rowArr.findIndex(c => c.dataset.alumno === alumnoId);
    if (idx > 0) rowArr[idx - 1].focus();
  }

  function saveAllResponses() {
    const alumnos = storage.getAlumnos(ensayo.cursoId);
    const allRespuestas = [];

    alumnos.forEach(alumno => {
      const respuestas = {};
      const alumCells = document.querySelectorAll(`[data-alumno="${alumno.id}"]`);
      alumCells.forEach(c => {
        if (c.classList.contains('tab-cell') && c.value) {
          respuestas[c.dataset.pregunta] = c.value.toUpperCase();
        }
      });
      if (Object.keys(respuestas).length > 0) {
        allRespuestas.push({ alumnoId: alumno.id, respuestas });
      }
    });

    storage.saveAllRespuestas(currentEnsayoId, allRespuestas);

    // Update ensayo status
    const ensayoData = storage.getEnsayo(currentEnsayoId);
    if (allRespuestas.length > 0 && ensayoData.status !== 'tabulado') {
      storage.saveEnsayo({ ...ensayoData, status: 'tabulado' });
    }
  }

  function updateRowResults(alumnoId) {
    const alumCells = document.querySelectorAll(`.tab-cell[data-alumno="${alumnoId}"]`);
    const respuestas = {};
    alumCells.forEach(c => {
      if (c.value) respuestas[c.dataset.pregunta] = c.value.toUpperCase();
    });

    if (Object.keys(respuestas).length === 0) {
      document.querySelector(`.result-ok[data-alumno="${alumnoId}"]`).textContent = '—';
      document.querySelector(`.result-nota[data-alumno="${alumnoId}"]`).textContent = '—';
      document.querySelector(`.result-ptje[data-alumno="${alumnoId}"]`).textContent = '—';
      document.querySelector(`.result-nivel[data-alumno="${alumnoId}"]`).textContent = '—';
      return;
    }

    const resultado = calcularResultadoAlumno(respuestas, ensayo);

    document.querySelector(`.result-ok[data-alumno="${alumnoId}"]`).textContent = `${resultado.correctasTotales}/${resultado.totalPreguntas}`;
    document.querySelector(`.result-nota[data-alumno="${alumnoId}"]`).textContent = resultado.nota.toFixed(1);

    const ptjeEl = document.querySelector(`.result-ptje[data-alumno="${alumnoId}"]`);
    ptjeEl.textContent = resultado.puntajeSimce;

    const nivelEl = document.querySelector(`.result-nivel[data-alumno="${alumnoId}"]`);
    nivelEl.innerHTML = `<span class="badge badge-${resultado.nivel.toLowerCase()}" style="font-size: 10px; padding: 0.125rem 0.5rem;">${resultado.nivel}</span>`;
  }

  // Calculate initial results for existing data
  const alumnos = storage.getAlumnos(ensayo.cursoId);
  alumnos.forEach(a => updateRowResults(a.id));

  // View Results button
  document.getElementById('btnVerResultados')?.addEventListener('click', () => {
    navigateTo('reportes', { ensayoId: currentEnsayoId });
  });
}
