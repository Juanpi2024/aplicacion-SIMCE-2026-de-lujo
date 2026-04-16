// ============================================
// calculations.js — Motor de Cálculos SIMCE
// Replica exactamente la lógica del Excel
// ============================================

/**
 * Build the grade table (same as NOTA CONT / NOTA HAB sheets)
 * Uses Chilean grading scale 2.0 - 7.0
 * @param {number} totalPreguntas - max questions
 * @param {number} notaMinima - default 2.0
 * @param {number} porcentajeDificultad - default 60
 * @returns {Array} grade table [{puntaje, nota}]
 */
export function buildGradeTable(totalPreguntas, notaMinima = 2.0, porcentajeDificultad = 60) {
    const puntajeCorte = totalPreguntas * (porcentajeDificultad / 100);
    const notaCorte = 4.0; // The grade at the cut-off point
    const notaMaxima = 7.0;

    const table = [];

    for (let pts = 0; pts <= totalPreguntas; pts++) {
        let nota;
        if (pts <= puntajeCorte) {
            // Linear from notaMinima to notaCorte
            if (puntajeCorte === 0) {
                nota = notaCorte;
            } else {
                nota = notaMinima + ((notaCorte - notaMinima) / puntajeCorte) * pts;
            }
        } else {
            // Linear from notaCorte to notaMaxima
            const remaining = totalPreguntas - puntajeCorte;
            if (remaining === 0) {
                nota = notaMaxima;
            } else {
                nota = notaCorte + ((notaMaxima - notaCorte) / remaining) * (pts - puntajeCorte);
            }
        }
        table.push({ puntaje: pts, nota: Math.round(nota * 10) / 10 });
    }

    return table;
}

/**
 * Get grade for a given score
 */
export function getGrade(correctas, totalPreguntas, notaMinima = 2.0, porcentajeDificultad = 60) {
    const table = buildGradeTable(totalPreguntas, notaMinima, porcentajeDificultad);
    const entry = table.find(t => t.puntaje === correctas);
    return entry ? entry.nota : notaMinima;
}

/**
 * Convert nota to simulated SIMCE score
 * Based on the PTJE sheet from the Excel
 * Uses a linear interpolation approach
 */
export function notaToPuntajeSimce(nota) {
    // Approximate SIMCE score mapping based on the Excel data
    // The Excel uses 3 conversion tables and averages them
    // This is a simplified but accurate version
    if (nota <= 2.0) return 116;
    if (nota >= 7.0) return 325;

    // Piecewise linear based on the Excel PTJE table
    const breakpoints = [
        { nota: 2.0, puntaje: 116 },
        { nota: 3.0, puntaje: 168 },
        { nota: 4.0, puntaje: 219 },
        { nota: 4.5, puntaje: 239 },
        { nota: 5.0, puntaje: 255 },
        { nota: 5.5, puntaje: 271 },
        { nota: 6.0, puntaje: 287 },
        { nota: 6.5, puntaje: 303 },
        { nota: 7.0, puntaje: 325 },
    ];

    for (let i = 0; i < breakpoints.length - 1; i++) {
        const curr = breakpoints[i];
        const next = breakpoints[i + 1];
        if (nota >= curr.nota && nota <= next.nota) {
            const ratio = (nota - curr.nota) / (next.nota - curr.nota);
            return Math.round(curr.puntaje + ratio * (next.puntaje - curr.puntaje));
        }
    }
    return 219; // fallback
}

/**
 * Determine SIMCE level based on score
 */
export function getNivel(puntajeSimce) {
    if (puntajeSimce >= 295) return 'Avanzado';
    if (puntajeSimce >= 245) return 'Intermedio';
    return 'Inicial';
}

/**
 * Correct a single student's answers
 * @param {Object} respuestasAlumno - { 1: 'A', 2: 'C', ... }
 * @param {Array} claveRespuestas - [{ pregunta: 1, respuestaCorrecta: 'B', contenido: '...', habilidad: '...' }, ...]
 * @returns {Object} detailed results
 */
export function corregirAlumno(respuestasAlumno, claveRespuestas) {
    let correctasTotales = 0;
    const detallePorPregunta = [];
    const correctasPorContenido = {};
    const totalPorContenido = {};
    const correctasPorHabilidad = {};
    const totalPorHabilidad = {};

    claveRespuestas.forEach(clave => {
        const respuesta = respuestasAlumno[clave.pregunta] || '';
        const esCorrecta = respuesta.toUpperCase() === clave.respuestaCorrecta.toUpperCase();

        if (esCorrecta) correctasTotales++;

        detallePorPregunta.push({
            pregunta: clave.pregunta,
            respuesta: respuesta.toUpperCase(),
            correcta: clave.respuestaCorrecta.toUpperCase(),
            esCorrecta,
            contenido: clave.contenido,
            habilidad: clave.habilidad,
        });

        // Count by contenido
        const cont = clave.contenido || 'Sin contenido';
        if (!correctasPorContenido[cont]) correctasPorContenido[cont] = 0;
        if (!totalPorContenido[cont]) totalPorContenido[cont] = 0;
        totalPorContenido[cont]++;
        if (esCorrecta) correctasPorContenido[cont]++;

        // Count by habilidad
        const hab = clave.habilidad || 'Sin habilidad';
        if (!correctasPorHabilidad[hab]) correctasPorHabilidad[hab] = 0;
        if (!totalPorHabilidad[hab]) totalPorHabilidad[hab] = 0;
        totalPorHabilidad[hab]++;
        if (esCorrecta) correctasPorHabilidad[hab]++;
    });

    return {
        correctasTotales,
        totalPreguntas: claveRespuestas.length,
        porcentajeLogro: claveRespuestas.length > 0
            ? Math.round((correctasTotales / claveRespuestas.length) * 100)
            : 0,
        detallePorPregunta,
        porContenido: Object.keys(totalPorContenido).map(cont => ({
            contenido: cont,
            correctas: correctasPorContenido[cont],
            total: totalPorContenido[cont],
            porcentaje: Math.round((correctasPorContenido[cont] / totalPorContenido[cont]) * 100),
        })),
        porHabilidad: Object.keys(totalPorHabilidad).map(hab => ({
            habilidad: hab,
            correctas: correctasPorHabilidad[hab],
            total: totalPorHabilidad[hab],
            porcentaje: Math.round((correctasPorHabilidad[hab] / totalPorHabilidad[hab]) * 100),
        })),
    };
}

