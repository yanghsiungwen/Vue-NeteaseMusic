import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Discovery from '../components/discovery/Discovery.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/discovery' },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/discovery', component: Discovery }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
