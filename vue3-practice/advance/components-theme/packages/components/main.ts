import { createApp } from 'vue'
// import Example from './examples/theme.vue'
// import Message from './examples/message.vue'
// import Dialog from './examples/dialog.vue'
// import Gird from './examples/gird.vue'
// import Layout from './examples/layout.vue'
// import uncontrolled from './examples/form_uncontrolled.vue'
// import controlled from './examples/form_controlled.vue'
import form from './examples/form.vue'

import './src/index.less'

// const layout = createApp(Layout)
// layout.mount(document.querySelector('#layout') as HTMLDivElement)

const app = createApp(form)
app.mount(document.querySelector('#app') as HTMLDivElement)

// const dialog = createApp(Dialog)
// dialog.mount(document.querySelector('#dialog') as HTMLDivElement)

// const gird = createApp(Gird)
// gird.mount(document.querySelector('#gird') as HTMLDivElement)
