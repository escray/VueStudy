import { App } from 'vue'
import ElContainer from './Container.vue'
import ElHeader from './header.vue'
import ElFooter from './footer.vue'
import ElAside from './aside.vue'
import ElMain from './main.vue'

export default {
  install(app: App) {
    app.component(ElContainer.name, ElContainer)
    app.component(ElHeader.name, ElHeader)
    app.component(ElFooter.name, ElFooter)
    app.component(ElAside.name, ElAside)
    app.component(ElMain.name, ElMain)
  }
}
