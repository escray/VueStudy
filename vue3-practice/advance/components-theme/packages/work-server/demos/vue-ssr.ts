/* eslint-disable no-console */
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

import App from './vue-ssr-app'

async function getAppSSRHTML() {
  const app = createSSRApp(App, {})
  const html = await renderToString(app)
  return html
}

async function main() {
  const html = await getAppSSRHTML()
  console.log(`finally HTML is: ${html}`)
}

main()
