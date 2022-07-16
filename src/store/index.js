import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import users from './modules/users'
import permissions from './modules/permissions'
import getters from './getters'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
  },
  getters,
  modules: {
    users,
    permissions
  },
  plugins: [vuexLocal.plugin]
})
