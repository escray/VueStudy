import { createApp } from 'vue'
// import Example from './examples/theme.vue'
import Message from './examples/message.vue'

import './src/index.less'

const app = createApp(Message)

app.mount(document.querySelector('#app') as HTMLDivElement)
