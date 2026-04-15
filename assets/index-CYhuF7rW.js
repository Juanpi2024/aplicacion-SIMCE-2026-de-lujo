import{C as T}from"./vendor-sRkgK8jz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=a(i);fetch(i.href,l)}})();const w={SCHOOL:"simce_school",CURSOS:"simce_cursos",ALUMNOS:"simce_alumnos",ENSAYOS:"simce_ensayos",RESPUESTAS:"simce_respuestas"};function _(){return Date.now().toString(36)+Math.random().toString(36).substr(2,6)}function j(t){try{return JSON.parse(localStorage.getItem(t))||[]}catch{return[]}}function S(t,e){localStorage.setItem(t,JSON.stringify(e))}function Y(){return JSON.parse(localStorage.getItem(w.SCHOOL))||{name:"Mi Colegio"}}function se(t){localStorage.setItem(w.SCHOOL,JSON.stringify(t))}function M(){return localStorage.getItem("simce_openai_key")||""}function re(t){localStorage.setItem("simce_openai_key",t.trim())}function N(){return j(w.CURSOS)}function L(t){return N().find(e=>e.id===t)}function ie(t){const e=N();if(t.id){const a=e.findIndex(r=>r.id===t.id);a>=0?e[a]={...e[a],...t}:e.push(t)}else t.id=_(),t.createdAt=new Date().toISOString(),e.push(t);return S(w.CURSOS,e),t}function le(t){S(w.CURSOS,N().filter(a=>a.id!==t)),S(w.ALUMNOS,I().filter(a=>a.cursoId!==t)),$().filter(a=>a.cursoId===t).forEach(a=>ce(a.id)),S(w.ENSAYOS,$().filter(a=>a.cursoId!==t))}function I(t){const e=j(w.ALUMNOS);return t?e.filter(a=>a.cursoId===t):e}function de(t,e){const a=j(w.ALUMNOS).filter(i=>i.cursoId!==t),r=e.map((i,l)=>({id:i.id||_(),cursoId:t,nombre:i.nombre.trim(),numero:l+1}));return S(w.ALUMNOS,[...a,...r]),r}function $(t){const e=j(w.ENSAYOS);return t?e.filter(a=>a.cursoId===t):e}function R(t){return $().find(e=>e.id===t)}function W(t){const e=$();if(t.id){const a=e.findIndex(r=>r.id===t.id);a>=0?e[a]={...e[a],...t,updatedAt:new Date().toISOString()}:e.push(t)}else t.id=_(),t.createdAt=new Date().toISOString(),t.updatedAt=new Date().toISOString(),e.push(t);return S(w.ENSAYOS,e),t}function ce(t){S(w.ENSAYOS,$().filter(e=>e.id!==t)),S(w.RESPUESTAS,P().filter(e=>e.ensayoId!==t))}function P(t){const e=j(w.RESPUESTAS);return t?e.filter(a=>a.ensayoId===t):e}function ue(t,e){const a=j(w.RESPUESTAS).filter(i=>i.ensayoId!==t),r=e.map(i=>({id:_(),ensayoId:t,alumnoId:i.alumnoId,respuestas:i.respuestas,updatedAt:new Date().toISOString()}));S(w.RESPUESTAS,[...a,...r])}const pe={LENGUAJE:{contenidos:["Comprensión lectora"],habilidades:["Localizar información","Relacionar e interpretar información","Reflexionar sobre el texto"]}};function me(){const t=N(),e=$(),a=I().length;return`
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
            <div class="stat-value">${e.filter(r=>r.status==="tabulado").length}</div>
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
            ${e.slice(-6).reverse().map(r=>{const i=L(r.cursoId),l=P(r.id),d=I(r.cursoId),c=l.filter(n=>Object.keys(n.respuestas||{}).length>0).length;return`
                <div class="ensayo-card" data-ensayo-id="${r.id}" data-action="ver-ensayo">
                  <div class="ensayo-meta">
                    <span class="badge badge-info">${i?i.nombre:"Curso"}</span>
                    <span class="badge ${r.status==="tabulado"?"badge-avanzado":"badge-intermedio"}">${r.status==="tabulado"?"Tabulado":"Pendiente"}</span>
                  </div>
                  <div class="ensayo-title">Ensayo Nº${r.numero} — ${r.asignatura}</div>
                  <div class="ensayo-info">
                    <span>${r.totalPreguntas} preguntas</span>
                    <span>${c}/${d.length} tabulados</span>
                    <span>${new Date(r.createdAt).toLocaleDateString("es-CL")}</span>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>
    </div>
  `}function ve(t){document.querySelectorAll('[data-action="nuevo-ensayo"]').forEach(e=>{e.addEventListener("click",()=>t("nuevo-ensayo"))}),document.querySelectorAll('[data-action="nuevo-curso"]').forEach(e=>{e.addEventListener("click",()=>t("cursos"))}),document.querySelectorAll('[data-action="ver-ensayo"]').forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.ensayoId;t("tabulacion",{ensayoId:a})})})}const ge=Object.freeze(Object.defineProperty({__proto__:null,init:ve,render:me},Symbol.toStringTag,{value:"Module"}));function ye(){const t=N();return`
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
          ${t.map(e=>{const a=I(e.id),r=$(e.id);return`
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
                    <div style="font-size: var(--fs-2xl); font-weight: 800;">${r.length}</div>
                    <div style="font-size: var(--fs-xs); color: var(--text-secondary);">Ensayos</div>
                  </div>
                </div>
                ${a.length>0?`
                  <div style="margin-top: 1rem; max-height: 150px; overflow-y: auto; border-top: 1px solid var(--border-light); padding-top: 0.75rem;">
                    ${a.slice(0,8).map((i,l)=>`
                      <div style="font-size: var(--fs-xs); color: var(--text-secondary); padding: 0.2rem 0;">
                        <span style="color: var(--text-muted); font-weight: 600; margin-right: 0.5rem;">${l+1}.</span>${i.nombre}
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
  `}function fe(t,e){let a=null;const r=document.getElementById("cursoForm"),i=document.getElementById("btnAddCurso"),l=document.getElementById("btnCancelCurso"),d=document.getElementById("btnSaveCurso"),c=document.getElementById("cursoFormTitle");i?.addEventListener("click",()=>{a=null,c.textContent="Nuevo Curso",document.getElementById("inputCursoNombre").value="",document.getElementById("inputAlumnos").value="",r.style.display="block",r.scrollIntoView({behavior:"smooth"})}),l?.addEventListener("click",()=>{r.style.display="none",a=null}),d?.addEventListener("click",()=>{const n=document.getElementById("inputCursoNombre").value.trim(),m=document.getElementById("inputCursoYear").value,g=document.getElementById("inputAlumnos").value.trim();if(!n){e("Ingresa el nombre del curso","error");return}const h=ie({id:a||void 0,nombre:n,year:parseInt(m)});if(g){const u=g.split(`
`).map(o=>o.trim()).filter(o=>o.length>0).map(o=>({nombre:o}));de(h.id,u)}e(`Curso "${n}" guardado con éxito`,"success"),t("cursos")}),document.querySelectorAll(".btn-edit-curso").forEach(n=>{n.addEventListener("click",()=>{const m=L(n.dataset.id),g=I(m.id);a=m.id,c.textContent="Editar Curso",document.getElementById("inputCursoNombre").value=m.nombre,document.getElementById("inputCursoYear").value=m.year||new Date().getFullYear(),document.getElementById("inputAlumnos").value=g.map(h=>h.nombre).join(`
`),r.style.display="block",r.scrollIntoView({behavior:"smooth"})})}),document.querySelectorAll(".btn-delete-curso").forEach(n=>{n.addEventListener("click",()=>{const m=L(n.dataset.id);confirm(`¿Eliminar el curso "${m.nombre}" y todos sus datos?`)&&(le(n.dataset.id),e(`Curso "${m.nombre}" eliminado`,"info"),t("cursos"))})})}const he=Object.freeze(Object.defineProperty({__proto__:null,init:fe,render:ye},Symbol.toStringTag,{value:"Module"})),J="https://api.openai.com/v1";async function be(t,e){const a=M();if(!a)throw new Error("API_KEY_MISSING");const r=await Ee(t,a);if(!r)throw new Error("No se pudo transcribir el audio.");return await we(r,e,a)}async function Ee(t,e){const a=new FormData;a.append("file",t,"grabacion.webm"),a.append("model","whisper-1"),a.append("language","es");const r=await fetch(`${J}/audio/transcriptions`,{method:"POST",headers:{Authorization:`Bearer ${e}`},body:a});if(!r.ok){const l=await r.json();throw console.error("Whisper Error:",l),new Error("Error al conectar con el servicio de voz (Whisper). "+(l.error?.message||""))}return(await r.json()).text}async function we(t,e,a){const r=`Eres un asistente de corrección de exámenes SIMCE.
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
`,i=await fetch(`${J}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"user",content:r}],temperature:.1})});if(!i.ok){const c=await i.json();throw console.error("ChatGPT Error:",c),new Error("Error al procesar el texto con ChatGPT. "+(c.error?.message||""))}let d=(await i.json()).choices[0].message.content.trim();d.startsWith("```json")&&(d=d.replace(/^```json/,"")),d.startsWith("```")&&(d=d.replace(/^```/,"")),d.endsWith("```")&&(d=d.replace(/```$/,""));try{return JSON.parse(d.trim())}catch(c){throw console.error("JSON Parse Error:",c,d),new Error("La IA no devolvió un formato válido.")}}async function Ce(t,e){const a=M();if(!a)throw new Error("API_KEY_MISSING");const i=[{type:"text",text:`Eres un experto creador de pruebas SIMCE para el currículo educativo de Chile. A continuación te entrego imágenes de un ensayo de ${e} preguntas.
Tu tarea es resolver la prueba completa leyendo cuidadosamente los textos y alternativas presentadas en las imágenes. Para cada pregunta de 1 hasta ${e}, debes deducir contextualmente:
- 'respuestaCorrecta': La alternativa correcta (A, B, C, D o E).
- 'habilidad': (Ej. "Extraer información", "Reflexionar", "Interpretar y relacionar", "Conocimiento matemático", etc.)
- 'contenido': (El tema específico: Ej. "Comprensión lectora", "Geometría", "Álgebra", etc.)

Devuelve ESTRICTAMENTE un arreglo JSON donde cada objeto tenga 'p' (número de pregunta), 'respuestaCorrecta', 'habilidad' y 'contenido'.
IMPORTANTE: Asegúrate de llegar hasta la pregunta ${e}.
Ejemplo de salida: 
[{"p": 1, "respuestaCorrecta": "A", "habilidad": "Localizar", "contenido": "Comprensión lectora"}]
SIN DELIMITADORES MARKDOWN COMO \`\`\`json.`}];t.forEach(m=>{i.push({type:"image_url",image_url:{url:m,detail:"high"}})});const l={model:"gpt-4o-mini",messages:[{role:"user",content:i}],temperature:.2,max_tokens:4e3},d=await fetch(`${J}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(l)});if(!d.ok){const m=await d.json();throw console.error("ChatGPT Vision Error:",m),new Error("Error al procesar el documento con IA. "+(m.error?.message||""))}let n=(await d.json()).choices[0].message.content.trim();n.startsWith("```json")&&(n=n.replace(/^```json/,"")),n.startsWith("```")&&(n=n.replace(/^```/,"")),n.endsWith("```")&&(n=n.replace(/```$/,""));try{return JSON.parse(n.trim())}catch(m){throw console.error("Vision JSON Parse Error:",m,n),new Error("La IA no pudo formatear correctamente la pauta devuelta.")}}function Ie(){const t=N();return`
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
              ${t.map(e=>{const a=I(e.id);return`
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
  `}function xe(t,e){let a=null,r=null;const i=pe.LENGUAJE;function l(u){document.querySelectorAll(".step-content").forEach(o=>o.style.display="none"),document.getElementById(`step${u}`).style.display="block",u===2&&c(),document.querySelectorAll(".step").forEach(o=>{const s=parseInt(o.dataset.step);o.classList.remove("active","completed"),s<u&&o.classList.add("completed"),s===u&&o.classList.add("active")}),document.querySelectorAll(".step-line").forEach((o,s)=>{o.classList.toggle("completed",s<u-1)})}document.querySelectorAll(".curso-option").forEach(u=>{u.addEventListener("click",()=>{a=u.dataset.cursoId,document.querySelectorAll(".curso-option").forEach(o=>o.style.borderColor=""),u.style.borderColor="var(--accent)",setTimeout(()=>l(2),200)})}),document.getElementById("btnGoCursos")?.addEventListener("click",()=>t("cursos")),document.getElementById("btnBuscarBiblioteca")?.addEventListener("click",()=>{t("biblioteca")});async function c(){const u=sessionStorage.getItem("biblio_modelo_seleccionado"),o=document.getElementById("bibliotecaAlertContainer");if(!u){o.innerHTML="";return}try{const s=await fetch("./ensayos_catalogo.json");if(!s.ok)throw new Error("Catálogo no encontrado");const v=(await s.json()).find(f=>f.id===u);if(v){const f=document.getElementById("selectAsignatura");Array.from(f.options).some(b=>b.value===v.asignatura)||f.add(new Option(v.asignatura,v.asignatura)),f.value=v.asignatura,document.getElementById("inputTotalPreguntas").value=v.totalPreguntas||30,document.getElementById("inputNotaMinima").value=v.notaMinima||2,document.getElementById("inputDificultad").value=v.porcentajeDificultad||60,r=v.claveRespuestas&&v.claveRespuestas.length>0?v.claveRespuestas:null,o.innerHTML=`
                  <div style="background: var(--success-bg); border: 1px solid var(--success); color: var(--success); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                     <div>
                       <strong>¡Modelo Importado!</strong><br/>
                       <span style="font-size: var(--fs-xs);">${v.titulo} cargado con éxito. Revisa la configuración.</span>
                     </div>
                  </div>
              `,sessionStorage.removeItem("biblio_modelo_seleccionado")}}catch(s){console.error("Error importando desde biblioteca",s)}}document.getElementById("btnBackStep1")?.addEventListener("click",()=>l(1)),document.getElementById("btnNextStep3")?.addEventListener("click",()=>{const u=parseInt(document.getElementById("inputTotalPreguntas").value);if(!u||u<1){e("Ingresa el total de preguntas","error");return}h(u,r),l(3)});const n=document.getElementById("btnGenerarPautaIA"),m=document.getElementById("inputFileIA");n?.addEventListener("click",()=>{if(!M()){e("Configura tu llave de OpenAI (⚙️ arriba a la derecha) para usar la Corrección con IA.","error");return}m.click()}),m?.addEventListener("change",async u=>{const o=u.target.files[0];if(!o)return;n.disabled=!0;const s=n.innerHTML;n.innerHTML="⏳ Procesando documento...";try{const p=parseInt(document.getElementById("inputTotalPreguntas").value)||30;let v=[];if(o.type==="application/pdf"){typeof window.pdfjsLib>"u"&&(e("Descargando motor lector de PDF por primera vez...","info"),await new Promise((A,x)=>{const C=document.createElement("script");C.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",C.onload=A,C.onerror=()=>x(new Error("No se pudo cargar la librería PDF.js. Comprueba tu conexión a internet.")),document.head.appendChild(C)})),e("Leyendo PDF y convirtiendo a imágenes...","info");const b=await o.arrayBuffer(),E=await pdfjsLib.getDocument({data:b}).promise,O=Math.min(E.numPages,6);for(let A=1;A<=O;A++){const x=await E.getPage(A),C=x.getViewport({scale:1.5}),D=document.createElement("canvas"),ne=D.getContext("2d");D.height=C.height,D.width=C.width,await x.render({canvasContext:ne,viewport:C}).promise,v.push(D.toDataURL("image/jpeg",.8))}}else if(o.type.startsWith("image/"))v.push(await g(o));else throw new Error("Formato de archivo no soportado. Usa PDF o imágenes (JPG, PNG).");e(`Analizando ${v.length} imágenes con GPT-4 Vision...`,"info");const f=await Ce(v,p);if(Array.isArray(f)){let b=0;f.forEach(y=>{if(!y.p)return;const E=document.querySelector(`.clave-resp[data-pregunta="${y.p}"]`);E&&y.respuestaCorrecta&&(E.value=y.respuestaCorrecta.toUpperCase(),b++);const O=document.querySelector(`.clave-cont[data-pregunta="${y.p}"]`);if(O&&y.contenido){const x=Array.from(O.options).find(C=>C.value.toLowerCase()===y.contenido.toLowerCase());x&&(O.value=x.value)}const A=document.querySelector(`.clave-hab[data-pregunta="${y.p}"]`);if(A&&y.habilidad){const x=Array.from(A.options).find(C=>C.value.toLowerCase()===y.habilidad.toLowerCase());x&&(A.value=x.value)}}),e(`¡Completado! Se determinaron ${b} claves correctas.`,"success")}}catch(p){console.error(p),e(p.message,"error")}finally{m.value="",n.disabled=!1,n.innerHTML=s}});function g(u){return new Promise((o,s)=>{const p=new FileReader;p.readAsDataURL(u),p.onload=()=>o(p.result),p.onerror=v=>s(v)})}function h(u,o=null){const s=document.getElementById("claveTableBody");let p="";for(let v=1;v<=u;v++){let f="",b="",y="";o&&o[v-1]&&(f=o[v-1].respuestaCorrecta||"",b=o[v-1].contenido||"",y=o[v-1].habilidad||""),p+=`
        <tr>
          <td style="font-weight: 700; text-align: center; color: var(--text-muted);">${v}</td>
          <td>
            <select class="form-select form-input-sm clave-resp" data-pregunta="${v}">
              <option value="" ${f===""?"selected":""}>—</option>
              <option value="A" ${f==="A"?"selected":""}>A</option>
              <option value="B" ${f==="B"?"selected":""}>B</option>
              <option value="C" ${f==="C"?"selected":""}>C</option>
              <option value="D" ${f==="D"?"selected":""}>D</option>
              <option value="E" ${f==="E"?"selected":""}>E</option>
            </select>
          </td>
          <td>
            <select class="form-select form-input-sm clave-cont" data-pregunta="${v}">
              ${i.contenidos.map(E=>`<option value="${E}" ${b===E?"selected":""}>${E}</option>`).join("")}
            </select>
          </td>
          <td>
            <select class="form-select form-input-sm clave-hab" data-pregunta="${v}">
              ${i.habilidades.map(E=>`<option value="${E}" ${y===E?"selected":""}>${E}</option>`).join("")}
            </select>
          </td>
        </tr>
      `}s.innerHTML=p}document.getElementById("btnBackStep2")?.addEventListener("click",()=>l(2)),document.getElementById("btnCrearEnsayo")?.addEventListener("click",()=>{if(!a){e("Selecciona un curso primero","error");return}const u=document.querySelectorAll(".clave-resp"),o=document.querySelectorAll(".clave-cont"),s=document.querySelectorAll(".clave-hab"),p=[];let v=!1;if(u.forEach((b,y)=>{b.value||(v=!0),p.push({pregunta:y+1,respuestaCorrecta:b.value||"A",contenido:o[y].value,habilidad:s[y].value})}),v&&!confirm("Hay preguntas sin respuesta correcta definida. ¿Deseas continuar de todas formas?"))return;const f=W({cursoId:a,asignatura:document.getElementById("selectAsignatura").value,numero:parseInt(document.getElementById("inputNumeroEnsayo").value)||1,totalPreguntas:p.length,notaMinima:parseFloat(document.getElementById("inputNotaMinima").value)||2,porcentajeDificultad:parseInt(document.getElementById("inputDificultad").value)||60,claveRespuestas:p,status:"pendiente"});e("¡Ensayo creado exitosamente!","success"),t("tabulacion",{ensayoId:f.id})})}const Ae=Object.freeze(Object.defineProperty({__proto__:null,init:xe,render:Ie},Symbol.toStringTag,{value:"Module"}));function Se(t,e=2,a=60){const r=t*(a/100),i=4,l=7,d=[];for(let c=0;c<=t;c++){let n;if(c<=r)r===0?n=i:n=e+(i-e)/r*c;else{const m=t-r;m===0?n=l:n=i+(l-i)/m*(c-r)}d.push({puntaje:c,nota:Math.round(n*10)/10})}return d}function G(t,e,a=2,r=60){const l=Se(e,a,r).find(d=>d.puntaje===t);return l?l.nota:a}function $e(t){if(t<=2)return 116;if(t>=7)return 325;const e=[{nota:2,puntaje:116},{nota:3,puntaje:168},{nota:4,puntaje:219},{nota:4.5,puntaje:239},{nota:5,puntaje:255},{nota:5.5,puntaje:271},{nota:6,puntaje:287},{nota:6.5,puntaje:303},{nota:7,puntaje:325}];for(let a=0;a<e.length-1;a++){const r=e[a],i=e[a+1];if(t>=r.nota&&t<=i.nota){const l=(t-r.nota)/(i.nota-r.nota);return Math.round(r.puntaje+l*(i.puntaje-r.puntaje))}}return 219}function Q(t){return t>=295?"Avanzado":t>=245?"Intermedio":"Inicial"}function ke(t,e){let a=0;const r=[],i={},l={},d={},c={};return e.forEach(n=>{const m=t[n.pregunta]||"",g=m.toUpperCase()===n.respuestaCorrecta.toUpperCase();g&&a++,r.push({pregunta:n.pregunta,respuesta:m.toUpperCase(),correcta:n.respuestaCorrecta.toUpperCase(),esCorrecta:g,contenido:n.contenido,habilidad:n.habilidad});const h=n.contenido||"Sin contenido";i[h]||(i[h]=0),l[h]||(l[h]=0),l[h]++,g&&i[h]++;const u=n.habilidad||"Sin habilidad";d[u]||(d[u]=0),c[u]||(c[u]=0),c[u]++,g&&d[u]++}),{correctasTotales:a,totalPreguntas:e.length,porcentajeLogro:e.length>0?Math.round(a/e.length*100):0,detallePorPregunta:r,porContenido:Object.keys(l).map(n=>({contenido:n,correctas:i[n],total:l[n],porcentaje:Math.round(i[n]/l[n]*100)})),porHabilidad:Object.keys(c).map(n=>({habilidad:n,correctas:d[n],total:c[n],porcentaje:Math.round(d[n]/c[n]*100)}))}}function Z(t,e){const a=ke(t,e.claveRespuestas),r=G(a.correctasTotales,e.totalPreguntas,e.notaMinima||2,e.porcentajeDificultad||60),i=$e(r),l=Q(i),d=a.porContenido.map(n=>({...n,nota:G(n.correctas,n.total,e.notaMinima||2,e.porcentajeDificultad||60)})),c=a.porHabilidad.map(n=>({...n,nota:G(n.correctas,n.total,e.notaMinima||2,e.porcentajeDificultad||60)}));return{correctasTotales:a.correctasTotales,totalPreguntas:a.totalPreguntas,porcentajeLogro:a.porcentajeLogro,nota:r,puntajeSimce:i,nivel:l,porContenido:d,porHabilidad:c,detallePorPregunta:a.detallePorPregunta}}function X(t,e,a){const r=[];return e.forEach(i=>{const l=a.find(d=>d.alumnoId===i.id);if(l&&l.respuestas&&Object.keys(l.respuestas).length>0){const d=Z(l.respuestas,t);r.push({alumnoId:i.id,alumnoNombre:i.nombre,alumnoNumero:i.numero,...d})}}),r}function ee(t,e){if(t.length===0)return{cantidadEvaluados:0,promedioNota:0,promedioPuntaje:0,promedioLogro:0,nivelGeneral:"Inicial",segmentacion:{Inicial:[],Intermedio:[],Avanzado:[]},porContenido:[],porHabilidad:[]};const a=t.length,r=Math.round(t.reduce((u,o)=>u+o.nota,0)/a*10)/10,i=Math.round(t.reduce((u,o)=>u+o.puntajeSimce,0)/a),l=Math.round(t.reduce((u,o)=>u+o.porcentajeLogro,0)/a),d=Q(i),c={Inicial:[],Intermedio:[],Avanzado:[]};t.forEach(u=>{c[u.nivel].push({id:u.alumnoId,nombre:u.alumnoNombre,numero:u.alumnoNumero,puntaje:u.puntajeSimce,nota:u.nota})});const n={};t.forEach(u=>{u.porContenido.forEach(o=>{n[o.contenido]||(n[o.contenido]={total:0,correctas:0,count:0}),n[o.contenido].total+=o.total,n[o.contenido].correctas+=o.correctas,n[o.contenido].count++})});const m=Object.entries(n).map(([u,o])=>({contenido:u,porcentaje:Math.round(o.correctas/o.total*100),correctas:o.correctas,total:o.total})),g={};t.forEach(u=>{u.porHabilidad.forEach(o=>{g[o.habilidad]||(g[o.habilidad]={total:0,correctas:0,count:0}),g[o.habilidad].total+=o.total,g[o.habilidad].correctas+=o.correctas,g[o.habilidad].count++})});const h=Object.entries(g).map(([u,o])=>({habilidad:u,porcentaje:Math.round(o.correctas/o.total*100),correctas:o.correctas,total:o.total}));return{cantidadEvaluados:a,promedioNota:r,promedioPuntaje:i,promedioLogro:l,nivelGeneral:d,segmentacion:c,porContenido:m,porHabilidad:h}}let k=null,U=[];async function Le(){try{const t=await navigator.mediaDevices.getUserMedia({audio:!0}),e={mimeType:"audio/webm"};return k=new MediaRecorder(t,e),U=[],k.ondataavailable=a=>{a.data.size>0&&U.push(a.data)},k.start(),!0}catch(t){return console.error("Error accediendo al micrófono:",t),!1}}function Me(){return new Promise(t=>{if(!k||k.state==="inactive"){t(null);return}k.onstop=()=>{const e=new Blob(U,{type:"audio/webm"});k.stream.getTracks().forEach(a=>a.stop()),t(e)},k.stop()})}let B=null;function Be(t){const e=$();return t?.ensayoId?(B=t.ensayoId,je(t.ensayoId)):`
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
          ${e.map(a=>{const r=L(a.cursoId),i=P(a.id),l=I(a.cursoId),d=i.filter(n=>n.respuestas&&Object.keys(n.respuestas).length>0).length,c=l.length>0?Math.round(d/l.length*100):0;return`
              <div class="ensayo-card" data-ensayo-id="${a.id}" style="cursor: pointer;">
                <div class="ensayo-meta">
                  <span class="badge badge-info">${r?r.nombre:"?"}</span>
                </div>
                <div class="ensayo-title">Ensayo Nº${a.numero} — ${a.asignatura}</div>
                <div class="ensayo-info" style="margin-bottom: 0.75rem;">
                  <span>${a.totalPreguntas} preguntas</span>
                  <span>${d}/${l.length} tabulados</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill ${c<40?"low":c<80?"mid":"high"}" style="width: ${c}%;"></div>
                </div>
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `}function je(t){const e=R(t);if(!e)return'<div class="card"><p>Ensayo no encontrado</p></div>';const a=L(e.cursoId),r=I(e.cursoId),i=P(t),l=i.filter(d=>d.respuestas&&Object.keys(d.respuestas).length>0).length;return`
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
            ${e.asignatura} · ${e.totalPreguntas} preguntas · ${l}/${r.length} tabulados
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
              ${Array.from({length:e.totalPreguntas},(d,c)=>`<th>${c+1}</th>`).join("")}
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
              ${e.claveRespuestas.map(d=>`
                <td style="font-weight: 700; color: var(--accent); font-size: var(--fs-xs);">${d.respuestaCorrecta}</td>
              `).join("")}
              <td class="result-col"></td>
              <td class="result-col"></td>
              <td class="result-col"></td>
              <td class="result-col"></td>
            </tr>
            ${r.map(d=>{const n=i.find(m=>m.alumnoId===d.id)?.respuestas||{};return`
                <tr data-alumno-id="${d.id}">
                  <td>${d.numero}</td>
                  <td title="${d.nombre}">
                    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 0.5rem;">
                        <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${d.nombre}</span>
                        <button class="icon-btn btn-dictar" data-alumno="${d.id}" title="Dictar Respuestas con IA" style="padding: 0.35rem; flex-shrink: 0; display: flex;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                        </button>
                    </div>
                  </td>
                  ${Array.from({length:e.totalPreguntas},(m,g)=>{const h=g+1,u=n[h]||"",o=e.claveRespuestas[g]?.respuestaCorrecta?.toUpperCase();let s="empty";return u&&(s=u.toUpperCase()===o?"correct":"incorrect"),`
                      <td>
                        <input
                          class="tab-cell ${s}"
                          data-alumno="${d.id}"
                          data-pregunta="${h}"
                          value="${u}"
                          maxlength="1"
                          autocomplete="off"
                        />
                      </td>
                    `}).join("")}
                  <td class="result-col result-ok" data-alumno="${d.id}">—</td>
                  <td class="result-col result-nota" data-alumno="${d.id}">—</td>
                  <td class="result-col result-ptje" data-alumno="${d.id}">—</td>
                  <td class="result-col result-nivel" data-alumno="${d.id}">—</td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function Ne(t,e){if(document.querySelectorAll(".ensayo-card[data-ensayo-id]").forEach(o=>{o.addEventListener("click",()=>{t("tabulacion",{ensayoId:o.dataset.ensayoId})})}),document.getElementById("btnGoNuevo")?.addEventListener("click",()=>t("nuevo-ensayo")),document.getElementById("btnBackToList")?.addEventListener("click",()=>t("tabulacion")),!B)return;const a=R(B);if(!a)return;let r=null;const i=document.querySelector(".tab-grid-container");if(!i)return;let l=null;i.addEventListener("click",async o=>{const s=o.target.closest(".btn-dictar");if(s){if(l&&l!==s){e("Ya hay una grabación en progreso.","warning");return}if(l){l=null,s.classList.remove("recording-active"),s.style.opacity="0.5",s.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',e("🧠 Procesando dictado con IA (Whisper)...","info");try{const p=await Me();if(p){const v=await be(p,a.totalPreguntas);if(Array.isArray(v)){const f=s.dataset.alumno;let b=0;v.forEach(y=>{if(y.p&&typeof y.r=="string"){const E=document.querySelector(`.tab-cell[data-alumno="${f}"][data-pregunta="${y.p}"]`);E&&(E.value=y.r.toUpperCase(),E.dispatchEvent(new Event("input",{bubbles:!0})),b++)}}),e(`¡Dictado procesado! ${b} respuestas asignadas.`,"success")}}}catch(p){e(p.message,"error")}finally{s.style.opacity="1",s.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>'}}else{if(!M()){e("Configura tu llave de OpenAI (⚙️ arriba a la derecha) para usar la Corrección por Voz.","error");return}await Le()?(l=s,s.classList.add("recording-active"),s.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect></svg>',e("🎤 Escuchando... Haz clic de nuevo para detener y procesar.","info")):e("No se pudo acceder al micrófono.","error")}}}),i.addEventListener("keydown",o=>{const s=o.target;if(!s.classList.contains("tab-cell"))return;["a","b","c","d","e","A","B","C","D","E"].includes(o.key)?(o.preventDefault(),s.value=o.key.toUpperCase(),s.dispatchEvent(new Event("input",{bubbles:!0})),d(s)):o.key==="Delete"||o.key==="Backspace"?(s.value="",s.dispatchEvent(new Event("input",{bubbles:!0}))):o.key==="Tab"?(o.preventDefault(),o.shiftKey?c(s):d(s)):o.key==="ArrowRight"?d(s):o.key==="ArrowLeft"?c(s):o.key==="ArrowDown"?n(s):o.key==="ArrowUp"?m(s):o.key==="Enter"?n(s):["Shift","Control","Alt","Meta"].includes(o.key)||o.preventDefault()}),i.addEventListener("input",o=>{const s=o.target;if(!s.classList.contains("tab-cell"))return;const p=s.value.toUpperCase();if(p&&!["A","B","C","D","E"].includes(p)){s.value="";return}const v=parseInt(s.dataset.pregunta),f=a.claveRespuestas[v-1]?.respuestaCorrecta?.toUpperCase();s.classList.remove("correct","incorrect","empty"),p?p===f?s.classList.add("correct"):s.classList.add("incorrect"):s.classList.add("empty"),clearTimeout(r),r=setTimeout(()=>g(),300),h(s.dataset.alumno)}),i.addEventListener("focusin",o=>{o.target.classList.contains("tab-cell")&&o.target.select()}),i.addEventListener("paste",o=>{const s=o.target;if(!s.classList.contains("tab-cell"))return;o.preventDefault();const v=(o.clipboardData||window.clipboardData).getData("text").trim().toUpperCase().charAt(0);["A","B","C","D","E"].includes(v)&&(s.value=v,s.dispatchEvent(new Event("input",{bubbles:!0})))});function d(o){const s=Array.from(document.querySelectorAll(".tab-cell")),p=s.indexOf(o);p<s.length-1&&s[p+1].focus()}function c(o){const s=Array.from(document.querySelectorAll(".tab-cell")),p=s.indexOf(o);p>0&&s[p-1].focus()}function n(o){const s=o.dataset.alumno,p=o.dataset.pregunta,v=document.querySelectorAll(`[data-alumno][data-pregunta="${p}"]`),f=Array.from(v),b=f.findIndex(y=>y.dataset.alumno===s);b<f.length-1&&f[b+1].focus()}function m(o){const s=o.dataset.alumno,p=o.dataset.pregunta,v=document.querySelectorAll(`[data-alumno][data-pregunta="${p}"]`),f=Array.from(v),b=f.findIndex(y=>y.dataset.alumno===s);b>0&&f[b-1].focus()}function g(){const o=I(a.cursoId),s=[];o.forEach(v=>{const f={};document.querySelectorAll(`[data-alumno="${v.id}"]`).forEach(y=>{y.classList.contains("tab-cell")&&y.value&&(f[y.dataset.pregunta]=y.value.toUpperCase())}),Object.keys(f).length>0&&s.push({alumnoId:v.id,respuestas:f})}),ue(B,s);const p=R(B);s.length>0&&p.status!=="tabulado"&&W({...p,status:"tabulado"})}function h(o){const s=document.querySelectorAll(`.tab-cell[data-alumno="${o}"]`),p={};if(s.forEach(y=>{y.value&&(p[y.dataset.pregunta]=y.value.toUpperCase())}),Object.keys(p).length===0){document.querySelector(`.result-ok[data-alumno="${o}"]`).textContent="—",document.querySelector(`.result-nota[data-alumno="${o}"]`).textContent="—",document.querySelector(`.result-ptje[data-alumno="${o}"]`).textContent="—",document.querySelector(`.result-nivel[data-alumno="${o}"]`).textContent="—";return}const v=Z(p,a);document.querySelector(`.result-ok[data-alumno="${o}"]`).textContent=`${v.correctasTotales}/${v.totalPreguntas}`,document.querySelector(`.result-nota[data-alumno="${o}"]`).textContent=v.nota.toFixed(1);const f=document.querySelector(`.result-ptje[data-alumno="${o}"]`);f.textContent=v.puntajeSimce;const b=document.querySelector(`.result-nivel[data-alumno="${o}"]`);b.innerHTML=`<span class="badge badge-${v.nivel.toLowerCase()}" style="font-size: 10px; padding: 0.125rem 0.5rem;">${v.nivel}</span>`}I(a.cursoId).forEach(o=>h(o.id)),document.getElementById("btnVerResultados")?.addEventListener("click",()=>{t("reportes",{ensayoId:B})})}const Pe=Object.freeze(Object.defineProperty({__proto__:null,init:Ne,render:Be},Symbol.toStringTag,{value:"Module"})),Oe="https://api.openai.com/v1";async function Te(t,e){const a=M();if(!a)throw new Error("API_KEY_MISSING");const{promedioNota:r,promedioPuntaje:i,promedioLogro:l,nivelGeneral:d,porContenido:c,porHabilidad:n,segmentacion:m}=t,g=c.map(s=>`- ${s.contenido}: ${s.porcentaje}% logro`).join(`
`),h=n.map(s=>`- ${s.habilidad}: ${s.porcentaje}% logro`).join(`
`),u=m.Inicial.map(s=>s.nombre).slice(0,5).join(", "),o=`
Eres un Asesor Pedagógico experto en el currículo chileno y evaluación SIMCE.
Analiza los siguientes resultados de un curso en un ensayo de ${e.asignatura}:

DATOS GENERALES:
- Promedio de Nota: ${r}
- Promedio Puntaje SIMCE: ${i}
- Nivel General: ${d}
- Porcentaje de Logro: ${l}%

LOGRO POR CONTENIDO:
${g}

LOGRO POR HABILIDAD:
${h}

ALUMNOS EN NIVEL INICIAL (REQUIEREN APOYO): ${u} ${m.Inicial.length>5?`y ${m.Inicial.length-5} más`:""}

TAREA:
Genera un Plan de Acción Pedagógico breve y directo (máximo 400 palabras) para el docente.
Usa el siguiente esquema con formato Markdown elegante:
1. **🔍 Diagnóstico**: Resumen rápido de la situación.
2. **🎯 Focos de Instrucción**: ¿En qué temas o habilidades exactas debe centrarse la próxima clase?
3. **🛠️ Acciones Sugeridas**: 3 estrategias prácticas para mejorar los resultados.
4. **💡 Sugerencia para Alumnos Críticos**: Cómo apoyar a los estudiantes en nivel Inicial.

Responde con un tono profesional, alentador y basado en datos. Usa párrafos cortos y bullet points.
`;try{const s=await fetch(`${Oe}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"user",content:o}],temperature:.4})});if(!s.ok){const v=await s.json();throw new Error(v.error?.message||"Error al conectar con OpenAI")}return(await s.json()).choices[0].message.content.trim()}catch(s){throw console.error("AI Insights Error:",s),s}}let z=[];function ze(t){const e=$();if(!t?.ensayoId){const n=e.filter(m=>m.status==="tabulado");return`
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
            ${n.map(m=>{const g=L(m.cursoId);return`
                <div class="ensayo-card" data-ensayo-id="${m.id}" style="cursor: pointer;">
                  <div class="ensayo-meta">
                    <span class="badge badge-info">${g?g.nombre:"?"}</span>
                    <span class="badge badge-avanzado">Tabulado</span>
                  </div>
                  <div class="ensayo-title">Ensayo Nº${m.numero} — ${m.asignatura}</div>
                  <div class="ensayo-info">
                    <span>${m.totalPreguntas} preguntas</span>
                    <span>${new Date(m.updatedAt||m.createdAt).toLocaleDateString("es-CL")}</span>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>
    `}const a=R(t.ensayoId);if(!a)return'<div class="card"><p>Ensayo no encontrado</p></div>';const r=L(a.cursoId),i=I(a.cursoId),l=P(t.ensayoId),d=X(a,i,l),c=ee(d);return`
    <div class="fade-in">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="btn btn-ghost btn-sm" id="btnBackReportes">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <h2 style="font-size: var(--fs-xl); font-weight: 700;">
              Ensayo Nº${a.numero} — ${r?r.nombre:""}
            </h2>
          </div>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-left: 3rem;">
            ${a.asignatura} · ${c.cantidadEvaluados} alumnos evaluados
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
            <div class="stat-value">${c.cantidadEvaluados}</div>
            <div class="stat-label">Alumnos evaluados</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg></div>
          <div>
            <div class="stat-value">${c.promedioNota}</div>
            <div class="stat-label">Promedio Nota</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <div>
            <div class="stat-value">${c.promedioPuntaje}</div>
            <div class="stat-label">Ptje SIMCE Simulado</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon ${c.nivelGeneral==="Avanzado"?"green":c.nivelGeneral==="Intermedio"?"orange":"red"}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <div class="stat-value">${c.promedioLogro}%</div>
            <div class="stat-label">% Logro · <span class="badge badge-${c.nivelGeneral.toLowerCase()}">${c.nivelGeneral}</span></div>
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

      ${c.porContenido.length>0?`
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
              <span class="seg-count badge badge-inicial">${c.segmentacion.Inicial.length}</span>
            </div>
            ${c.segmentacion.Inicial.map(n=>`<div class="seg-student">${n.numero}. ${n.nombre} <span style="float: right; font-weight: 600;">${n.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
          </div>
          <div class="seg-column intermedio">
            <div class="seg-header">
              <span class="seg-title" style="color: #b45309;">🟡 Intermedio</span>
              <span class="seg-count badge badge-intermedio">${c.segmentacion.Intermedio.length}</span>
            </div>
            ${c.segmentacion.Intermedio.map(n=>`<div class="seg-student">${n.numero}. ${n.nombre} <span style="float: right; font-weight: 600;">${n.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
          </div>
          <div class="seg-column avanzado">
            <div class="seg-header">
              <span class="seg-title" style="color: #059669;">🟢 Avanzado</span>
              <span class="seg-count badge badge-avanzado">${c.segmentacion.Avanzado.length}</span>
            </div>
            ${c.segmentacion.Avanzado.map(n=>`<div class="seg-student">${n.numero}. ${n.nombre} <span style="float: right; font-weight: 600;">${n.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
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
              ${d.sort((n,m)=>n.alumnoNumero-m.alumnoNumero).map(n=>`
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
  `}function Re(t,e,a){if(z.forEach(s=>s.destroy()),z=[],document.querySelectorAll(".ensayo-card[data-ensayo-id]").forEach(s=>{s.addEventListener("click",()=>{t("reportes",{ensayoId:s.dataset.ensayoId})})}),document.getElementById("btnBackReportes")?.addEventListener("click",()=>t("reportes")),!a?.ensayoId)return;const r=R(a.ensayoId);if(!r)return;const i=I(r.cursoId),l=P(a.ensayoId),d=X(r,i,l),c=ee(d);T.defaults.font.family="'Inter', sans-serif",T.defaults.font.size=12;const n=document.getElementById("chartHabilidades");if(n&&c.porHabilidad.length>0){const s=new T(n,{type:"bar",data:{labels:c.porHabilidad.map(p=>p.habilidad),datasets:[{data:c.porHabilidad.map(p=>p.porcentaje),backgroundColor:c.porHabilidad.map(p=>p.porcentaje>=70?"rgba(16, 185, 129, 0.7)":p.porcentaje>=40?"rgba(245, 158, 11, 0.7)":"rgba(239, 68, 68, 0.7)"),borderRadius:6,barPercentage:.6}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:"y",plugins:{legend:{display:!1},tooltip:{callbacks:{label:p=>`${p.raw}% de logro`}}},scales:{x:{max:100,grid:{color:"rgba(0,0,0,0.04)"}},y:{grid:{display:!1},ticks:{font:{size:11}}}}}});z.push(s)}const m=document.getElementById("chartSegmentacion");if(m){const s=new T(m,{type:"doughnut",data:{labels:["Inicial","Intermedio","Avanzado"],datasets:[{data:[c.segmentacion.Inicial.length,c.segmentacion.Intermedio.length,c.segmentacion.Avanzado.length],backgroundColor:["rgba(239, 68, 68, 0.75)","rgba(245, 158, 11, 0.75)","rgba(16, 185, 129, 0.75)"],borderWidth:0,spacing:3,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"55%",plugins:{legend:{position:"bottom",labels:{padding:16,usePointStyle:!0,pointStyle:"circle"}}}}});z.push(s)}const g=document.getElementById("chartContenidos");if(g&&c.porContenido.length>0){const s=new T(g,{type:"bar",data:{labels:c.porContenido.map(p=>p.contenido),datasets:[{data:c.porContenido.map(p=>p.porcentaje),backgroundColor:c.porContenido.map(p=>p.porcentaje>=70?"rgba(16, 185, 129, 0.7)":p.porcentaje>=40?"rgba(245, 158, 11, 0.7)":"rgba(239, 68, 68, 0.7)"),borderRadius:6,barPercentage:.6}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:"y",plugins:{legend:{display:!1}},scales:{x:{max:100,grid:{color:"rgba(0,0,0,0.04)"}},y:{grid:{display:!1}}}}});z.push(s)}const h=document.getElementById("btnGenerarAI"),u=document.getElementById("aiInsightsContainer"),o=document.getElementById("aiInsightsContent");h?.addEventListener("click",async()=>{if(!M()){e("Configura tu llave de OpenAI para usar esta función.","error");return}h.disabled=!0,h.innerHTML='<span class="spinner" style="width: 14px; height: 14px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; display: inline-block; animation: spin 0.8s linear infinite; margin-right: 0.5rem;"></span> Procesando...';try{const p=(await Te(c,r)).replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/### (.*)/g,'<h4 style="margin-top: 1rem; color: var(--primary);">$1</h4>').replace(/\n\n/g,'<p style="margin-bottom: 0.75rem;"></p>').replace(/^- (.*)/gm,'<li style="margin-left: 1rem;">$1</li>');o.innerHTML=p,u.style.display="block",u.scrollIntoView({behavior:"smooth",block:"start"}),e("¡Análisis generado exitosamente!","success")}catch(s){e(s.message,"error")}finally{h.disabled=!1,h.innerHTML=`
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.25rem;"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path><path d="M12 12L2.69 7"></path><path d="M12 12l5.63 8.16"></path><path d="M12 12l8.21-4.64"></path></svg>
                Generar Análisis IA
            `}}),document.getElementById("btnCloseAI")?.addEventListener("click",()=>{u.style.display="none"})}const De=Object.freeze(Object.defineProperty({__proto__:null,init:Re,render:ze},Symbol.toStringTag,{value:"Module"}));async function He(){return`
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
  `}async function _e(t,e){const a=document.getElementById("bibliotecaContainer");let r=[];try{const n=await fetch("./ensayos_catalogo.json");if(!n.ok)throw new Error("No se pudo cargar el catálogo.");r=await n.json(),c(r)}catch(n){console.error(n),a.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon" style="color: var(--danger);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="empty-state-title">Error al cargar la Biblioteca</div>
        <div class="empty-state-desc">No se encontró el archivo de catálogo base. Ejecuta el script de procesamiento primero.</div>
      </div>
    `;return}const i=document.getElementById("btnFiltrar"),l=document.getElementById("filtroAsignatura"),d=document.getElementById("filtroNivel");i?.addEventListener("click",()=>{const n=l.value,m=d.value,g=r.filter(h=>{const u=n==="todos"||h.asignatura===n,o=m==="todos"||h.nivel===m;return u&&o});c(g)});function c(n){if(n.length===0){a.innerHTML=`
        <div class="empty-state card">
          <div class="empty-state-icon">
             <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <div class="empty-state-title">No hay resultados</div>
          <div class="empty-state-desc">Prueba cambiando los filtros de búsqueda.</div>
        </div>
      `;return}const m=n.map(g=>`
      <div class="ensayo-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="ensayo-meta">
            <span class="badge ${g.asignatura.includes("Matem")?"badge-intermedio":"badge-info"}">${g.asignatura}</span>
            <span class="badge" style="background: var(--bg-input); border: 1px solid var(--border);">${g.nivel}</span>
          </div>
          <div class="ensayo-title" style="margin-bottom: 0.5rem; font-size: var(--fs-lg);">${g.titulo}</div>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-bottom: 1rem;">
             Archivo original: <a href="./${g.archivo.replace(/^\//,"")}" target="_blank" style="color: var(--accent); text-decoration: underline;">Descargar documento</a>
          </p>
        </div>
        
        <div style="border-top: 1px solid var(--border-light); padding-top: 1rem; margin-top: auto;">
           <button class="btn btn-secondary btn-block btn-usar-ensayo" data-ensayo-id="${g.id}">
             Usar este modelo en la App
           </button>
        </div>
      </div>
    `).join("");a.innerHTML=`<div class="ensayo-grid">${m}</div>`,document.querySelectorAll(".btn-usar-ensayo").forEach(g=>{g.addEventListener("click",()=>{const h=g.dataset.ensayoId;sessionStorage.setItem("biblio_modelo_seleccionado",h),t("nuevo-ensayo")})})}}const Ge=Object.freeze(Object.defineProperty({__proto__:null,init:_e,render:He},Symbol.toStringTag,{value:"Module"})),Ue={dashboard:{module:ge,title:"Dashboard"},cursos:{module:he,title:"Cursos"},"nuevo-ensayo":{module:Ae,title:"Nuevo Ensayo"},tabulacion:{module:Pe,title:"Tabulación"},reportes:{module:De,title:"Reportes"},biblioteca:{module:Ge,title:"Biblioteca de Ensayos"}};let q="dashboard",V={};function te(t,e={}){q=t,V=e,ae()}async function ae(){const t=Ue[q];if(!t)return;document.getElementById("pageTitle").textContent=t.title,document.querySelectorAll(".nav-item").forEach(a=>{a.classList.toggle("active",a.dataset.page===q)});const e=document.getElementById("pageContent");if(e.classList.remove("page-enter"),e.offsetWidth,typeof t.module.render=="function"){const a=t.module.render(V);a instanceof Promise?e.innerHTML=await a:e.innerHTML=a}e.classList.add("page-enter"),t.module.init(te,H,V),e.scrollTop=0}function H(t,e="info"){const a=document.getElementById("toastContainer"),r=document.createElement("div");r.className=`toast ${e}`;const i={success:"✓",error:"✕",info:"ℹ"};r.innerHTML=`<span>${i[e]||"ℹ"}</span><span>${t}</span>`,a.appendChild(r),setTimeout(()=>{r.classList.add("out"),setTimeout(()=>r.remove(),300)},3e3)}function qe(t,e,a){document.getElementById("modalTitle").textContent=t,document.getElementById("modalBody").innerHTML=e,document.getElementById("modalFooter").innerHTML=a,document.getElementById("modalOverlay").classList.add("show")}function F(){document.getElementById("modalOverlay").classList.remove("show")}function Ve(){const t=document.getElementById("sidebar"),e=document.getElementById("menuBtn"),a=document.getElementById("sidebarToggle");e?.addEventListener("click",()=>{t.classList.toggle("show")}),a?.addEventListener("click",()=>{t.classList.toggle("collapsed"),t.classList.remove("show")}),document.getElementById("mainContent")?.addEventListener("click",()=>{window.innerWidth<=1024&&t.classList.remove("show")})}function Fe(){document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const a=t.dataset.page;a&&(te(a),window.innerWidth<=1024&&document.getElementById("sidebar").classList.remove("show"))})})}function Je(){document.getElementById("modalClose")?.addEventListener("click",F),document.getElementById("modalOverlay")?.addEventListener("click",t=>{t.target===t.currentTarget&&F()})}function K(){const t=Y(),e=document.getElementById("schoolBadge");e&&(e.textContent=t.name,e.style.cursor="pointer",e.title="Click para cambiar nombre")}function Ke(){K(),document.getElementById("schoolBadge")?.addEventListener("click",()=>{const a=`
      <div class="form-group">
        <label for="inputSchoolName">Nombre del Colegio:</label>
        <input type="text" id="inputSchoolName" class="form-control" value="${Y().name}">
      </div>
    `;qe("Editar Colegio",a,`
      <button id="btnSaveSchool" class="btn btn-primary">Guardar</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    `),document.getElementById("btnSaveSchool").addEventListener("click",()=>{const i=document.getElementById("inputSchoolName").value.trim();i&&(se({name:i}),K(),F(),H("Nombre guardado","success"))})})}function Ye(){const t=document.getElementById("btnConfigAI"),e=document.getElementById("modalConfigAI"),a=document.getElementById("btnCerrarConfigAI"),r=document.getElementById("btnGuardarConfigAI"),i=document.getElementById("inputAIKey");t?.addEventListener("click",()=>{i.value=M(),e.style.display="flex"}),a?.addEventListener("click",()=>{e.style.display="none"}),r?.addEventListener("click",()=>{const l=i.value.trim();re(l),e.style.display="none",l?H("Llave API de OpenAI guardada exitosamente.","success"):H("Configuración AI deshabilitada.","info")})}function oe(){Ve(),Fe(),Je(),Ke(),Ye(),ae()}document.addEventListener("DOMContentLoaded",oe);document.readyState!=="loading"&&oe();
