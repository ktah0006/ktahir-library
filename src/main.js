import './assets/main.css'
// import './style.css' - could replace its contents irl, but for now comment out for simplicity
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import store from './store/store'
import './firebase'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(store)
app.use(router)

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// }

// // Initialize Firebase
// initializeApp(firebaseConfig)

// createApp(App).mount('#app')
app.mount('#app')
