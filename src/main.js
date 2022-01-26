/*
 * @Author: 曾海明
 * @Date: 2022-01-07 16:23:35
 * @LastEditors: 曾海明
 * @LastEditTime: 2022-01-21 17:01:24
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from '@/plugins/vant'
import commonFun from '@/plugins/commonFun'

const app = createApp(App)

// 全局过滤器
app.config.globalProperties.$filters = {}

// 单独文件，按需引入vant组建
app.use(vant)
   // 绑定公用方法
   .use(commonFun)
   .use(store).use(router).mount('#app')

