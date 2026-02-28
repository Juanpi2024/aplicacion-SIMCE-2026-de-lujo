import{C as O}from"./vendor-sRkgK8jz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const d of r)if(d.type==="childList")for(const c of d.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const d={};return r.integrity&&(d.integrity=r.integrity),r.referrerPolicy&&(d.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?d.credentials="include":r.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(r){if(r.ep)return;r.ep=!0;const d=a(r);fetch(r.href,d)}})();const w={SCHOOL:"simce_school",CURSOS:"simce_cursos",ALUMNOS:"simce_alumnos",ENSAYOS:"simce_ensayos",RESPUESTAS:"simce_respuestas"};function _(){return Date.now().toString(36)+Math.random().toString(36).substr(2,6)}function M(t){try{return JSON.parse(localStorage.getItem(t))||[]}catch{return[]}}function A(t,e){localStorage.setItem(t,JSON.stringify(e))}function Y(){return JSON.parse(localStorage.getItem(w.SCHOOL))||{name:"Mi Colegio"}}function se(t){localStorage.setItem(w.SCHOOL,JSON.stringify(t))}function z(){return localStorage.getItem("simce_openai_key")||""}function re(t){localStorage.setItem("simce_openai_key",t.trim())}function j(){return M(w.CURSOS)}function L(t){return j().find(e=>e.id===t)}function ie(t){const e=j();if(t.id){const a=e.findIndex(s=>s.id===t.id);a>=0?e[a]={...e[a],...t}:e.push(t)}else t.id=_(),t.createdAt=new Date().toISOString(),e.push(t);return A(w.CURSOS,e),t}function le(t){A(w.CURSOS,j().filter(a=>a.id!==t)),A(w.ALUMNOS,x().filter(a=>a.cursoId!==t)),$().filter(a=>a.cursoId===t).forEach(a=>ce(a.id)),A(w.ENSAYOS,$().filter(a=>a.cursoId!==t))}function x(t){const e=M(w.ALUMNOS);return t?e.filter(a=>a.cursoId===t):e}function de(t,e){const a=M(w.ALUMNOS).filter(r=>r.cursoId!==t),s=e.map((r,d)=>({id:r.id||_(),cursoId:t,nombre:r.nombre.trim(),numero:d+1}));return A(w.ALUMNOS,[...a,...s]),s}function $(t){const e=M(w.ENSAYOS);return t?e.filter(a=>a.cursoId===t):e}function D(t){return $().find(e=>e.id===t)}function W(t){const e=$();if(t.id){const a=e.findIndex(s=>s.id===t.id);a>=0?e[a]={...e[a],...t,updatedAt:new Date().toISOString()}:e.push(t)}else t.id=_(),t.createdAt=new Date().toISOString(),t.updatedAt=new Date().toISOString(),e.push(t);return A(w.ENSAYOS,e),t}function ce(t){A(w.ENSAYOS,$().filter(e=>e.id!==t)),A(w.RESPUESTAS,N().filter(e=>e.ensayoId!==t))}function N(t){const e=M(w.RESPUESTAS);return t?e.filter(a=>a.ensayoId===t):e}function ue(t,e){const a=M(w.RESPUESTAS).filter(r=>r.ensayoId!==t),s=e.map(r=>({id:_(),ensayoId:t,alumnoId:r.alumnoId,respuestas:r.respuestas,updatedAt:new Date().toISOString()}));A(w.RESPUESTAS,[...a,...s])}const pe={LENGUAJE:{contenidos:["Comprensión lectora"],habilidades:["Localizar información","Relacionar e interpretar información","Reflexionar sobre el texto"]}};function ve(){const t=j(),e=$(),a=x().length;return`
    <div class="fade-in">
      <!-- Stats -->
      <div class="stats-grid stagger">
        <div class="stat-card">
          <div class="stat-icon blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <div class="stat-value">${t.length}</div>
            <div class="stat-label">Cursos activos</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div>
            <div class="stat-value">${e.length}</div>
            <div class="stat-label">Ensayos creados</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
          <div>
            <div class="stat-value">${a}</div>
            <div class="stat-label">Alumnos registrados</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon red">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          </div>
          <div>
            <div class="stat-value">${e.filter(s=>s.status==="tabulado").length}</div>
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
        ${e.length===0?`
          <div class="empty-state">
            <div class="empty-state-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div class="empty-state-title">Sin ensayos aún</div>
            <div class="empty-state-desc">Crea tu primer ensayo SIMCE para comenzar a tabular y obtener resultados al instante.</div>
            <button class="btn btn-primary" data-action="nuevo-ensayo" id="btnEmptyNuevoEnsayo">Crear primer ensayo</button>
          </div>
        `:`
          <div class="ensayo-grid">
            ${e.slice(-6).reverse().map(s=>{const r=L(s.cursoId),d=N(s.id),c=x(s.cursoId),u=d.filter(n=>Object.keys(n.respuestas||{}).length>0).length;return`
                <div class="ensayo-card" data-ensayo-id="${s.id}" data-action="ver-ensayo">
                  <div class="ensayo-meta">
                    <span class="badge badge-info">${r?r.nombre:"Curso"}</span>
                    <span class="badge ${s.status==="tabulado"?"badge-avanzado":"badge-intermedio"}">${s.status==="tabulado"?"Tabulado":"Pendiente"}</span>
                  </div>
                  <div class="ensayo-title">Ensayo Nº${s.numero} — ${s.asignatura}</div>
                  <div class="ensayo-info">
                    <span>${s.totalPreguntas} preguntas</span>
                    <span>${u}/${c.length} tabulados</span>
                    <span>${new Date(s.createdAt).toLocaleDateString("es-CL")}</span>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>
    </div>
  `}function me(t){document.querySelectorAll('[data-action="nuevo-ensayo"]').forEach(e=>{e.addEventListener("click",()=>t("nuevo-ensayo"))}),document.querySelectorAll('[data-action="nuevo-curso"]').forEach(e=>{e.addEventListener("click",()=>t("cursos"))}),document.querySelectorAll('[data-action="ver-ensayo"]').forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.ensayoId;t("tabulacion",{ensayoId:a})})})}const ge=Object.freeze(Object.defineProperty({__proto__:null,init:me,render:ve},Symbol.toStringTag,{value:"Module"}));function fe(){const t=j();return`
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
      ${t.length===0?`
        <div class="card">
          <div class="empty-state">
            <div class="empty-state-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="empty-state-title">Sin cursos</div>
            <div class="empty-state-desc">Crea tu primer curso e ingresa la nómina de alumnos para comenzar con los ensayos.</div>
          </div>
        </div>
      `:`
        <div class="ensayo-grid">
          ${t.map(e=>{const a=x(e.id),s=$(e.id);return`
              <div class="card" style="cursor: default;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h3 style="font-size: var(--fs-lg); font-weight: 700;">${e.nombre}</h3>
                    <p style="font-size: var(--fs-xs); color: var(--text-muted);">${e.year||new Date().getFullYear()}</p>
                  </div>
                  <div style="display: flex; gap: 0.25rem;">
                    <button class="btn btn-ghost btn-sm btn-edit-curso" data-id="${e.id}" title="Editar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="btn btn-ghost btn-sm btn-delete-curso" data-id="${e.id}" title="Eliminar" style="color: var(--danger);">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
                <div style="margin-top: 1rem; display: flex; gap: 1.5rem;">
                  <div>
                    <div style="font-size: var(--fs-2xl); font-weight: 800;">${a.length}</div>
                    <div style="font-size: var(--fs-xs); color: var(--text-secondary);">Alumnos</div>
                  </div>
                  <div>
                    <div style="font-size: var(--fs-2xl); font-weight: 800;">${s.length}</div>
                    <div style="font-size: var(--fs-xs); color: var(--text-secondary);">Ensayos</div>
                  </div>
                </div>
                ${a.length>0?`
                  <div style="margin-top: 1rem; max-height: 150px; overflow-y: auto; border-top: 1px solid var(--border-light); padding-top: 0.75rem;">
                    ${a.slice(0,8).map((r,d)=>`
                      <div style="font-size: var(--fs-xs); color: var(--text-secondary); padding: 0.2rem 0;">
                        <span style="color: var(--text-muted); font-weight: 600; margin-right: 0.5rem;">${d+1}.</span>${r.nombre}
                      </div>
                    `).join("")}
                    ${a.length>8?`<div style="font-size: var(--fs-xs); color: var(--text-muted); padding-top: 0.25rem;">... y ${a.length-8} más</div>`:""}
                  </div>
                `:""}
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `}function ye(t,e){let a=null;const s=document.getElementById("cursoForm"),r=document.getElementById("btnAddCurso"),d=document.getElementById("btnCancelCurso"),c=document.getElementById("btnSaveCurso"),u=document.getElementById("cursoFormTitle");r?.addEventListener("click",()=>{a=null,u.textContent="Nuevo Curso",document.getElementById("inputCursoNombre").value="",document.getElementById("inputAlumnos").value="",s.style.display="block",s.scrollIntoView({behavior:"smooth"})}),d?.addEventListener("click",()=>{s.style.display="none",a=null}),c?.addEventListener("click",()=>{const n=document.getElementById("inputCursoNombre").value.trim(),v=document.getElementById("inputCursoYear").value,g=document.getElementById("inputAlumnos").value.trim();if(!n){e("Ingresa el nombre del curso","error");return}const f=ie({id:a||void 0,nombre:n,year:parseInt(v)});if(g){const i=g.split(`
`).map(o=>o.trim()).filter(o=>o.length>0).map(o=>({nombre:o}));de(f.id,i)}e(`Curso "${n}" guardado con éxito`,"success"),t("cursos")}),document.querySelectorAll(".btn-edit-curso").forEach(n=>{n.addEventListener("click",()=>{const v=L(n.dataset.id),g=x(v.id);a=v.id,u.textContent="Editar Curso",document.getElementById("inputCursoNombre").value=v.nombre,document.getElementById("inputCursoYear").value=v.year||new Date().getFullYear(),document.getElementById("inputAlumnos").value=g.map(f=>f.nombre).join(`
`),s.style.display="block",s.scrollIntoView({behavior:"smooth"})})}),document.querySelectorAll(".btn-delete-curso").forEach(n=>{n.addEventListener("click",()=>{const v=L(n.dataset.id);confirm(`¿Eliminar el curso "${v.nombre}" y todos sus datos?`)&&(le(n.dataset.id),e(`Curso "${v.nombre}" eliminado`,"info"),t("cursos"))})})}const be=Object.freeze(Object.defineProperty({__proto__:null,init:ye,render:fe},Symbol.toStringTag,{value:"Module"})),J="https://api.openai.com/v1";async function he(t,e){const a=z();if(!a)throw new Error("API_KEY_MISSING");const s=await Ee(t,a);if(!s)throw new Error("No se pudo transcribir el audio.");return await we(s,e,a)}async function Ee(t,e){const a=new FormData;a.append("file",t,"grabacion.webm"),a.append("model","whisper-1"),a.append("language","es");const s=await fetch(`${J}/audio/transcriptions`,{method:"POST",headers:{Authorization:`Bearer ${e}`},body:a});if(!s.ok){const d=await s.json();throw console.error("Whisper Error:",d),new Error("Error al conectar con el servicio de voz (Whisper). "+(d.error?.message||""))}return(await s.json()).text}async function we(t,e,a){const s=`Eres un asistente de corrección de exámenes SIMCE.
El docente ha dictado las alternativas marcadas por un estudiante.
La prueba tiene ${e} preguntas en total.

El texto dictado es el siguiente:
"${t}"

Tu tarea es:
1. Extraer la alternativa respondida para cada pregunta mencionada.
2. Las alternativas válidas son: A, B, C, D, E. Si dice "omitió", "blanco", "no respondió" u otra palabra similar, el valor debe ser "" (string vacío).
3. Devuelve los resultados ESTRICTAMENTE como un arreglo JSON donde cada objeto tenga 'p' (número de pregunta) y 'r' (respuesta).
Ejemplo de salida:
[{"p": 1, "r": "A"}, {"p": 2, "r": "C"}, {"p": 3, "r": ""}]

ATENCIÓN:
- Devuelve SOLO el JSON válido, sin delimitadores de markdown (como \`\`\`json) ni texto adicional antes o después.
- Infiere contextualmente. Si dice "uno a, dos b, la tres la saltó, cuatro perro", significa p:1 r:A, p:2 r:B, p:3 r:"", p:4 r:D.
`,r=await fetch(`${J}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"user",content:s}],temperature:.1})});if(!r.ok){const u=await r.json();throw console.error("ChatGPT Error:",u),new Error("Error al procesar el texto con ChatGPT. "+(u.error?.message||""))}let c=(await r.json()).choices[0].message.content.trim();c.startsWith("```json")&&(c=c.replace(/^```json/,"")),c.startsWith("```")&&(c=c.replace(/^```/,"")),c.endsWith("```")&&(c=c.replace(/```$/,""));try{return JSON.parse(c.trim())}catch(u){throw console.error("JSON Parse Error:",u,c),new Error("La IA no devolvió un formato válido.")}}async function Ce(t,e){const a=z();if(!a)throw new Error("API_KEY_MISSING");const r=[{type:"text",text:`Eres un experto creador de pruebas SIMCE para el currículo educativo de Chile. A continuación te entrego imágenes de un ensayo de ${e} preguntas.
Tu tarea es resolver la prueba completa leyendo cuidadosamente los textos y alternativas presentadas en las imágenes. Para cada pregunta de 1 hasta ${e}, debes deducir contextualmente:
- 'respuestaCorrecta': La alternativa correcta (A, B, C, D o E).
- 'habilidad': (Ej. "Extraer información", "Reflexionar", "Interpretar y relacionar", "Conocimiento matemático", etc.)
- 'contenido': (El tema específico: Ej. "Comprensión lectora", "Geometría", "Álgebra", etc.)

Devuelve ESTRICTAMENTE un arreglo JSON donde cada objeto tenga 'p' (número de pregunta), 'respuestaCorrecta', 'habilidad' y 'contenido'.
IMPORTANTE: Asegúrate de llegar hasta la pregunta ${e}.
Ejemplo de salida: 
[{"p": 1, "respuestaCorrecta": "A", "habilidad": "Localizar", "contenido": "Comprensión lectora"}]
SIN DELIMITADORES MARKDOWN COMO \`\`\`json.`}];t.forEach(v=>{r.push({type:"image_url",image_url:{url:v,detail:"high"}})});const d={model:"gpt-4o-mini",messages:[{role:"user",content:r}],temperature:.2,max_tokens:4e3},c=await fetch(`${J}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(d)});if(!c.ok){const v=await c.json();throw console.error("ChatGPT Vision Error:",v),new Error("Error al procesar el documento con IA. "+(v.error?.message||""))}let n=(await c.json()).choices[0].message.content.trim();n.startsWith("```json")&&(n=n.replace(/^```json/,"")),n.startsWith("```")&&(n=n.replace(/^```/,"")),n.endsWith("```")&&(n=n.replace(/```$/,""));try{return JSON.parse(n.trim())}catch(v){throw console.error("Vision JSON Parse Error:",v,n),new Error("La IA no pudo formatear correctamente la pauta devuelta.")}}function xe(){const t=j();return`
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
          ${t.length===0?`
            <div class="empty-state" style="padding: 2rem;">
              <div class="empty-state-title">No hay cursos</div>
              <div class="empty-state-desc">Primero debes crear un curso con su nómina de alumnos.</div>
              <button class="btn btn-primary" id="btnGoCursos">Ir a Cursos</button>
            </div>
          `:`
            <div class="ensayo-grid">
              ${t.map(e=>{const a=x(e.id);return`
                  <div class="ensayo-card curso-option" data-curso-id="${e.id}" style="cursor: pointer;">
                    <div class="ensayo-title">${e.nombre}</div>
                    <div class="ensayo-info">
                      <span>${a.length} alumnos</span>
                      <span>${e.year||""}</span>
                    </div>
                  </div>
                `}).join("")}
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
  `}function Ie(t,e){let a=null,s=null;const r=pe.LENGUAJE;function d(i){document.querySelectorAll(".step-content").forEach(o=>o.style.display="none"),document.getElementById(`step${i}`).style.display="block",i===2&&u(),document.querySelectorAll(".step").forEach(o=>{const l=parseInt(o.dataset.step);o.classList.remove("active","completed"),l<i&&o.classList.add("completed"),l===i&&o.classList.add("active")}),document.querySelectorAll(".step-line").forEach((o,l)=>{o.classList.toggle("completed",l<i-1)})}document.querySelectorAll(".curso-option").forEach(i=>{i.addEventListener("click",()=>{a=i.dataset.cursoId,document.querySelectorAll(".curso-option").forEach(o=>o.style.borderColor=""),i.style.borderColor="var(--accent)",setTimeout(()=>d(2),200)})}),document.getElementById("btnGoCursos")?.addEventListener("click",()=>t("cursos")),document.getElementById("btnBuscarBiblioteca")?.addEventListener("click",()=>{t("biblioteca")});async function u(){const i=sessionStorage.getItem("biblio_modelo_seleccionado"),o=document.getElementById("bibliotecaAlertContainer");if(!i){o.innerHTML="";return}try{const l=await fetch("/aplicacion-SIMCE-2026-de-lujo/ensayos_catalogo.json");if(!l.ok)throw new Error("Catálogo no encontrado");const p=(await l.json()).find(b=>b.id===i);if(p){const b=document.getElementById("selectAsignatura");Array.from(b.options).some(h=>h.value===p.asignatura)||b.add(new Option(p.asignatura,p.asignatura)),b.value=p.asignatura,document.getElementById("inputTotalPreguntas").value=p.totalPreguntas||30,document.getElementById("inputNotaMinima").value=p.notaMinima||2,document.getElementById("inputDificultad").value=p.porcentajeDificultad||60,s=p.claveRespuestas&&p.claveRespuestas.length>0?p.claveRespuestas:null,o.innerHTML=`
                  <div style="background: var(--success-bg); border: 1px solid var(--success); color: var(--success); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                     <div>
                       <strong>¡Modelo Importado!</strong><br/>
                       <span style="font-size: var(--fs-xs);">${p.titulo} cargado con éxito. Revisa la configuración.</span>
                     </div>
                  </div>
              `,sessionStorage.removeItem("biblio_modelo_seleccionado")}}catch(l){console.error("Error importando desde biblioteca",l)}}document.getElementById("btnBackStep1")?.addEventListener("click",()=>d(1)),document.getElementById("btnNextStep3")?.addEventListener("click",()=>{const i=parseInt(document.getElementById("inputTotalPreguntas").value);if(!i||i<1){e("Ingresa el total de preguntas","error");return}f(i,s),d(3)});const n=document.getElementById("btnGenerarPautaIA"),v=document.getElementById("inputFileIA");n?.addEventListener("click",()=>{if(!z()){e("Configura tu llave de OpenAI (⚙️ arriba a la derecha) para usar la Corrección con IA.","error");return}v.click()}),v?.addEventListener("change",async i=>{const o=i.target.files[0];if(!o)return;n.disabled=!0;const l=n.innerHTML;n.innerHTML="⏳ Procesando documento...";try{const m=parseInt(document.getElementById("inputTotalPreguntas").value)||30;let p=[];if(o.type==="application/pdf"){typeof window.pdfjsLib>"u"&&(e("Descargando motor lector de PDF por primera vez...","info"),await new Promise((S,I)=>{const C=document.createElement("script");C.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",C.onload=S,C.onerror=()=>I(new Error("No se pudo cargar la librería PDF.js. Comprueba tu conexión a internet.")),document.head.appendChild(C)})),e("Leyendo PDF y convirtiendo a imágenes...","info");const h=await o.arrayBuffer(),E=await pdfjsLib.getDocument({data:h}).promise,P=Math.min(E.numPages,6);for(let S=1;S<=P;S++){const I=await E.getPage(S),C=I.getViewport({scale:1.5}),R=document.createElement("canvas"),ne=R.getContext("2d");R.height=C.height,R.width=C.width,await I.render({canvasContext:ne,viewport:C}).promise,p.push(R.toDataURL("image/jpeg",.8))}}else if(o.type.startsWith("image/"))p.push(await g(o));else throw new Error("Formato de archivo no soportado. Usa PDF o imágenes (JPG, PNG).");e(`Analizando ${p.length} imágenes con GPT-4 Vision...`,"info");const b=await Ce(p,m);if(Array.isArray(b)){let h=0;b.forEach(y=>{if(!y.p)return;const E=document.querySelector(`.clave-resp[data-pregunta="${y.p}"]`);E&&y.respuestaCorrecta&&(E.value=y.respuestaCorrecta.toUpperCase(),h++);const P=document.querySelector(`.clave-cont[data-pregunta="${y.p}"]`);if(P&&y.contenido){const I=Array.from(P.options).find(C=>C.value.toLowerCase()===y.contenido.toLowerCase());I&&(P.value=I.value)}const S=document.querySelector(`.clave-hab[data-pregunta="${y.p}"]`);if(S&&y.habilidad){const I=Array.from(S.options).find(C=>C.value.toLowerCase()===y.habilidad.toLowerCase());I&&(S.value=I.value)}}),e(`¡Completado! Se determinaron ${h} claves correctas.`,"success")}}catch(m){console.error(m),e(m.message,"error")}finally{v.value="",n.disabled=!1,n.innerHTML=l}});function g(i){return new Promise((o,l)=>{const m=new FileReader;m.readAsDataURL(i),m.onload=()=>o(m.result),m.onerror=p=>l(p)})}function f(i,o=null){const l=document.getElementById("claveTableBody");let m="";for(let p=1;p<=i;p++){let b="",h="",y="";o&&o[p-1]&&(b=o[p-1].respuestaCorrecta||"",h=o[p-1].contenido||"",y=o[p-1].habilidad||""),m+=`
        <tr>
          <td style="font-weight: 700; text-align: center; color: var(--text-muted);">${p}</td>
          <td>
            <select class="form-select form-input-sm clave-resp" data-pregunta="${p}">
              <option value="" ${b===""?"selected":""}>—</option>
              <option value="A" ${b==="A"?"selected":""}>A</option>
              <option value="B" ${b==="B"?"selected":""}>B</option>
              <option value="C" ${b==="C"?"selected":""}>C</option>
              <option value="D" ${b==="D"?"selected":""}>D</option>
              <option value="E" ${b==="E"?"selected":""}>E</option>
            </select>
          </td>
          <td>
            <select class="form-select form-input-sm clave-cont" data-pregunta="${p}">
              ${r.contenidos.map(E=>`<option value="${E}" ${h===E?"selected":""}>${E}</option>`).join("")}
            </select>
          </td>
          <td>
            <select class="form-select form-input-sm clave-hab" data-pregunta="${p}">
              ${r.habilidades.map(E=>`<option value="${E}" ${y===E?"selected":""}>${E}</option>`).join("")}
            </select>
          </td>
        </tr>
      `}l.innerHTML=m}document.getElementById("btnBackStep2")?.addEventListener("click",()=>d(2)),document.getElementById("btnCrearEnsayo")?.addEventListener("click",()=>{if(!a){e("Selecciona un curso primero","error");return}const i=document.querySelectorAll(".clave-resp"),o=document.querySelectorAll(".clave-cont"),l=document.querySelectorAll(".clave-hab"),m=[];let p=!1;if(i.forEach((h,y)=>{h.value||(p=!0),m.push({pregunta:y+1,respuestaCorrecta:h.value||"A",contenido:o[y].value,habilidad:l[y].value})}),p&&!confirm("Hay preguntas sin respuesta correcta definida. ¿Deseas continuar de todas formas?"))return;const b=W({cursoId:a,asignatura:document.getElementById("selectAsignatura").value,numero:parseInt(document.getElementById("inputNumeroEnsayo").value)||1,totalPreguntas:m.length,notaMinima:parseFloat(document.getElementById("inputNotaMinima").value)||2,porcentajeDificultad:parseInt(document.getElementById("inputDificultad").value)||60,claveRespuestas:m,status:"pendiente"});e("¡Ensayo creado exitosamente!","success"),t("tabulacion",{ensayoId:b.id})})}const Se=Object.freeze(Object.defineProperty({__proto__:null,init:Ie,render:xe},Symbol.toStringTag,{value:"Module"}));function Ae(t,e=2,a=60){const s=t*(a/100),r=4,d=7,c=[];for(let u=0;u<=t;u++){let n;if(u<=s)s===0?n=r:n=e+(r-e)/s*u;else{const v=t-s;v===0?n=d:n=r+(d-r)/v*(u-s)}c.push({puntaje:u,nota:Math.round(n*10)/10})}return c}function U(t,e,a=2,s=60){const d=Ae(e,a,s).find(c=>c.puntaje===t);return d?d.nota:a}function $e(t){if(t<=2)return 116;if(t>=7)return 325;const e=[{nota:2,puntaje:116},{nota:3,puntaje:168},{nota:4,puntaje:219},{nota:4.5,puntaje:239},{nota:5,puntaje:255},{nota:5.5,puntaje:271},{nota:6,puntaje:287},{nota:6.5,puntaje:303},{nota:7,puntaje:325}];for(let a=0;a<e.length-1;a++){const s=e[a],r=e[a+1];if(t>=s.nota&&t<=r.nota){const d=(t-s.nota)/(r.nota-s.nota);return Math.round(s.puntaje+d*(r.puntaje-s.puntaje))}}return 219}function Q(t){return t>=295?"Avanzado":t>=245?"Intermedio":"Inicial"}function ke(t,e){let a=0;const s=[],r={},d={},c={},u={};return e.forEach(n=>{const v=t[n.pregunta]||"",g=v.toUpperCase()===n.respuestaCorrecta.toUpperCase();g&&a++,s.push({pregunta:n.pregunta,respuesta:v.toUpperCase(),correcta:n.respuestaCorrecta.toUpperCase(),esCorrecta:g,contenido:n.contenido,habilidad:n.habilidad});const f=n.contenido||"Sin contenido";r[f]||(r[f]=0),d[f]||(d[f]=0),d[f]++,g&&r[f]++;const i=n.habilidad||"Sin habilidad";c[i]||(c[i]=0),u[i]||(u[i]=0),u[i]++,g&&c[i]++}),{correctasTotales:a,totalPreguntas:e.length,porcentajeLogro:e.length>0?Math.round(a/e.length*100):0,detallePorPregunta:s,porContenido:Object.keys(d).map(n=>({contenido:n,correctas:r[n],total:d[n],porcentaje:Math.round(r[n]/d[n]*100)})),porHabilidad:Object.keys(u).map(n=>({habilidad:n,correctas:c[n],total:u[n],porcentaje:Math.round(c[n]/u[n]*100)}))}}function Z(t,e){const a=ke(t,e.claveRespuestas),s=U(a.correctasTotales,e.totalPreguntas,e.notaMinima||2,e.porcentajeDificultad||60),r=$e(s),d=Q(r),c=a.porContenido.map(n=>({...n,nota:U(n.correctas,n.total,e.notaMinima||2,e.porcentajeDificultad||60)})),u=a.porHabilidad.map(n=>({...n,nota:U(n.correctas,n.total,e.notaMinima||2,e.porcentajeDificultad||60)}));return{correctasTotales:a.correctasTotales,totalPreguntas:a.totalPreguntas,porcentajeLogro:a.porcentajeLogro,nota:s,puntajeSimce:r,nivel:d,porContenido:c,porHabilidad:u,detallePorPregunta:a.detallePorPregunta}}function X(t,e,a){const s=[];return e.forEach(r=>{const d=a.find(c=>c.alumnoId===r.id);if(d&&d.respuestas&&Object.keys(d.respuestas).length>0){const c=Z(d.respuestas,t);s.push({alumnoId:r.id,alumnoNombre:r.nombre,alumnoNumero:r.numero,...c})}}),s}function ee(t,e){if(t.length===0)return{cantidadEvaluados:0,promedioNota:0,promedioPuntaje:0,promedioLogro:0,nivelGeneral:"Inicial",segmentacion:{Inicial:[],Intermedio:[],Avanzado:[]},porContenido:[],porHabilidad:[]};const a=t.length,s=Math.round(t.reduce((i,o)=>i+o.nota,0)/a*10)/10,r=Math.round(t.reduce((i,o)=>i+o.puntajeSimce,0)/a),d=Math.round(t.reduce((i,o)=>i+o.porcentajeLogro,0)/a),c=Q(r),u={Inicial:[],Intermedio:[],Avanzado:[]};t.forEach(i=>{u[i.nivel].push({id:i.alumnoId,nombre:i.alumnoNombre,numero:i.alumnoNumero,puntaje:i.puntajeSimce,nota:i.nota})});const n={};t.forEach(i=>{i.porContenido.forEach(o=>{n[o.contenido]||(n[o.contenido]={total:0,correctas:0,count:0}),n[o.contenido].total+=o.total,n[o.contenido].correctas+=o.correctas,n[o.contenido].count++})});const v=Object.entries(n).map(([i,o])=>({contenido:i,porcentaje:Math.round(o.correctas/o.total*100),correctas:o.correctas,total:o.total})),g={};t.forEach(i=>{i.porHabilidad.forEach(o=>{g[o.habilidad]||(g[o.habilidad]={total:0,correctas:0,count:0}),g[o.habilidad].total+=o.total,g[o.habilidad].correctas+=o.correctas,g[o.habilidad].count++})});const f=Object.entries(g).map(([i,o])=>({habilidad:i,porcentaje:Math.round(o.correctas/o.total*100),correctas:o.correctas,total:o.total}));return{cantidadEvaluados:a,promedioNota:s,promedioPuntaje:r,promedioLogro:d,nivelGeneral:c,segmentacion:u,porContenido:v,porHabilidad:f}}let k=null,q=[];async function Le(){try{const t=await navigator.mediaDevices.getUserMedia({audio:!0}),e={mimeType:"audio/webm"};return k=new MediaRecorder(t,e),q=[],k.ondataavailable=a=>{a.data.size>0&&q.push(a.data)},k.start(),!0}catch(t){return console.error("Error accediendo al micrófono:",t),!1}}function Be(){return new Promise(t=>{if(!k||k.state==="inactive"){t(null);return}k.onstop=()=>{const e=new Blob(q,{type:"audio/webm"});k.stream.getTracks().forEach(a=>a.stop()),t(e)},k.stop()})}let B=null;function Me(t){const e=$();return t?.ensayoId?(B=t.ensayoId,je(t.ensayoId)):`
    <div class="fade-in">
      <div style="margin-bottom: 1.5rem;">
        <h2 style="font-size: var(--fs-xl); font-weight: 700;">Tabulación de Respuestas</h2>
        <p style="color: var(--text-secondary); font-size: var(--fs-sm);">Selecciona un ensayo para tabular las respuestas</p>
      </div>
      ${e.length===0?`
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
      `:`
        <div class="ensayo-grid">
          ${e.map(a=>{const s=L(a.cursoId),r=N(a.id),d=x(a.cursoId),c=r.filter(n=>n.respuestas&&Object.keys(n.respuestas).length>0).length,u=d.length>0?Math.round(c/d.length*100):0;return`
              <div class="ensayo-card" data-ensayo-id="${a.id}" style="cursor: pointer;">
                <div class="ensayo-meta">
                  <span class="badge badge-info">${s?s.nombre:"?"}</span>
                </div>
                <div class="ensayo-title">Ensayo Nº${a.numero} — ${a.asignatura}</div>
                <div class="ensayo-info" style="margin-bottom: 0.75rem;">
                  <span>${a.totalPreguntas} preguntas</span>
                  <span>${c}/${d.length} tabulados</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill ${u<40?"low":u<80?"mid":"high"}" style="width: ${u}%;"></div>
                </div>
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `}function je(t){const e=D(t);if(!e)return'<div class="card"><p>Ensayo no encontrado</p></div>';const a=L(e.cursoId),s=x(e.cursoId),r=N(t),d=r.filter(c=>c.respuestas&&Object.keys(c.respuestas).length>0).length;return`
    <div class="fade-in">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="btn btn-ghost btn-sm" id="btnBackToList">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              Volver
            </button>
            <h2 style="font-size: var(--fs-xl); font-weight: 700;">
              Ensayo Nº${e.numero} — ${a?a.nombre:""}
            </h2>
          </div>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-left: 4.5rem;">
            ${e.asignatura} · ${e.totalPreguntas} preguntas · ${d}/${s.length} tabulados
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
              ${Array.from({length:e.totalPreguntas},(c,u)=>`<th>${u+1}</th>`).join("")}
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
              ${e.claveRespuestas.map(c=>`
                <td style="font-weight: 700; color: var(--accent); font-size: var(--fs-xs);">${c.respuestaCorrecta}</td>
              `).join("")}
              <td class="result-col"></td>
              <td class="result-col"></td>
              <td class="result-col"></td>
              <td class="result-col"></td>
            </tr>
            ${s.map(c=>{const n=r.find(v=>v.alumnoId===c.id)?.respuestas||{};return`
                <tr data-alumno-id="${c.id}">
                  <td>${c.numero}</td>
                  <td title="${c.nombre}">
                    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 0.5rem;">
                        <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.nombre}</span>
                        <button class="icon-btn btn-dictar" data-alumno="${c.id}" title="Dictar Respuestas con IA" style="padding: 0.35rem; flex-shrink: 0; display: flex;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                        </button>
                    </div>
                  </td>
                  ${Array.from({length:e.totalPreguntas},(v,g)=>{const f=g+1,i=n[f]||"",o=e.claveRespuestas[g]?.respuestaCorrecta?.toUpperCase();let l="empty";return i&&(l=i.toUpperCase()===o?"correct":"incorrect"),`
                      <td>
                        <input
                          class="tab-cell ${l}"
                          data-alumno="${c.id}"
                          data-pregunta="${f}"
                          value="${i}"
                          maxlength="1"
                          autocomplete="off"
                        />
                      </td>
                    `}).join("")}
                  <td class="result-col result-ok" data-alumno="${c.id}">—</td>
                  <td class="result-col result-nota" data-alumno="${c.id}">—</td>
                  <td class="result-col result-ptje" data-alumno="${c.id}">—</td>
                  <td class="result-col result-nivel" data-alumno="${c.id}">—</td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function Ne(t,e){if(document.querySelectorAll(".ensayo-card[data-ensayo-id]").forEach(o=>{o.addEventListener("click",()=>{t("tabulacion",{ensayoId:o.dataset.ensayoId})})}),document.getElementById("btnGoNuevo")?.addEventListener("click",()=>t("nuevo-ensayo")),document.getElementById("btnBackToList")?.addEventListener("click",()=>t("tabulacion")),!B)return;const a=D(B);if(!a)return;let s=null;const r=document.querySelector(".tab-grid-container");if(!r)return;let d=null;r.addEventListener("click",async o=>{const l=o.target.closest(".btn-dictar");if(l){if(d&&d!==l){e("Ya hay una grabación en progreso.","warning");return}if(d){d=null,l.classList.remove("recording-active"),l.style.opacity="0.5",l.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',e("🧠 Procesando dictado con IA (Whisper)...","info");try{const m=await Be();if(m){const p=await he(m,a.totalPreguntas);if(Array.isArray(p)){const b=l.dataset.alumno;let h=0;p.forEach(y=>{if(y.p&&typeof y.r=="string"){const E=document.querySelector(`.tab-cell[data-alumno="${b}"][data-pregunta="${y.p}"]`);E&&(E.value=y.r.toUpperCase(),E.dispatchEvent(new Event("input",{bubbles:!0})),h++)}}),e(`¡Dictado procesado! ${h} respuestas asignadas.`,"success")}}}catch(m){e(m.message,"error")}finally{l.style.opacity="1",l.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>'}}else{if(!z()){e("Configura tu llave de OpenAI (⚙️ arriba a la derecha) para usar la Corrección por Voz.","error");return}await Le()?(d=l,l.classList.add("recording-active"),l.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect></svg>',e("🎤 Escuchando... Haz clic de nuevo para detener y procesar.","info")):e("No se pudo acceder al micrófono.","error")}}}),r.addEventListener("keydown",o=>{const l=o.target;if(!l.classList.contains("tab-cell"))return;["a","b","c","d","e","A","B","C","D","E"].includes(o.key)?(o.preventDefault(),l.value=o.key.toUpperCase(),l.dispatchEvent(new Event("input",{bubbles:!0})),c(l)):o.key==="Delete"||o.key==="Backspace"?(l.value="",l.dispatchEvent(new Event("input",{bubbles:!0}))):o.key==="Tab"?(o.preventDefault(),o.shiftKey?u(l):c(l)):o.key==="ArrowRight"?c(l):o.key==="ArrowLeft"?u(l):o.key==="ArrowDown"?n(l):o.key==="ArrowUp"?v(l):o.key==="Enter"?n(l):["Shift","Control","Alt","Meta"].includes(o.key)||o.preventDefault()}),r.addEventListener("input",o=>{const l=o.target;if(!l.classList.contains("tab-cell"))return;const m=l.value.toUpperCase();if(m&&!["A","B","C","D","E"].includes(m)){l.value="";return}const p=parseInt(l.dataset.pregunta),b=a.claveRespuestas[p-1]?.respuestaCorrecta?.toUpperCase();l.classList.remove("correct","incorrect","empty"),m?m===b?l.classList.add("correct"):l.classList.add("incorrect"):l.classList.add("empty"),clearTimeout(s),s=setTimeout(()=>g(),300),f(l.dataset.alumno)}),r.addEventListener("focusin",o=>{o.target.classList.contains("tab-cell")&&o.target.select()}),r.addEventListener("paste",o=>{const l=o.target;if(!l.classList.contains("tab-cell"))return;o.preventDefault();const p=(o.clipboardData||window.clipboardData).getData("text").trim().toUpperCase().charAt(0);["A","B","C","D","E"].includes(p)&&(l.value=p,l.dispatchEvent(new Event("input",{bubbles:!0})))});function c(o){const l=Array.from(document.querySelectorAll(".tab-cell")),m=l.indexOf(o);m<l.length-1&&l[m+1].focus()}function u(o){const l=Array.from(document.querySelectorAll(".tab-cell")),m=l.indexOf(o);m>0&&l[m-1].focus()}function n(o){const l=o.dataset.alumno,m=o.dataset.pregunta,p=document.querySelectorAll(`[data-alumno][data-pregunta="${m}"]`),b=Array.from(p),h=b.findIndex(y=>y.dataset.alumno===l);h<b.length-1&&b[h+1].focus()}function v(o){const l=o.dataset.alumno,m=o.dataset.pregunta,p=document.querySelectorAll(`[data-alumno][data-pregunta="${m}"]`),b=Array.from(p),h=b.findIndex(y=>y.dataset.alumno===l);h>0&&b[h-1].focus()}function g(){const o=x(a.cursoId),l=[];o.forEach(p=>{const b={};document.querySelectorAll(`[data-alumno="${p.id}"]`).forEach(y=>{y.classList.contains("tab-cell")&&y.value&&(b[y.dataset.pregunta]=y.value.toUpperCase())}),Object.keys(b).length>0&&l.push({alumnoId:p.id,respuestas:b})}),ue(B,l);const m=D(B);l.length>0&&m.status!=="tabulado"&&W({...m,status:"tabulado"})}function f(o){const l=document.querySelectorAll(`.tab-cell[data-alumno="${o}"]`),m={};if(l.forEach(y=>{y.value&&(m[y.dataset.pregunta]=y.value.toUpperCase())}),Object.keys(m).length===0){document.querySelector(`.result-ok[data-alumno="${o}"]`).textContent="—",document.querySelector(`.result-nota[data-alumno="${o}"]`).textContent="—",document.querySelector(`.result-ptje[data-alumno="${o}"]`).textContent="—",document.querySelector(`.result-nivel[data-alumno="${o}"]`).textContent="—";return}const p=Z(m,a);document.querySelector(`.result-ok[data-alumno="${o}"]`).textContent=`${p.correctasTotales}/${p.totalPreguntas}`,document.querySelector(`.result-nota[data-alumno="${o}"]`).textContent=p.nota.toFixed(1);const b=document.querySelector(`.result-ptje[data-alumno="${o}"]`);b.textContent=p.puntajeSimce;const h=document.querySelector(`.result-nivel[data-alumno="${o}"]`);h.innerHTML=`<span class="badge badge-${p.nivel.toLowerCase()}" style="font-size: 10px; padding: 0.125rem 0.5rem;">${p.nivel}</span>`}x(a.cursoId).forEach(o=>f(o.id)),document.getElementById("btnVerResultados")?.addEventListener("click",()=>{t("reportes",{ensayoId:B})})}const Pe=Object.freeze(Object.defineProperty({__proto__:null,init:Ne,render:Me},Symbol.toStringTag,{value:"Module"}));let T=[];function Oe(t){const e=$();if(!t?.ensayoId){const n=e.filter(v=>v.status==="tabulado");return`
      <div class="fade-in">
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: var(--fs-xl); font-weight: 700;">Reportes</h2>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm);">Selecciona un ensayo tabulado para ver los resultados</p>
        </div>
        ${n.length===0?`
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
              </div>
              <div class="empty-state-title">Sin resultados aún</div>
              <div class="empty-state-desc">Tabula al menos un ensayo para generar reportes automáticos.</div>
            </div>
          </div>
        `:`
          <div class="ensayo-grid">
            ${n.map(v=>{const g=L(v.cursoId);return`
                <div class="ensayo-card" data-ensayo-id="${v.id}" style="cursor: pointer;">
                  <div class="ensayo-meta">
                    <span class="badge badge-info">${g?g.nombre:"?"}</span>
                    <span class="badge badge-avanzado">Tabulado</span>
                  </div>
                  <div class="ensayo-title">Ensayo Nº${v.numero} — ${v.asignatura}</div>
                  <div class="ensayo-info">
                    <span>${v.totalPreguntas} preguntas</span>
                    <span>${new Date(v.updatedAt||v.createdAt).toLocaleDateString("es-CL")}</span>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>
    `}const a=D(t.ensayoId);if(!a)return'<div class="card"><p>Ensayo no encontrado</p></div>';const s=L(a.cursoId),r=x(a.cursoId),d=N(t.ensayoId),c=X(a,r,d),u=ee(c);return`
    <div class="fade-in">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="btn btn-ghost btn-sm" id="btnBackReportes">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <h2 style="font-size: var(--fs-xl); font-weight: 700;">
              Ensayo Nº${a.numero} — ${s?s.nombre:""}
            </h2>
          </div>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-left: 3rem;">
            ${a.asignatura} · ${u.cantidadEvaluados} alumnos evaluados
          </p>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid stagger">
        <div class="stat-card">
          <div class="stat-icon blue"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
          <div>
            <div class="stat-value">${u.cantidadEvaluados}</div>
            <div class="stat-label">Alumnos evaluados</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg></div>
          <div>
            <div class="stat-value">${u.promedioNota}</div>
            <div class="stat-label">Promedio Nota</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <div>
            <div class="stat-value">${u.promedioPuntaje}</div>
            <div class="stat-label">Ptje SIMCE Simulado</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon ${u.nivelGeneral==="Avanzado"?"green":u.nivelGeneral==="Intermedio"?"orange":"red"}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <div class="stat-value">${u.promedioLogro}%</div>
            <div class="stat-label">% Logro · <span class="badge badge-${u.nivelGeneral.toLowerCase()}">${u.nivelGeneral}</span></div>
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

      ${u.porContenido.length>0?`
      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 class="card-title" style="margin-bottom: 1rem;">% Logro por Contenido</h3>
        <div class="chart-container" style="height: 220px;"><canvas id="chartContenidos"></canvas></div>
      </div>
      `:""}

      <!-- Segmentation -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 class="card-title" style="margin-bottom: 1rem;">Segmentación de Alumnos</h3>
        <div class="segmentation-grid">
          <div class="seg-column inicial">
            <div class="seg-header">
              <span class="seg-title" style="color: var(--danger);">🔴 Inicial</span>
              <span class="seg-count badge badge-inicial">${u.segmentacion.Inicial.length}</span>
            </div>
            ${u.segmentacion.Inicial.map(n=>`<div class="seg-student">${n.numero}. ${n.nombre} <span style="float: right; font-weight: 600;">${n.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
          </div>
          <div class="seg-column intermedio">
            <div class="seg-header">
              <span class="seg-title" style="color: #b45309;">🟡 Intermedio</span>
              <span class="seg-count badge badge-intermedio">${u.segmentacion.Intermedio.length}</span>
            </div>
            ${u.segmentacion.Intermedio.map(n=>`<div class="seg-student">${n.numero}. ${n.nombre} <span style="float: right; font-weight: 600;">${n.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
          </div>
          <div class="seg-column avanzado">
            <div class="seg-header">
              <span class="seg-title" style="color: #059669;">🟢 Avanzado</span>
              <span class="seg-count badge badge-avanzado">${u.segmentacion.Avanzado.length}</span>
            </div>
            ${u.segmentacion.Avanzado.map(n=>`<div class="seg-student">${n.numero}. ${n.nombre} <span style="float: right; font-weight: 600;">${n.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
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
              ${c.sort((n,v)=>n.alumnoNumero-v.alumnoNumero).map(n=>`
                <tr>
                  <td style="font-weight: 600; color: var(--text-muted);">${n.alumnoNumero}</td>
                  <td style="font-weight: 500;">${n.alumnoNombre}</td>
                  <td>${n.correctasTotales}/${n.totalPreguntas}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <div class="progress-bar" style="width: 60px; height: 6px;">
                        <div class="progress-fill ${n.porcentajeLogro<40?"low":n.porcentajeLogro<70?"mid":"high"}" style="width: ${n.porcentajeLogro}%;"></div>
                      </div>
                      <span>${n.porcentajeLogro}%</span>
                    </div>
                  </td>
                  <td style="font-weight: 700;">${n.nota.toFixed(1)}</td>
                  <td style="font-weight: 600;">${n.puntajeSimce}</td>
                  <td><span class="badge badge-${n.nivel.toLowerCase()}">${n.nivel}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function Te(t,e,a){if(T.forEach(f=>f.destroy()),T=[],document.querySelectorAll(".ensayo-card[data-ensayo-id]").forEach(f=>{f.addEventListener("click",()=>{t("reportes",{ensayoId:f.dataset.ensayoId})})}),document.getElementById("btnBackReportes")?.addEventListener("click",()=>t("reportes")),!a?.ensayoId)return;const s=D(a.ensayoId);if(!s)return;const r=x(s.cursoId),d=N(a.ensayoId),c=X(s,r,d),u=ee(c);O.defaults.font.family="'Inter', sans-serif",O.defaults.font.size=12;const n=document.getElementById("chartHabilidades");if(n&&u.porHabilidad.length>0){const f=new O(n,{type:"bar",data:{labels:u.porHabilidad.map(i=>i.habilidad),datasets:[{data:u.porHabilidad.map(i=>i.porcentaje),backgroundColor:u.porHabilidad.map(i=>i.porcentaje>=70?"rgba(16, 185, 129, 0.7)":i.porcentaje>=40?"rgba(245, 158, 11, 0.7)":"rgba(239, 68, 68, 0.7)"),borderRadius:6,barPercentage:.6}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:"y",plugins:{legend:{display:!1},tooltip:{callbacks:{label:i=>`${i.raw}% de logro`}}},scales:{x:{max:100,grid:{color:"rgba(0,0,0,0.04)"}},y:{grid:{display:!1},ticks:{font:{size:11}}}}}});T.push(f)}const v=document.getElementById("chartSegmentacion");if(v){const f=new O(v,{type:"doughnut",data:{labels:["Inicial","Intermedio","Avanzado"],datasets:[{data:[u.segmentacion.Inicial.length,u.segmentacion.Intermedio.length,u.segmentacion.Avanzado.length],backgroundColor:["rgba(239, 68, 68, 0.75)","rgba(245, 158, 11, 0.75)","rgba(16, 185, 129, 0.75)"],borderWidth:0,spacing:3,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"55%",plugins:{legend:{position:"bottom",labels:{padding:16,usePointStyle:!0,pointStyle:"circle"}}}}});T.push(f)}const g=document.getElementById("chartContenidos");if(g&&u.porContenido.length>0){const f=new O(g,{type:"bar",data:{labels:u.porContenido.map(i=>i.contenido),datasets:[{data:u.porContenido.map(i=>i.porcentaje),backgroundColor:u.porContenido.map(i=>i.porcentaje>=70?"rgba(16, 185, 129, 0.7)":i.porcentaje>=40?"rgba(245, 158, 11, 0.7)":"rgba(239, 68, 68, 0.7)"),borderRadius:6,barPercentage:.6}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:"y",plugins:{legend:{display:!1}},scales:{x:{max:100,grid:{color:"rgba(0,0,0,0.04)"}},y:{grid:{display:!1}}}}});T.push(f)}}const De=Object.freeze(Object.defineProperty({__proto__:null,init:Te,render:Oe},Symbol.toStringTag,{value:"Module"}));async function ze(){return`
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
  `}async function Re(t,e){const a=document.getElementById("bibliotecaContainer");let s=[];try{const n=await fetch("/aplicacion-SIMCE-2026-de-lujo/ensayos_catalogo.json");if(!n.ok)throw new Error("No se pudo cargar el catálogo.");s=await n.json(),u(s)}catch(n){console.error(n),a.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon" style="color: var(--danger);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="empty-state-title">Error al cargar la Biblioteca</div>
        <div class="empty-state-desc">No se encontró el archivo de catálogo base. Ejecuta el script de procesamiento primero.</div>
      </div>
    `;return}const r=document.getElementById("btnFiltrar"),d=document.getElementById("filtroAsignatura"),c=document.getElementById("filtroNivel");r?.addEventListener("click",()=>{const n=d.value,v=c.value,g=s.filter(f=>{const i=n==="todos"||f.asignatura===n,o=v==="todos"||f.nivel===v;return i&&o});u(g)});function u(n){if(n.length===0){a.innerHTML=`
        <div class="empty-state card">
          <div class="empty-state-icon">
             <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <div class="empty-state-title">No hay resultados</div>
          <div class="empty-state-desc">Prueba cambiando los filtros de búsqueda.</div>
        </div>
      `;return}const v=n.map(g=>`
      <div class="ensayo-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="ensayo-meta">
            <span class="badge ${g.asignatura.includes("Matem")?"badge-intermedio":"badge-info"}">${g.asignatura}</span>
            <span class="badge" style="background: var(--bg-input); border: 1px solid var(--border);">${g.nivel}</span>
          </div>
          <div class="ensayo-title" style="margin-bottom: 0.5rem; font-size: var(--fs-lg);">${g.titulo}</div>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-bottom: 1rem;">
             Archivo original: <a href="/aplicacion-SIMCE-2026-de-lujo/${g.archivo.replace(/^\//,"")}" target="_blank" style="color: var(--accent); text-decoration: underline;">Descargar documento</a>
          </p>
        </div>
        
        <div style="border-top: 1px solid var(--border-light); padding-top: 1rem; margin-top: auto;">
           <button class="btn btn-secondary btn-block btn-usar-ensayo" data-ensayo-id="${g.id}">
             Usar este modelo en la App
           </button>
        </div>
      </div>
    `).join("");a.innerHTML=`<div class="ensayo-grid">${v}</div>`,document.querySelectorAll(".btn-usar-ensayo").forEach(g=>{g.addEventListener("click",()=>{const f=g.dataset.ensayoId;sessionStorage.setItem("biblio_modelo_seleccionado",f),t("nuevo-ensayo")})})}}const He=Object.freeze(Object.defineProperty({__proto__:null,init:Re,render:ze},Symbol.toStringTag,{value:"Module"})),_e={dashboard:{module:ge,title:"Dashboard"},cursos:{module:be,title:"Cursos"},"nuevo-ensayo":{module:Se,title:"Nuevo Ensayo"},tabulacion:{module:Pe,title:"Tabulación"},reportes:{module:De,title:"Reportes"},biblioteca:{module:He,title:"Biblioteca de Ensayos"}};let G="dashboard",V={};function te(t,e={}){G=t,V=e,ae()}async function ae(){const t=_e[G];if(!t)return;document.getElementById("pageTitle").textContent=t.title,document.querySelectorAll(".nav-item").forEach(a=>{a.classList.toggle("active",a.dataset.page===G)});const e=document.getElementById("pageContent");if(typeof t.module.render=="function"){const a=t.module.render(V);a instanceof Promise?e.innerHTML=await a:e.innerHTML=a}t.module.init(te,H,V),e.scrollTop=0}function H(t,e="info"){const a=document.getElementById("toastContainer"),s=document.createElement("div");s.className=`toast ${e}`;const r={success:"✓",error:"✕",info:"ℹ"};s.innerHTML=`<span>${r[e]||"ℹ"}</span><span>${t}</span>`,a.appendChild(s),setTimeout(()=>{s.classList.add("out"),setTimeout(()=>s.remove(),300)},3e3)}function Ue(t,e,a){document.getElementById("modalTitle").textContent=t,document.getElementById("modalBody").innerHTML=e,document.getElementById("modalFooter").innerHTML=a,document.getElementById("modalOverlay").classList.add("show")}function F(){document.getElementById("modalOverlay").classList.remove("show")}function qe(){const t=document.getElementById("sidebar"),e=document.getElementById("menuBtn"),a=document.getElementById("sidebarToggle");e?.addEventListener("click",()=>{t.classList.toggle("show")}),a?.addEventListener("click",()=>{t.classList.toggle("collapsed"),t.classList.remove("show")}),document.getElementById("mainContent")?.addEventListener("click",()=>{window.innerWidth<=1024&&t.classList.remove("show")})}function Ge(){document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const a=t.dataset.page;a&&(te(a),window.innerWidth<=1024&&document.getElementById("sidebar").classList.remove("show"))})})}function Ve(){document.getElementById("modalClose")?.addEventListener("click",F),document.getElementById("modalOverlay")?.addEventListener("click",t=>{t.target===t.currentTarget&&F()})}function K(){const t=Y(),e=document.getElementById("schoolBadge");e&&(e.textContent=t.name,e.style.cursor="pointer",e.title="Click para cambiar nombre")}function Fe(){K(),document.getElementById("schoolBadge")?.addEventListener("click",()=>{const a=`
      <div class="form-group">
        <label for="inputSchoolName">Nombre del Colegio:</label>
        <input type="text" id="inputSchoolName" class="form-control" value="${Y().name}">
      </div>
    `;Ue("Editar Colegio",a,`
      <button id="btnSaveSchool" class="btn btn-primary">Guardar</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    `),document.getElementById("btnSaveSchool").addEventListener("click",()=>{const r=document.getElementById("inputSchoolName").value.trim();r&&(se({name:r}),K(),F(),H("Nombre guardado","success"))})})}function Je(){const t=document.getElementById("btnConfigAI"),e=document.getElementById("modalConfigAI"),a=document.getElementById("btnCerrarConfigAI"),s=document.getElementById("btnGuardarConfigAI"),r=document.getElementById("inputAIKey");t?.addEventListener("click",()=>{r.value=z(),e.style.display="flex"}),a?.addEventListener("click",()=>{e.style.display="none"}),s?.addEventListener("click",()=>{const d=r.value.trim();re(d),e.style.display="none",d?H("Llave API de OpenAI guardada exitosamente.","success"):H("Configuración AI deshabilitada.","info")})}function oe(){qe(),Ge(),Ve(),Fe(),Je(),ae()}document.addEventListener("DOMContentLoaded",oe);document.readyState!=="loading"&&oe();
