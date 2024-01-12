/* eslint-disable no-console */
import Koa from 'koa'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './vue-ssr-app'

// 初始化 Koa.js 应用
const server = new Koa()

server.use(async (ctx) => {
  // 封装 Koa.js 中间件
  // 渲染 Vue.js 组件或应用的HTML内容
  const app = createSSRApp(App, {})
  const html = await renderToString(app)
  ctx.body = html
})

server.listen(6001, () => {
  console.log('SSR Service is Ready, visit http://127.0.0.1:6001')
})
