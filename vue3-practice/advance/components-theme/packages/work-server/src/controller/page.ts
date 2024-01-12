import type { Context, Next } from 'koa'
import { getPageHTML } from '../util/file.ts'

export const renderPage = async (ctx: Context, next: Next) => {
  ctx.body = getPageHTML(ctx.params.pageName)
  await next()
}
