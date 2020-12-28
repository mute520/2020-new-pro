import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/view/Home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/home', 
      component: Home
    },
    {
      name: 'play',
      path: '/play:product',
      component: () => import('@/view/Play')
    },
    {
      name: 'directive',
      path: '/directive',
      component: () => import('@/view/Directive')
    },
    {
      name: 'lazyLoad',
      path: '/lazyLoad',
      component: () => import('@/view/LazyLoad')
    },
    {
      name: 'redirect',
      path: '*',
      redirect: '/home'
    }
  ]
})



export default router
