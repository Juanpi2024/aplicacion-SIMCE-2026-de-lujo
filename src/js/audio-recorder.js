// ============================================
// audio-recorder.js — Manejo del Micrófono
// ============================================

let mediaRecorder = null;
let audioChunks = [];

export async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Usar formato webm que funciona nativamente en Chrome/Firefox y la API de Whisper lo soporta
        const options = { mimeType: 'audio/webm' };

        mediaRecorder = new MediaRecorder(stream, options);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.start();
        return true;
    } catch (err) {
        console.error('Error accediendo al micrófono:', err);
        return false;
    }
}

export function stopRecording() {
    return new Promise((resolve) => {
        if (!mediaRecorder || mediaRecorder.state === 'inactive') {
            resolve(null);
            return;
        }

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            // Detener todas las pistas (Tracks) para liberar el ícono rojo del navegador
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
            resolve(audioBlob);
        };

        mediaRecorder.stop();
    });
}
