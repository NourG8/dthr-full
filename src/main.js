import '@/plugins/vue-composition-api'
// import '@/styles/styles.scss'
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import i18n from './i18n'


const options = {

};

router.beforeEach((to, from, next) => {

  // use the language from the routing param or default language
  let language = to.params.lang;
  if (!language) {
    language = 'en'
  }

  // set the current language for i18n.
  i18n.locale = language
  next()
})

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App),
}).$mount('#app')
