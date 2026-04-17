import{i as ye,g as fe,a as he,w as be,d as K,b as Ee,c as we,q as Ce,e as Ie,f as Ae,s as xe}from"./vendor-louupFZo.js";import{C as H}from"./vendor-charts-DxSbTZ90.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(s){if(s.ep)return;s.ep=!0;const l=a(s);fetch(s.href,l)}})();const Se={apiKey:"AIzaSyAHNZocs33fa9qg4g30hYydNjQEorJZJ_Y",authDomain:"simce-yeca-2026.firebaseapp.com",projectId:"simce-yeca-2026",storageBucket:"simce-yeca-2026.firebasestorage.app",messagingSenderId:"302827415854",appId:"1:302827415854:web:6460f635a607bc74e332bf"},se=ye(Se),_=fe(se);he(se);const W={async saveItem(t,e){if(!e.id)throw new Error("Item must have an ID to save to Firebase");const a=K(_,t,e.id);return await xe(a,{...e,updatedAt:new Date().toISOString()},{merge:!0}),e},async getAll(t,e=[]){let a=we(_,t);return e.length>0&&e.forEach(s=>{a=Ce(a,Ie(s.field,s.op,s.value))}),(await Ae(a)).docs.map(s=>s.data())},async deleteItem(t,e){await Ee(K(_,t,e))},async saveBatch(t,e){const a=be(_);return e.forEach(r=>{const s=K(_,t,r.id);a.set(s,{...r,updatedAt:new Date().toISOString()},{merge:!0})}),await a.commit(),e}},E={SCHOOL:"simce_school",CURSOS:"simce_cursos",ALUMNOS:"simce_alumnos",ENSAYOS:"simce_ensayos",RESPUESTAS:"simce_respuestas"};async function re(t,e){document.dispatchEvent(new CustomEvent("storage:syncing"));try{const a=t.replace("simce_","");if(Array.isArray(e)){const r=e.filter(s=>s&&s.id);r.length>0&&await W.saveItem(a,{id:"all_data_snapshot",items:r})}else await W.saveItem(a,{id:"config",...e});document.dispatchEvent(new CustomEvent("storage:synced"))}catch(a){console.warn("Cloud sync failed (offline or auth issue):",a),document.dispatchEvent(new CustomEvent("storage:error",{detail:a.message}))}}async function $e(){document.dispatchEvent(new CustomEvent("storage:syncing"));try{for(const[t,e]of Object.entries(E)){const a=e.replace("simce_",""),r=await W.getAll(a);if(r.length>0)if(a==="school"){const s=r.find(l=>l.id==="config");s&&localStorage.setItem(e,JSON.stringify(s))}else{const s=r.find(l=>l.id==="all_data_snapshot");s&&s.items&&localStorage.setItem(e,JSON.stringify(s.items))}}return document.dispatchEvent(new CustomEvent("storage:synced")),!0}catch(t){return console.error("Cloud pull failed:",t),document.dispatchEvent(new CustomEvent("storage:error",{detail:t.message})),!1}}function V(){return Date.now().toString(36)+Math.random().toString(36).substr(2,6)}function z(t){try{return JSON.parse(localStorage.getItem(t))||[]}catch{return[]}}function k(t,e){localStorage.setItem(t,JSON.stringify(e)),re(t,e)}function ie(){return JSON.parse(localStorage.getItem(E.SCHOOL))||{name:"Mi Colegio"}}function Le(t){localStorage.setItem(E.SCHOOL,JSON.stringify(t)),re(E.SCHOOL,t)}function P(){return localStorage.getItem("simce_openai_key")||""}function ke(t){localStorage.setItem("simce_openai_key",t.trim())}function R(){return z(E.CURSOS)}function O(t){return R().find(e=>e.id===t)}function Me(t){const e=R();if(t.id){const a=e.findIndex(r=>r.id===t.id);a>=0?e[a]={...e[a],...t}:e.push(t)}else t.id=V(),t.createdAt=new Date().toISOString(),e.push(t);return k(E.CURSOS,e),t}function Be(t){k(E.CURSOS,R().filter(a=>a.id!==t)),k(E.ALUMNOS,L().filter(a=>a.cursoId!==t)),M().filter(a=>a.cursoId===t).forEach(a=>Ne(a.id)),k(E.ENSAYOS,M().filter(a=>a.cursoId!==t))}function L(t){const e=z(E.ALUMNOS);return t?e.filter(a=>a.cursoId===t):e}function je(t,e){const a=z(E.ALUMNOS).filter(s=>s.cursoId!==t),r=e.map((s,l)=>({id:s.id||V(),cursoId:t,nombre:s.nombre.trim(),numero:l+1}));return k(E.ALUMNOS,[...a,...r]),r}function M(t){const e=z(E.ENSAYOS);return t?e.filter(a=>a.cursoId===t):e}function U(t){return M().find(e=>e.id===t)}function le(t){const e=M();if(t.id){const a=e.findIndex(r=>r.id===t.id);a>=0?e[a]={...e[a],...t,updatedAt:new Date().toISOString()}:e.push(t)}else t.id=V(),t.createdAt=new Date().toISOString(),t.updatedAt=new Date().toISOString(),e.push(t);return k(E.ENSAYOS,e),t}function Ne(t){k(E.ENSAYOS,M().filter(e=>e.id!==t)),k(E.RESPUESTAS,D().filter(e=>e.ensayoId!==t))}function D(t){const e=z(E.RESPUESTAS);return t?e.filter(a=>a.ensayoId===t):e}function Oe(t,e){const a=z(E.RESPUESTAS).filter(s=>s.ensayoId!==t),r=e.map(s=>({id:V(),ensayoId:t,alumnoId:s.alumnoId,respuestas:s.respuestas,updatedAt:new Date().toISOString()}));k(E.RESPUESTAS,[...a,...r])}const ne={LENGUAJE:{asignatura:"Lenguaje y Comunicación",contenidos:["Comprensión lectora"],habilidades:["Localizar información","Relacionar e interpretar información","Reflexionar sobre el texto"]},MATEMATICA:{asignatura:"Matemática",contenidos:["Números","Álgebra y Funciones","Geometría","Datos y Azar"],habilidades:["Resolver problemas","Modelar","Representar","Argumentar y comunicar"]}};function de(t){if(!t)return!1;const e=String(t).toLowerCase();return e==="mat"||e.includes("mat")}function Pe(){const t=R(),e=M(),a=L().length;return`
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
            ${e.slice(-6).reverse().map(r=>{const s=O(r.cursoId),l=D(r.id),c=L(r.cursoId),d=l.filter(i=>Object.keys(i.respuestas||{}).length>0).length;return`
                <div class="ensayo-card" data-ensayo-id="${r.id}" data-action="ver-ensayo">
                  <div class="ensayo-meta">
                    <span class="badge badge-info">${s?s.nombre:"Curso"}</span>
                    <span class="badge ${r.status==="tabulado"?"badge-avanzado":"badge-intermedio"}">${r.status==="tabulado"?"Tabulado":"Pendiente"}</span>
                  </div>
                  <div class="ensayo-title">Ensayo Nº${r.numero} — ${r.asignatura}</div>
                  <div class="ensayo-info">
                    <span>${r.totalPreguntas} preguntas</span>
                    <span>${d}/${c.length} tabulados</span>
                    <span>${new Date(r.createdAt).toLocaleDateString("es-CL")}</span>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>
    </div>
  `}function Te(t){document.querySelectorAll('[data-action="nuevo-ensayo"]').forEach(e=>{e.addEventListener("click",()=>t("nuevo-ensayo"))}),document.querySelectorAll('[data-action="nuevo-curso"]').forEach(e=>{e.addEventListener("click",()=>t("cursos"))}),document.querySelectorAll('[data-action="ver-ensayo"]').forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.ensayoId;t("tabulacion",{ensayoId:a})})})}const ze=Object.freeze(Object.defineProperty({__proto__:null,init:Te,render:Pe},Symbol.toStringTag,{value:"Module"}));function Re(){const t=R();return`
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
          ${t.map(e=>{const a=L(e.id),r=M(e.id);return`
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
                    ${a.slice(0,8).map((s,l)=>`
                      <div style="font-size: var(--fs-xs); color: var(--text-secondary); padding: 0.2rem 0;">
                        <span style="color: var(--text-muted); font-weight: 600; margin-right: 0.5rem;">${l+1}.</span>${s.nombre}
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
  `}function De(t,e){let a=null;const r=document.getElementById("cursoForm"),s=document.getElementById("btnAddCurso"),l=document.getElementById("btnCancelCurso"),c=document.getElementById("btnSaveCurso"),d=document.getElementById("cursoFormTitle");s?.addEventListener("click",()=>{a=null,d.textContent="Nuevo Curso",document.getElementById("inputCursoNombre").value="",document.getElementById("inputAlumnos").value="",r.style.display="block",r.scrollIntoView({behavior:"smooth"})}),l?.addEventListener("click",()=>{r.style.display="none",a=null}),c?.addEventListener("click",()=>{const i=document.getElementById("inputCursoNombre").value.trim(),p=document.getElementById("inputCursoYear").value,v=document.getElementById("inputAlumnos").value.trim();if(!i){e("Ingresa el nombre del curso","error");return}const g=Me({id:a||void 0,nombre:i,year:parseInt(p)});if(v){const m=v.split(`
`).map(o=>o.trim()).filter(o=>o.length>0).map(o=>({nombre:o}));je(g.id,m)}e(`Curso "${i}" guardado con éxito`,"success"),t("cursos")}),document.querySelectorAll(".btn-edit-curso").forEach(i=>{i.addEventListener("click",()=>{const p=O(i.dataset.id),v=L(p.id);a=p.id,d.textContent="Editar Curso",document.getElementById("inputCursoNombre").value=p.nombre,document.getElementById("inputCursoYear").value=p.year||new Date().getFullYear(),document.getElementById("inputAlumnos").value=v.map(g=>g.nombre).join(`
`),r.style.display="block",r.scrollIntoView({behavior:"smooth"})})}),document.querySelectorAll(".btn-delete-curso").forEach(i=>{i.addEventListener("click",()=>{const p=O(i.dataset.id);confirm(`¿Eliminar el curso "${p.nombre}" y todos sus datos?`)&&(Be(i.dataset.id),e(`Curso "${p.nombre}" eliminado`,"info"),t("cursos"))})})}const He=Object.freeze(Object.defineProperty({__proto__:null,init:De,render:Re},Symbol.toStringTag,{value:"Module"})),oe="https://api.openai.com/v1";async function _e(t,e){const a=P();if(!a)throw new Error("API_KEY_MISSING");const r=await Ge(t,a);if(!r)throw new Error("No se pudo transcribir el audio.");return await Ue(r,e,a)}async function Ge(t,e){const a=new FormData;a.append("file",t,"grabacion.webm"),a.append("model","whisper-1"),a.append("language","es");const r=await fetch(`${oe}/audio/transcriptions`,{method:"POST",headers:{Authorization:`Bearer ${e}`},body:a});if(!r.ok){const l=await r.json();throw console.error("Whisper Error:",l),new Error("Error al conectar con el servicio de voz (Whisper). "+(l.error?.message||""))}return(await r.json()).text}async function Ue(t,e,a){const r=`Eres un asistente de corrección de exámenes SIMCE.
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
`,s=await fetch(`${oe}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"user",content:r}],temperature:.1})});if(!s.ok){const d=await s.json();throw console.error("ChatGPT Error:",d),new Error("Error al procesar el texto con ChatGPT. "+(d.error?.message||""))}let c=(await s.json()).choices[0].message.content.trim();c.startsWith("```json")&&(c=c.replace(/^```json/,"")),c.startsWith("```")&&(c=c.replace(/^```/,"")),c.endsWith("```")&&(c=c.replace(/```$/,""));try{return JSON.parse(c.trim())}catch(d){throw console.error("JSON Parse Error:",d,c),new Error("La IA no devolvió un formato válido.")}}async function qe(t,e,a="Lenguaje"){const r=P();if(!r)throw new Error("API_KEY_MISSING");const s=de(a),d=[{type:"text",text:`Eres un experto creador de pruebas SIMCE para el currículo educativo de Chile. A continuación te entrego imágenes de un ensayo de ${e} preguntas de la asignatura ${a}.
Tu tarea es resolver la prueba completa leyendo cuidadosamente los textos y alternativas presentadas en las imágenes. Para cada pregunta de 1 hasta ${e}, debes deducir contextualmente:
- 'respuestaCorrecta': La alternativa correcta (A, B, C, D o E).
- 'habilidad': Una de las siguientes: ${s?'"Resolver problemas", "Modelar", "Representar" o "Argumentar y comunicar"':'"Localizar información", "Relacionar e interpretar información" o "Reflexionar sobre el texto"'}.
- 'contenido': Uno de los siguientes ejes: ${s?'"Números", "Álgebra y Funciones", "Geometría" o "Datos y Azar"':'"Comprensión lectora"'}.

Contexto de la asignatura: ${s?'Ejes de Matemática: "Números", "Álgebra y Funciones", "Geometría", "Datos y Azar". Habilidades: "Resolver problemas", "Modelar", "Representar", "Argumentar y comunicar".':'Ejes de Lenguaje: "Comprensión lectora". Habilidades: "Localizar información", "Relacionar e interpretar información", "Reflexionar sobre el texto".'}

Devuelve ESTRICTAMENTE un arreglo JSON donde cada objeto tenga 'p' (número de pregunta), 'respuestaCorrecta', 'habilidad' y 'contenido'.
IMPORTANTE: Asegúrate de llegar hasta la pregunta ${e}.
Ejemplo de salida: 
[{"p": 1, "respuestaCorrecta": "A", "habilidad": "${s?"Resolver problemas":"Localizar información"}", "contenido": "${s?"Geometría":"Comprensión lectora"}"}]
SIN DELIMITADORES MARKDOWN COMO \`\`\`json.`}];t.forEach(m=>{d.push({type:"image_url",image_url:{url:m,detail:"high"}})});const i={model:"gpt-4o-mini",messages:[{role:"user",content:d}],temperature:.2,max_tokens:4e3},p=await fetch(`${oe}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(i)});if(!p.ok){const m=await p.json();throw console.error("ChatGPT Vision Error:",m),new Error("Error al procesar el documento con IA. "+(m.error?.message||""))}let g=(await p.json()).choices[0].message.content.trim();g.startsWith("```json")&&(g=g.replace(/^```json/,"")),g.startsWith("```")&&(g=g.replace(/^```/,"")),g.endsWith("```")&&(g=g.replace(/```$/,""));try{return JSON.parse(g.trim())}catch(m){throw console.error("Vision JSON Parse Error:",m,g),new Error("La IA no pudo formatear correctamente la pauta devuelta.")}}function Ve(){const t=R();return`
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
              ${t.map(e=>{const a=L(e.id);return`
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
  `}function Fe(t,e){let a=null,r=null,s=1;function l(o){s=o,document.querySelectorAll(".step-content").forEach(n=>n.style.display="none"),document.getElementById(`step${o}`).style.display="block",o===2&&d(),document.querySelectorAll(".step").forEach(n=>{const u=parseInt(n.dataset.step);n.classList.remove("active","completed"),u<o&&n.classList.add("completed"),u===o&&n.classList.add("active")}),document.querySelectorAll(".step-line").forEach((n,u)=>{n.classList.toggle("completed",u<o-1)})}document.querySelectorAll(".curso-option").forEach(o=>{o.addEventListener("click",()=>{a=o.dataset.cursoId,document.querySelectorAll(".curso-option").forEach(n=>n.style.borderColor=""),o.style.borderColor="var(--accent)",setTimeout(()=>l(2),200)})}),document.getElementById("btnGoCursos")?.addEventListener("click",()=>t("cursos")),document.getElementById("btnBuscarBiblioteca")?.addEventListener("click",()=>{t("biblioteca")});async function d(){const o=sessionStorage.getItem("biblio_modelo_seleccionado"),n=document.getElementById("bibliotecaAlertContainer");if(!o){n.innerHTML="";return}try{const u=await fetch("/ensayos_catalogo.json");if(!u.ok)throw new Error("Catálogo no encontrado");const y=(await u.json()).find(b=>b.id===o);if(y){const b=document.getElementById("selectAsignatura"),h=y.asignatura?String(y.asignatura).toLowerCase():"len";b.value=h==="mat"||h.includes("mat")?"mat":"len",document.getElementById("inputTotalPreguntas").value=y.totalPreguntas||30,document.getElementById("inputNotaMinima").value=y.notaMinima||2,document.getElementById("inputDificultad").value=y.porcentajeDificultad||60,r=y.claveRespuestas&&y.claveRespuestas.length>0?y.claveRespuestas:null,n.innerHTML=`
                  <div style="background: var(--success-bg); border: 1px solid var(--success); color: var(--success); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                     <div>
                       <strong>¡Modelo Importado!</strong><br/>
                       <span style="font-size: var(--fs-xs);">${y.titulo} cargado con éxito. Revisa la configuración.</span>
                     </div>
                  </div>
              `,sessionStorage.removeItem("biblio_modelo_seleccionado")}}catch(u){console.error("Error importando desde biblioteca",u)}}document.getElementById("btnBackStep1")?.addEventListener("click",()=>l(1));const i=document.getElementById("selectAsignatura");i&&i.addEventListener("change",()=>{if(s===3){const o=parseInt(document.getElementById("inputTotalPreguntas").value)||0;o>0&&m(o,null,i.value)}}),document.getElementById("btnNextStep3")?.addEventListener("click",()=>{const o=parseInt(document.getElementById("inputTotalPreguntas").value);if(!o||o<1){e("Ingresa el total de preguntas","error");return}const n=document.getElementById("selectAsignatura");if(!n||!n.value){e("Por favor, selecciona una asignatura","error"),n.style.borderColor="var(--error)";return}const y=n.value==="mat"?"mat":"len";m(o,r,y),l(3)});const p=document.getElementById("btnGenerarPautaIA"),v=document.getElementById("inputFileIA");p?.addEventListener("click",()=>{if(!P()){e("Configura tu llave de OpenAI (⚙️ arriba a la derecha) para usar la Corrección con IA.","error");return}v.click()}),v?.addEventListener("change",async o=>{const n=o.target.files[0];if(!n)return;p.disabled=!0;const u=p.innerHTML;p.innerHTML="⏳ Procesando documento...";try{const f=parseInt(document.getElementById("inputTotalPreguntas").value)||30;let y=[];if(n.type==="application/pdf"){typeof window.pdfjsLib>"u"&&(e("Descargando motor lector de PDF por primera vez...","info"),await new Promise((w,$)=>{const C=document.createElement("script");C.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",C.onload=w,C.onerror=()=>$(new Error("No se pudo cargar la librería PDF.js. Comprueba tu conexión a internet.")),document.head.appendChild(C)})),e("Leyendo PDF y convirtiendo a imágenes...","info");const N=await n.arrayBuffer(),B=await pdfjsLib.getDocument({data:N}).promise,I=Math.min(B.numPages,6);for(let w=1;w<=I;w++){const $=await B.getPage(w),C=$.getViewport({scale:1.5}),A=document.createElement("canvas"),F=A.getContext("2d");A.height=C.height,A.width=C.width,await $.render({canvasContext:F,viewport:C}).promise,y.push(A.toDataURL("image/jpeg",.8))}}else if(n.type.startsWith("image/"))y.push(await g(n));else throw new Error("Formato de archivo no soportado. Usa PDF o imágenes (JPG, PNG).");e(`Analizando ${y.length} imágenes con GPT-4 Vision...`,"info");const b=document.getElementById("selectAsignatura").value,h=de(b),x=await qe(y,f,h?"Matemática":"Lenguaje y Comunicación");if(Array.isArray(x)){let N=0;x.forEach(S=>{if(!S.p)return;const B=document.querySelector(`.clave-resp[data-pregunta="${S.p}"]`);B&&S.respuestaCorrecta&&(B.value=S.respuestaCorrecta.toUpperCase(),N++);const I=document.querySelector(`.clave-cont[data-pregunta="${S.p}"]`);if(I&&S.contenido){const $=Array.from(I.options),C=S.contenido.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),A=$.find(F=>{const J=F.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");return J===C||J.includes(C)||C.includes(J)});A&&(I.value=A.value)}const w=document.querySelector(`.clave-hab[data-pregunta="${S.p}"]`);if(w&&S.habilidad){const $=Array.from(w.options).find(C=>C.value.toLowerCase()===S.habilidad.toLowerCase());$&&(w.value=$.value)}}),e(`¡Completado! Se determinaron ${N} claves correctas.`,"success")}}catch(f){console.error(f),e(f.message,"error")}finally{v.value="",p.disabled=!1,p.innerHTML=u}});function g(o){return new Promise((n,u)=>{const f=new FileReader;f.readAsDataURL(o),f.onload=()=>n(f.result),f.onerror=y=>u(y)})}function m(o,n=null,u=null){const f=document.getElementById("selectAsignatura");let y=u;y||(y=f?f.value:"len");const b=String(y).toLowerCase().trim(),x=b==="mat"||b.includes("mat")?ne.MATEMATICA:ne.LENGUAJE,N=document.getElementById("presetBadgeInfo");N&&(N.innerHTML=`
        <span style="display:inline-flex; align-items:center; gap:0.4rem; background: rgba(59, 130, 246, 0.08); border:1px solid rgba(59,130,246,0.25); color: var(--info); border-radius:999px; padding: 0.35rem 0.75rem; font-size: var(--fs-xs); font-weight:600;">
          Asignatura detectada: ${x.asignatura}
        </span>
      `);const S=document.getElementById("claveTableBody");let B="";for(let I=1;I<=o;I++){let w="",$="",C="";n&&n[I-1]&&(w=n[I-1].respuestaCorrecta||"",$=n[I-1].contenido||"",C=n[I-1].habilidad||""),B+=`
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
              ${x.contenidos.map(A=>`<option value="${A}" ${$===A?"selected":""}>${A}</option>`).join("")}
            </select>
          </td>
          <td>
            <select class="form-select form-input-sm clave-hab" data-pregunta="${I}">
              ${x.habilidades.map(A=>`<option value="${A}" ${C===A?"selected":""}>${A}</option>`).join("")}
            </select>
          </td>
        </tr>
      `}S.innerHTML=B}document.getElementById("btnBackStep2")?.addEventListener("click",()=>l(2)),document.getElementById("btnCrearEnsayo")?.addEventListener("click",()=>{if(!a){e("Selecciona un curso primero","error");return}const o=document.querySelectorAll(".clave-resp"),n=document.querySelectorAll(".clave-cont"),u=document.querySelectorAll(".clave-hab"),f=[];let y=!1;if(o.forEach((h,x)=>{h.value||(y=!0),f.push({pregunta:x+1,respuestaCorrecta:h.value||"A",contenido:n[x].value,habilidad:u[x].value})}),y&&!confirm("Hay preguntas sin respuesta correcta definida. ¿Deseas continuar de todas formas?"))return;const b=le({cursoId:a,asignatura:document.getElementById("selectAsignatura").value==="mat"?"mat":"len",numero:parseInt(document.getElementById("inputNumeroEnsayo").value)||1,totalPreguntas:f.length,notaMinima:parseFloat(document.getElementById("inputNotaMinima").value)||2,porcentajeDificultad:parseInt(document.getElementById("inputDificultad").value)||60,claveRespuestas:f,status:"pendiente"});e("¡Ensayo creado exitosamente!","success"),t("tabulacion",{ensayoId:b.id})})}const Je=Object.freeze(Object.defineProperty({__proto__:null,init:Fe,render:Ve},Symbol.toStringTag,{value:"Module"}));function Ke(t,e=2,a=60){const r=t*(a/100),s=4,l=7,c=[];for(let d=0;d<=t;d++){let i;if(d<=r)r===0?i=s:i=e+(s-e)/r*d;else{const p=t-r;p===0?i=l:i=s+(l-s)/p*(d-r)}c.push({puntaje:d,nota:Math.round(i*10)/10})}return c}function Y(t,e,a=2,r=60){const l=Ke(e,a,r).find(c=>c.puntaje===t);return l?l.nota:a}function Ye(t){if(t<=2)return 116;if(t>=7)return 325;const e=[{nota:2,puntaje:116},{nota:3,puntaje:168},{nota:4,puntaje:219},{nota:4.5,puntaje:239},{nota:5,puntaje:255},{nota:5.5,puntaje:271},{nota:6,puntaje:287},{nota:6.5,puntaje:303},{nota:7,puntaje:325}];for(let a=0;a<e.length-1;a++){const r=e[a],s=e[a+1];if(t>=r.nota&&t<=s.nota){const l=(t-r.nota)/(s.nota-r.nota);return Math.round(r.puntaje+l*(s.puntaje-r.puntaje))}}return 219}function ce(t){return t>=295?"Avanzado":t>=245?"Intermedio":"Inicial"}function We(t,e){let a=0;const r=[],s={},l={},c={},d={};return e.forEach(i=>{const p=t[i.pregunta]||"",v=p.toUpperCase()===i.respuestaCorrecta.toUpperCase();v&&a++,r.push({pregunta:i.pregunta,respuesta:p.toUpperCase(),correcta:i.respuestaCorrecta.toUpperCase(),esCorrecta:v,contenido:i.contenido,habilidad:i.habilidad});const g=i.contenido||"Sin contenido";s[g]||(s[g]=0),l[g]||(l[g]=0),l[g]++,v&&s[g]++;const m=i.habilidad||"Sin habilidad";c[m]||(c[m]=0),d[m]||(d[m]=0),d[m]++,v&&c[m]++}),{correctasTotales:a,totalPreguntas:e.length,porcentajeLogro:e.length>0?Math.round(a/e.length*100):0,detallePorPregunta:r,porContenido:Object.keys(l).map(i=>({contenido:i,correctas:s[i],total:l[i],porcentaje:Math.round(s[i]/l[i]*100)})),porHabilidad:Object.keys(d).map(i=>({habilidad:i,correctas:c[i],total:d[i],porcentaje:Math.round(c[i]/d[i]*100)}))}}function ue(t,e){const a=We(t,e.claveRespuestas),r=Y(a.correctasTotales,e.totalPreguntas,e.notaMinima||2,e.porcentajeDificultad||60),s=Ye(r),l=ce(s),c=a.porContenido.map(i=>({...i,nota:Y(i.correctas,i.total,e.notaMinima||2,e.porcentajeDificultad||60)})),d=a.porHabilidad.map(i=>({...i,nota:Y(i.correctas,i.total,e.notaMinima||2,e.porcentajeDificultad||60)}));return{correctasTotales:a.correctasTotales,totalPreguntas:a.totalPreguntas,porcentajeLogro:a.porcentajeLogro,nota:r,puntajeSimce:s,nivel:l,porContenido:c,porHabilidad:d,detallePorPregunta:a.detallePorPregunta}}function pe(t,e,a){const r=[];return e.forEach(s=>{const l=a.find(c=>c.alumnoId===s.id);if(l&&l.respuestas&&Object.keys(l.respuestas).length>0){const c=ue(l.respuestas,t);r.push({alumnoId:s.id,alumnoNombre:s.nombre,alumnoNumero:s.numero,...c})}}),r}function me(t,e){if(t.length===0)return{cantidadEvaluados:0,promedioNota:0,promedioPuntaje:0,promedioLogro:0,nivelGeneral:"Inicial",segmentacion:{Inicial:[],Intermedio:[],Avanzado:[]},porContenido:[],porHabilidad:[]};const a=t.length,r=Math.round(t.reduce((m,o)=>m+o.nota,0)/a*10)/10,s=Math.round(t.reduce((m,o)=>m+o.puntajeSimce,0)/a),l=Math.round(t.reduce((m,o)=>m+o.porcentajeLogro,0)/a),c=ce(s),d={Inicial:[],Intermedio:[],Avanzado:[]};t.forEach(m=>{d[m.nivel].push({id:m.alumnoId,nombre:m.alumnoNombre,numero:m.alumnoNumero,puntaje:m.puntajeSimce,nota:m.nota})});const i={};t.forEach(m=>{m.porContenido.forEach(o=>{i[o.contenido]||(i[o.contenido]={total:0,correctas:0,count:0}),i[o.contenido].total+=o.total,i[o.contenido].correctas+=o.correctas,i[o.contenido].count++})});const p=Object.entries(i).map(([m,o])=>({contenido:m,porcentaje:Math.round(o.correctas/o.total*100),correctas:o.correctas,total:o.total})),v={};t.forEach(m=>{m.porHabilidad.forEach(o=>{v[o.habilidad]||(v[o.habilidad]={total:0,correctas:0,count:0}),v[o.habilidad].total+=o.total,v[o.habilidad].correctas+=o.correctas,v[o.habilidad].count++})});const g=Object.entries(v).map(([m,o])=>({habilidad:m,porcentaje:Math.round(o.correctas/o.total*100),correctas:o.correctas,total:o.total}));return{cantidadEvaluados:a,promedioNota:r,promedioPuntaje:s,promedioLogro:l,nivelGeneral:c,segmentacion:d,porContenido:p,porHabilidad:g}}let j=null,Q=[];async function Qe(){try{const t=await navigator.mediaDevices.getUserMedia({audio:!0}),e={mimeType:"audio/webm"};return j=new MediaRecorder(t,e),Q=[],j.ondataavailable=a=>{a.data.size>0&&Q.push(a.data)},j.start(),!0}catch(t){return console.error("Error accediendo al micrófono:",t),!1}}function Ze(){return new Promise(t=>{if(!j||j.state==="inactive"){t(null);return}j.onstop=()=>{const e=new Blob(Q,{type:"audio/webm"});j.stream.getTracks().forEach(a=>a.stop()),t(e)},j.stop()})}let T=null;function Xe(t){const e=M();return t?.ensayoId?(T=t.ensayoId,et(t.ensayoId)):`
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
          ${e.map(a=>{const r=O(a.cursoId),s=D(a.id),l=L(a.cursoId),c=s.filter(i=>i.respuestas&&Object.keys(i.respuestas).length>0).length,d=l.length>0?Math.round(c/l.length*100):0;return`
              <div class="ensayo-card" data-ensayo-id="${a.id}" style="cursor: pointer;">
                <div class="ensayo-meta">
                  <span class="badge badge-info">${r?r.nombre:"?"}</span>
                </div>
                <div class="ensayo-title">Ensayo Nº${a.numero} — ${a.asignatura}</div>
                <div class="ensayo-info" style="margin-bottom: 0.75rem;">
                  <span>${a.totalPreguntas} preguntas</span>
                  <span>${c}/${l.length} tabulados</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill ${d<40?"low":d<80?"mid":"high"}" style="width: ${d}%;"></div>
                </div>
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `}function et(t){const e=U(t);if(!e)return'<div class="card"><p>Ensayo no encontrado</p></div>';const a=O(e.cursoId),r=L(e.cursoId),s=D(t),l=s.filter(c=>c.respuestas&&Object.keys(c.respuestas).length>0).length;return`
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
              ${Array.from({length:e.totalPreguntas},(c,d)=>`<th>${d+1}</th>`).join("")}
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
            ${r.map(c=>{const i=s.find(p=>p.alumnoId===c.id)?.respuestas||{};return`
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
                  ${Array.from({length:e.totalPreguntas},(p,v)=>{const g=v+1,m=i[g]||"",o=e.claveRespuestas[v]?.respuestaCorrecta?.toUpperCase();let n="empty";return m&&(n=m.toUpperCase()===o?"correct":"incorrect"),`
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
  `}function tt(t,e){if(document.querySelectorAll(".ensayo-card[data-ensayo-id]").forEach(o=>{o.addEventListener("click",()=>{t("tabulacion",{ensayoId:o.dataset.ensayoId})})}),document.getElementById("btnGoNuevo")?.addEventListener("click",()=>t("nuevo-ensayo")),document.getElementById("btnBackToList")?.addEventListener("click",()=>t("tabulacion")),!T)return;const a=U(T);if(!a)return;let r=null;const s=document.querySelector(".tab-grid-container");if(!s)return;let l=null;s.addEventListener("click",async o=>{const n=o.target.closest(".btn-dictar");if(n){if(l&&l!==n){e("Ya hay una grabación en progreso.","warning");return}if(l){l=null,n.classList.remove("recording-active"),n.style.opacity="0.5",n.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',e("🧠 Procesando dictado con IA (Whisper)...","info");try{const u=await Ze();if(u){const f=await _e(u,a.totalPreguntas);if(Array.isArray(f)){const y=n.dataset.alumno;let b=0;f.forEach(h=>{if(h.p&&typeof h.r=="string"){const x=document.querySelector(`.tab-cell[data-alumno="${y}"][data-pregunta="${h.p}"]`);x&&(x.value=h.r.toUpperCase(),x.dispatchEvent(new Event("input",{bubbles:!0})),b++)}}),e(`¡Dictado procesado! ${b} respuestas asignadas.`,"success")}}}catch(u){e(u.message,"error")}finally{n.style.opacity="1",n.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>'}}else{if(!P()){e("Configura tu llave de OpenAI (⚙️ arriba a la derecha) para usar la Corrección por Voz.","error");return}await Qe()?(l=n,n.classList.add("recording-active"),n.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect></svg>',e("🎤 Escuchando... Haz clic de nuevo para detener y procesar.","info")):e("No se pudo acceder al micrófono.","error")}}}),s.addEventListener("keydown",o=>{const n=o.target;if(!n.classList.contains("tab-cell"))return;["a","b","c","d","e","A","B","C","D","E"].includes(o.key)?(o.preventDefault(),n.value=o.key.toUpperCase(),n.dispatchEvent(new Event("input",{bubbles:!0})),c(n)):o.key==="Delete"||o.key==="Backspace"?(n.value="",n.dispatchEvent(new Event("input",{bubbles:!0}))):o.key==="Tab"?(o.preventDefault(),o.shiftKey?d(n):c(n)):o.key==="ArrowRight"?c(n):o.key==="ArrowLeft"?d(n):o.key==="ArrowDown"?i(n):o.key==="ArrowUp"?p(n):o.key==="Enter"?i(n):["Shift","Control","Alt","Meta"].includes(o.key)||o.preventDefault()}),s.addEventListener("input",o=>{const n=o.target;if(!n.classList.contains("tab-cell"))return;const u=n.value.toUpperCase();if(u&&!["A","B","C","D","E"].includes(u)){n.value="";return}const f=parseInt(n.dataset.pregunta),y=a.claveRespuestas[f-1]?.respuestaCorrecta?.toUpperCase();n.classList.remove("correct","incorrect","empty"),u?u===y?n.classList.add("correct"):n.classList.add("incorrect"):n.classList.add("empty"),clearTimeout(r),r=setTimeout(()=>v(),300),g(n.dataset.alumno)}),s.addEventListener("focusin",o=>{o.target.classList.contains("tab-cell")&&o.target.select()}),s.addEventListener("paste",o=>{const n=o.target;if(!n.classList.contains("tab-cell"))return;o.preventDefault();const f=(o.clipboardData||window.clipboardData).getData("text").trim().toUpperCase().charAt(0);["A","B","C","D","E"].includes(f)&&(n.value=f,n.dispatchEvent(new Event("input",{bubbles:!0})))});function c(o){const n=Array.from(document.querySelectorAll(".tab-cell")),u=n.indexOf(o);u<n.length-1&&n[u+1].focus()}function d(o){const n=Array.from(document.querySelectorAll(".tab-cell")),u=n.indexOf(o);u>0&&n[u-1].focus()}function i(o){const n=o.dataset.alumno,u=o.dataset.pregunta,f=document.querySelectorAll(`[data-alumno][data-pregunta="${u}"]`),y=Array.from(f),b=y.findIndex(h=>h.dataset.alumno===n);b<y.length-1&&y[b+1].focus()}function p(o){const n=o.dataset.alumno,u=o.dataset.pregunta,f=document.querySelectorAll(`[data-alumno][data-pregunta="${u}"]`),y=Array.from(f),b=y.findIndex(h=>h.dataset.alumno===n);b>0&&y[b-1].focus()}function v(){const o=L(a.cursoId),n=[];o.forEach(f=>{const y={};document.querySelectorAll(`[data-alumno="${f.id}"]`).forEach(h=>{h.classList.contains("tab-cell")&&h.value&&(y[h.dataset.pregunta]=h.value.toUpperCase())}),Object.keys(y).length>0&&n.push({alumnoId:f.id,respuestas:y})}),Oe(T,n);const u=U(T);n.length>0&&u.status!=="tabulado"&&le({...u,status:"tabulado"})}function g(o){const n=document.querySelectorAll(`.tab-cell[data-alumno="${o}"]`),u={};if(n.forEach(h=>{h.value&&(u[h.dataset.pregunta]=h.value.toUpperCase())}),Object.keys(u).length===0){document.querySelector(`.result-ok[data-alumno="${o}"]`).textContent="—",document.querySelector(`.result-nota[data-alumno="${o}"]`).textContent="—",document.querySelector(`.result-ptje[data-alumno="${o}"]`).textContent="—",document.querySelector(`.result-nivel[data-alumno="${o}"]`).textContent="—";return}const f=ue(u,a);document.querySelector(`.result-ok[data-alumno="${o}"]`).textContent=`${f.correctasTotales}/${f.totalPreguntas}`,document.querySelector(`.result-nota[data-alumno="${o}"]`).textContent=f.nota.toFixed(1);const y=document.querySelector(`.result-ptje[data-alumno="${o}"]`);y.textContent=f.puntajeSimce;const b=document.querySelector(`.result-nivel[data-alumno="${o}"]`);b.innerHTML=`<span class="badge badge-${f.nivel.toLowerCase()}" style="font-size: 10px; padding: 0.125rem 0.5rem;">${f.nivel}</span>`}L(a.cursoId).forEach(o=>g(o.id)),document.getElementById("btnVerResultados")?.addEventListener("click",()=>{t("reportes",{ensayoId:T})})}const at=Object.freeze(Object.defineProperty({__proto__:null,init:tt,render:Xe},Symbol.toStringTag,{value:"Module"})),ot="https://api.openai.com/v1";async function nt(t,e){const a=P();if(!a)throw new Error("API_KEY_MISSING");const{promedioNota:r,promedioPuntaje:s,promedioLogro:l,nivelGeneral:c,porContenido:d,porHabilidad:i,segmentacion:p}=t,v=d.map(n=>`- ${n.contenido}: ${n.porcentaje}% logro`).join(`
`),g=i.map(n=>`- ${n.habilidad}: ${n.porcentaje}% logro`).join(`
`),m=p.Inicial.map(n=>n.nombre).slice(0,5).join(", "),o=`
Eres un Asesor Pedagógico experto en el currículo chileno y evaluación SIMCE.
Analiza los siguientes resultados de un curso en un ensayo de ${e.asignatura}:

DATOS GENERALES:
- Promedio de Nota: ${r}
- Promedio Puntaje SIMCE: ${s}
- Nivel General: ${c}
- Porcentaje de Logro: ${l}%

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
`;try{const n=await fetch(`${ot}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"user",content:o}],temperature:.4})});if(!n.ok){const f=await n.json();throw new Error(f.error?.message||"Error al conectar con OpenAI")}return(await n.json()).choices[0].message.content.trim()}catch(n){throw console.error("AI Insights Error:",n),n}}let G=[];function st(t){const e=M();if(!t?.ensayoId){const i=e.filter(p=>p.status==="tabulado");return`
      <div class="fade-in">
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: var(--fs-xl); font-weight: 700;">Reportes</h2>
          <p style="color: var(--text-secondary); font-size: var(--fs-sm);">Selecciona un ensayo tabulado para ver los resultados</p>
        </div>
        ${i.length===0?`
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
            ${i.map(p=>{const v=O(p.cursoId);return`
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
    `}const a=U(t.ensayoId);if(!a)return'<div class="card"><p>Ensayo no encontrado</p></div>';const r=O(a.cursoId),s=L(a.cursoId),l=D(t.ensayoId),c=pe(a,s,l),d=me(c);return`
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
            ${a.asignatura} · ${d.cantidadEvaluados} alumnos evaluados
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
            <div class="stat-value">${d.cantidadEvaluados}</div>
            <div class="stat-label">Alumnos evaluados</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg></div>
          <div>
            <div class="stat-value">${d.promedioNota}</div>
            <div class="stat-label">Promedio Nota</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <div>
            <div class="stat-value">${d.promedioPuntaje}</div>
            <div class="stat-label">Ptje SIMCE Simulado</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon ${d.nivelGeneral==="Avanzado"?"green":d.nivelGeneral==="Intermedio"?"orange":"red"}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <div class="stat-value">${d.promedioLogro}%</div>
            <div class="stat-label">% Logro · <span class="badge badge-${d.nivelGeneral.toLowerCase()}">${d.nivelGeneral}</span></div>
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

      ${d.porContenido.length>0?`
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
              <span class="seg-count badge badge-inicial">${d.segmentacion.Inicial.length}</span>
            </div>
            ${d.segmentacion.Inicial.map(i=>`<div class="seg-student">${i.numero}. ${i.nombre} <span style="float: right; font-weight: 600;">${i.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
          </div>
          <div class="seg-column intermedio">
            <div class="seg-header">
              <span class="seg-title" style="color: #b45309;">🟡 Intermedio</span>
              <span class="seg-count badge badge-intermedio">${d.segmentacion.Intermedio.length}</span>
            </div>
            ${d.segmentacion.Intermedio.map(i=>`<div class="seg-student">${i.numero}. ${i.nombre} <span style="float: right; font-weight: 600;">${i.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
          </div>
          <div class="seg-column avanzado">
            <div class="seg-header">
              <span class="seg-title" style="color: #059669;">🟢 Avanzado</span>
              <span class="seg-count badge badge-avanzado">${d.segmentacion.Avanzado.length}</span>
            </div>
            ${d.segmentacion.Avanzado.map(i=>`<div class="seg-student">${i.numero}. ${i.nombre} <span style="float: right; font-weight: 600;">${i.puntaje}</span></div>`).join("")||'<div class="seg-student" style="color: var(--text-muted); text-align: center;">—</div>'}
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
              ${c.sort((i,p)=>i.alumnoNumero-p.alumnoNumero).map(i=>`
                <tr>
                  <td style="font-weight: 600; color: var(--text-muted);">${i.alumnoNumero}</td>
                  <td style="font-weight: 500;">${i.alumnoNombre}</td>
                  <td>${i.correctasTotales}/${i.totalPreguntas}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <div class="progress-bar" style="width: 60px; height: 6px;">
                        <div class="progress-fill ${i.porcentajeLogro<40?"low":i.porcentajeLogro<70?"mid":"high"}" style="width: ${i.porcentajeLogro}%;"></div>
                      </div>
                      <span>${i.porcentajeLogro}%</span>
                    </div>
                  </td>
                  <td style="font-weight: 700;">${i.nota.toFixed(1)}</td>
                  <td style="font-weight: 600;">${i.puntajeSimce}</td>
                  <td><span class="badge badge-${i.nivel.toLowerCase()}">${i.nivel}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function rt(t,e,a){if(G.forEach(n=>n.destroy()),G=[],document.querySelectorAll(".ensayo-card[data-ensayo-id]").forEach(n=>{n.addEventListener("click",()=>{t("reportes",{ensayoId:n.dataset.ensayoId})})}),document.getElementById("btnBackReportes")?.addEventListener("click",()=>t("reportes")),!a?.ensayoId)return;const r=U(a.ensayoId);if(!r)return;const s=L(r.cursoId),l=D(a.ensayoId),c=pe(r,s,l),d=me(c);H.defaults.font.family="'Inter', sans-serif",H.defaults.font.size=12;const i=document.getElementById("chartHabilidades");if(i&&d.porHabilidad.length>0){const n=new H(i,{type:"bar",data:{labels:d.porHabilidad.map(u=>u.habilidad),datasets:[{data:d.porHabilidad.map(u=>u.porcentaje),backgroundColor:d.porHabilidad.map(u=>u.porcentaje>=70?"rgba(16, 185, 129, 0.7)":u.porcentaje>=40?"rgba(245, 158, 11, 0.7)":"rgba(239, 68, 68, 0.7)"),borderRadius:6,barPercentage:.6}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:"y",plugins:{legend:{display:!1},tooltip:{callbacks:{label:u=>`${u.raw}% de logro`}}},scales:{x:{max:100,grid:{color:"rgba(0,0,0,0.04)"}},y:{grid:{display:!1},ticks:{font:{size:11}}}}}});G.push(n)}const p=document.getElementById("chartSegmentacion");if(p){const n=new H(p,{type:"doughnut",data:{labels:["Inicial","Intermedio","Avanzado"],datasets:[{data:[d.segmentacion.Inicial.length,d.segmentacion.Intermedio.length,d.segmentacion.Avanzado.length],backgroundColor:["rgba(239, 68, 68, 0.75)","rgba(245, 158, 11, 0.75)","rgba(16, 185, 129, 0.75)"],borderWidth:0,spacing:3,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"55%",plugins:{legend:{position:"bottom",labels:{padding:16,usePointStyle:!0,pointStyle:"circle"}}}}});G.push(n)}const v=document.getElementById("chartContenidos");if(v&&d.porContenido.length>0){const n=new H(v,{type:"bar",data:{labels:d.porContenido.map(u=>u.contenido),datasets:[{data:d.porContenido.map(u=>u.porcentaje),backgroundColor:d.porContenido.map(u=>u.porcentaje>=70?"rgba(16, 185, 129, 0.7)":u.porcentaje>=40?"rgba(245, 158, 11, 0.7)":"rgba(239, 68, 68, 0.7)"),borderRadius:6,barPercentage:.6}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:"y",plugins:{legend:{display:!1}},scales:{x:{max:100,grid:{color:"rgba(0,0,0,0.04)"}},y:{grid:{display:!1}}}}});G.push(n)}const g=document.getElementById("btnGenerarAI"),m=document.getElementById("aiInsightsContainer"),o=document.getElementById("aiInsightsContent");g?.addEventListener("click",async()=>{if(!P()){e("Configura tu llave de OpenAI para usar esta función.","error");return}g.disabled=!0,g.innerHTML='<span class="spinner" style="width: 14px; height: 14px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; display: inline-block; animation: spin 0.8s linear infinite; margin-right: 0.5rem;"></span> Procesando...';try{const u=(await nt(d,r)).replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/### (.*)/g,'<h4 style="margin-top: 1rem; color: var(--primary);">$1</h4>').replace(/\n\n/g,'<p style="margin-bottom: 0.75rem;"></p>').replace(/^- (.*)/gm,'<li style="margin-left: 1rem;">$1</li>');o.innerHTML=u,m.style.display="block",m.scrollIntoView({behavior:"smooth",block:"start"}),e("¡Análisis generado exitosamente!","success")}catch(n){e(n.message,"error")}finally{g.disabled=!1,g.innerHTML=`
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.25rem;"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path><path d="M12 12L2.69 7"></path><path d="M12 12l5.63 8.16"></path><path d="M12 12l8.21-4.64"></path></svg>
                Generar Análisis IA
            `}}),document.getElementById("btnCloseAI")?.addEventListener("click",()=>{m.style.display="none"})}const it=Object.freeze(Object.defineProperty({__proto__:null,init:rt,render:st},Symbol.toStringTag,{value:"Module"}));async function lt(){return`
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
  `}async function dt(t,e){const a=document.getElementById("bibliotecaContainer");let r=[];try{const i=await fetch("/ensayos_catalogo.json");if(!i.ok)throw new Error("No se pudo cargar el catálogo.");r=await i.json(),d(r)}catch(i){console.error(i),a.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon" style="color: var(--danger);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="empty-state-title">Error al cargar la Biblioteca</div>
        <div class="empty-state-desc">No se encontró el archivo de catálogo base. Ejecuta el script de procesamiento primero.</div>
      </div>
    `;return}const s=document.getElementById("btnFiltrar"),l=document.getElementById("filtroAsignatura"),c=document.getElementById("filtroNivel");s?.addEventListener("click",()=>{const i=l.value,p=c.value,v=r.filter(g=>{const m=i==="todos"||g.asignatura===i,o=p==="todos"||g.nivel===p;return m&&o});d(v)});function d(i){if(i.length===0){a.innerHTML=`
        <div class="empty-state card">
          <div class="empty-state-icon">
             <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <div class="empty-state-title">No hay resultados</div>
          <div class="empty-state-desc">Prueba cambiando los filtros de búsqueda.</div>
        </div>
      `;return}const p=i.map(v=>`
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
    `).join("");a.innerHTML=`<div class="ensayo-grid">${p}</div>`,document.querySelectorAll(".btn-usar-ensayo").forEach(v=>{v.addEventListener("click",()=>{const g=v.dataset.ensayoId;sessionStorage.setItem("biblio_modelo_seleccionado",g),t("nuevo-ensayo")})})}}const ct=Object.freeze(Object.defineProperty({__proto__:null,init:dt,render:lt},Symbol.toStringTag,{value:"Module"})),ut={dashboard:{module:ze,title:"Dashboard"},cursos:{module:He,title:"Cursos"},"nuevo-ensayo":{module:Je,title:"Nuevo Ensayo"},tabulacion:{module:at,title:"Tabulación"},reportes:{module:it,title:"Reportes"},biblioteca:{module:ct,title:"Biblioteca de Ensayos"}};let Z="dashboard",X={};function ve(t,e={}){Z=t,X=e,ee()}async function ee(){const t=ut[Z];if(!t)return;document.getElementById("pageTitle").textContent=t.title,document.querySelectorAll(".nav-item").forEach(a=>{a.classList.toggle("active",a.dataset.page===Z)});const e=document.getElementById("pageContent");if(e.classList.remove("page-enter"),e.offsetWidth,typeof t.module.render=="function"){const a=t.module.render(X);a instanceof Promise?e.innerHTML=await a:e.innerHTML=a}e.classList.add("page-enter"),t.module.init(ve,q,X),e.scrollTop=0}function q(t,e="info"){const a=document.getElementById("toastContainer"),r=document.createElement("div");r.className=`toast ${e}`;const s={success:"✓",error:"✕",info:"ℹ"};r.innerHTML=`<span>${s[e]||"ℹ"}</span><span>${t}</span>`,a.appendChild(r),setTimeout(()=>{r.classList.add("out"),setTimeout(()=>r.remove(),300)},3e3)}function pt(t,e,a){document.getElementById("modalTitle").textContent=t,document.getElementById("modalBody").innerHTML=e,document.getElementById("modalFooter").innerHTML=a,document.getElementById("modalOverlay").classList.add("show")}function te(){document.getElementById("modalOverlay").classList.remove("show")}function mt(){const t=document.getElementById("sidebar"),e=document.getElementById("menuBtn"),a=document.getElementById("sidebarToggle");e?.addEventListener("click",()=>{t.classList.toggle("show")}),a?.addEventListener("click",()=>{t.classList.toggle("collapsed"),t.classList.remove("show")}),document.getElementById("mainContent")?.addEventListener("click",()=>{window.innerWidth<=1024&&t.classList.remove("show")})}function vt(){document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const a=t.dataset.page;a&&(ve(a),window.innerWidth<=1024&&document.getElementById("sidebar").classList.remove("show"))})})}function gt(){document.getElementById("modalClose")?.addEventListener("click",te),document.getElementById("modalOverlay")?.addEventListener("click",t=>{t.target===t.currentTarget&&te()})}function ae(){const t=ie(),e=document.getElementById("schoolBadge");e&&(e.textContent=t.name,e.style.cursor="pointer",e.title="Click para cambiar nombre")}function yt(){ae(),document.getElementById("schoolBadge")?.addEventListener("click",()=>{const a=`
      <div class="form-group">
        <label for="inputSchoolName">Nombre del Colegio:</label>
        <input type="text" id="inputSchoolName" class="form-control" value="${ie().name}">
      </div>
    `;pt("Editar Colegio",a,`
      <button id="btnSaveSchool" class="btn btn-primary">Guardar</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    `),document.getElementById("btnSaveSchool").addEventListener("click",()=>{const s=document.getElementById("inputSchoolName").value.trim();s&&(Le({name:s}),ae(),te(),q("Nombre guardado","success"))})})}function ft(){const t=document.getElementById("btnConfigAI"),e=document.getElementById("modalConfigAI"),a=document.getElementById("btnCerrarConfigAI"),r=document.getElementById("btnGuardarConfigAI"),s=document.getElementById("inputAIKey");t?.addEventListener("click",()=>{s.value=P(),e.style.display="flex"}),a?.addEventListener("click",()=>{e.style.display="none"}),r?.addEventListener("click",()=>{const l=s.value.trim();ke(l),e.style.display="none",l?q("Llave API de OpenAI guardada exitosamente.","success"):q("Configuración AI deshabilitada.","info")})}function ht(){const t=document.getElementById("syncIndicator"),e=t?.querySelector(".sync-text");t&&(document.addEventListener("storage:syncing",()=>{t.className="cloud-sync-status syncing",e&&(e.textContent="Sincronizando...")}),document.addEventListener("storage:synced",()=>{t.className="cloud-sync-status synced",e&&(e.textContent="Sincronizado"),setTimeout(()=>{t.className="cloud-sync-status",e&&(e.textContent="Conectado")},2e3)}),document.addEventListener("storage:error",a=>{t.className="cloud-sync-status error",e&&(e.textContent="Error de conexión"),console.error("Sync Error:",a.detail)}))}async function ge(){mt(),vt(),gt(),yt(),ft(),ht(),ee(),await $e()&&(ae(),ee())}document.addEventListener("DOMContentLoaded",ge);document.readyState!=="loading"&&ge();
