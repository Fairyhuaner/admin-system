import { getRolesList, getAllRights } from '@/api/permission'
const state = () => ({
  rolesList: [],
  allRights: []
})
const mutations = {
  updateRolesList (state, payload) {
    state.rolesList = payload
  },
  updateAllRights (state, payload) {
    state.allRights = payload
  }
}
const actions = {
  // 获取角色列表
  async getRolesList (context) {
    try {
      const { data } = await getRolesList()
      context.commit('updateRolesList', data.data)
    } catch (err) {
      console.log(err)
    }
  },
  // 获取所有权限列表
  async getAllRights (context, type) {
    try {
      const { data } = await getAllRights(type)
      // console.log(data)
      context.commit('updateAllRights', data.data)
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
