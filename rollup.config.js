import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import path from "path";
import fs from "fs";
import json from "@rollup/plugin-json";

const production = !process.env.ROLLUP_WATCH;

export default fs
    .readdirSync(path.join(__dirname, "webviews", "pages"))
    .map((input) => {
        const name = input.split(".")[0];
        return {
            input: "webviews/pages/" + input,
            output: {
                sourcemap: !production,
                format: "iife",
                name: "app",
                file: "out/compiled/" + name + ".js",
            },
            onwarn: function (message) {
                if (message.code !== 'EVAL'){
                    throw new Error(message);
                }
                if (message.filepath?.includes('EVAL')){
                    throw new Error(message);
                }
            },
            plugins: [
                svelte({
                    dev: !production,
                    // we'll extract any component CSS out into
                    // a separate file - better for performance
                    css: (css) => {
                        css.write(name + ".css");
                    },
                    preprocess: sveltePreprocess({ sourceMap: !production })
                }),
                json(),
                resolve({
                    browser: true,
                    dedupe: ["svelte"],
                    preferBuiltins: false,
                }),
                // https://github.com/rollup/plugins/tree/master/packages/commonjs
                commonjs(),
                typescript({
                    tsconfig: "webviews/tsconfig.json",
                    sourceMap: !production,
                    inlineSources: !production,
                }),

                // In dev mode, call `npm run start` once
                // the bundle has been generated
                // !production && serve(),

                // Watch the `public` directory and refresh the
                // browser on changes when not in production
                // !production && livereload("public"),

                // If we're building for production (npm run build
                // instead of npm run dev), minify
                production && terser(),
            ],
            watch: {
                clearScreen: false,
            },
        };
    });
