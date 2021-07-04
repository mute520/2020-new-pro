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
      path: '/play:product',
      component: () => import('@/view/Play')
      // component: () => import('@/view/Play_bk')
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
      name: 'svg',
      path: '/svg',
      component: () => import('@/view/SvgIcon')
    },
    {
      name: 'css',
      path: '/css',
      component: () => import('@/view/CSS')
    },
    {
      name: 'editor',
      path: '/editor',
      component: () => import('@/view/Editor')
    },
    {
      name: 'work',
      path: '/work',
      component: () => import('@/view/Work')
    },
    {
      name: 'student',
      path: '/student',
      component: () => import('@/view/Student')
    },
    {
      name: 'infinity',
      path: '/infinity',
      component: () => import('@/view/Infinity')
    },
    {
      name: 'redirect',
      path: '*',
      redirect: '/work'
    }
  ]
})



export default router
