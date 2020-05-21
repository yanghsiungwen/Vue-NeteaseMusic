import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局样式
import './assets/global.css'
// 字体图标
import './assets/font/iconfont.css'
// 导入iview
import { Button, Table, Layout, Header, Sider, Footer, Menu, MenuItem, Icon, Row, Col, Input, MenuGroup } from 'iview'
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
