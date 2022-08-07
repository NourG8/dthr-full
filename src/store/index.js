import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";
// const ls = new SecureLS({ isCompression: false });
Vue.use(Vuex)
import auth from "./modules/auth";
import users from "./modules/users";
import roles from "./modules/roles";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters:{ },
  
  modules: {auth,   users, roles},
  plugins: [createPersistedState()]
})
