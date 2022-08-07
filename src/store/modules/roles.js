import "@/plugins/axios";

export default {
    state: {
        listRoles: []
    },
    getters: {
        getAllRoles: state => state.listRoles,
    },
    mutations: {
        setListRoles: (state, roles) => state.listRoles = roles,
        RefreshListRoles: (state, id_role) => state.listRoles = state.listRoles.filter(t => id_role !== t.id),
        add_Role(state, role) {
            state.listRoles.push(role);
        },
        update_Role(state, role) {
            let index = state.listRoles.findIndex((c) => c.id == role.id);
            if (index > -1) {
                state.listRoles[index] = role;
            }
        },
        details_Role(state, role) {
            let index = state.listRoles.findIndex((c) => c.id == role.id);
            if (index > -1) {
                state.listRoles[index] = role;
            }
        },
    },

    actions: {
        async AllRoles({ commit }) {
            const response = await axios.get("/roles");
            commit('setListRoles', response.data);
        },
        async deleteRole({ commit }, id_role) {
            const response = await axios.delete("/roles/" + id_role);
            commit('RefreshListRoles', id_role);
        },
        async addRole(context, role) {
            return axios
                .post("/roles", role)
                .then((response) => {
                    context.commit("add_role", {
                        id: response.data.id,
                        ...role
                    });
                });
        },
        async updateRole(context, role) {
            return axios
                .put("/roles/" + role.id, role)
                .then((response) => {
                    context.commit("update_role", role);
                });

        },
        async detailsRole(context, role) {
            return axios
                .get("/roles/" + role.id)
                .then((response) => {
                    context.commit("details_role", role);
                });

        },
    },
}
