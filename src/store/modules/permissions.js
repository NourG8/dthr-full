import "@/plugins/axios";

export default {
    state: {
        listPermissions: []
    },
    getters: {
        getAllPermissions: state => state.listPermissions,
    },
    mutations: {
        setListPermissions: (state, permissions) => state.listPermissions = permissions,
        RefreshListPermissions: (state, id_permission) => state.listPermissions = state.listPermissions.filter(t => id_permission !== t.id),
        add_Permission(state, permission) {
            state.listPermissions.push(permission);
        },
        update_Permission(state, permission) {
            let index = state.listPermissions.findIndex((c) => c.id == permission.id);
            if (index > -1) {
                state.listUsers[index] = permission;
            }
        },
        details_Permission(state, permission) {
            let index = state.listPermissions.findIndex((c) => c.id == permission.id);
            if (index > -1) {
                state.listPermissions[index] = permission;
            }
        },
    },

    actions: {
        async AllPermissions({ commit }) {
            const response = await axios.get("/permissions");
            commit('setListPermissions', response.data);
        },
        async deletePermission({ commit }, id_permission) {
            const response = await axios.delete("/permissions/" + id_permission);
            commit('RefreshListPermissions', id_permission);
        },
        async addPermission(context, permission) {
            return axios
                .post("/permissions", permission)
                .then((response) => {
                    context.commit("add_Permission", {
                        id: response.data.permission.id,
                        ...response.data.permission
                    });
                });
        },
        async updatePermission(context, permission) {
            return axios
                .put("/permissions/" + permission.id, permission)
                .then((response) => {
                    context.commit("update_Permission", response.data);
                });

        },
        async detailsPermission(context, permission) {
            return axios
                .get("/permissions/" + permission.id)
                .then((response) => {
                    context.commit("details_Permission",  response.data);
                });

        },
    },
}