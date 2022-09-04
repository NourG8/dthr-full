import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: 'login',
    },
    {
        path: '/login',
        name: 'pages-login',
        component: () =>
            import ('@/views/pages/Login.vue'),
        meta: {
            layout: 'blank',
        },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
            import ('@/views/dashboard/Dashboard.vue'),
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            if (store.getters.user != null && store.getters.user.pwd_reset_admin === 0) {
                next();
            } else {
                next("/resetPassword");
            }
        },
    },
    {
        path: '/forgetPassword',
        name: 'pages-forgetPassword',
        component: () =>
            import ('@/views/pages/ForgetPassword.vue'),
        meta: {
            layout: 'blank',
        }
    },
    { path: '/archive',
      name: 'ArchiveUser',
      component: () =>
        import ('@/views/Users/ArchiveUser.vue'),
    meta: { requiresAuth: true }

    },
    {
        path: '/resetPassword',
        name: 'pages-ResetPassword',
        component: () =>
            import ('@/views/pages/ResetPassword.vue'),
        meta: {
            layout: 'blank',
        }
    },
    {
        path: '/users',
        name: 'users',
        component: () =>
            import ('@/views/Users/UsersListe.vue'),
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            if (store.getters.user != null && store.getters.user.pwd_reset_admin === 0) {
                next();
            } else {
                next("/resetPassword");
            }
        },
    },
    {
        path: '/roles',
        name: 'roles',
        component: () =>
            import ('@/views/Roles/RolesList.vue'),
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            if (store.getters.user != null && store.getters.user.pwd_reset_admin === 0) {
                next();
            } else {
                next("/resetPassword");
            }
        },
    },
    {
        path: '/positions',
        name: 'positions',
        component: () =>
            import ('@/views/Positions/PositionsList.vue'),
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            if (store.getters.user != null && store.getters.user.pwd_reset_admin === 0) {
                next();
            } else {
                next("/resetPassword");
            }
        },
    },
    {
        path: '/permissions',
        name: 'permissions',
        component: () =>
            import ('@/views/Permissions/PermissionsList.vue'),
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            if (store.getters.user != null && store.getters.user.pwd_reset_admin === 0) {
                next();
            } else {
                next("/resetPassword");
            }
        },
    },
    {
        path: '/departments',
        name: 'departments',
        component: () =>
            import ('@/views/Department/DepartmentsList.vue'),
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            if (store.getters.user != null && store.getters.user.pwd_reset_admin === 0) {
                next();
            } else {
                next("/resetPassword");
            }
        },
    },
    {
        path: '/multi-users',
        name: 'multi-users',
        component: () =>
            import ('@/views/Users/AddMultipleUser.vue'),
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            if (store.getters.user != null && store.getters.user.pwd_reset_admin === 0) {
                next();
            } else {
                next("/resetPassword");
            }
        },
    },
    {
        path: '/icons',
        name: 'icons',
        component: () =>
            import ('@/views/icons/Icons.vue'),
    },
    {
        path: '/cards',
        name: 'cards',
        component: () =>
            import ('@/views/cards/Card.vue'),
    },
    {
        path: '/simple-table',
        name: 'simple-table',
        component: () =>
            import ('@/views/simple-table/SimpleTable.vue'),
    },
    {
        path: '/form-layouts',
        name: 'form-layouts',
        component: () =>
            import ('@/views/form-layouts/FormLayouts.vue'),
    },
    {
        path: '/pages/account-settings',
        name: 'pages-account-settings',
        component: () =>
            import ('@/views/pages/account-settings/AccountSettings.vue'),
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            if (store.getters.user != null && store.getters.user.pwd_reset_admin === 0) {
                next();
            } else {
                next("/resetPassword");
            }
        },
    },
    //redirection page d'erreur
    {
        path: '/error-404',
        name: 'error-404',
        component: () =>
            import ('@/views/Error.vue'),
        meta: {
            layout: 'blank',
        },
    },
    {
        path: '*',
        redirect: 'error-404',
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.loggedIn) {
            next();
            return;
        }
        next("/");
    } else {
        next();
    }
});

export default router
