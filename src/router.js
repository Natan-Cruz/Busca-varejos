import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Establishments from "./views/establishments/index.vue"

const Establishment = () => ({
    component: import ( /* webpackChunkName: "establishment-page" */ './views/establishment/index.vue'),
    loading: loadingComponent,
    error: errorComponent,
    delay: 300,
    timeout: 2500
})

const productsComponent = () => ({
    component: import ( /* webpackChunkName: "establishment-page" */ './views/establishment/nested-page-products/products.vue'),
    loading: loadingComponent,
    error: errorComponent,
    delay: 300,
    timeout: 2500
})
const ratingsComponent = () => ({
    component: import ( /* webpackChunkName: "establishment-page" */ './views/establishment/nested-page-ratings/ratings.vue'),
    loading: loadingComponent,
    error: errorComponent,
    delay: 300,
    timeout: 2500
})
const aboutComponent = () => ({
    component: import ( /* webpackChunkName: "establishment-page" */ './views/establishment/nested-page-about/about.vue'),
    loading: loadingComponent,
    error: errorComponent,
    delay: 300,
    timeout: 2500
})
const mapsComponent = () => ({
    component: import ( /* webpackChunkName: "establishment-page-maps" */ './views/establishment/nested-page-map/map'),
    loading: loadingComponent,
    error: errorComponent,
    delay: 300,
    timeout: 2500
})



// Lazy load
import loadingComponent from './components/loadingAsyncComponent.vue'
import errorComponent from './components/errorAsyncComponent.vue'

const Product = () => ({
    component: import ('./views/ProductPage/index.vue'),
    loading: loadingComponent,
    error: errorComponent,
    delay: 300,
    timeout: 2500
})

// Login and Register
const Login = () => ({
    component: import ( /* webpackChunkName: "login_register" */ "./views/login-register/login.vue"),
    loading: loadingComponent,
    error: errorComponent,
    delay: 300,
    timeout: 2500
});
const Register = () => ({
    component: import ( /* webpackChunkName: "login_register" */ "./views/login-register/register.vue"),
    loading: loadingComponent,
    error: errorComponent,
    delay: 300,
    timeout: 2500
});
const PolicyPrivate = () => ({
    component: import ( /* webpackChunkName: "login_register" */ "./views/policy_and_terms/policy.vue"),
    loading: loadingComponent,
    error: errorComponent,
    delay: 300,
    timeout: 2500
});
const Terms = () => ({
    component: import ( /* webpackChunkName: "login_register" */ "./views/policy_and_terms/terms.vue"),
    loading: loadingComponent,
    error: errorComponent,
    delay: 300,
    timeout: 2500
});

// Logged-only
const Configurations = () => ({
    component: import ( /* webpackChunkName: "logged-only" */ "./views/configurations/index.vue"),
    loading: loadingComponent,
    error: errorComponent,
    timeout: 3000
});
const Orders = () => ({
    component: import ( /* webpackChunkName: "logged-only" */ "./views/orders/index.vue"),
    loading: loadingComponent,
    error: errorComponent,
    timeout: 2000
});
const Order = () => ({
    component: import ( /* webpackChunkName: "logged-only" */ "./views/order/index.vue"),
    loading: loadingComponent,
    error: errorComponent,
    timeout: 2000
})
const Addresses = () => ({
    component: import ( /* webpackChunkName: "logged-only" */ "./views/addresses/index.vue"),
    loading: loadingComponent,
    error: errorComponent,
    timeout: 3000
});
const FormAddress = () => ({
    component: import ( /* webpackChunkName: "logged-only" */ "./views/form-address/index.vue"),
    loading: loadingComponent,
    error: errorComponent,
    timeout: 3000
});

//Checkou 
const Checkout = () => ({
    component: import ( /* webpackChunkName: "checkout" */ './views/checkout/index.vue'),
    loading: loadingComponent,
    error: errorComponent,
    delay: 300,
    timeout: 2500
});


const routes = [{
        path: "/",
        redirect: "/estabelecimentos"
    },
    {
        path: '/login',
        name: "login",
        component: Login,
        meta: {
            requiresNotAuth: true
        }
    },
    {
        path: '/registrar',
        name: "registrar",
        component: Register,
        meta: {
            requiresNotAuth: true
        }
    },
    {
        path: "/estabelecimentos",
        name: "estabelecimentos",
        component: Establishments
    },
    {
        path: "/estabelecimentos/:establishment",
        name: "estabelecimento",
        component: Establishment,
        children: [{
                path: "produtos",
                name: "estabelecimento/produtos",
                component: productsComponent
            },
            {
                path: "avaliacoes",
                name: "estabelecimento/avaliacoes",
                component: ratingsComponent
            },
            {
                path: "informacoes",
                name: "estabelecimento/informacoes",
                component: aboutComponent
            },
            {
                path: "mapa",
                name: "estabelecimento/mapa",
                component: mapsComponent
            }
        ]
    },
    {
        path: "/estabelecimentos/:establishment/produtos/:product",
        name: "produtos",
        component: Product
    },
    {
        path: "/checkout",
        name: "checkout",
        component: Checkout
    },
    {
        path: "/pedidos",
        name: "pedidos",
        component: Orders,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/pedidos/:id",
        name: "pedido",
        component: Order,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/enderecos",
        name: "enderecos",
        component: Addresses,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/enderecos/novo",
        alias: "/enderecos/editar/:id",
        name: "cadastrar_endereco",
        component: FormAddress,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/configuracoes",
        name: "configuracoes",
        component: Configurations,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/politica-de-privacidade",
        name: "politica_de_privacidade",
        component: PolicyPrivate
    },
    {
        path: "/termos-de-servico",
        name: "termos_de_servico",
        component: Terms
    },
    {
        path: "*",
        redirect: "/estabelecimentos"
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes,
    scrollBehavior() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ left: 0, top: 0 })
            }, 500)
        })
    },
    fallback: true
})

export default router