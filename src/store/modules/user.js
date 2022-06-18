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
    if (res.data.success) {
      // 当登陆成功后，设置用户的token
      context.commit("setToken", res.data.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

