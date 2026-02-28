// ============================================
// storage.js — LocalStorage Manager
// ============================================

const STORAGE_KEYS = {
    SCHOOL: 'simce_school',
    CURSOS: 'simce_cursos',
    ALUMNOS: 'simce_alumnos',
    ENSAYOS: 'simce_ensayos',
    RESPUESTAS: 'simce_respuestas',
};

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

function getAll(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

function setAll(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ---- School ----
export function getSchool() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SCHOOL)) || { name: 'Mi Colegio' };
}

export function setSchool(school) {
    localStorage.setItem(STORAGE_KEYS.SCHOOL, JSON.stringify(school));
}

// ---- Cursos ----
export function getCursos() {
    return getAll(STORAGE_KEYS.CURSOS);
}

export function getCurso(id) {
    return getCursos().find(c => c.id === id);
}

export function saveCurso(curso) {
    const cursos = getCursos();
    if (curso.id) {
        const idx = cursos.findIndex(c => c.id === curso.id);
        if (idx >= 0) cursos[idx] = { ...cursos[idx], ...curso };
        else cursos.push(curso);
    } else {
        curso.id = generateId();
        curso.createdAt = new Date().toISOString();
        cursos.push(curso);
    }
    setAll(STORAGE_KEYS.CURSOS, cursos);
    return curso;
}

export function deleteCurso(id) {
    setAll(STORAGE_KEYS.CURSOS, getCursos().filter(c => c.id !== id));
    // Also delete related alumnos and ensayos
    setAll(STORAGE_KEYS.ALUMNOS, getAlumnos().filter(a => a.cursoId !== id));
    const ensayos = getEnsayos().filter(e => e.cursoId === id);
    ensayos.forEach(e => deleteEnsayo(e.id));
    setAll(STORAGE_KEYS.ENSAYOS, getEnsayos().filter(e => e.cursoId !== id));
}

// ---- Alumnos ----
export function getAlumnos(cursoId) {
    const all = getAll(STORAGE_KEYS.ALUMNOS);
    return cursoId ? all.filter(a => a.cursoId === cursoId) : all;
}

export function saveAlumnos(cursoId, alumnos) {
    const all = getAll(STORAGE_KEYS.ALUMNOS).filter(a => a.cursoId !== cursoId);
    const withIds = alumnos.map((a, i) => ({
        id: a.id || generateId(),
        cursoId,
        nombre: a.nombre.trim(),
        numero: i + 1,
    }));
    setAll(STORAGE_KEYS.ALUMNOS, [...all, ...withIds]);
    return withIds;
}

// ---- Ensayos ----
export function getEnsayos(cursoId) {
    const all = getAll(STORAGE_KEYS.ENSAYOS);
    return cursoId ? all.filter(e => e.cursoId === cursoId) : all;
}

export function getEnsayo(id) {
    return getEnsayos().find(e => e.id === id);
}

export function saveEnsayo(ensayo) {
    const ensayos = getEnsayos();
    if (ensayo.id) {
        const idx = ensayos.findIndex(e => e.id === ensayo.id);
        if (idx >= 0) ensayos[idx] = { ...ensayos[idx], ...ensayo, updatedAt: new Date().toISOString() };
        else ensayos.push(ensayo);
    } else {
        ensayo.id = generateId();
        ensayo.createdAt = new Date().toISOString();
        ensayo.updatedAt = new Date().toISOString();
        ensayos.push(ensayo);
    }
    setAll(STORAGE_KEYS.ENSAYOS, ensayos);
    return ensayo;
}

export function deleteEnsayo(id) {
    setAll(STORAGE_KEYS.ENSAYOS, getEnsayos().filter(e => e.id !== id));
    setAll(STORAGE_KEYS.RESPUESTAS, getRespuestas().filter(r => r.ensayoId !== id));
}

// ---- Respuestas ----
export function getRespuestas(ensayoId) {
    const all = getAll(STORAGE_KEYS.RESPUESTAS);
    return ensayoId ? all.filter(r => r.ensayoId === ensayoId) : all;
}

export function getRespuesta(ensayoId, alumnoId) {
    return getRespuestas(ensayoId).find(r => r.alumnoId === alumnoId);
}

export function saveRespuesta(ensayoId, alumnoId, respuestas) {
    const all = getAll(STORAGE_KEYS.RESPUESTAS);
    const idx = all.findIndex(r => r.ensayoId === ensayoId && r.alumnoId === alumnoId);
    const record = {
        id: idx >= 0 ? all[idx].id : generateId(),
        ensayoId,
        alumnoId,
        respuestas, // { 1: 'A', 2: 'C', ... }
        updatedAt: new Date().toISOString(),
    };
    if (idx >= 0) all[idx] = record;
    else all.push(record);
    setAll(STORAGE_KEYS.RESPUESTAS, all);
    return record;
}

export function saveAllRespuestas(ensayoId, allRespuestas) {
    // allRespuestas is an array of { alumnoId, respuestas }
    const all = getAll(STORAGE_KEYS.RESPUESTAS).filter(r => r.ensayoId !== ensayoId);
    const records = allRespuestas.map(r => ({
        id: generateId(),
        ensayoId,
        alumnoId: r.alumnoId,
        respuestas: r.respuestas,
        updatedAt: new Date().toISOString(),
    }));
    setAll(STORAGE_KEYS.RESPUESTAS, [...all, ...records]);
}

// ---- Presets ----
export const PRESETS = {
    LENGUAJE: {
        asignatura: 'Lenguaje y Comunicación',
        contenidos: ['Comprensión lectora'],
        habilidades: [
            'Localizar información',
            'Relacionar e interpretar información',
            'Reflexionar sobre el texto',
        ],
    },
};

export const NIVELES_SIMCE = {
    getLevel(puntaje) {
        if (puntaje >= 295) return 'Avanzado';
        if (puntaje >= 245) return 'Intermedio';
        return 'Inicial';
    },
    ranges: {
        'Inicial': { min: 0, max: 244 },
        'Intermedio': { min: 245, max: 294 },
        'Avanzado': { min: 295, max: 400 },
    }
};
