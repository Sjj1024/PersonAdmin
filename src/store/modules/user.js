import { login, logout, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import router from "@/router"

const state = {
  token: getToken(),
  userInfo: {} // 定义一个空的对象 不是null 因为后边我要开发userInfo的属性给别人用userInfo.name
}

const mutations = {
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    //state.userInfo = userInfo; // 这个也是响应式，直接修改对象本身的数据
    //也可以如下写法：
    state.userInfo = { ...userInfo } // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  // **`调用登录接口`**，**`成功后设置token到vuex`**，**`失败则返回失败`**
  async login(context, data) {
    // 异步调用登录接口
    const res = await login(data)
    // 因为在响应拦截器中已经捕获了异常和错误，所以在这里不必处理，而且已经解包过了，所以得到的res就是返回的data
    context.commit("setToken", res)
  },
  // 获取用户资料action，以下代码时异步操作，放入actions中
  async getUserInfo(context) {
    let result = {}
    try {
      result = await getUserInfo() // result就是用户的基本资料
    } catch {
      router.push('/login') // 跳到登录页
      return
    }
    //这个接口需要用户的userId，在前一个接口处，我们已经获取到了，所以可以直接在后面的内容去衔接
    const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
    const baseResult = { ...result, ...baseInfo } // 将两个接口结果合并
    // 此时已经获取到了用户的基本资料 迫不得已 为了头像再次调用一个接口
    context.commit('setUserInfo', baseResult) // 提交mutations
    // 加一个点睛之笔  这里这一步，暂时用不到，但是请注意，这给我们后边会留下伏笔
    return baseResult
  },
  // 登出的action（写在actions中）
  logout(context) {
    // 删除token
    context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    // 删除用户资料
    context.commit('reomveUserInfo') // 删除用户信息
    // 重置路由
    resetRouter()
    // 将vuex中的数据清除
    context.commit("permission/setRoutes", [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

