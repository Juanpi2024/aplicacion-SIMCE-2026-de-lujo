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
