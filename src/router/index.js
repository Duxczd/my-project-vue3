import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置路由
const routes = [
  { path: '/', name: 'Home', component: () => import('@/viwes/Home/Home.vue') }
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