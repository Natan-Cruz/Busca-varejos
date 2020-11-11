import axios from 'axios';

const Request = {
    get(url, uid) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    headers: {
                        "uid": uid
                    }
                })
                .then(response => resolve(response.data))
                .catch(error => reject(handlerError(error)))
        })
    },
    post(url, uid, body) {
        return new Promise((resolve, reject) => {
            const header = {
                headers: {
                    "uid": uid
                }
            }
            axios.post(url, body, header)
                .then(response => resolve(response.data))
                .catch(error => reject(handlerError(error)))
        })
    },
    put() {

    },
    delete(url, uid, data) {
        return new Promise((resolve, reject) => {
            const options = {
                data: data,
                headers: {
                    "uid": uid
                }
            }
            axios.delete(url, options)
                .then(response => resolve(response.data))
                .catch(error => reject(handlerError(error)))
        })
    }
}

function handlerError(error) {
    if (error.response) {
        const msg = error.response.data.msg
        return msg;
    } else if (error.request) {
        if (error.message === "Network Error") {
            const msg = 'Ops, problema com a conexão com a internet, por favor tente novamente!'
            return msg
        } else {
            const msg = 'Ops, deu um problema, por favor tente novamente!'
            return msg
        }
    }
}

export default Request