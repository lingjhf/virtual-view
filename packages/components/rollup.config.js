import babel from '@rollup/plugin-babel'
import { defineConfig } from 'rollup'

import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'

export default defineConfig([
  {
    plugins: [
      babel({ babelHelpers: 'bundled', extensions: ['.js', '.cjs', '.tsx'] }),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
    input: 'src/index.tsx',
    external: ['solid-js', 'solid-js/web', 'solid-element'],
    output: {
      dir: 'dist',
      format: 'esm',
      exports: 'named',
      preserveModules: true,
    },
  },
  // {
  //   input: 'src/types.d.ts',
  //   output: [{
  //     file: 'dist/types.d.ts',
  //     format: 'esm',
  //   }],
  //   plugins: [dts()],
  // },
])
