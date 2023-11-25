import { createRenderer } from '@vue/runtime-core'
const { createApp: originCa } = createRenderer({

})

function createApp(...args) {
  const app = originCa(...args)
  return {
    mount(selector) {
      const canvas = document.createElement('canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      document.querySelector(selector).appendChild(canvas)
      ctx = canvas.getContext('2d')
      app.mount(canvas)
    }
  }
}
