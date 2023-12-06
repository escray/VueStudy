import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.mount('#app')
})
