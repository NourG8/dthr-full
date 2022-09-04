import "@/plugins/axios";

export default {
    state: {
        listDepartments: [],
        listDeparts: []
    },
    getters: {
        getAllDepartments: state => state.listDeparts,
    },
    mutations: {
        setlistDepartments: (state, department) => state.listDeparts = department,
        RefreshlistDepartments: (state, id_department) => state.listDeparts = state.listDeparts.filter(t => id_department !== t.id),
        add_Department(state, department) {
            state.listDeparts.push(department);
        },
        update_Department(state, department) {
            let index = state.listDeparts.findIndex((c) => c.id == department.id);
            if (index > -1) {
                state.listDeparts[index] = department;
            }
        },
        details_Department(state, department) {
            let index = state.listDeparts.findIndex((c) => c.id == department.id);
            if (index > -1) {
                state.listDeparts[index] = department;
            }
        },
    },

    actions: {
        async AllDepartments() {
            return await axios.get('departments');
        },
        async AllDeparts({ commit }) {
            const response = await axios.get("/departments");
            commit('setlistDepartments', response.data);
        },
        async deleteDepartment({ commit }, id_department) {
            const response = await axios.delete("/departments/" + id_department);
            commit('RefreshlistDepartments', id_department);
        },
        async addDepartment(context, department) {
            return axios
                .post("/departments", department)
                .then((response) => {
                    context.commit("add_Department", {
                        id: response.data.department.id,
                        ...response.data.department
                       
                    });
                    console.log(response.data.department);
                });
        },
        async updateDepartment(context, department) {
            return axios
                .put("/departments/" + department.id, department)
                .then((response) => {
                    context.commit("update_Department", response.data);
                    
                });
        },
        async detailsDepartment(context, department) {
            return axios
                .get("/departments/" + department.id)
                .then((response) => {
                    context.commit("details_Department", department);
                });
        },
        async archiveDepartment({ commit }, department) {
            return axios
                .put("/departments/archive/" + department.id)
                .then((response) => {
                    commit('RefreshlistDepartments', department.id);
                });
        },
    },
}