// ============================================
// nuevo-ensayo.js — Crear Ensayo con Stepper
// ============================================
import * as storage from '../js/storage.js';
import { generarPautaDesdeImagenes } from '../js/openai-service.js';

export function render() {
  const cursos = storage.getCursos();
  const preset = storage.PRESETS.LENGUAJE;

  return `
    <div class="fade-in">
      <div style="margin-bottom: 1.5rem;">
        <h2 style="font-size: var(--fs-xl); font-weight: 700;">Nuevo Ensayo SIMCE</h2>
        <p style="color: var(--text-secondary); font-size: var(--fs-sm);">Configura tu ensayo paso a paso</p>
      </div>

      <!-- Stepper -->
      <div class="stepper" id="stepper">
        <div class="step active" data-step="1"><span class="step-number">1</span><span>Curso</span></div>
        <div class="step-line"></div>
        <div class="step" data-step="2"><span class="step-number">2</span><span>Configuración</span></div>
        <div class="step-line"></div>
        <div class="step" data-step="3"><span class="step-number">3</span><span>Clave</span></div>
      </div>

      <div class="card">
        <!-- Step 1: Select Course -->
        <div class="step-content" id="step1">
          <h3 class="card-title" style="margin-bottom: 1rem;">Selecciona el curso</h3>
          ${cursos.length === 0 ? `
            <div class="empty-state" style="padding: 2rem;">
              <div class="empty-state-title">No hay cursos</div>
              <div class="empty-state-desc">Primero debes crear un curso con su nómina de alumnos.</div>
              <button class="btn btn-primary" id="btnGoCursos">Ir a Cursos</button>
            </div>
          ` : `
            <div class="ensayo-grid">
              ${cursos.map(c => {
    const alumnos = storage.getAlumnos(c.id);
    return `
                  <div class="ensayo-card curso-option" data-curso-id="${c.id}" style="cursor: pointer;">
                    <div class="ensayo-title">${c.nombre}</div>
                    <div class="ensayo-info">
                      <span>${alumnos.length} alumnos</span>
                      <span>${c.year || ''}</span>
                    </div>
                  </div>
                `;
  }).join('')}
            </div>
          `}
        </div>

        <!-- Step 2: Configuration -->
        <div class="step-content" id="step2" style="display: none;">
          <h3 class="card-title" style="margin-bottom: 1rem;">Configuración del Ensayo</h3>
          <div id="bibliotecaAlertContainer"></div>
          
          <div class="form-row">
            <div class="form-group" style="grid-column: span 2;">
              <button class="btn btn-secondary btn-block" id="btnBuscarBiblioteca" style="border: 1px dashed var(--accent); color: var(--accent); background: rgba(255, 107, 53, 0.05);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                Importar configuración desde la Biblioteca
              </button>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Asignatura</label>
              <select class="form-select" id="selectAsignatura">
                <option value="Lenguaje y Comunicación" selected>Lenguaje y Comunicación</option>
                <option value="Matemática">Matemática</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ensayo Nº</label>
              <input type="number" class="form-input" id="inputNumeroEnsayo" value="1" min="1" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Total de Preguntas</label>
              <input type="number" class="form-input" id="inputTotalPreguntas" value="27" min="1" max="50" />
            </div>
            <div class="form-group">
              <label class="form-label">Nota Mínima</label>
              <input type="number" class="form-input" id="inputNotaMinima" value="2.0" step="0.1" min="1" max="3" />
            </div>
            <div class="form-group">
              <label class="form-label">% de Dificultad</label>
              <input type="number" class="form-input" id="inputDificultad" value="60" min="30" max="80" />
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 1.5rem;">
            <button class="btn btn-secondary" id="btnBackStep1">← Atrás</button>
            <button class="btn btn-primary" id="btnNextStep3">Siguiente →</button>
          </div>
        </div>

        <!-- Step 3: Answer Key -->
        <div class="step-content" id="step3" style="display: none;">
          <h3 class="card-title" style="margin-bottom: 0.25rem;">Clave de Respuestas</h3>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-bottom: 1rem;">Define la respuesta correcta, contenido y habilidad de cada pregunta.</p>
          
          <div style="background: rgba(168, 85, 247, 0.05); border: 1px dashed var(--accent); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
             <div>
               <h4 style="color: var(--accent); font-weight: 600; font-size: var(--fs-sm); margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.25rem;">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                 Magia de Inteligencia Artificial
               </h4>
               <p style="color: var(--text-secondary); font-size: 11px;">Sube el PDF o una foto de la prueba y la IA creará la pauta completa por ti.</p>
             </div>
             <div>
               <input type="file" id="inputFileIA" accept=".pdf,image/png,image/jpeg,image/webp" style="display: none;" />
               <button class="btn btn-primary btn-sm" id="btnGenerarPautaIA" style="background: linear-gradient(135deg, var(--accent) 0%, #d946ef 100%); border: none;">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                 Subir Archivo y Generar
               </button>
             </div>
          </div>
          
          <div class="table-container" style="max-height: 500px; overflow-y: auto;">
            <table>
              <thead>
                <tr>
                  <th style="width: 50px;">Nº</th>
                  <th style="width: 100px;">Respuesta</th>
                  <th>Contenido</th>
                  <th>Habilidad</th>
                </tr>
              </thead>
              <tbody id="claveTableBody">
                <!-- Populated dynamically -->
              </tbody>
            </table>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-top: 1.5rem;">
            <button class="btn btn-secondary" id="btnBackStep2">← Atrás</button>
            <button class="btn btn-primary btn-lg" id="btnCrearEnsayo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Crear Ensayo
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init(navigateTo, showToast) {
  let selectedCursoId = null;
  let importedClaveRespuestas = null;
  const preset = storage.PRESETS.LENGUAJE;

  // Step navigation
  function showStep(n) {
    document.querySelectorAll('.step-content').forEach(el => el.style.display = 'none');
    document.getElementById(`step${n}`).style.display = 'block';
    if (n === 2) {
      checkBibliotecaImport();
    }
    document.querySelectorAll('.step').forEach(s => {
      const sn = parseInt(s.dataset.step);
      s.classList.remove('active', 'completed');
      if (sn < n) s.classList.add('completed');
      if (sn === n) s.classList.add('active');
    });
    document.querySelectorAll('.step-line').forEach((line, i) => {
      line.classList.toggle('completed', i < n - 1);
    });
  }

  // Step 1: Select Course
  document.querySelectorAll('.curso-option').forEach(card => {
    card.addEventListener('click', () => {
      selectedCursoId = card.dataset.cursoId;
      document.querySelectorAll('.curso-option').forEach(c => c.style.borderColor = '');
      card.style.borderColor = 'var(--accent)';
      setTimeout(() => showStep(2), 200);
    });
  });

  document.getElementById('btnGoCursos')?.addEventListener('click', () => navigateTo('cursos'));

  // Biblioteca Import Logic
  const biblioBtn = document.getElementById('btnBuscarBiblioteca');
  biblioBtn?.addEventListener('click', () => {
    navigateTo('biblioteca');
  });

  async function checkBibliotecaImport() {
    const importId = sessionStorage.getItem('biblio_modelo_seleccionado');
    const alertContainer = document.getElementById('bibliotecaAlertContainer');

    if (!importId) {
      alertContainer.innerHTML = '';
      return;
    }

    try {
      const res = await fetch(import.meta.env.BASE_URL + 'ensayos_catalogo.json');
      if (!res.ok) throw new Error('Catálogo no encontrado');
      const catalogo = await res.json();
      const modelo = catalogo.find(c => c.id === importId);

      if (modelo) {
        // Pre-fill form
        const selectAsig = document.getElementById('selectAsignatura');
        // Ensure option exists, if not add it
        if (!Array.from(selectAsig.options).some(o => o.value === modelo.asignatura)) {
          selectAsig.add(new Option(modelo.asignatura, modelo.asignatura));
        }
        selectAsig.value = modelo.asignatura;

        document.getElementById('inputTotalPreguntas').value = modelo.totalPreguntas || 30;
        document.getElementById('inputNotaMinima').value = modelo.notaMinima || 2.0;
        document.getElementById('inputDificultad').value = modelo.porcentajeDificultad || 60;

        importedClaveRespuestas = modelo.claveRespuestas && modelo.claveRespuestas.length > 0 ? modelo.claveRespuestas : null;

        // Visual feedback
        alertContainer.innerHTML = `
                  <div style="background: var(--success-bg); border: 1px solid var(--success); color: var(--success); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                     <div>
                       <strong>¡Modelo Importado!</strong><br/>
                       <span style="font-size: var(--fs-xs);">${modelo.titulo} cargado con éxito. Revisa la configuración.</span>
                     </div>
                  </div>
              `;

        // Clear for next time unless we want to keep it persistent for this session?
        // Let's clear it so it only imports once.
        sessionStorage.removeItem('biblio_modelo_seleccionado');
      }
    } catch (e) {
      console.error('Error importando desde biblioteca', e);
    }
  }

  // Step 2 navigation
  document.getElementById('btnBackStep1')?.addEventListener('click', () => showStep(1));
  document.getElementById('btnNextStep3')?.addEventListener('click', () => {
    const total = parseInt(document.getElementById('inputTotalPreguntas').value);
    if (!total || total < 1) {
      showToast('Ingresa el total de preguntas', 'error');
      return;
    }
    buildClaveTable(total, importedClaveRespuestas);
    showStep(3);
  });

  // ---- Generar Pauta con IA (Vision) ----
  const btnGenerarPautaIA = document.getElementById('btnGenerarPautaIA');
  const inputFileIA = document.getElementById('inputFileIA');

  btnGenerarPautaIA?.addEventListener('click', () => {
    if (!storage.getOpenAIApiKey()) {
      showToast('Configura tu llave de OpenAI (⚙️ arriba a la derecha) para usar la Corrección con IA.', 'error');
      return;
    }
    inputFileIA.click();
  });

  inputFileIA?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    btnGenerarPautaIA.disabled = true;
    const oldHtml = btnGenerarPautaIA.innerHTML;
    btnGenerarPautaIA.innerHTML = '⏳ Procesando documento...';

    try {
      const totalPreguntas = parseInt(document.getElementById('inputTotalPreguntas').value) || 30;
      let imagenesBase64 = [];

      if (file.type === 'application/pdf') {

        // Lazy load pdfjsLib from CDN
        if (typeof window.pdfjsLib === 'undefined') {
          showToast('Descargando motor lector de PDF por primera vez...', 'info');
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = resolve;
            script.onerror = () => reject(new Error('No se pudo cargar la librería PDF.js. Comprueba tu conexión a internet.'));
            document.head.appendChild(script);
          });
        }

        showToast('Leyendo PDF y convirtiendo a imágenes...', 'info');
        const arrayBuffer = await file.arrayBuffer();

        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        // Limitamos a 6 páginas para evitar superar payload o gastar tokens extra
        const maxPages = Math.min(pdf.numPages, 6);

        for (let i = 1; i <= maxPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport: viewport }).promise;
          imagenesBase64.push(canvas.toDataURL('image/jpeg', 0.8));
        }
      } else if (file.type.startsWith('image/')) {
        imagenesBase64.push(await fileToBase64(file));
      } else {
        throw new Error('Formato de archivo no soportado. Usa PDF o imágenes (JPG, PNG).');
      }

      showToast(`Analizando ${imagenesBase64.length} imágenes con GPT-4 Vision...`, 'info');
      const pautaExtraida = await generarPautaDesdeImagenes(imagenesBase64, totalPreguntas);

      if (Array.isArray(pautaExtraida)) {
        let insertadas = 0;
        pautaExtraida.forEach(item => {
          if (!item.p) return;
          const respSelect = document.querySelector(`.clave-resp[data-pregunta="${item.p}"]`);
          if (respSelect && item.respuestaCorrecta) {
            respSelect.value = item.respuestaCorrecta.toUpperCase();
            insertadas++;
          }

          const contSelect = document.querySelector(`.clave-cont[data-pregunta="${item.p}"]`);
          if (contSelect && item.contenido) {
            const exists = Array.from(contSelect.options).find(o => o.value.toLowerCase() === item.contenido.toLowerCase());
            if (exists) contSelect.value = exists.value;
          }

          const habSelect = document.querySelector(`.clave-hab[data-pregunta="${item.p}"]`);
          if (habSelect && item.habilidad) {
            const exists = Array.from(habSelect.options).find(o => o.value.toLowerCase() === item.habilidad.toLowerCase());
            if (exists) habSelect.value = exists.value;
          }
        });
        showToast(`¡Completado! Se determinaron ${insertadas} claves correctas.`, 'success');
      }

    } catch (err) {
      console.error(err);
      showToast(err.message, 'error');
    } finally {
      inputFileIA.value = '';
      btnGenerarPautaIA.disabled = false;
      btnGenerarPautaIA.innerHTML = oldHtml;
    }
  });

  function fileToBase64(f) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  // Build answer key table
  function buildClaveTable(total, importedClave = null) {
    const tbody = document.getElementById('claveTableBody');
    let html = '';
    for (let i = 1; i <= total; i++) {
      let r = '', c = '', h = '';
      if (importedClave && importedClave[i - 1]) {
        r = importedClave[i - 1].respuestaCorrecta || '';
        c = importedClave[i - 1].contenido || '';
        h = importedClave[i - 1].habilidad || '';
      }

      html += `
        <tr>
          <td style="font-weight: 700; text-align: center; color: var(--text-muted);">${i}</td>
          <td>
            <select class="form-select form-input-sm clave-resp" data-pregunta="${i}">
              <option value="" ${r === '' ? 'selected' : ''}>—</option>
              <option value="A" ${r === 'A' ? 'selected' : ''}>A</option>
              <option value="B" ${r === 'B' ? 'selected' : ''}>B</option>
              <option value="C" ${r === 'C' ? 'selected' : ''}>C</option>
              <option value="D" ${r === 'D' ? 'selected' : ''}>D</option>
              <option value="E" ${r === 'E' ? 'selected' : ''}>E</option>
            </select>
          </td>
          <td>
            <select class="form-select form-input-sm clave-cont" data-pregunta="${i}">
              ${preset.contenidos.map(cont => `<option value="${cont}" ${c === cont ? 'selected' : ''}>${cont}</option>`).join('')}
            </select>
          </td>
          <td>
            <select class="form-select form-input-sm clave-hab" data-pregunta="${i}">
              ${preset.habilidades.map(hab => `<option value="${hab}" ${h === hab ? 'selected' : ''}>${hab}</option>`).join('')}
            </select>
          </td>
        </tr>
      `;
    }
    tbody.innerHTML = html;
  }

  // Step 3 navigation
  document.getElementById('btnBackStep2')?.addEventListener('click', () => showStep(2));

  // Create Ensayo
  document.getElementById('btnCrearEnsayo')?.addEventListener('click', () => {
    if (!selectedCursoId) {
      showToast('Selecciona un curso primero', 'error');
      return;
    }

    const respSelects = document.querySelectorAll('.clave-resp');
    const contSelects = document.querySelectorAll('.clave-cont');
    const habSelects = document.querySelectorAll('.clave-hab');

    const claveRespuestas = [];
    let incomplete = false;
    respSelects.forEach((sel, i) => {
      if (!sel.value) incomplete = true;
      claveRespuestas.push({
        pregunta: i + 1,
        respuestaCorrecta: sel.value || 'A',
        contenido: contSelects[i].value,
        habilidad: habSelects[i].value,
      });
    });

    if (incomplete) {
      if (!confirm('Hay preguntas sin respuesta correcta definida. ¿Deseas continuar de todas formas?')) {
        return;
      }
    }

    const ensayo = storage.saveEnsayo({
      cursoId: selectedCursoId,
      asignatura: document.getElementById('selectAsignatura').value,
      numero: parseInt(document.getElementById('inputNumeroEnsayo').value) || 1,
      totalPreguntas: claveRespuestas.length,
      notaMinima: parseFloat(document.getElementById('inputNotaMinima').value) || 2.0,
      porcentajeDificultad: parseInt(document.getElementById('inputDificultad').value) || 60,
      claveRespuestas,
      status: 'pendiente',
    });

    showToast('¡Ensayo creado exitosamente!', 'success');
    navigateTo('tabulacion', { ensayoId: ensayo.id });
  });
}
