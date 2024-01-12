import path from 'node:path'
import Koa from 'koa'
import koaStatic from 'koa-static'
import koaMount from 'koa-mount'
import routers from './router'
import { getServerDir } from './util/file'

const app = new Koa()

const publicDirPath = path.join(getServerDir(), 'public')
app.use(koaMount('/public', koaStatic(publicDirPath)))
app.use(routers)

const port = 8001

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Service ready: http://127.0.0.1:' + port)

})
