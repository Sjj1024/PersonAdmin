// 导入路由
import router from "./router";
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
        await store.dispatch('user/getUserInfo')
        // 为什么要写await 因为我们想获取完资料再去放行
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