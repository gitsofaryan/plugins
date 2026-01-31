const { defineConfig } = require('vite');
const inject = require('@rollup/plugin-inject');

module.exports = defineConfig({
  resolve: {
    alias: {
      process: 'unenv/node/process',
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        inject({
          process: 'unenv/node/process',
        }),
      ],
    },
  },
  define: {
    'process.env': {},
  },
});
