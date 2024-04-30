import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";

export default {
  input: 'src/index.ts',
  output: {
    sourcemap: false,
    file: 'dist/flow-launcher-docs-web-components.js',
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
      preprocess: sveltePreprocess({typescript: true}),
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"]
    }),
    typescript(),
  ],
  watch: {
    clearScreen: false,
  },
};
