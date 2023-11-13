// import {createRouter, createWebHashHistory} from 'vue-router'
import { createRouter, createWebHashHistory } from './grouter/index'

import Home from '../pages/home.vue'
import Counter from '../pages/counter.vue'
import About from '../pages/about.vue'
import TodoList from '../pages/todolist.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/counter',
    name: 'Counter',
    component: Counter
  },
  {
    path: '/todolist',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/about',
    name: "About",
    component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  let token = getToken()
  const { fullPath } = to
  if (fullPath === '/login') {
    next()
  }
  if (!token) {
    next('/login')
  }

  next()
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

// addRoutes({ commit }, accessRoutes) {
//   const removeRoutes = []
//   accessRoutes.foreach(route => {
//     const removeRoute = router.addRoute(route)
//     removeRoutes.push(removeRoute)
//   })
//   commit('SET_REMOVE+ROUTES', removeRoutes)
// }

export default router
