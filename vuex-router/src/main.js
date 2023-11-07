import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

const app = createApp(App)

app.use(router).use(store).mount('#app')

window.onerror = function (e) {
  console.log(['https://stackoverflow.com/search?q=[js]+'+e])
}
