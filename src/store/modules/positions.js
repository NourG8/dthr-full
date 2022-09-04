import "@/plugins/axios";

export default {
    state: {
        listPositions: [],
        liste_roles_position: null,
    },
    getters: {
        getAllPositions: state => state.listPositions,
        getAllRolesPosition: state => state.liste_roles_position,
    },
    mutations: {
        setListPositions: (state, positions) => state.listPositions = positions,
        RefreshListRolesPosition: (state, roles) => state.liste_roles_position = roles,
        RefreshListPositions: (state, id_position) => state.listPositions = state.listPositions.filter(t => id_position !== t.id),
        add_Position(state, position) {
            state.listPositions.push(position);
        },
        update_Position(state, position) {
            let index = state.listPositions.findIndex((c) => c.id == position.id);
            if (index > -1) {
                state.listPositions[index] = position;
            }
        },
        details_Position(state, position) {
            let index = state.listPositions.findIndex((c) => c.id == position.id);
            if (index > -1) {
                state.listPositions[index] = position;
            }
        },
    },

    actions: {
        async AllPositions({ commit }) {
            const response = await axios.get("/positions");
            commit('setListPositions', response.data);
        },
        async AllRoles({ commit }) {
            const response = await axios.get("/roles");
            commit('setListRoles', response.data);
        },
        async deletePosition({ commit }, id_position) {
            const response = await axios.delete("/positions/" + id_position);
            commit('RefreshListPositions', id_position);
        },
        async addPosition(context, position) {
            return axios
                .post("/positions", position)
                .then((response) => {
                    context.commit("add_Position", {
                        id: response.data.position.id,
                        ...response.data.position
                    });
                });
        },
        async updatePosition(context, position) {
            return axios
                .put("/positions/" + position.id, position)
                .then((response) => {
                    context.commit("update_Position", response.data);
                });
        },
        async detailsPosition(context, position) {
            return axios
                .get("/positions/" + position.id)
                .then((response) => {
                    context.commit("details_position", position);
                });
        },
        async archivePosition({ commit }, position) {
            return axios
                .put("/positions/archive/" + position.id)
                .then((response) => {
                    commit('RefreshListPositions', position.id);
                });
        },
        async AllRolesPositions({ commit }, position_id) {
            const response = await axios.get("/positions/role/" + position_id);
            commit('RefreshListRolesPosition', response.data);
        },
    }
}
