import "@/plugins/axios";

export default {
    state: {
        listUsers: [],
        
    },
    getters: {
        getAllUsers: state => state.listUsers,

    },
    mutations: {
        setListUsers: (state, users) => state.listUsers = users,
        RefreshListUsers: (state, id_user) => state.listUsers = state.listUsers.filter(t => id_user !== t.id),
        add_User(state, user) {
            state.listUsers.push(user);
        },
        update_User(state, user) {
            let index = state.listUsers.findIndex((c) => c.id == user.id);
            if (index > -1) {
                state.listUsers[index] = user;
            }
        },
        details_User(state, user) {
            let index = state.listUsers.findIndex((c) => c.id == user.id);
            if (index > -1) {
                state.listUsers[index] = user;
            }
        },
    },

    actions: {
        async AllUsers({ commit }) {
            const response = await axios.get("/users");
            commit('setListUsers', response.data);
        },
        async deleteUser({ commit }, id_user) {
            const response = await axios.delete("/users/" + id_user);
            commit('RefreshListUsers', id_user);
        },
        async addUser(context, user) {
            return axios
                .post("/users", user)
                .then((response) => {
                    context.commit("add_User", {
                        id: response.data.user.id,
                        ...response.data.user
                    });
                });
        },
        async updateUser(context, user) {
            return axios
                .put("/users/" + user.id, user)
                .then((response) => {
                    context.commit("update_User", response.data);
                });
        },
        async detailsUser(context, user) {
            return axios
                .get("/users/" + user.id)
                .then((response) => {
                    context.commit("details_User", user);
                });

        },
        async archiveUser({ commit }, user) {
            return axios
                .put("/user/archive/" + user.id)
                .then((response) => {
                    commit('RefreshListUsers', user.id);
                });
        },
        async AllArchivedUser() {
            return await axios.get('/user/list/archive');
        },
    
    async resetUser({ commit }, user) {
        return axios
            .put("user/reset/" + user.id)
            .then((response) => {
             commit('RefreshListUsers', user.id);
            });
        }, 
    },
}