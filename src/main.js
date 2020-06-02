import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局样式
import './assets/global.css'
// 导入axios
import axios from 'axios'
// 字体图标
import './assets/font/iconfont.css'
// 导入iview
import { Button, Table, Layout, Header, Sider, Footer, Menu, MenuItem, Icon, Row, Col, Input, MenuGroup, Modal, Form, FormItem, Message, Poptip, Avatar, Scroll, Carousel, CarouselItem, Card, Slider, Drawer, Tooltip, Tag, Page } from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

// 使用中间件iview
Vue.component('Button', Button)
Vue.component('Table', Table)
Vue.component('Layout', Layout)
Vue.component('Header', Header)
Vue.component('Sider', Sider)
Vue.component('Footer', Footer)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Icon', Icon)
Vue.component('Row', Row)
Vue.component('i-col', Col)
Vue.component('Input', Input)
Vue.component('MenuGroup', MenuGroup)
Vue.component('Modal', Modal)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Poptip', Poptip)
Vue.component('Avatar', Avatar)
Vue.component('Scroll', Scroll)
Vue.component('Carousel', Carousel)
Vue.component('CarouselItem', CarouselItem)
Vue.component('Card', Card)
Vue.component('Slider', Slider)
Vue.component('Drawer', Drawer)
Vue.component('Tooltip', Tooltip)
Vue.component('Tag', Tag)
Vue.component('Page', Page)

// 注册为组件的方法
Vue.prototype.$message = Message

// 配置根url
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// 挂载到原型对象上,每个组件都可以使用$http来发起ajax请求
Vue.prototype.$http = axios

// 设置拦截器，判断token是否有权限
axios.interceptors.request.use(config => {
  // config.headers.Authorization = window.sessionStorage.getItem('token')
  // console.log(config)
  config.withCredentials = true
  return config
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
