import {
  createRouter,
  createWebHashHistory
} from "vue-router"

import Home from '../pages/home.vue'
import About from '../pages/about.vue'
import Rate from '../pages/rate.vue'
import TodoList from '../pages/todolist.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/rate',
    name: 'Rate',
    component: Rate
  },
  {
    path: '/todolist',
    name: 'TodoList',
    component: TodoList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
