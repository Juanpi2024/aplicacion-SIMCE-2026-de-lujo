import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/aplicacion-SIMCE-2026-de-lujo/',
    build: {
        minify: 'esbuild',
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        }
    }
})
