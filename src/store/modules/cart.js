import {
    saveLocalItem,
    getLocalItems,
    removeItemCart,
    updateLocalQuantity,
    clearLocalStorage
} from '../../CartDB.js';
import axios from 'axios'

const state = () => ({
    items: [],
    amount: ""
})

const getters = {
    cart(state) {
        return state
    }
}

const mutations = {
    SET_ADD_CART(state, data) {
        state = data
    }
}

const actions = {
    async getCart(context) {
        try {
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
    async addCart(context, item) {
        try {
            console.log(context)
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}