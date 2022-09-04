import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";
// const ls = new SecureLS({ isCompression: false });
Vue.use(Vuex)
import auth from "./modules/auth";
import users from "./modules/users";
import roles from "./modules/roles";
import positions from "./modules/positions";
import permissions from "./modules/permissions";
import department from "./modules/department";


export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},

    modules: { auth, users, roles, positions, permissions, department },
    plugins: [createPersistedState()]
})