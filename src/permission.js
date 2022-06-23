// 导入路由
import router from "./router";
import { error404 } from "./router"
import NProgress from 'nprogress' // 引入一份进度条插件
// 导入vuex，判断是否存在token
import store from '@/store' // 引入vuex store实例

// 白名单列表
const whiteList = ["/login", "/404"]

// 路有导航守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) {
    // 如果存在token，并且访问的是登陆页，就跳转到主页
    if (to.path === "/login") {
      next("/")
    } else {
      if (!store.getters.userId) {
        // 如果没有id这个值 才会调用 vuex的获取资料的action
        const { roles } = await store.dispatch('user/getUserInfo')
        // 筛选用户路由的时候，必须是同步操作，这样才不会造成页面混乱
        // 此时获取到的路由是用户路由，
        const routes = await store.dispatch("permission/filterRoutes", roles.menus)
        // 在这里将用户路由添加到动态路由最后之后，404路由就不是最后了，会引起刷新404问题
        router.addRoutes([...routes, error404])
        next(to.path)
      }
      next()
    }
  } else {
    // 没有token，判断是否是白名单，然后放行还是跳到登陆页
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next("/login")
    }
  }
  NProgress.done()
})

// 后置导航守卫
router.afterEach(function () {   // 在切换路由结束时调用 ***
  NProgress.done() // 关闭进度条
})