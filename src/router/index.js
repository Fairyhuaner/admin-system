import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home', component: Home },
  { path: '/login', name: 'login', component: () => import('@/views/Login') },
  {
    path: '/home',
    name: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: 'users', name: 'users', component: () => import('@/views/Users') },
      { path: 'roles', name: 'roles', component: () => import('@/views/Permissions/Roles') },
      { path: 'rights', name: 'rights', component: () => import('@/views/Permissions/Rights') },
      { path: 'goods', name: 'goods', component: () => import('@/views/Manage/Goods') },
      { path: 'sorts', name: 'sorts', component: () => import('@/views/Manage/Sorts') },
      { path: 'categories', name: 'categories', component: () => import('@/views/Manage/Categories') },
      { path: 'orders', name: 'orders', component: () => import('@/views/Orders') },
      { path: 'reports', name: 'reports', component: () => import('@/views/Reports') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
