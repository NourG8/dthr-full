import "@/plugins/axios";

export default {
    state: {
        listRoles: [],
        roles: []
    },
    getters: {
        getAllRoles: state => state.listRoles,
    },
    mutations: {
        setListRoles: (state, roles) => state.listRoles = roles,
        RefreshListRoles: (state, id_role) => state.listRoles = state.listRoles.filter(t => id_role !== t.id),
        add_role(state, role) {
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
        affect_Role(state, roles) {
            state.roles.push(roles);
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
                        id: response.data.role.id,
                        ...response.data.role
                    });
                    console.log(response.data.role.id);
                });
        },
        async deletePermissionRole({ commit }, role) {
            return axios
                .delete("/roles/affect/" + role.id)
                .then(() => {
                    commit('RefreshListRoles', role.id);
                });
        },
        async updateRole(context, role) {
            return axios
                .put("/roles/" + role.id, role)
                .then((response) => {
                    context.commit("update_Role", response.data);
                });
        },
        async AffectPermissions(context, role, tab_permission) {
            console.log(tab_permission)
            return axios
                .post("/roles/affect/", role.id, tab_permission)
                .then((response) => {
                    context.commit("affect_Role", tab_permission)
                    console.log(response.data.role.id);
                });
        },
        async AffectPermissionsRole(context, rolePerm) {
            return axios
                .post("/roles/affectPerm", rolePerm)
                .then((response) => {
                    context.commit("affect_Role", rolePerm)
                });
        },
        async detailsRole(context, role) {
            return axios
                .get("/roles/" + role.id)
                .then((response) => {
                    context.commit("details_role", role);
                });
        },
        async archiveRole({ commit }, role) {
            return axios
                .put("/role/archive/" + role.id)
                .then((response) => {
                    commit('RefreshListRoles', role.id);
                });
        },
    },
}
