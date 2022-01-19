/*
 * @Author: 曾海明
 * @Date: 2022-01-07 16:23:35
 * @LastEditors: 曾海明
 * @LastEditTime: 2022-01-10 10:41:06
 * @Description:
 */
import { createRouter, createWebHashHistory } from 'vue-router'

// 自动导入路由
let routes = []
const routeContext = require.context('./', true, /index\.js$/)
routeContext.keys().forEach(route => {
  // 如果是根目录的 index.js 不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routeContext(route)
  routes = [...routes, ...(routerModule.default || routerModule)]
})

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
