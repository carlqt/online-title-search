/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: ['**/*.test.tsx'],
    globals: true
  },
  plugins: [react()],
})
