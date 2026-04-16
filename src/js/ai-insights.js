// ============================================
// ai-insights.js — Motor de Análisis Pedagógico con IA
// ============================================
import * as storage from './storage.js';

const OPENAI_API_URL = 'https://api.openai.com/v1';

/**
 * Genera un Plan de Acción Pedagógico basado en los resultados de un curso.
 * @param {Object} reporteGeneral - Salida de generarReporteGeneral
 * @param {Object} ensayo - Datos del ensayo (asignatura, número, etc.)
 * @returns {Promise<string>} - Texto formateado con las sugerencias de la IA
 */
export async function generarAnalisisPedagogico(reporteGeneral, ensayo) {
    const apiKey = storage.getOpenAIApiKey();
    if (!apiKey) {
        throw new Error('API_KEY_MISSING');
    }

    const {
        promedioNota,
        promedioPuntaje,
        promedioLogro,
        nivelGeneral,
        porContenido,
        porHabilidad,
        segmentacion
    } = reporteGeneral;

    // Preparar datos resumidos para el prompt
    const contenidosStr = porContenido.map(c => `- ${c.contenido}: ${c.porcentaje}% logro`).join('\n');
    const habilidadesStr = porHabilidad.map(h => `- ${h.habilidad}: ${h.porcentaje}% logro`).join('\n');
    const alumnosCriticos = segmentacion.Inicial.map(a => a.nombre).slice(0, 5).join(', ');

    const prompt = `
Eres un Asesor Pedagógico experto en el currículo chileno y evaluación SIMCE.
Analiza los siguientes resultados de un curso en un ensayo de ${ensayo.asignatura}:

DATOS GENERALES:
- Promedio de Nota: ${promedioNota}
- Promedio Puntaje SIMCE: ${promedioPuntaje}
- Nivel General: ${nivelGeneral}
- Porcentaje de Logro: ${promedioLogro}%

LOGRO POR CONTENIDO:
${contenidosStr}

LOGRO POR HABILIDAD:
${habilidadesStr}

ALUMNOS EN NIVEL INICIAL (REQUIEREN APOYO): ${alumnosCriticos} ${segmentacion.Inicial.length > 5 ? `y ${segmentacion.Inicial.length - 5} más` : ''}

TAREA:
Genera un Plan de Acción Pedagógico breve y directo (máximo 400 palabras) para el docente.
Usa el siguiente esquema con formato Markdown elegante:
1. **🔍 Diagnóstico**: Resumen rápido de la situación.
2. **🎯 Focos de Instrucción**: ¿En qué temas o habilidades exactas debe centrarse la próxima clase?
3. **🛠️ Acciones Sugeridas**: 3 estrategias prácticas para mejorar los resultados.
4. **💡 Sugerencia para Alumnos Críticos**: Cómo apoyar a los estudiantes en nivel Inicial.

Responde con un tono profesional, alentador y basado en datos. Usa párrafos cortos y bullet points.
`;

    try {
        const res = await fetch(`${OPENAI_API_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.4
            })
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error?.message || 'Error al conectar con OpenAI');
        }

        const data = await res.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('AI Insights Error:', error);
        throw error;
    }
}
