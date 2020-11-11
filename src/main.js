import Vue from 'vue'
import App from './App.vue';
import firebase from './firebase/auth.js';
import store from './store/store.js';
import router from "./router.js"
import vueHeadful from 'vue-headful';
import VueGtag from 'vue-gtag';

import spinnerLoading from './components/SpinnerLoadingComponent.vue'
import errorComponent from "./components/errorComponent.vue"

Vue.use(VueGtag, {
    config: {
        id: "G-9J2SJPTPGJ"
    }
}, router);

Vue.component('vue-headful', vueHeadful);
Vue.component('spinner-loading', spinnerLoading);
Vue.component("error-component", errorComponent);

// import wb from "./registerServiceWorker";

// Vue.prototype.$workbox = wb;

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
    store.dispatch("getCart")
});


// This callback runs before every route change, including on page load.
router.beforeEach(async(to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth),
        requiresNotAuth = to.matched.some(record => record.meta.requiresNotAuth);

    const user = await firebase.getCurrentUser();
    // Caso a pagina necessite que o usuario esteja logado para continuar
    // Redireciona o mesmo para a pagina de login
    if (user) {
        if (requiresNotAuth) {
            return next({ path: '/' })
        } else {
            return next()
        }
    } else {
        if (requiresAuth) {
            return next({ path: `/login?origin_url=${to.path}` });
        } else {
            return next()
        }
    }

    // Caso o usuario estaja logado e a pagina só pode ser exibida com ele deslogado
    // redireciona o usuario para a pagina de inicio

});
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')