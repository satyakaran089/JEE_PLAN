import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repository at /JEE_PLAN/, not at the domain root.
  base: '/JEE_PLAN/',
  plugins: [react()],
})
