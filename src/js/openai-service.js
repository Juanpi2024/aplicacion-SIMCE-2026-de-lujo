// ============================================
// openai-service.js — OpenAI API Integration
// ============================================
import * as storage from './storage.js';

const OPENAI_API_URL = 'https://api.openai.com/v1';

export async function processDictation(audioBlob, totalPreguntas) {
    const apiKey = storage.getOpenAIApiKey();
    if (!apiKey) {
        throw new Error('API_KEY_MISSING');
    }

    // 1. Transcribe Audio (Whisper)
    const transcribedText = await transcribeAudio(audioBlob, apiKey);
    if (!transcribedText) {
        throw new Error('No se pudo transcribir el audio.');
    }

    // 2. Parse Text to JSON (GPT-4o-mini)
    const jsonResult = await parseDictationToJSON(transcribedText, totalPreguntas, apiKey);
    return jsonResult;
}

async function transcribeAudio(audioBlob, apiKey) {
    const formData = new FormData();
    // OpenAI requiere un nombre de archivo con extensión real
    formData.append('file', audioBlob, 'grabacion.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', 'es');

    const res = await fetch(`${OPENAI_API_URL}/audio/transcriptions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        },
        body: formData
    });

    if (!res.ok) {
        const error = await res.json();
        console.error('Whisper Error:', error);
        throw new Error('Error al conectar con el servicio de voz (Whisper). ' + (error.error?.message || ''));
    }

    const data = await res.json();
    return data.text;
}

async function parseDictationToJSON(text, totalPreguntas, apiKey) {
    const prompt = `Eres un asistente de corrección de exámenes SIMCE.
El docente ha dictado las alternativas marcadas por un estudiante.
La prueba tiene ${totalPreguntas} preguntas en total.

El texto dictado es el siguiente:
"${text}"

Tu tarea es:
1. Extraer la alternativa respondida para cada pregunta mencionada.
2. Las alternativas válidas son: A, B, C, D, E. Si dice "omitió", "blanco", "no respondió" u otra palabra similar, el valor debe ser "" (string vacío).
3. Devuelve los resultados ESTRICTAMENTE como un arreglo JSON donde cada objeto tenga 'p' (número de pregunta) y 'r' (respuesta).
Ejemplo de salida:
[{"p": 1, "r": "A"}, {"p": 2, "r": "C"}, {"p": 3, "r": ""}]

ATENCIÓN:
- Devuelve SOLO el JSON válido, sin delimitadores de markdown (como \`\`\`json) ni texto adicional antes o después.
- Infiere contextualmente. Si dice "uno a, dos b, la tres la saltó, cuatro perro", significa p:1 r:A, p:2 r:B, p:3 r:"", p:4 r:D.
`;

    const res = await fetch(`${OPENAI_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.1
        })
    });

    if (!res.ok) {
        const error = await res.json();
        console.error('ChatGPT Error:', error);
        throw new Error('Error al procesar el texto con ChatGPT. ' + (error.error?.message || ''));
    }

    const data = await res.json();
    let resultText = data.choices[0].message.content.trim();

    // Clean potential markdown formatting just in case
    if (resultText.startsWith('```json')) resultText = resultText.replace(/^```json/, '');
    if (resultText.startsWith('```')) resultText = resultText.replace(/^```/, '');
    if (resultText.endsWith('```')) resultText = resultText.replace(/```$/, '');

    try {
        return JSON.parse(resultText.trim());
    } catch (e) {
        console.error('JSON Parse Error:', e, resultText);
        throw new Error('La IA no devolvió un formato válido.');
    }
}

// ---- VISION AI (Generador de Pautas) ----
export async function generarPautaDesdeImagenes(imagenesBase64, totalPreguntas) {
    const apiKey = storage.getOpenAIApiKey();
    if (!apiKey) {
        throw new Error('API_KEY_MISSING');
    }

    const promptText = `Eres un experto creador de pruebas SIMCE para el currículo educativo de Chile. A continuación te entrego imágenes de un ensayo de ${totalPreguntas} preguntas.
Tu tarea es resolver la prueba completa leyendo cuidadosamente los textos y alternativas presentadas en las imágenes. Para cada pregunta de 1 hasta ${totalPreguntas}, debes deducir contextualmente:
- 'respuestaCorrecta': La alternativa correcta (A, B, C, D o E).
- 'habilidad': (Ej. "Extraer información", "Reflexionar", "Interpretar y relacionar", "Conocimiento matemático", etc.)
- 'contenido': (El tema específico: Ej. "Comprensión lectora", "Geometría", "Álgebra", etc.)

Devuelve ESTRICTAMENTE un arreglo JSON donde cada objeto tenga 'p' (número de pregunta), 'respuestaCorrecta', 'habilidad' y 'contenido'.
IMPORTANTE: Asegúrate de llegar hasta la pregunta ${totalPreguntas}.
Ejemplo de salida: 
[{"p": 1, "respuestaCorrecta": "A", "habilidad": "Localizar", "contenido": "Comprensión lectora"}]
SIN DELIMITADORES MARKDOWN COMO \`\`\`json.`;

    const contentArray = [{ type: 'text', text: promptText }];

    // Adjuntar cada página/imagen al mensaje. Limitado para no sobrepasar contexto si son excesivas
    imagenesBase64.forEach(base64Str => {
        contentArray.push({
            type: 'image_url',
            image_url: { url: base64Str, detail: "high" }
        });
    });

    const body = {
        model: 'gpt-4o-mini', // gpt-4o-mini supports vision inputs efficiently
        messages: [{ role: 'user', content: contentArray }],
        temperature: 0.2,
        max_tokens: 4000
    };

    const res = await fetch(`${OPENAI_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const error = await res.json();
        console.error('ChatGPT Vision Error:', error);
        throw new Error('Error al procesar el documento con IA. ' + (error.error?.message || ''));
    }

    const data = await res.json();
    let resultText = data.choices[0].message.content.trim();

    // Clean markdown
    if (resultText.startsWith('```json')) resultText = resultText.replace(/^```json/, '');
    if (resultText.startsWith('```')) resultText = resultText.replace(/^```/, '');
    if (resultText.endsWith('```')) resultText = resultText.replace(/```$/, '');

    try {
        return JSON.parse(resultText.trim());
    } catch (e) {
        console.error('Vision JSON Parse Error:', e, resultText);
        throw new Error('La IA no pudo formatear correctamente la pauta devuelta.');
    }
}
