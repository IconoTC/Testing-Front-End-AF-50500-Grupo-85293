/// <reference types="vitest/config" />
import { defineConfig } from 'vite'


// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    // opcionalmente
    include: ['**/*.test.ts'],
    // opcionalmente, para configurar la cobertura
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/**/types/*.ts'],
    },
  },
})
