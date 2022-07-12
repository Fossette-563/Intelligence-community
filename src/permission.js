/**路由守卫 */
import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  // 如果有token就判断是否在登录页面，如果在登录页就跳转到要跳转的即将跳转的页面，否则不跳转
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      const nav = store.getters.nav
      if (nav) {
        next()
      } else {
        // 获取数据
        const navlist = await store.dispatch('menu/getNav', nav)
        console.log(navlist, 'nn')
      }
      next()
    }
  } else {
    // 没有token，就跳转到登录页
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
