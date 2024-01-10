import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import { createApp } from 'vue'
import App from './app.vue'

// 1 hash router
// 不同路由的页面视图
import HomeView from './views/home.vue'
import ListView from './views/list.vue'
import AboutView from './views/about.vue'
import DetailView from './views/detail.vue'
import DetailItemView from './views/detail-item.vue'

// // define route
// // 定义路由
// const router = createRouter({
//   linkActiveClass: 'active',
//   // hash 路由配置
//   // history: createWebHashHistory('/'),
//   // history 路由配置
//   history: createWebHistory('/'),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/list',
//       name: 'list',
//       component: ListView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       component: AboutView
//     },
//     // 动态路由
//     {
//       path: '/detail/:id',
//       component: DetailView,
//       // 嵌套路由
//       children: [{ path: '', component: DetailItemView }]
//     }
//   ]
// })

// 利用 ES Module 的动态 import 模块的能力，通过 import 来动态加载模块
const router = createRouter({
  linkActiveClass: 'active',
  // history 路由配置
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/list.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/about.vue')
    },
    {
      path: '/detail/:id',
      component: () => import('./views/detail.vue'),
      children: [
        { path: '', component: () => import('./views/detail-item.vue')}
      ]
    }
  ]
})

const app = createApp(App)
app.use(router)

app.mount('#app')
