import { createApp } from 'vue'
import App from './App.vue'

import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
import 'virtual:uno.css'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'system',
    },
  },
})
app.mount('#app')
