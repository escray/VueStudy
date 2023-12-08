import { createServer } from 'vite'
import { resolvePackagePath } from './util'
import pluginVue from '@vitejs/plugin-vue'
import pluginVueJsx from '@vitejs/plugin-vue-jsx'
;(async () => {
  const server = await createServer({
    configFile: false,
    root: resolvePackagePath('components'),
    plugins: [pluginVue(), pluginVueJsx()],
    server: {
      port: 8080
    }
  })
  await server.listen()

  server.printUrls()
})()
