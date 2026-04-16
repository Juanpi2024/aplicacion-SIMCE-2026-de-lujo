import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    build: {
        minify: 'esbuild',
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('chart.js')) return 'vendor-charts';
                        if (id.includes('xlsx')) return 'vendor-excel';
                        return 'vendor';
                    }
                }
            }
        }
    }
})
