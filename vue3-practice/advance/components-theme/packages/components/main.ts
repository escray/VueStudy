import { createApp } from 'vue'
// import Example from './examples/theme.vue'
import Message from './examples/message.vue'
import Dialog from './examples/dialog.vue'
import Gird from './examples/gird.vue'
import Layout from './examples/layout.vue'

import './src/index.less'

const layout = createApp(Layout)
layout.mount(document.querySelector('#layout') as HTMLDivElement)

// const app = createApp(Message)
// app.mount(document.querySelector('#app') as HTMLDivElement)

// const dialog = createApp(Dialog)
// dialog.mount(document.querySelector('#dialog') as HTMLDivElement)

// const gird = createApp(Gird)
// gird.mount(document.querySelector('#gird') as HTMLDivElement)