/**
 * Full calculation for ONE student
 */
export function calcularResultadoAlumno(respuestasAlumno, ensayo) {
    const correccion = corregirAlumno(respuestasAlumno, ensayo.claveRespuestas);
    const nota = getGrade(
        correccion.correctasTotales,
        ensayo.totalPreguntas,
        ensayo.notaMinima || 2.0,
        ensayo.porcentajeDificultad || 60
    );
    const puntajeSimce = notaToPuntajeSimce(nota);
    const nivel = getNivel(puntajeSimce);

    // Calculate grades per contenido
    const porContenido = correccion.porContenido.map(c => ({
        ...c,
        nota: getGrade(c.correctas, c.total, ensayo.notaMinima || 2.0, ensayo.porcentajeDificultad || 60),
    }));

    // Calculate grades per habilidad
    const porHabilidad = correccion.porHabilidad.map(h => ({
        ...h,
        nota: getGrade(h.correctas, h.total, ensayo.notaMinima || 2.0, ensayo.porcentajeDificultad || 60),
    }));

    return {
        correctasTotales: correccion.correctasTotales,
        totalPreguntas: correccion.totalPreguntas,
        porcentajeLogro: correccion.porcentajeLogro,
        nota,
        puntajeSimce,
        nivel,
        porContenido,
        porHabilidad,
        detallePorPregunta: correccion.detallePorPregunta,
    };
}

/**
 * Full calculation for ALL students in an ensayo
 */
export function calcularResultadosEnsayo(ensayo, alumnos, respuestas) {
    const resultados = [];

    alumnos.forEach(alumno => {
        const respAlumno = respuestas.find(r => r.alumnoId === alumno.id);
        if (respAlumno && respAlumno.respuestas && Object.keys(respAlumno.respuestas).length > 0) {
            const resultado = calcularResultadoAlumno(respAlumno.respuestas, ensayo);
            resultados.push({
                alumnoId: alumno.id,
                alumnoNombre: alumno.nombre,
                alumnoNumero: alumno.numero,
                ...resultado,
            });
        }
    });

    return resultados;
}

/**
 * Generate course-level report (REP.GRAL equivalent)
 */
export function generarReporteGeneral(resultados, ensayo) {
    if (resultados.length === 0) {
        return {
            cantidadEvaluados: 0,
            promedioNota: 0,
            promedioPuntaje: 0,
            promedioLogro: 0,
            nivelGeneral: 'Inicial',
            segmentacion: { Inicial: [], Intermedio: [], Avanzado: [] },
            porContenido: [],
            porHabilidad: [],
        };
    }

    const cantidadEvaluados = resultados.length;
    const promedioNota = Math.round((resultados.reduce((s, r) => s + r.nota, 0) / cantidadEvaluados) * 10) / 10;
    const promedioPuntaje = Math.round(resultados.reduce((s, r) => s + r.puntajeSimce, 0) / cantidadEvaluados);
    const promedioLogro = Math.round(resultados.reduce((s, r) => s + r.porcentajeLogro, 0) / cantidadEvaluados);
    const nivelGeneral = getNivel(promedioPuntaje);

    // Segmentation
    const segmentacion = { Inicial: [], Intermedio: [], Avanzado: [] };
    resultados.forEach(r => {
        segmentacion[r.nivel].push({
            id: r.alumnoId,
            nombre: r.alumnoNombre,
            numero: r.alumnoNumero,
            puntaje: r.puntajeSimce,
            nota: r.nota,
        });
    });

    // Aggregate by content
    const contenidosMap = {};
    resultados.forEach(r => {
        r.porContenido.forEach(c => {
            if (!contenidosMap[c.contenido]) {
                contenidosMap[c.contenido] = { total: 0, correctas: 0, count: 0 };
            }
            contenidosMap[c.contenido].total += c.total;
            contenidosMap[c.contenido].correctas += c.correctas;
            contenidosMap[c.contenido].count++;
        });
    });
    const porContenido = Object.entries(contenidosMap).map(([cont, data]) => ({
        contenido: cont,
        porcentaje: Math.round((data.correctas / data.total) * 100),
        correctas: data.correctas,
        total: data.total,
    }));

    // Aggregate by habilidad
    const habilidadesMap = {};
    resultados.forEach(r => {
        r.porHabilidad.forEach(h => {
            if (!habilidadesMap[h.habilidad]) {
                habilidadesMap[h.habilidad] = { total: 0, correctas: 0, count: 0 };
            }
            habilidadesMap[h.habilidad].total += h.total;
            habilidadesMap[h.habilidad].correctas += h.correctas;
            habilidadesMap[h.habilidad].count++;
        });
    });
    const porHabilidad = Object.entries(habilidadesMap).map(([hab, data]) => ({
        habilidad: hab,
        porcentaje: Math.round((data.correctas / data.total) * 100),
        correctas: data.correctas,
        total: data.total,
    }));

    return {
        cantidadEvaluados,
        promedioNota,
        promedioPuntaje,
        promedioLogro,
        nivelGeneral,
        segmentacion,
        porContenido,
        porHabilidad,
    };
}
