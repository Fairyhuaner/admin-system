import { getRolesList } from '@/api/permission'
const state = () => ({
  rolesList: []
})
const mutations = {
  updateRolesList (state, payload) {
    state.rolesList = payload
  }
}
const actions = {
  // 获取角色
  async getRolesList (context) {
    try {
      const { data } = await getRolesList()
      context.commit('updateRolesList', data.data)
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
