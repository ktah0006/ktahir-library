import './assets/main.css'
// import './style.css' - could replace its contents irl, but for now comment out for simplicity
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import store from './store/store'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(store)
app.use(router)

// createApp(App).mount('#app')
app.mount('#app')
