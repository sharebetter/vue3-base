/*
 * @Author: 曾海明
 * @Date: 2022-01-21 16:53:44
 * @LastEditors: 曾海明
 * @LastEditTime: 2022-01-21 17:10:59
 * @Description: 批量注册方法
 */
import mitt from "mitt"

const funArr = [mitt]

const commonFun = {
  install: function (app) {
    funArr.forEach(item => {
      app.config.globalProperties[item] = item
    })
  }
}

export default commonFun