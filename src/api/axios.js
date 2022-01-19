/*
 * @Author: 曾海明
 * @Date: 2019-08-23 14:09:38
 * @LastEditors: 曾海明
 * @LastEditTime: 2022-01-17 19:40:25
 * @Description:
 */
import axios from 'axios'
import store from '../store'
import local from '@utils/localUtil.js'
import Router from "../router"
/* eslint-disable */
// 是否允许携带cookie
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000 // request timeout
})
service.defaults.withCredentials = true
service.defaults.timeout = 30000,
  // 添加一个请求拦截器
  service.interceptors.request.use((config) => {
    if (config.data) {
      store.commit('setLoadingStatus', !(config.data['isLoading'] === 'unloading' || false))
    }
    config.headers['Accept'] = 'application/json'
    config.headers['Content-Type'] = 'application/json'
    // const userInfo = local.getItem("userInfo")
    // if (userInfo && userInfo.token) {
    //   const key = 'ashin8886826$aksiy^^key2019'
    //   const Timestamp = new Date().getTime()
    //   let sign = md5(`${Timestamp}${userInfo.token}${key}`)
    //   config.headers['timestamp'] = Timestamp
    //   config.headers['token'] = userInfo.token
    //   config.headers['sign'] = sign
    // } else if(userInfo && userInfo.medToken) {
    //   config.headers['medToken'] = userInfo.medToken
    // }
    return config
  }, (error) => {
    store.commit('setLoadingStatus', false)
    return Promise.reject(error);
  });


// 添加一个响应拦截器
service.interceptors.response.use((response) => {
  store.commit('setLoadingStatus', false)
  if(response.data.code === 10003 || response.data.code === 10008) {

  }
  return response.data
}, (error) => {
  store.commit('setLoadingStatus', false)
  return Promise.reject(error);
});

export default service
