/*
 * @Author: 曾海明
 * @Date: 2022-01-21 11:26:33
 * @LastEditors: 曾海明
 * @LastEditTime: 2022-01-21 11:26:33
 * @Description:
 */
export default [{
  path: '/Home',
  name: 'home',
  component: () => import( /* webpackChunkName: "home-page" */ '@/views/home-page/index.vue'),
  meta: {
    keepAlive: true,
    title: '肺炎疫情 政策追踪'
  }
}, {
  path: '/',
  redirect: '/Home'
}]