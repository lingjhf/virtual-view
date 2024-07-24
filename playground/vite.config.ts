import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import { alias } from '../alias'

import solidPlugin from 'vite-plugin-solid'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: tag => tag.includes('-'),
        },
      },
    }),
    solidPlugin(),
    vueDevTools(),
    UnoCSS(),
    Components({
      resolvers: [
        PrimeVueResolver(),
      ],
    }),
  ],

  resolve: {
    alias,
  },
})
