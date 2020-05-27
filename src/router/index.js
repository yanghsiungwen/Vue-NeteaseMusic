import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Discovery from '../components/discovery/Discovery.vue'
// import Play from '../components/play/Play.vue'
import MusicList from '../components/musicList/MusicList.vue'

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
      { path: '/list', component: MusicList }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
