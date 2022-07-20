import router from '@/router'
import store from '@/store'
// 白名单
const whiteList = ['/login', '/404']
// 前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.users.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else if (to.path === '/home/roles') {
      // 从权限列表切换到角色列表时，树状图的渲染会出现缓存的bug 切过去的瞬间改变获取权限列表所需要的参数
      store.dispatch('permissions/getAllRights', 'tree')
      next()
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
