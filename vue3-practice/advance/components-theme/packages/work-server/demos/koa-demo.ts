/* eslint-disable no-console */
import Koa from 'koa'
import type { Context, Next } from 'koa'

const app = new Koa()

// 洋葱模型的效果
// 每个异步函数，都是一个中间件，执行时候“先进后出”
// 其实，每个中间件，都等于一个 Promise。
app.use(async (ctx: Context, next: Next) => {
  console.log(`[${ctx.path}] Print 001`)
  await next()
  console.log(`[${ctx.path}] Print 004`)
})

app.use(async (ctx: Context, next: Next) => {
  console.log(`[${ctx.path}] Before Process HTTP Response`)
  ctx.body = `<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <h1>当前页面链接: ${ctx.path}</h1>
  </body>
  </html>`
  await next()
  console.log(`[${ctx.path}] After Process HTTP Response`)
})

app.use(async (ctx: Context, next: Next) => {
  console.log(`[${ctx.path}] Print 002`)
  await next()
  console.log(`[${ctx.path}] Print 003`)
})

app.listen(6001, () => {
  console.log('Koa.js Service is Ready, visit http://127.0.0.1:6001')
})
