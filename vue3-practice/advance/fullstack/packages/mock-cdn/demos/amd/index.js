const layout = {
  materials: [
    {
      name: 'counter-increase'
    },
    {
      name: 'counter-decrease'
    }
  ]
}

// RequireJS 通过解析依赖，来异步加载所有的依赖的 AMD 模块，
// 等待依赖加载完后，就执行模块主体代码。
window.requirejs.config({
  baseUrl: '/demos/amd/material/',
  paths: {}
})

window.defined('vue', [], function () {
  return window.Vue
})

function runtime() {
  window.require(
    ['vue', 'require', ...layout.materials.map((m) => m.name)],
    function (Vue, require) {
      const { createApp, h } = Vue
      const children = []
      for (const m of layout.materials) {
        const Module = require(m.name)
        children.push(h(Module?.default || Module))
      }
      const App = h('div', {}, children)
      const app = createApp({
        render() {
          return h(App, {})
        }
      })
      app.mount('#app')
    }
  )
}

runtime()
