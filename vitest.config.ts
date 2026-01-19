import {defineConfig} from 'vitest/config'
import {resolve} from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup/setup.ts'],
    env: {
      NODE_ENV: 'test',
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
})