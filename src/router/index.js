import Vue from 'vue'
import VueRouter from 'vue-router'
import user from './module/user'
import menu from './module/menu'
import role from './module/role'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout/index'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/home'),
        meta: {
          title: '控制台',
          icon: 's-home'
        }
      }
    ]
  }
]
const privateRoutes = [user, role, menu]
const router = new VueRouter({
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
