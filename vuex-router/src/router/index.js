// import {createRouter, createWebHashHistory} from 'vue-router'
import { createRouter, createWebHashHistory } from './grouter/index'

import Home from '../pages/home.vue'
import Counter from '../pages/counter.vue'
import About from '../pages/about.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/counter',
    name: 'Counter',
    component: Counter
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

export default router
