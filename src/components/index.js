/*
 * @Author: 曾海明
 * @Date: 2019-08-23 14:09:38
 * @LastEditors: 曾海明
 * @LastEditTime: 2021-07-12 15:37:06
 * @Description:
 */
import Vue from 'vue'

// 自动加载 global 目录下的 .js 结尾的文件
const componentsContext = require.context('./global', true, /index\.(vue|js)$/)
componentsContext.keys().forEach(component => {
    const componentConfig = componentsContext(component)
    /**
    * 兼容 import export 和 require module.export 两种规范
    */
    const ctrl = componentConfig.default || componentConfig
    Vue.component(ctrl.name, ctrl)
});
