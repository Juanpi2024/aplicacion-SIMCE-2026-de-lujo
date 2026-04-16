import{i as fe,g as he,a as be,w as Ee,d as W,b as we,c as Ce,q as Ie,e as Ae,f as xe,s as Se}from"./vendor-louupFZo.js";import{C as G}from"./vendor-charts-DxSbTZ90.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const c of d.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(o){if(o.ep)return;o.ep=!0;const d=a(o);fetch(o.href,d)}})();const $e={apiKey:"AIzaSyAHNZocs33fa9qg4g30hYydNjQEorJZJ_Y",authDomain:"simce-yeca-2026.firebaseapp.com",projectId:"simce-yeca-2026",storageBucket:"simce-yeca-2026.firebasestorage.app",messagingSenderId:"302827415854",appId:"1:302827415854:web:6460f635a607bc74e332bf"},ie=fe($e),U=he(ie);be(ie);const Z={async saveItem(t,e){if(!e.id)throw new Error("Item must have an ID to save to Firebase");const a=W(U,t,e.id);return await Se(a,{...e,updatedAt:new Date().toISOString()},{merge:!0}),e},async getAll(t,e=[]){let a=Ce(U,t);return e.length>0&&e.forEach(o=>{a=Ie(a,Ae(o.field,o.op,o.value))}),(await xe(a)).docs.map(o=>o.data())},async deleteItem(t,e){await we(W(U,t,e))},async saveBatch(t,e){const a=Ee(U);return e.forEach(s=>{const o=W(U,t,s.id);a.set(o,{...s,updatedAt:new Date().toISOString()},{merge:!0})}),await a.commit(),e}},E={SCHOOL:"simce_school",CURSOS:"simce_cursos",ALUMNOS:"simce_alumnos",ENSAYOS:"simce_ensayos",RESPUESTAS:"simce_respuestas"};async function le(t,e){document.dispatchEvent(new CustomEvent("storage:syncing"));try{const a=t.replace("simce_","");if(Array.isArray(e)){const s=e.filter(o=>o&&o.id);s.length>0&&await Z.saveItem(a,{id:"all_data_snapshot",items:s})}else await Z.saveItem(a,{id:"config",...e});document.dispatchEvent(new CustomEvent("storage:synced"))}catch(a){console.warn("Cloud sync failed (offline or auth issue):",a),document.dispatchEvent(new CustomEvent("storage:error",{detail:a.message}))}}async function Le(){document.dispatchEvent(new CustomEvent("storage:syncing"));try{for(const[t,e]of Object.entries(E)){const a=e.replace("simce_",""),s=await Z.getAll(a);if(s.length>0)if(a==="school"){const o=s.find(d=>d.id==="config");o&&localStorage.setItem(e,JSON.stringify(o))}else{const o=s.find(d=>d.id==="all_data_snapshot");o&&o.items&&localStorage.setItem(e,JSON.stringify(o.items))}}return document.dispatchEvent(new CustomEvent("storage:synced")),!0}catch(t){return console.error("Cloud pull failed:",t),document.dispatchEvent(new CustomEvent("storage:error",{detail:t.message})),!1}}function J(){return Date.now().toString(36)+Math.random().toString(36).substr(2,6)}function D(t){try{return JSON.parse(localStorage.getItem(t))||[]}catch{return[]}}function M(t,e){localStorage.setItem(t,JSON.stringify(e)),le(t,e)}function de(){return JSON.parse(localStorage.getItem(E.SCHOOL))||{name:"Mi Colegio"}}function ke(t){localStorage.setItem(E.SCHOOL,JSON.stringify(t)),le(E.SCHOOL,t)}function z(){return localStorage.getItem("simce_openai_key")||""}function Me(t){localStorage.setItem("simce_openai_key",t.trim())}function H(){return D(E.CURSOS)}function T(t){return H().find(e=>e.id===t)}function Be(t){const e=H();if(t.id){const a=e.findIndex(s=>s.id===t.id);a>=0?e[a]={...e[a],...t}:e.push(t)}else t.id=J(),t.createdAt=new Date().toISOString(),e.push(t);return M(E.CURSOS,e),t}function je(t){M(E.CURSOS,H().filter(a=>a.id!==t)),M(E.ALUMNOS,$().filter(a=>a.cursoId!==t)),B().filter(a=>a.cursoId===t).forEach(a=>Pe(a.id)),M(E.ENSAYOS,B().filter(a=>a.cursoId!==t))}function $(t){const e=D(E.ALUMNOS);return t?e.filter(a=>a.cursoId===t):e}function Ne(t,e){const a=D(E.ALUMNOS).filter(o=>o.cursoId!==t),s=e.map((o,d)=>({id:o.id||J(),cursoId:t,nombre:o.nombre.trim(),numero:d+1}));return M(E.ALUMNOS,[...a,...s]),s}function B(t){const e=D(E.ENSAYOS);return t?e.filter(a=>a.cursoId===t):e}function V(t){return B().find(e=>e.id===t)}function ce(t){const e=B();if(t.id){const a=e.findIndex(s=>s.id===t.id);a>=0?e[a]={...e[a],...t,updatedAt:new Date().toISOString()}:e.push(t)}else t.id=J(),t.createdAt=new Date().toISOString(),t.updatedAt=new Date().toISOString(),e.push(t);return M(E.ENSAYOS,e),t}function Pe(t){M(E.ENSAYOS,B().filter(e=>e.id!==t)),M(E.RESPUESTAS,_().filter(e=>e.ensayoId!==t))}function _(t){const e=D(E.RESPUESTAS);return t?e.filter(a=>a.ensayoId===t):e}function Oe(t,e){const a=D(E.RESPUESTAS).filter(o=>o.ensayoId!==t),s=e.map(o=>({id:J(),ensayoId:t,alumnoId:o.alumnoId,respuestas:o.respuestas,updatedAt:new Date().toISOString()}));M(E.RESPUESTAS,[...a,...s])}const re={LENGUAJE:{asignatura:"Lenguaje y Comunicación",contenidos:["Comprensión lectora"],habilidades:["Localizar información","Relacionar e interpretar información","Reflexionar sobre el texto"]},MATEMATICA:{asignatura:"Matemática",contenidos:["Números","Álgebra y Funciones","Geometría","Datos y Azar"],habilidades:["Resolver problemas","Modelar","Representar","Argumentar y comunicar"]}};function O(t){if(!t)return!1;const e=String(t).toLowerCase();return e==="mat"||e.includes("mat")}function Te(t){return O(t)?re.MATEMATICA:re.LENGUAJE}function ze(){const t=H(),e=B(),a=$().length;return`
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
      <div class="card quick-actions-card">
        <div class="card-header">
          <h2 class="card-title">Acciones rápidas</h2>
        </div>
        <div class="actions-group">
          <button class="btn btn-primary btn-lg" data-action="nuevo-ensayo" id="btnNuevoEnsayo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
            Nuevo Ensayo SIMCE
          </button>
          <button class="btn btn-secondary btn-lg" data-action="nuevo-curso" id="btnNuevoCurso">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Gestionar Cursos
          </button>
        </div>
      </div>

      <!-- Recent Ensayos -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Ensayos recientes</h2>
          <button class="btn btn-ghost btn-sm">Ver todos</button>
        </div>
        ${e.length===0?`
          <div class="empty-state">
            <div class="empty-state-visual">
              <div class="blob-bg"></div>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div class="empty-state-title">Tu biblioteca está vacía</div>
            <div class="empty-state-desc">Comienza creando tu primer ensayo para digitalizar los resultados de tus alumnos.</div>
            <button class="btn btn-primary" data-action="nuevo-ensayo" id="btnEmptyNuevoEnsayo">Crear Ensayo Ahora</button>
          </div>
        `:`
          <div class="ensayo-grid">
            ${e.slice(-6).reverse().map(s=>{const o=T(s.cursoId),d=_(s.id),c=$(s.cursoId),u=d.filter(r=>Object.keys(r.respuestas||{}).length>0).length;return`
                <div class="ensayo-card" data-ensayo-id="${s.id}" data-action="ver-ensayo">
                  <div class="ensayo-meta">
                    <span class="badge badge-info">${o?o.nombre:"Curso"}</span>
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
  `}function Re(t){document.querySelectorAll('[data-action="nuevo-ensayo"]').forEach(e=>{e.addEventListener("click",()=>t("nuevo-ensayo"))}),document.querySelectorAll('[data-action="nuevo-curso"]').forEach(e=>{e.addEventListener("click",()=>t("cursos"))}),document.querySelectorAll('[data-action="ver-ensayo"]').forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.ensayoId;t("tabulacion",{ensayoId:a})})})}const De=Object.freeze(Object.defineProperty({__proto__:null,init:Re,render:ze},Symbol.toStringTag,{value:"Module"}));function He(){const t=H();return`
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
          ${t.map(e=>{const a=$(e.id),s=B(e.id);return`
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
                    ${a.slice(0,8).map((o,d)=>`
                      <div style="font-size: var(--fs-xs); color: var(--text-secondary); padding: 0.2rem 0;">
                        <span style="color: var(--text-muted); font-weight: 600; margin-right: 0.5rem;">${d+1}.</span>${o.nombre}
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
  `}function _e(t,e){let a=null;const s=document.getElementById("cursoForm"),o=document.getElementById("btnAddCurso"),d=document.getElementById("btnCancelCurso"),c=document.getElementById("btnSaveCurso"),u=document.getElementById("cursoFormTitle");o?.addEventListener("click",()=>{a=null,u.textContent="Nuevo Curso",document.getElementById("inputCursoNombre").value="",document.getElementById("inputAlumnos").value="",s.style.display="block",s.scrollIntoView({behavior:"smooth"})}),d?.addEventListener("click",()=>{s.style.display="none",a=null}),c?.addEventListener("click",()=>{const r=document.getElementById("inputCursoNombre").value.trim(),p=document.getElementById("inputCursoYear").value,v=document.getElementById("inputAlumnos").value.trim();if(!r){e("Ingresa el nombre del curso","error");return}const g=Be({id:a||void 0,nombre:r,year:parseInt(p)});if(v){const m=v.split(`
`).map(i=>i.trim()).filter(i=>i.length>0).map(i=>({nombre:i}));Ne(g.id,m)}e(`Curso "${r}" guardado con éxito`,"success"),t("cursos")}),document.querySelectorAll(".btn-edit-curso").forEach(r=>{r.addEventListener("click",()=>{const p=T(r.dataset.id),v=$(p.id);a=p.id,u.textContent="Editar Curso",document.getElementById("inputCursoNombre").value=p.nombre,document.getElementById("inputCursoYear").value=p.year||new Date().getFullYear(),document.getElementById("inputAlumnos").value=v.map(g=>g.nombre).join(`
`),s.style.display="block",s.scrollIntoView({behavior:"smooth"})})}),document.querySelectorAll(".btn-delete-curso").forEach(r=>{r.addEventListener("click",()=>{const p=T(r.dataset.id);confirm(`¿Eliminar el curso "${p.nombre}" y todos sus datos?`)&&(je(r.dataset.id),e(`Curso "${p.nombre}" eliminado`,"info"),t("cursos"))})})}const Ge=Object.freeze(Object.defineProperty({__proto__:null,init:_e,render:He},Symbol.toStringTag,{value:"Module"})),se="https://api.openai.com/v1";async function Ue(t,e){const a=z();if(!a)throw new Error("API_KEY_MISSING");const s=await qe(t,a);if(!s)throw new Error("No se pudo transcribir el audio.");return await Ve(s,e,a)}async function qe(t,e){const a=new FormData;a.append("file",t,"grabacion.webm"),a.append("model","whisper-1"),a.append("language","es");const s=await fetch(`${se}/audio/transcriptions`,{method:"POST",headers:{Authorization:`Bearer ${e}`},body:a});if(!s.ok){const d=await s.json();throw console.error("Whisper Error:",d),new Error("Error al conectar con el servicio de voz (Whisper). "+(d.error?.message||""))}return(await s.json()).text}async function Ve(t,e,a){const s=`Eres un asistente de corrección de exámenes SIMCE.
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
`,o=await fetch(`${se}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"user",content:s}],temperature:.1})});if(!o.ok){const u=await o.json();throw console.error("ChatGPT Error:",u),new Error("Error al procesar el texto con ChatGPT. "+(u.error?.message||""))}let c=(await o.json()).choices[0].message.content.trim();c.startsWith("```json")&&(c=c.replace(/^```json/,"")),c.startsWith("```")&&(c=c.replace(/^```/,"")),c.endsWith("```")&&(c=c.replace(/```$/,""));try{return JSON.parse(c.trim())}catch(u){throw console.error("JSON Parse Error:",u,c),new Error("La IA no devolvió un formato válido.")}}async function Fe(t,e,a="Lenguaje"){const s=z();if(!s)throw new Error("API_KEY_MISSING");const o=O(a),u=[{type:"text",text:`Eres un experto creador de pruebas SIMCE para el currículo educativo de Chile. A continuación te entrego imágenes de un ensayo de ${e} preguntas de la asignatura ${a}.
Tu tarea es resolver la prueba completa leyendo cuidadosamente los textos y alternativas presentadas en las imágenes. Para cada pregunta de 1 hasta ${e}, debes deducir contextualmente:
- 'respuestaCorrecta': La alternativa correcta (A, B, C, D o E).
- 'habilidad': Una de las siguientes: ${o?'"Resolver problemas", "Modelar", "Representar" o "Argumentar y comunicar"':'"Localizar información", "Relacionar e interpretar información" o "Reflexionar sobre el texto"'}.
- 'contenido': Uno de los siguientes ejes: ${o?'"Números", "Álgebra y Funciones", "Geometría" o "Datos y Azar"':'"Comprensión lectora"'}.

Contexto de la asignatura: ${o?'Ejes de Matemática: "Números", "Álgebra y Funciones", "Geometría", "Datos y Azar". Habilidades: "Resolver problemas", "Modelar", "Representar", "Argumentar y comunicar".':'Ejes de Lenguaje: "Comprensión lectora". Habilidades: "Localizar información", "Relacionar e interpretar información", "Reflexionar sobre el texto".'}

Devuelve ESTRICTAMENTE un arreglo JSON donde cada objeto tenga 'p' (número de pregunta), 'respuestaCorrecta', 'habilidad' y 'contenido'.
IMPORTANTE: Asegúrate de llegar hasta la pregunta ${e}.
Ejemplo de salida: 
[{"p": 1, "respuestaCorrecta": "A", "habilidad": "${o?"Resolver problemas":"Localizar información"}", "contenido": "${o?"Geometría":"Comprensión lectora"}"}]
SIN DELIMITADORES MARKDOWN COMO \`\`\`json.`}];t.forEach(m=>{u.push({type:"image_url",image_url:{url:m,detail:"high"}})});const r={model:"gpt-4o-mini",messages:[{role:"user",content:u}],temperature:.2,max_tokens:4e3},p=await fetch(`${se}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(r)});if(!p.ok){const m=await p.json();throw console.error("ChatGPT Vision Error:",m),new Error("Error al procesar el documento con IA. "+(m.error?.message||""))}let g=(await p.json()).choices[0].message.content.trim();g.startsWith("```json")&&(g=g.replace(/^```json/,"")),g.startsWith("```")&&(g=g.replace(/^```/,"")),g.endsWith("```")&&(g=g.replace(/```$/,""));try{return JSON.parse(g.trim())}catch(m){throw console.error("Vision JSON Parse Error:",m,g),new Error("La IA no pudo formatear correctamente la pauta devuelta.")}}function Je(){const t=H();return`
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
              ${t.map(e=>{const a=$(e.id);return`
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
                <option value="" disabled selected>Selecciona asignatura...</option>
                <option value="len">Lenguaje y Comunicación</option>
                <option value="mat">Matemática</option>
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
          <div id="presetBadgeInfo" style="margin-bottom: 1rem;"></div>
          
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
  `}function Ke(t,e){let a=null,s=null,o=1;function d(n){if(!n)return"len";const l=String(n).toLowerCase();return l==="mat"||O(l)?"mat":"len"}function c(n){o=n,document.querySelectorAll(".step-content").forEach(l=>l.style.display="none"),document.getElementById(`step${n}`).style.display="block",n===2&&r(),document.querySelectorAll(".step").forEach(l=>{const y=parseInt(l.dataset.step);l.classList.remove("active","completed"),y<n&&l.classList.add("completed"),y===n&&l.classList.add("active")}),document.querySelectorAll(".step-line").forEach((l,y)=>{l.classList.toggle("completed",y<n-1)})}document.querySelectorAll(".curso-option").forEach(n=>{n.addEventListener("click",()=>{a=n.dataset.cursoId,document.querySelectorAll(".curso-option").forEach(l=>l.style.borderColor=""),n.style.borderColor="var(--accent)",setTimeout(()=>c(2),200)})}),document.getElementById("btnGoCursos")?.addEventListener("click",()=>t("cursos")),document.getElementById("btnBuscarBiblioteca")?.addEventListener("click",()=>{t("biblioteca")});async function r(){const n=sessionStorage.getItem("biblio_modelo_seleccionado"),l=document.getElementById("bibliotecaAlertContainer");if(!n){l.innerHTML="";return}try{const y=await fetch("/ensayos_catalogo.json");if(!y.ok)throw new Error("Catálogo no encontrado");const h=(await y.json()).find(b=>b.id===n);if(h){const b=document.getElementById("selectAsignatura");b.value=d(h.asignatura),document.getElementById("inputTotalPreguntas").value=h.totalPreguntas||30,document.getElementById("inputNotaMinima").value=h.notaMinima||2,document.getElementById("inputDificultad").value=h.porcentajeDificultad||60,s=h.claveRespuestas&&h.claveRespuestas.length>0?h.claveRespuestas:null,l.innerHTML=`
                  <div style="background: var(--success-bg); border: 1px solid var(--success); color: var(--success); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                     <div>
                       <strong>¡Modelo Importado!</strong><br/>
                       <span style="font-size: var(--fs-xs);">${h.titulo} cargado con éxito. Revisa la configuración.</span>
                     </div>
                  </div>
              `,sessionStorage.removeItem("biblio_modelo_seleccionado")}}catch(y){console.error("Error importando desde biblioteca",y)}}document.getElementById("btnBackStep1")?.addEventListener("click",()=>c(1));const p=document.getElementById("selectAsignatura");p&&p.addEventListener("change",()=>{if(o===3){const n=parseInt(document.getElementById("inputTotalPreguntas").value)||0;n>0&&i(n,null,p.value)}}),document.getElementById("btnNextStep3")?.addEventListener("click",()=>{const n=parseInt(document.getElementById("inputTotalPreguntas").value);if(!n||n<1){e("Ingresa el total de preguntas","error");return}const l=document.getElementById("selectAsignatura");if(!l||!l.value){e("Por favor, selecciona una asignatura","error"),l.style.borderColor="var(--error)";return}const y=l.value,f=l.options[l.selectedIndex].text,b=O(y)||O(f)?"mat":"len";i(n,s,b),c(3)});const v=document.getElementById("btnGenerarPautaIA"),g=document.getElementById("inputFileIA");v?.addEventListener("click",()=>{if(!z()){e("Configura tu llave de OpenAI (⚙️ arriba a la derecha) para usar la Corrección con IA.","error");return}g.click()}),g?.addEventListener("change",async n=>{const l=n.target.files[0];if(!l)return;v.disabled=!0;const y=v.innerHTML;v.innerHTML="⏳ Procesando documento...";try{const f=parseInt(document.getElementById("inputTotalPreguntas").value)||30;let h=[];if(l.type==="application/pdf"){typeof window.pdfjsLib>"u"&&(e("Descargando motor lector de PDF por primera vez...","info"),await new Promise((w,S)=>{const C=document.createElement("script");C.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",C.onload=w,C.onerror=()=>S(new Error("No se pudo cargar la librería PDF.js. Comprueba tu conexión a internet.")),document.head.appendChild(C)})),e("Leyendo PDF y convirtiendo a imágenes...","info");const P=await l.arrayBuffer(),j=await pdfjsLib.getDocument({data:P}).promise,I=Math.min(j.numPages,6);for(let w=1;w<=I;w++){const S=await j.getPage(w),C=S.getViewport({scale:1.5}),A=document.createElement("canvas"),K=A.getContext("2d");A.height=C.height,A.width=C.width,await S.render({canvasContext:K,viewport:C}).promise,h.push(A.toDataURL("image/jpeg",.8))}}else if(l.type.startsWith("image/"))h.push(await m(l));else throw new Error("Formato de archivo no soportado. Usa PDF o imágenes (JPG, PNG).");e(`Analizando ${h.length} imágenes con GPT-4 Vision...`,"info");const b=document.getElementById("selectAsignatura").value,k=O(b),L=await Fe(h,f,k?"Matemática":"Lenguaje y Comunicación");if(Array.isArray(L)){let P=0;L.forEach(x=>{if(!x.p)return;const j=document.querySelector(`.clave-resp[data-pregunta="${x.p}"]`);j&&x.respuestaCorrecta&&(j.value=x.respuestaCorrecta.toUpperCase(),P++);const I=document.querySelector(`.clave-cont[data-pregunta="${x.p}"]`);if(I&&x.contenido){const S=Array.from(I.options),C=x.contenido.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),A=S.find(K=>{const Y=K.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");return Y===C||Y.includes(C)||C.includes(Y)});A&&(I.value=A.value)}const w=document.querySelector(`.clave-hab[data-pregunta="${x.p}"]`);if(w&&x.habilidad){const S=Array.from(w.options).find(C=>C.value.toLowerCase()===x.habilidad.toLowerCase());S&&(w.value=S.value)}}),e(`¡Completado! Se determinaron ${P} claves correctas.`,"success")}}catch(f){console.error(f),e(f.message,"error")}finally{g.value="",v.disabled=!1,v.innerHTML=y}});function m(n){return new Promise((l,y)=>{const f=new FileReader;f.readAsDataURL(n),f.onload=()=>l(f.result),f.onerror=h=>y(h)})}function i(n,l=null,y=null){const f=document.getElementById("selectAsignatura"),h=y||(f?f.value.trim():""),b=d(h);console.log("--- DEBUG CLAVE TABLE ---"),console.log("Raw subject value:",h),console.log("Canonical subject:",b);const k=O(b);console.log("Is Math (bool):",k);const L=Te(b);console.log("Selected Preset:",L.asignatura);const P=document.getElementById("presetBadgeInfo");P&&(P.innerHTML=`
        <span style="display:inline-flex; align-items:center; gap:0.4rem; background: rgba(59, 130, 246, 0.08); border:1px solid rgba(59,130,246,0.25); color: var(--info); border-radius:999px; padding: 0.35rem 0.75rem; font-size: var(--fs-xs); font-weight:600;">
          Asignatura detectada: ${L.asignatura}
        </span>
      `);const x=document.getElementById("claveTableBody");let j="";for(let I=1;I<=n;I++){let w="",S="",C="";l&&l[I-1]&&(w=l[I-1].respuestaCorrecta||"",S=l[I-1].contenido||"",C=l[I-1].habilidad||""),j+=`
        <tr>
          <td style="font-weight: 700; text-align: center; color: var(--text-muted);">${I}</td>
          <td>
            <select class="form-select form-input-sm clave-resp" data-pregunta="${I}">
              <option value="" ${w===""?"selected":""}>—</option>
              <option value="A" ${w==="A"?"selected":""}>A</option>
              <option value="B" ${w==="B"?"selected":""}>B</option>
              <option value="C" ${w==="C"?"selected":""}>C</option>
              <option value="D" ${w==="D"?"selected":""}>D</option>
              <option value="E" ${w==="E"?"selected":""}>E</option>
            </select>
          </td>
          <td>
            <select class="form-select form-input-sm clave-cont" data-pregunta="${I}">
              ${L.contenidos.map(A=>`<option value="${A}" ${S===A?"selected":""}>${A}</option>`).join("")}
            </select>
          </td>
          <td>
            <select class="form-select form-input-sm clave-hab" data-pregunta="${I}">
              ${L.habilidades.map(A=>`<option value="${A}" ${C===A?"selected":""}>${A}</option>`).join("")}
            </select>
          </td>
        </tr>
      `}x.innerHTML=j}document.getElementById("btnBackStep2")?.addEventListener("click",()=>c(2)),document.getElementById("btnCrearEnsayo")?.addEventListener("click",()=>{if(!a){e("Selecciona un curso primero","error");return}const n=document.querySelectorAll(".clave-resp"),l=document.querySelectorAll(".clave-cont"),y=document.querySelectorAll(".clave-hab"),f=[];let h=!1;if(n.forEach((k,L)=>{k.value||(h=!0),f.push({pregunta:L+1,respuestaCorrecta:k.value||"A",contenido:l[L].value,habilidad:y[L].value})}),h&&!confirm("Hay preguntas sin respuesta correcta definida. ¿Deseas continuar de todas formas?"))return;const b=ce({cursoId:a,asignatura:d(document.getElementById("selectAsignatura").value),numero:parseInt(document.getElementById("inputNumeroEnsayo").value)||1,totalPreguntas:f.length,notaMinima:parseFloat(document.getElementById("inputNotaMinima").value)||2,porcentajeDificultad:parseInt(document.getElementById("inputDificultad").value)||60,claveRespuestas:f,status:"pendiente"});e("¡Ensayo creado exitosamente!","success"),t("tabulacion",{ensayoId:b.id})})}const Ye=Object.freeze(Object.defineProperty({__proto__:null,init:Ke,render:Je},Symbol.toStringTag,{value:"Module"}));function We(t,e=2,a=60){const s=t*(a/100),o=4,d=7,c=[];for(let u=0;u<=t;u++){let r;if(u<=s)s===0?r=o:r=e+(o-e)/s*u;else{const p=t-s;p===0?r=d:r=o+(d-o)/p*(u-s)}c.push({puntaje:u,nota:Math.round(r*10)/10})}return c}function Q(t,e,a=2,s=60){const d=We(e,a,s).find(c=>c.puntaje===t);return d?d.nota:a}function Qe(t){if(t<=2)return 116;if(t>=7)return 325;const e=[{nota:2,puntaje:116},{nota:3,puntaje:168},{nota:4,puntaje:219},{nota:4.5,puntaje:239},{nota:5,puntaje:255},{nota:5.5,puntaje:271},{nota:6,puntaje:287},{nota:6.5,puntaje:303},{nota:7,puntaje:325}];for(let a=0;a<e.length-1;a++){const s=e[a],o=e[a+1];if(t>=s.nota&&t<=o.nota){const d=(t-s.nota)/(o.nota-s.nota);return Math.round(s.puntaje+d*(o.puntaje-s.puntaje))}}return 219}function ue(t){return t>=295?"Avanzado":t>=245?"Intermedio":"Inicial"}function Ze(t,e){let a=0;const s=[],o={},d={},c={},u={};return e.forEach(r=>{const p=t[r.pregunta]||"",v=p.toUpperCase()===r.respuestaCorrecta.toUpperCase();v&&a++,s.push({pregunta:r.pregunta,respuesta:p.toUpperCase(),correcta:r.respuestaCorrecta.toUpperCase(),esCorrecta:v,contenido:r.contenido,habilidad:r.habilidad});const g=r.contenido||"Sin contenido";o[g]||(o[g]=0),d[g]||(d[g]=0),d[g]++,v&&o[g]++;const m=r.habilidad||"Sin habilidad";c[m]||(c[m]=0),u[m]||(u[m]=0),u[m]++,v&&c[m]++}),{correctasTotales:a,totalPreguntas:e.length,porcentajeLogro:e.length>0?Math.round(a/e.length*100):0,detallePorPregunta:s,porContenido:Object.keys(d).map(r=>({contenido:r,correctas:o[r],total:d[r],porcentaje:Math.round(o[r]/d[r]*100)})),porHabilidad:Object.keys(u).map(r=>({habilidad:r,correctas:c[r],total:u[r],porcentaje:Math.round(c[r]/u[r]*100)}))}}function pe(t,e){const a=Ze(t,e.claveRespuestas),s=Q(a.correctasTotales,e.totalPreguntas,e.notaMinima||2,e.porcentajeDificultad||60),o=Qe(s),d=ue(o),c=a.porContenido.map(r=>({...r,nota:Q(r.correctas,r.total,e.notaMinima||2,e.porcentajeDificultad||60)})),u=a.porHabilidad.map(r=>({...r,nota:Q(r.correctas,r.total,e.notaMinima||2,e.porcentajeDificultad||60)}));return{correctasTotales:a.correctasTotales,totalPreguntas:a.totalPreguntas,porcentajeLogro:a.porcentajeLogro,nota:s,puntajeSimce:o,nivel:d,porContenido:c,porHabilidad:u,detallePorPregunta:a.detallePorPregunta}}function me(t,e,a){const s=[];return e.forEach(o=>{const d=a.find(c=>c.alumnoId===o.id);if(d&&d.respuestas&&Object.keys(d.respuestas).length>0){const c=pe(d.respuestas,t);s.push({alumnoId:o.id,alumnoNombre:o.nombre,alumnoNumero:o.numero,...c})}}),s}function ve(t,e){if(t.length===0)return{cantidadEvaluados:0,promedioNota:0,promedioPuntaje:0,promedioLogro:0,nivelGeneral:"Inicial",segmentacion:{Inicial:[],Intermedio:[],Avanzado:[]},porContenido:[],porHabilidad:[]};const a=t.length,s=Math.round(t.reduce((m,i)=>m+i.nota,0)/a*10)/10,o=Math.round(t.reduce((m,i)=>m+i.puntajeSimce,0)/a),d=Math.round(t.reduce((m,i)=>m+i.porcentajeLogro,0)/a),c=ue(o),u={Inicial:[],Intermedio:[],Avanzado:[]};t.forEach(m=>{u[m.nivel].push({id:m.alumnoId,nombre:m.alumnoNombre,numero:m.alumnoNumero,puntaje:m.puntajeSimce,nota:m.nota})});const r={};t.forEach(m=>{m.porContenido.forEach(i=>{r[i.contenido]||(r[i.contenido]={total:0,correctas:0,count:0}),r[i.contenido].total+=i.total,r[i.contenido].correctas+=i.correctas,r[i.contenido].count++})});const p=Object.entries(r).map(([m,i])=>({contenido:m,porcentaje:Math.round(i.correctas/i.total*100),correctas:i.correctas,total:i.total})),v={};t.forEach(m=>{m.porHabilidad.forEach(i=>{v[i.habilidad]||(v[i.habilidad]={total:0,correctas:0,count:0}),v[i.habilidad].total+=i.total,v[i.habilidad].correctas+=i.correctas,v[i.habilidad].count++})});const g=Object.entries(v).map(([m,i])=>({habilidad:m,porcentaje:Math.round(i.correctas/i.total*100),correctas:i.correctas,total:i.total}));return{cantidadEvaluados:a,promedioNota:s,promedioPuntaje:o,promedioLogro:d,nivelGeneral:c,segmentacion:u,porContenido:p,porHabilidad:g}}let N=null,X=[];async function Xe(){try{const t=await navigator.mediaDevices.getUserMedia({audio:!0}),e={mimeType:"audio/webm"};return N=new MediaRecorder(t,e),X=[],N.ondataavailable=a=>{a.data.size>0&&X.push(a.data)},N.start(),!0}catch(t){return console.error("Error accediendo al micrófono:",t),!1}}function et(){return new Promise(t=>{if(!N||N.state==="inactive"){t(null);return}N.onstop=()=>{const e=new Blob(X,{type:"audio/webm"});N.stream.getTracks().forEach(a=>a.stop()),t(e)},N.stop()})}let R=null;function tt(t){const e=B();return t?.ensayoId?(R=t.ensayoId,at(t.ensayoId)):`
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
          ${e.map(a=>{const s=T(a.cursoId),o=_(a.id),d=$(a.cursoId),c=o.filter(r=>r.respuestas&&Object.keys(r.respuestas).length>0).length,u=d.length>0?Math.round(c/d.length*100):0;return`
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
  `}function at(t){const e=V(t);if(!e)return'<div class="card"><p>Ensayo no encontrado</p></div>';const a=T(e.cursoId),s=$(e.cursoId),o=_(t),d=o.filter(c=>c.respuestas&&Object.keys(c.respuestas).length>0).length;return`
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
            ${s.map(c=>{const r=o.find(p=>p.alumnoId===c.id)?.respuestas||{};return`
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
                  ${Array.from({length:e.totalPreguntas},(p,v)=>{const g=v+1,m=r[g]||"",i=e.claveRespuestas[v]?.respuestaCorrecta?.toUpperCase();let n="empty";return m&&(n=m.toUpperCase()===i?"correct":"incorrect"),`
                      <td>
                        <input
                          class="tab-cell ${n}"
                          data-alumno="${c.id}"
                          data-pregunta="${g}"
                          value="${m}"
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
  `}function ot(t,e){if(document.querySelectorAll(".ensayo-card[data-ensayo-id]").forEach(i=>{i.addEventListener("click",()=>{t("tabulacion",{ensayoId:i.dataset.ensayoId})})}),document.getElementById("btnGoNuevo")?.addEventListener("click",()=>t("nuevo-ensayo")),document.getElementById("btnBackToList")?.addEventListener("click",()=>t("tabulacion")),!R)return;const a=V(R);if(!a)return;let s=null;const o=document.querySelector(".tab-grid-container");if(!o)return;let d=null;o.addEventListener("click",async i=>{const n=i.target.closest(".btn-dictar");if(n){if(d&&d!==n){e("Ya hay una grabación en progreso.","warning");return}if(d){d=null,n.classList.remove("recording-active"),n.style.opacity="0.5",n.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',e("🧠 Procesando dictado con IA (Whisper)...","info");try{const l=await et();if(l){const y=await Ue(l,a.totalPreguntas);if(Array.isArray(y)){const f=n.dataset.alumno;let h=0;y.forEach(b=>{if(b.p&&typeof b.r=="string"){const k=document.querySelector(`.tab-cell[data-alumno="${f}"][data-pregunta="${b.p}"]`);k&&(k.value=b.r.toUpperCase(),k.dispatchEvent(new Event("input",{bubbles:!0})),h++)}}),e(`¡Dictado procesado! ${h} respuestas asignadas.`,"success")}}}catch(l){e(l.message,"error")}finally{n.style.opacity="1",n.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>'}}else{if(!z()){e("Configura tu llave de OpenAI (⚙️ arriba a la derecha) para usar la Corrección por Voz.","error");return}await Xe()?(d=n,n.classList.add("recording-active"),n.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect></svg>',e("🎤 Escuchando... Haz clic de nuevo para detener y procesar.","info")):e("No se pudo acceder al micrófono.","error")}}}),o.addEventListener("keydown",i=>{const n=i.target;if(!n.classList.contains("tab-cell"))return;["a","b","c","d","e","A","B","C","D","E"].includes(i.key)?(i.preventDefault(),n.value=i.key.toUpperCase(),n.dispatchEvent(new Event("input",{bubbles:!0})),c(n)):i.key==="Delete"||i.key==="Backspace"?(n.value="",n.dispatchEvent(new Event("input",{bubbles:!0}))):i.key==="Tab"?(i.preventDefault(),i.shiftKey?u(n):c(n)):i.key==="ArrowRight"?c(n):i.key==="ArrowLeft"?u(n):i.key==="ArrowDown"?r(n):i.key==="ArrowUp"?p(n):i.key==="Enter"?r(n):["Shift","Control","Alt","Meta"].includes(i.key)||i.preventDefault()}),o.addEventListener("input",i=>{const n=i.target;if(!n.classList.contains("tab-cell"))return;const l=n.value.toUpperCase();if(l&&!["A","B","C","D","E"].includes(l)){n.value="";return}const y=parseInt(n.dataset.pregunta),f=a.claveRespuestas[y-1]?.respuestaCorrecta?.toUpperCase();n.classList.remove("correct","incorrect","empty"),l?l===f?n.classList.add("correct"):n.classList.add("incorrect"):n.classList.add("empty"),clearTimeout(s),s=setTimeout(()=>v(),300),g(n.dataset.alumno)}),o.addEventListener("focusin",i=>{i.target.classList.contains("tab-cell")&&i.target.select()}),o.addEventListener("paste",i=>{const n=i.target;if(!n.classList.contains("tab-cell"))return;i.preventDefault();const y=(i.clipboardData||window.clipboardData).getData("text").trim().toUpperCase().charAt(0);["A","B","C","D","E"].includes(y)&&(n.value=y,n.dispatchEvent(new Event("input",{bubbles:!0})))});function c(i){const n=Array.from(document.querySelectorAll(".tab-cell")),l=n.indexOf(i);l<n.length-1&&n[l+1].focus()}function u(i){const n=Array.from(document.querySelectorAll(".tab-cell")),l=n.indexOf(i);l>0&&n[l-1].focus()}function r(i){const n=i.dataset.alumno,l=i.dataset.pregunta,y=document.querySelectorAll(`[data-alumno][data-pregunta="${l}"]`),f=Array.from(y),h=f.findIndex(b=>b.dataset.alumno===n);h<f.length-1&&f[h+1].focus()}function p(i){const n=i.dataset.alumno,l=i.dataset.pregunta,y=document.querySelectorAll(`[data-alumno][data-pregunta="${l}"]`),f=Array.from(y),h=f.findIndex(b=>b.dataset.alumno===n);h>0&&f[h-1].focus()}function v(){const i=$(a.cursoId),n=[];i.forEach(y=>{const f={};document.querySelectorAll(`[data-alumno="${y.id}"]`).forEach(b=>{b.classList.contains("tab-cell")&&b.value&&(f[b.dataset.pregunta]=b.value.toUpperCase())}),Object.keys(f).length>0&&n.push({alumnoId:y.id,respuestas:f})}),Oe(R,n);const l=V(R);n.length>0&&l.status!=="tabulado"&&ce({...l,status:"tabulado"})}function g(i){const n=document.querySelectorAll(`.tab-cell[data-alumno="${i}"]`),l={};if(n.forEach(b=>{b.value&&(l[b.dataset.pregunta]=b.value.toUpperCase())}),Object.keys(l).length===0){document.querySelector(`.result-ok[data-alumno="${i}"]`).textContent="—",document.querySelector(`.result-nota[data-alumno="${i}"]`).textContent="—",document.querySelector(`.result-ptje[data-alumno="${i}"]`).textContent="—",document.querySelector(`.result-nivel[data-alumno="${i}"]`).textContent="—";return}const y=pe(l,a);document.querySelector(`.result-ok[data-alumno="${i}"]`).textContent=`${y.correctasTotales}/${y.totalPreguntas}`,document.querySelector(`.result-nota[data-alumno="${i}"]`).textContent=y.nota.toFixed(1);const f=document.querySelector(`.result-ptje[data-alumno="${i}"]`);f.textContent=y.puntajeSimce;const h=document.querySelector(`.result-nivel[data-alumno="${i}"]`);h.innerHTML=`<span class="badge badge-${y.nivel.toLowerCase()}" style="font-size: 10px; padding: 0.125rem 0.5rem;">${y.nivel}</span>`}$(a.cursoId).forEach(i=>g(i.id)),document.getElementById("btnVerResultados")?.addEventListener("click",()=>{t("reportes",{ensayoId:R})})}const nt=Object.freeze(Object.defineProperty({__proto__:null,init:ot,render:tt},Symbol.toStringTag,{value:"Module"})),st="https://api.openai.com/v1";async function rt(t,e){const a=z();if(!a)throw new Error("API_KEY_MISSING");const{promedioNota:s,promedioPuntaje:o,promedioLogro:d,nivelGeneral:c,porContenido:u,porHabilidad:r,segmentacion:p}=t,v=u.map(n=>`- ${n.contenido}: ${n.porcentaje}% logro`).join(`
`),g=r.map(n=>`- ${n.habilidad}: ${n.porcentaje}% logro`).join(`
`),m=p.Inicial.map(n=>n.nombre).slice(0,5).join(", "),i=`
Eres un Asesor Pedagógico experto en el currículo chileno y evaluación SIMCE.
Analiza los siguientes resultados de un curso en un ensayo de ${e.asignatura}:

DATOS GENERALES:
- Promedio de Nota: ${s}
- Promedio Puntaje SIMCE: ${o}
- Nivel General: ${c}
- Porcentaje de Logro: ${d}%

LOGRO POR CONTENIDO:
${v}

LOGRO POR HABILIDAD:
${g}

ALUMNOS EN NIVEL INICIAL (REQUIEREN APOYO): ${m} ${p.Inicial.length>5?`y ${p.Inicial.length-5} más`:""}

TAREA:
Genera un Plan de Acción Pedagógico breve y directo (máximo 400 palabras) para el docente.
Usa el siguiente esquema con formato Markdown elegante:
1. **🔍 Diagnóstico**: Resumen rápido de la situación.
2. **🎯 Focos de Instrucción**: ¿En qué temas o habilidades exactas debe centrarse la próxima clase?
3. **🛠️ Acciones Sugeridas**: 3 estrategias prácticas para mejorar los resultados.
4. **💡 Sugerencia para Alumnos Críticos**: Cómo apoyar a los estudiantes en nivel Inicial.

Responde con un tono profesional, alentador y basado en datos. Usa párrafos cortos y bullet points.
`;try{const n=await fetch(`${st}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"user",content:i}],temperature:.4})});if(!n.ok){const y=await n.json();throw new Error(y.error?.message||"Error al conectar con OpenAI")}return(await n.json()).choices[0].message.content.trim()}catch(n){throw console.error("AI Insights Error:",n),n}}let q=[];function it(t){const e=B();if(!t?.ensayoId){const r=e.filter(p=>p.status==="tabulado");return`
      <div class="fade-in">
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: var(--fs-xl); font-weight: 700;">Reportes</h2>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm);">Selecciona un ensayo tabulado para ver los resultados</p>
        </div>
        ${r.length===0?`
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
            ${r.map(p=>{const v=T(p.cursoId);return`
                <div class="ensayo-card" data-ensayo-id="${p.id}" style="cursor: pointer;">
                  <div class="ensayo-meta">
                    <span class="badge badge-info">${v?v.nombre:"?"}</span>
                    <span class="badge badge-avanzado">Tabulado</span>
                  </div>
                  <div class="ensayo-title">Ensayo Nº${p.numero} — ${p.asignatura}</div>
                  <div class="ensayo-info">
                    <span>${p.totalPreguntas} preguntas</span>
                    <span>${new Date(p.updatedAt||p.createdAt).toLocaleDateString("es-CL")}</span>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>
    `}const a=V(t.ensayoId);if(!a)return'<div class="card"><p>Ensayo no encontrado</p></div>';const s=T(a.cursoId),o=$(a.cursoId),d=_(t.ensayoId),c=me(a,o,d),u=ve(c);return`
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
            ${u.segmentacion.Inicial.map(r=>`<div class="seg-student">${r.numero}. ${r.nombre} <span style="float: right; font-weight: 600;">${r.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
          </div>
          <div class="seg-column intermedio">
            <div class="seg-header">
              <span class="seg-title" style="color: #b45309;">🟡 Intermedio</span>
              <span class="seg-count badge badge-intermedio">${u.segmentacion.Intermedio.length}</span>
            </div>
            ${u.segmentacion.Intermedio.map(r=>`<div class="seg-student">${r.numero}. ${r.nombre} <span style="float: right; font-weight: 600;">${r.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
          </div>
          <div class="seg-column avanzado">
            <div class="seg-header">
              <span class="seg-title" style="color: #059669;">🟢 Avanzado</span>
              <span class="seg-count badge badge-avanzado">${u.segmentacion.Avanzado.length}</span>
            </div>
            ${u.segmentacion.Avanzado.map(r=>`<div class="seg-student">${r.numero}. ${r.nombre} <span style="float: right; font-weight: 600;">${r.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
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
              ${c.sort((r,p)=>r.alumnoNumero-p.alumnoNumero).map(r=>`
                <tr>
                  <td style="font-weight: 600; color: var(--text-muted);">${r.alumnoNumero}</td>
                  <td style="font-weight: 500;">${r.alumnoNombre}</td>
                  <td>${r.correctasTotales}/${r.totalPreguntas}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <div class="progress-bar" style="width: 60px; height: 6px;">
                        <div class="progress-fill ${r.porcentajeLogro<40?"low":r.porcentajeLogro<70?"mid":"high"}" style="width: ${r.porcentajeLogro}%;"></div>
                      </div>
                      <span>${r.porcentajeLogro}%</span>
                    </div>
                  </td>
                  <td style="font-weight: 700;">${r.nota.toFixed(1)}</td>
                  <td style="font-weight: 600;">${r.puntajeSimce}</td>
                  <td><span class="badge badge-${r.nivel.toLowerCase()}">${r.nivel}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function lt(t,e,a){if(q.forEach(n=>n.destroy()),q=[],document.querySelectorAll(".ensayo-card[data-ensayo-id]").forEach(n=>{n.addEventListener("click",()=>{t("reportes",{ensayoId:n.dataset.ensayoId})})}),document.getElementById("btnBackReportes")?.addEventListener("click",()=>t("reportes")),!a?.ensayoId)return;const s=V(a.ensayoId);if(!s)return;const o=$(s.cursoId),d=_(a.ensayoId),c=me(s,o,d),u=ve(c);G.defaults.font.family="'Inter', sans-serif",G.defaults.font.size=12;const r=document.getElementById("chartHabilidades");if(r&&u.porHabilidad.length>0){const n=new G(r,{type:"bar",data:{labels:u.porHabilidad.map(l=>l.habilidad),datasets:[{data:u.porHabilidad.map(l=>l.porcentaje),backgroundColor:u.porHabilidad.map(l=>l.porcentaje>=70?"rgba(16, 185, 129, 0.7)":l.porcentaje>=40?"rgba(245, 158, 11, 0.7)":"rgba(239, 68, 68, 0.7)"),borderRadius:6,barPercentage:.6}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:"y",plugins:{legend:{display:!1},tooltip:{callbacks:{label:l=>`${l.raw}% de logro`}}},scales:{x:{max:100,grid:{color:"rgba(0,0,0,0.04)"}},y:{grid:{display:!1},ticks:{font:{size:11}}}}}});q.push(n)}const p=document.getElementById("chartSegmentacion");if(p){const n=new G(p,{type:"doughnut",data:{labels:["Inicial","Intermedio","Avanzado"],datasets:[{data:[u.segmentacion.Inicial.length,u.segmentacion.Intermedio.length,u.segmentacion.Avanzado.length],backgroundColor:["rgba(239, 68, 68, 0.75)","rgba(245, 158, 11, 0.75)","rgba(16, 185, 129, 0.75)"],borderWidth:0,spacing:3,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"55%",plugins:{legend:{position:"bottom",labels:{padding:16,usePointStyle:!0,pointStyle:"circle"}}}}});q.push(n)}const v=document.getElementById("chartContenidos");if(v&&u.porContenido.length>0){const n=new G(v,{type:"bar",data:{labels:u.porContenido.map(l=>l.contenido),datasets:[{data:u.porContenido.map(l=>l.porcentaje),backgroundColor:u.porContenido.map(l=>l.porcentaje>=70?"rgba(16, 185, 129, 0.7)":l.porcentaje>=40?"rgba(245, 158, 11, 0.7)":"rgba(239, 68, 68, 0.7)"),borderRadius:6,barPercentage:.6}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:"y",plugins:{legend:{display:!1}},scales:{x:{max:100,grid:{color:"rgba(0,0,0,0.04)"}},y:{grid:{display:!1}}}}});q.push(n)}const g=document.getElementById("btnGenerarAI"),m=document.getElementById("aiInsightsContainer"),i=document.getElementById("aiInsightsContent");g?.addEventListener("click",async()=>{if(!z()){e("Configura tu llave de OpenAI para usar esta función.","error");return}g.disabled=!0,g.innerHTML='<span class="spinner" style="width: 14px; height: 14px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; display: inline-block; animation: spin 0.8s linear infinite; margin-right: 0.5rem;"></span> Procesando...';try{const l=(await rt(u,s)).replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/### (.*)/g,'<h4 style="margin-top: 1rem; color: var(--primary);">$1</h4>').replace(/\n\n/g,'<p style="margin-bottom: 0.75rem;"></p>').replace(/^- (.*)/gm,'<li style="margin-left: 1rem;">$1</li>');i.innerHTML=l,m.style.display="block",m.scrollIntoView({behavior:"smooth",block:"start"}),e("¡Análisis generado exitosamente!","success")}catch(n){e(n.message,"error")}finally{g.disabled=!1,g.innerHTML=`
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.25rem;"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path><path d="M12 12L2.69 7"></path><path d="M12 12l5.63 8.16"></path><path d="M12 12l8.21-4.64"></path></svg>
                Generar Análisis IA
            `}}),document.getElementById("btnCloseAI")?.addEventListener("click",()=>{m.style.display="none"})}const dt=Object.freeze(Object.defineProperty({__proto__:null,init:lt,render:it},Symbol.toStringTag,{value:"Module"}));async function ct(){return`
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
  `}async function ut(t,e){const a=document.getElementById("bibliotecaContainer");let s=[];try{const r=await fetch("/ensayos_catalogo.json");if(!r.ok)throw new Error("No se pudo cargar el catálogo.");s=await r.json(),u(s)}catch(r){console.error(r),a.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon" style="color: var(--danger);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="empty-state-title">Error al cargar la Biblioteca</div>
        <div class="empty-state-desc">No se encontró el archivo de catálogo base. Ejecuta el script de procesamiento primero.</div>
      </div>
    `;return}const o=document.getElementById("btnFiltrar"),d=document.getElementById("filtroAsignatura"),c=document.getElementById("filtroNivel");o?.addEventListener("click",()=>{const r=d.value,p=c.value,v=s.filter(g=>{const m=r==="todos"||g.asignatura===r,i=p==="todos"||g.nivel===p;return m&&i});u(v)});function u(r){if(r.length===0){a.innerHTML=`
        <div class="empty-state card">
          <div class="empty-state-icon">
             <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <div class="empty-state-title">No hay resultados</div>
          <div class="empty-state-desc">Prueba cambiando los filtros de búsqueda.</div>
        </div>
      `;return}const p=r.map(v=>`
      <div class="ensayo-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="ensayo-meta">
            <span class="badge ${v.asignatura.includes("Matem")?"badge-intermedio":"badge-info"}">${v.asignatura}</span>
            <span class="badge" style="background: var(--bg-input); border: 1px solid var(--border);">${v.nivel}</span>
          </div>
          <div class="ensayo-title" style="margin-bottom: 0.5rem; font-size: var(--fs-lg);">${v.titulo}</div>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm); margin-bottom: 1rem;">
             Archivo original: <a href="/${v.archivo.replace(/^\//,"")}" target="_blank" style="color: var(--accent); text-decoration: underline;">Descargar documento</a>
          </p>
        </div>
        
        <div style="border-top: 1px solid var(--border-light); padding-top: 1rem; margin-top: auto;">
           <button class="btn btn-secondary btn-block btn-usar-ensayo" data-ensayo-id="${v.id}">
             Usar este modelo en la App
           </button>
        </div>
      </div>
    `).join("");a.innerHTML=`<div class="ensayo-grid">${p}</div>`,document.querySelectorAll(".btn-usar-ensayo").forEach(v=>{v.addEventListener("click",()=>{const g=v.dataset.ensayoId;sessionStorage.setItem("biblio_modelo_seleccionado",g),t("nuevo-ensayo")})})}}const pt=Object.freeze(Object.defineProperty({__proto__:null,init:ut,render:ct},Symbol.toStringTag,{value:"Module"})),mt={dashboard:{module:De,title:"Dashboard"},cursos:{module:Ge,title:"Cursos"},"nuevo-ensayo":{module:Ye,title:"Nuevo Ensayo"},tabulacion:{module:nt,title:"Tabulación"},reportes:{module:dt,title:"Reportes"},biblioteca:{module:pt,title:"Biblioteca de Ensayos"}};let ee="dashboard",te={};function ge(t,e={}){ee=t,te=e,ae()}async function ae(){const t=mt[ee];if(!t)return;document.getElementById("pageTitle").textContent=t.title,document.querySelectorAll(".nav-item").forEach(a=>{a.classList.toggle("active",a.dataset.page===ee)});const e=document.getElementById("pageContent");if(e.classList.remove("page-enter"),e.offsetWidth,typeof t.module.render=="function"){const a=t.module.render(te);a instanceof Promise?e.innerHTML=await a:e.innerHTML=a}e.classList.add("page-enter"),t.module.init(ge,F,te),e.scrollTop=0}function F(t,e="info"){const a=document.getElementById("toastContainer"),s=document.createElement("div");s.className=`toast ${e}`;const o={success:"✓",error:"✕",info:"ℹ"};s.innerHTML=`<span>${o[e]||"ℹ"}</span><span>${t}</span>`,a.appendChild(s),setTimeout(()=>{s.classList.add("out"),setTimeout(()=>s.remove(),300)},3e3)}function vt(t,e,a){document.getElementById("modalTitle").textContent=t,document.getElementById("modalBody").innerHTML=e,document.getElementById("modalFooter").innerHTML=a,document.getElementById("modalOverlay").classList.add("show")}function oe(){document.getElementById("modalOverlay").classList.remove("show")}function gt(){const t=document.getElementById("sidebar"),e=document.getElementById("menuBtn"),a=document.getElementById("sidebarToggle");e?.addEventListener("click",()=>{t.classList.toggle("show")}),a?.addEventListener("click",()=>{t.classList.toggle("collapsed"),t.classList.remove("show")}),document.getElementById("mainContent")?.addEventListener("click",()=>{window.innerWidth<=1024&&t.classList.remove("show")})}function yt(){document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const a=t.dataset.page;a&&(ge(a),window.innerWidth<=1024&&document.getElementById("sidebar").classList.remove("show"))})})}function ft(){document.getElementById("modalClose")?.addEventListener("click",oe),document.getElementById("modalOverlay")?.addEventListener("click",t=>{t.target===t.currentTarget&&oe()})}function ne(){const t=de(),e=document.getElementById("schoolBadge");e&&(e.textContent=t.name,e.style.cursor="pointer",e.title="Click para cambiar nombre")}function ht(){ne(),document.getElementById("schoolBadge")?.addEventListener("click",()=>{const a=`
      <div class="form-group">
        <label for="inputSchoolName">Nombre del Colegio:</label>
        <input type="text" id="inputSchoolName" class="form-control" value="${de().name}">
      </div>
    `;vt("Editar Colegio",a,`
      <button id="btnSaveSchool" class="btn btn-primary">Guardar</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    `),document.getElementById("btnSaveSchool").addEventListener("click",()=>{const o=document.getElementById("inputSchoolName").value.trim();o&&(ke({name:o}),ne(),oe(),F("Nombre guardado","success"))})})}function bt(){const t=document.getElementById("btnConfigAI"),e=document.getElementById("modalConfigAI"),a=document.getElementById("btnCerrarConfigAI"),s=document.getElementById("btnGuardarConfigAI"),o=document.getElementById("inputAIKey");t?.addEventListener("click",()=>{o.value=z(),e.style.display="flex"}),a?.addEventListener("click",()=>{e.style.display="none"}),s?.addEventListener("click",()=>{const d=o.value.trim();Me(d),e.style.display="none",d?F("Llave API de OpenAI guardada exitosamente.","success"):F("Configuración AI deshabilitada.","info")})}function Et(){const t=document.getElementById("syncIndicator"),e=t?.querySelector(".sync-text");t&&(document.addEventListener("storage:syncing",()=>{t.className="cloud-sync-status syncing",e&&(e.textContent="Sincronizando...")}),document.addEventListener("storage:synced",()=>{t.className="cloud-sync-status synced",e&&(e.textContent="Sincronizado"),setTimeout(()=>{t.className="cloud-sync-status",e&&(e.textContent="Conectado")},2e3)}),document.addEventListener("storage:error",a=>{t.className="cloud-sync-status error",e&&(e.textContent="Error de conexión"),console.error("Sync Error:",a.detail)}))}async function ye(){gt(),yt(),ft(),ht(),bt(),Et(),ae(),await Le()&&(ne(),ae())}document.addEventListener("DOMContentLoaded",ye);document.readyState!=="loading"&&ye();
