const state = () => ({
    loggedIn: false,
    data: null
})

const getters = {
    user(state) {
        return {
            loggedIn: state.loggedIn,
            data: state.data
        }
    }
}

const mutations = {
    SET_LOGGED_IN(state, value) {
        state.loggedIn = value;
    },
    GET_LOGGED_IN(state) {
        return state.loggedIn
    },
    SET_USER(state, data) {
        state.data = data;
    }
}

const actions = {
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
}

export default {
    state,
    getters,
    actions,
    mutations
}