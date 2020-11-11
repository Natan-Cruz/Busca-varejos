import Vue from "vue";
import Vuex from "vuex";
import {
    saveLocalItem,
    getLocalItems,
    removeItemCart,
    updateLocalQuantity,
    clearLocalStorage
} from '../components/cart/CartDB';

import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            loggedIn: false,
            data: null
        },
        cart: {
            items: [],
            amount: 0,
            error: undefined,
            is_loading: false
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        cart(state) {
            return state.cart
        }
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        GET_LOGGED_IN(state) {
            return state.user.loggedIn
        },
        SET_USER(state, data) {
            state.user.data = data;
        },
        SET_ADD_CART(state, data) {
            state.cart = data
        },
    },
    actions: {
        fetchUser({ commit }, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    providerId: user.providerData[0].providerId
                });
            } else {
                commit("SET_USER", null);
            }
        },
        async getCart(context) {
            try {
                context.state.cart.error = undefined;
                context.state.cart.is_loading = true;
                context.state.cart.items = [];

                const loggedIn = context.state.user.loggedIn;
                if (loggedIn) {
                    // Obter dados do carrinho salvo online
                    const response = await axios.get('https://api.buscavarejos.com/usuarios/carrinho/online', {
                        headers: {
                            "uid": context.state.user.data.uid
                        }
                    });
                    const { items, amount } = response.data;
                    context.state.cart['items'] = items;
                    context.state.cart['amount'] = amount;

                    return response.data.msg;
                } else {
                    // Obtem dados completo do carrinho com base no local
                    const { data } = getLocalItems()
                    const response = await axios.post('https://api.buscavarejos.com/usuarios/carrinho', data)
                    context.state.cart = response.data
                }
            } catch (error) {
                console.error(error)
                context.state.cart.error = "Ops, ocorreu algum problema ao tentar carregar o carrinho"
            } finally {
                context.state.cart.is_loading = false;
            }
        },
        async addCart(context, item) {
            try {
                console.log(item)
                const loggedIn = context.state.user.loggedIn;
                if (loggedIn) {
                    const response = await axios.post('https://api.buscavarejos.com/usuarios/carrinho/online', item, {
                        headers: {
                            "uid": context.state.user.data.uid
                        }
                    })
                    context.dispatch("getCart");
                    return response.data.msg

                } else {
                    const { msg } = saveLocalItem(item)
                    context.dispatch("getCart");
                    return msg
                }
            } catch (error) {
                if (error.response) {
                    return error.response.data.msg
                } else if (error.request) {
                    if (error.message === "Network Error")
                        return 'Erro na conexão com servidor ao obter carrinho de compras'
                    else
                        return 'Erro desconhecido'
                }
            }
        },
        async removeCart(context, payload) {
            try {
                const loggedIn = context.state.user.loggedIn;
                if (loggedIn) {
                    await axios.delete(`https://api.buscavarejos.com/usuarios/carrinho/online/${payload.id}`, {
                        headers: {
                            "uid": context.state.user.data.uid
                        }
                    })
                    context.dispatch("getCart")
                } else {
                    const { msg } = removeItemCart(payload.id)
                    context.dispatch("getCart")
                    return msg
                }
            } catch (error) {
                if (error.response) {
                    return error.response.msg
                } else if (error.request) {
                    if (error.message === "Network Error")
                        return 'Erro na conexão com servidor ao obter carrinho de compras'
                    else
                        return 'Erro desconhecido'
                }
            }
        },
        async updateCart(context, payload) {
            try {
                const loggedIn = context.state.user.loggedIn;
                if (loggedIn) {
                    await axios.put(`https://api.buscavarejos.com/usuarios/carrinho/online/${payload.id}`, {
                        quantity: payload.quantity
                    }, {
                        headers: {
                            "uid": context.state.user.data.uid
                        }
                    })
                    context.dispatch("getCart")
                } else {
                    const { msg } = updateLocalQuantity(payload.id, payload.quantity)
                    context.dispatch("getCart")
                    return msg
                }
            } catch (error) {
                if (error.response) {
                    return error.response.msg
                } else if (error.request) {
                    if (error.message === "Network Error")
                        return 'Erro na conexão com servidor ao obter carrinho de compras'
                    else
                        return 'Erro desconhecido'
                }
            }
        },
        async sincronizeCart(context, payload) {
            try {
                const { data } = getLocalItems()
                await axios.post('https://api.buscavarejos.com/usuarios/carrinho/sincronizar', data, {
                    headers: {
                        'uid': payload.uid
                    }
                });
                context.dispatch("getCart")
                clearLocalStorage()
            } catch (error) {
                if (error.response) {
                    return error.response.msg
                } else if (error.request) {
                    if (error.message === "Network Error")
                        return 'Erro na conexão com servidor ao obter carrinho de compras'
                    else
                        return 'Erro desconhecido'
                }
            }
        },
        clearCart({ commit }) {
            commit("SET_ADD_CART", {
                items: [],
                amount: 0,
                error: undefined,
                is_loading: false
            })
        }
    }
});