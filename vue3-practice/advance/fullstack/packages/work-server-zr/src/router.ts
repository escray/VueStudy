import Router from '@koa/router'
import { renderPage } from './controller/page'
import {
  signIn,
  signUp,
  signOut,
  getOnlineUser,
  checkAccountOnlineStatus
} from './controller/user'

import { getData } from './controller/api'

const router = new Router()
router.get('/page/:pageName', checkAccountOnlineStatus, renderPage)
router.get('/page/:pageName/:subPageName', checkAccountOnlineStatus, renderPage)
router.post('/api/post/account/sign-in', signIn)
router.post('/api/post/account/sign-up', signUp)
router.get('/api/get/account/sign-out', signOut)
router.get('/api/get/account/online', getOnlineUser)

router.get('/api/getData', getData)

const routers = router.routes()

export default routers
