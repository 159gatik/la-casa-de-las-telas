import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 👈 Importamos el nuevo plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 Lo agregamos aquí
  ],
})