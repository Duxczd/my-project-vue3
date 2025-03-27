import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 使用 Vite 的动态导入方式
const modules = import.meta.glob('./module/*.js', { eager: true })
const pages = []
Object.values(modules).forEach(module => {
  pages.push(...(module.default || []))
})

// 配置路由
const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home/Home.vue') },
  { path: '/Login', name: 'Login', component: () => import('@/views/Login/Login.vue') },
  {
    path: '/LayoutView',
    name: 'LayoutView',
    component: () => import('@/views/LayoutView/LayoutView.vue'),
    children: pages
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (_to, _from, next) => {
  NProgress.start()
  next()
})

router.afterEach((_to) => {
  NProgress.done()
})

export default router