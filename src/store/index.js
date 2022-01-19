/*
 * @Author: 曾海明
 * @Date: 2022-01-07 16:23:35
 * @LastEditors: 曾海明
 * @LastEditTime: 2022-01-10 11:11:28
 * @Description:
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: false, // loading框
    isWxLoading: false, // 微信配置loading框
    isImageLoading: false, // 生成图片loading框
    isGuideShow: false, // 分享弹窗
    isOverlayShow: false, // 遮罩
    isSkeletonShow: false, // loading屏
    isRouterAlive: true // 路由keep-alive
  },
  mutations: {
    setLoadingStatus(state, status) {
      state.isLoading = status;
    },
    setWxLoadingStatus(state, status) {
      state.isWxLoading = status;
    },
    setImageLoadingStatus(state, status) {
      state.isImageLoading = status;
    },
    setOverlayShow(state, status) {
      state.isOverlayShow = status
    },
    setSkeletonShow(state, status) {
      state.isSkeletonShow = status
    },
    setGuideShow(state, status) {
      state.isGuideShow = status
    },
    setRouterAlive(state, status) {
      state.isRouterAlive = status
    }
  }
})
