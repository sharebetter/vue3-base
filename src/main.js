/*
 * @Author: 曾海明
 * @Date: 2022-01-07 16:23:35
 * @LastEditors: 曾海明
 * @LastEditTime: 2022-01-21 11:30:01
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from "mitt"
import vant from '@/plugins/vant'

const app = createApp(App)
// 单独文件，按需引入vant组建
app.use(vant)
// 绑定mitt
app.config.globalProperties.$mybus = mitt()

app.use(store).use(router).mount('#app')

