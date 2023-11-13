import { createApp } from 'vue'
import './style.css'
import app from './App.vue'

// // 注册一个全局自定义指令 `v-focus`
// app.directives('focus', {
//   // 当被绑定的元素挂载到 DOM 中时……
//   mounted(el) {
//     // 聚焦元素
//     el.focus()
//   }
// })
createApp(app).mount('#app')
