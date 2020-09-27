import Vue from 'vue'
// 导入iview
import { Button, Table, Layout, Header, Sider, Footer, Menu, MenuItem, Icon, Row, Col, Input, MenuGroup, Modal, Form, FormItem, Message, Poptip, Avatar, Scroll, Carousel, CarouselItem, Card, Slider, Drawer, Tooltip, Tag, Page, Checkbox, Spin, Notice } from 'iview'
import 'iview/dist/styles/iview.css'

// 使用组件iview
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
Vue.component('Checkbox', Checkbox)
Vue.component('Spin', Spin)
// 注册为组件的方法
Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notice
