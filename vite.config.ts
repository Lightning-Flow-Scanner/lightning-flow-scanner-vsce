import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./beta-webview', import.meta.url)),
      },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // treat all tags with a dash as custom elements
            isCustomElement: (tag) => tag.includes('-'),
          },
        },
      }),
      vueDevTools(),
      {
        name: 'html-transform',
        apply: 'build',
        transformIndexHtml(html) {
          return html.replace(
            '<script type="module" src="node_modules/@vscode-elements/webview-playground/dist/index.js"></script>',
            ''
          );
        },
      },
    ],
  };
});
