import { defineConfig } from 'tsup';
import { sveltePreprocess } from 'svelte-preprocess';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';

export default defineConfig({
  entry: ['src/extension.ts', 'webviews/pages/**/*.svelte'], // Include Svelte files
  format: ['cjs'], // CommonJS format
  target: 'node18', // Target Node.js 18
  clean: true, // Clean output directory before building
  minify: true, // Minify output
  sourcemap: true, // Generate source maps
  external: ['vscode'], // Exclude VS Code API from the bundle
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.svelte': 'text', // Treat Svelte files as text
    };
  },
  esbuildPlugins: [
    {
      name: 'svelte-preprocess',
      setup(build) {
        build.onLoad({ filter: /\.svelte$/ }, async (args) => {
          const { preprocess } = await import('svelte/compiler');
          const { code } = await preprocess(
            await fs.promises.readFile(args.path, 'utf8'),
            sveltePreprocess({
              sourceMap: true,
              postcss: {
                plugins: [tailwindcss, autoprefixer],
              },
            }),
            { filename: args.path }
          );
          return { contents: code, loader: 'js' };
        });
      },
    },
  ],
});
