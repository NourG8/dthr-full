import "@/plugins/axios";
import store from "@/store"


export default {
    state: {
        user: null,
        token: null,
        loggedIn: false,
    },


    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_LOGGED_IN(state, loggedIn) {
            state.loggedIn = loggedIn;
        },
        LOGIN(state, payload) {
            state.user = payload.user;
            state.token = payload.token;
            state.loggedIn = true;
        },
        LOGOUT(state) {
            state.user = null;
            state.token = null;
            state.loggedIn = false;
        },
    },
    actions: {
        login({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post("login", payload)
                    .then((response) => {
                        const { user, token } = response.data;
                        commit("LOGIN", { user, token });
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);

                    });
            });
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                axios
                    .post("logout")
                    .then((response) => {
                        commit("LOGOUT");
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        async forget({ commit }, { email }) {
            return new Promise((resolve, reject) => {
                axios
                    .post('forget', {
                        email
                    })
                    .then((response) => {
                        console.log(response)
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error.response.data.message);
                    });
            });
        },
        async reset({ commit }, objet) {
            return new Promise((resolve, reject) => {
                axios
                    .post('resetPassword', objet)
                    .then((response) => {
                        console.log(response)
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error.response.data.message);
                    });
            });
        },
        async AdminResetPassword(context, user) {
            return new Promise((resolve, reject) => {
                axios
                    .put("/admin/reset/password/" + user.id)
                    .then((response) => {
                        context.commit("update_User", user);
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error.response.data.message);
                    });
            });
        },
        async resetPassword(context, reset_password) {
            return new Promise((resolve, reject) => {
                axios
                    .put("/reset/password/" + store.getters.user.id, reset_password)
                    .then((response) => {
                        context.commit("SET_USER", response.data);
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error.response.data.message);
                    });
            });
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        token(state) {
            return state.token;
        },
        loggedIn(state) {
            return state.loggedIn;
        },
        // isAdmin(state) {
        //     return state.user?.is_admin == 1;
        // },
    },
};