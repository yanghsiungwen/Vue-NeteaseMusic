import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../components/Home.vue'
// import Discovery from '../components/discovery/Discovery.vue'
// import Play from '../components/play/Play.vue'
// import MusicList from '../components/musicList/MusicList.vue'
// 懒加载路由
const Home = () => import(/* webpackChunkName:"home" */ '../views/pc/Home.vue')
const Discovery = () => import(/* webpackChunkName:"home" */ '../views/pc/pcView/Discovery.vue')
const MusicList = () => import(/* webpackChunkName:"home" */ '../views/pc/pcView/MusicList.vue')
const Search = () => import(/* webpackChunkName:"home" */ '../views/pc/pcView/Search.vue')
// 移动端
const HomeMobile = () => import(/* webpackChunkName:"homeMoblie" */ '../views/mobile/HomeMobile.vue')
const MobileDiscovery = () => import(/* webpackChunkName:"discoveryMoblie" */ '../views/mobile/mobileView/Discovery.vue')
const MobileUser = () => import(/* webpackChunkName:"homeMoblie" */ '../views/mobile/mobileView/User.vue')
const MobileCommunity = () => import(/* webpackChunkName:"communityMoblie" */ '../views/mobile/mobileView/Community.vue')
const MobileMv = () => import(/* webpackChunkName:"mvMoblie" */ '../views/mobile/mobileView/Mv.vue')
const MobileList = () => import(/* webpackChunkName:"listMoblie" */ '../views/mobile/mobileView/MobileList.vue')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', redirect: '/discovery' },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/discovery', component: Discovery },
      { path: '/list/:id', component: MusicList },
      { path: '/search', component: Search }
    ]
  },
  {
    path: '/m',
    component: HomeMobile,
    redirect: '/m/user',
    children: [
      { path: '/m/discovery', component: MobileDiscovery },
      { path: '/m/user', component: MobileUser },
      { path: '/m/community', component: MobileCommunity },
      { path: '/m/mv', component: MobileMv },
      { path: '/m/list/:id', component: MobileList }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  // 路由跳转后返回顶部
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})

export default router
