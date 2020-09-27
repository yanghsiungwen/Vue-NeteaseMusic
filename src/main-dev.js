import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import '@/until/axios'
// 全局样式
import './assets/global.css'
// 导入图片懒加载
import VueLazyload from 'vue-lazyload'
// 字体图标
import './assets/font/iconfont.css'
// 导入iview
import './utils/ui'
// 导入axios
import { loadingAxios } from './utils/axios'
Vue.prototype.$http = loadingAxios

// import { Spin, Message } from 'iview'

Vue.config.productionTip = false

// 使用图片懒加载中间件
Vue.use(VueLazyload, {
  loading: './assets/img/loading.gif',
  error: './assets/img/dragon.png'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
