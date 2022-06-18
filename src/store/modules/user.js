import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
}

const mutations = {
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  removeToken(state) {
    state.token = null
    removeToken()
  }
}

const actions = {
  // **`调用登录接口`**，**`成功后设置token到vuex`**，**`失败则返回失败`**
  async login(context, data) {
    // 异步调用登录接口
    const res = await login(data)
    // 因为在响应拦截器中已经捕获了异常和错误，所以在这里不必处理，而且已经解包过了，所以得到的res就是返回的data
    context.commit("setToken", res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

