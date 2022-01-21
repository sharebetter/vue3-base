/*
 * @Author: 曾海明
 * @Date: 2022-01-19 22:07:55
 * @LastEditors: 曾海明
 * @LastEditTime: 2022-01-19 22:18:30
 * @Description:
 */
import { Tab, Tabs } from 'vant'

const plugins = [Tab, Tabs]

const vant = {
  install: function (app) {
    plugins.forEach(item => {
      app.component(item.name, item)
    })
  }
}

export default vant