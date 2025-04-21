
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Entry point of your library
      entry: 'index.js',
      // Global variable name for UMD build
      name: 'shuffleEs6',
      // Output file naming pattern
      fileName: (format) => `shuffle-es6.${format}.js`
    },
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: [],
      output: {
        // Provide global variables for external deps in UMD build
        globals: {}
      }
    }
  },
  // Vitest test configuration
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.js']
  }
})