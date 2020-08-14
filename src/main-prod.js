import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局样式
import './assets/global.css'
// 导入图片懒加载
import VueLazyload from 'vue-lazyload'
// 导入axios
import axios from 'axios'
// 字体图标
import './assets/font/iconfont.css'
// // 导入iview
import { Spin } from 'iview'
// import { Button, Table, Layout, Header, Sider, Footer, Menu, MenuItem, Icon, Row, Col, Input, MenuGroup, Modal, Form, FormItem, Message, Poptip, Avatar, Scroll, Carousel, CarouselItem, Card, Slider, Drawer, Tooltip, Tag, Page } from 'iview'
// import 'iview/dist/styles/iview.css'

// 导入进度条插件
// import NProgress from 'nprogress'

Vue.config.productionTip = false

// 配置根url
axios.defaults.baseURL = 'http://49.235.22.67:3000/'
// 挂载到原型对象上,每个组件都可以使用$http来发起ajax请求
Vue.prototype.$http = axios

// 设置拦截器，判断token是否有权限
axios.interceptors.request.use(config => {
  config.withCredentials = true
  // 进入请求拦截器，表示发送请求，开启进度条
  // NProgress.start()
  // 加载中遮罩层显示
  Spin.show()
  return config
})

// 设置响应拦截器，隐藏进度条
axios.interceptors.response.use(config => {
  // NProgress.done()
  // 加载中遮罩层隐藏
  window.setTimeout(() => { Spin.hide() }, 500)
  return config
})

// 使用图片懒加载中间件
Vue.use(VueLazyload, {
  loading: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  error: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
})

// 使用中间件iview
// Vue.component('Button', Button)
// Vue.component('Table', Table)
// Vue.component('Layout', Layout)
// Vue.component('Header', Header)
// Vue.component('Sider', Sider)
// Vue.component('Footer', Footer)
// Vue.component('Menu', Menu)
// Vue.component('MenuItem', MenuItem)
// Vue.component('Icon', Icon)
// Vue.component('Row', Row)
// Vue.component('i-col', Col)
// Vue.component('Input', Input)
// Vue.component('MenuGroup', MenuGroup)
// Vue.component('Modal', Modal)
// Vue.component('Form', Form)
// Vue.component('FormItem', FormItem)
// Vue.component('Poptip', Poptip)
// Vue.component('Avatar', Avatar)
// Vue.component('Scroll', Scroll)
// Vue.component('Carousel', Carousel)
// Vue.component('CarouselItem', CarouselItem)
// Vue.component('Card', Card)
// Vue.component('Slider', Slider)
// Vue.component('Drawer', Drawer)
// Vue.component('Tooltip', Tooltip)
// Vue.component('Tag', Tag)
// Vue.component('Page', Page)
// 注册为组件的方法
// Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
