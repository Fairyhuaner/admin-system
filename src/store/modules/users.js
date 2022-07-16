import { getUsersList, getUserInfo, login } from '@/api/user'
const state = () => ({
  token: null,
  userList: [], // 用户列表
  total: 0, // 用户列表总条数
  userInfo: {} // 单个用户个人信息
})
const mutations = {
  setToken (state, payload) {
    state.token = payload
  },
  updateTotal (state, payload) {
    state.total = payload
  },
  updateUserList (state, payload) {
    state.userList = payload
  },
  updateUserInfo (state, payload) {
    state.userInfo = payload
  }
}
const actions = {
  // 登录
  async login (context, loginForm) {
    try {
      const res = await login(loginForm)
      // console.log(res)
      context.commit('setToken', res.data.data.token)
    } catch (err) {
      console.log(err)
    }
  },
  // 获取用户列表
  async getUsersList (context, paramsObj) {
    try {
      const { data } = await getUsersList(paramsObj)
      console.log(data)
      context.commit('updateTotal', data.data.total)
      context.commit('updateUserList', data.data.users)
    } catch (err) {
      console.log(err)
    }
  },
  // 获取单个用户个人信息
  async getUserInfo (context, id) {
    try {
      const { data } = await getUserInfo(id)
      context.commit('updateUserInfo', data.data)
      // console.log('updateUserInfo', data.data)
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
