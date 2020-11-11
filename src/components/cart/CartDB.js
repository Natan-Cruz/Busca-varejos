const KEY_STORAGE = 'cart';

function toJson(string) {
    return JSON.parse(string)
}

function toString(json) {
    return JSON.stringify(json)
}

function saveLocalItem(item) {
    if (!('localStorage' in window))
        throw { status: true, msg: 'LocalStorage não suportado' };

    item.id_local = Date.now()

    const cart = toJson(localStorage.getItem(KEY_STORAGE));
    if (!cart) {
        localStorage.setItem(KEY_STORAGE, toString([item]))
        return { error: false, msg: 'Item adicionado no carrinho' };
    }

    cart.push(item);
    localStorage.setItem(KEY_STORAGE, toString(cart));
    return { error: false, msg: 'Item adicionado no carrinho' };
}


function getLocalItems() {
    if (!('localStorage' in window))
        throw { error: true, msg: 'LocalStorage não suportado', data: null };

    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart || !cart.length)
        return { error: false, msg: 'LocalStorage não suportado', data: null };


    return { error: false, msg: 'LocalStorage não suportado', data: cart };
}

function updateLocalQuantity(id, quantity) {
    if (!('localStorage' in window))
        throw { error: true, msg: 'LocalStorage não suportado', data: null };

    if (!quantity) return

    const cart = toJson(localStorage.getItem(KEY_STORAGE));
    if (!cart || !cart.length)
        return { error: false, msg: 'Produto não encontrado', data: null };

    const newCart = cart.map(elem => {
        if (elem.id_local == id)
            elem.quantity = quantity

        return elem
    })

    localStorage.setItem(KEY_STORAGE, toString(newCart))
    return { error: false, msg: 'Produto atualizado', data: newCart };
}

function removeItemCart(id) {
    if (!('localStorage' in window))
        throw { error: true, msg: 'LocalStorage não suportado', data: null };

    const cart = toJson(localStorage.getItem(KEY_STORAGE));

    if (!cart || !cart.length)
        return { error: false, msg: 'Produto não encontrado', data: null };

    const newCart = cart.filter(elem => {
        console.log(elem.id_local, id)
        if (elem.id_local != id)
            return elem
    })
    localStorage.setItem(KEY_STORAGE, toString(newCart))
    return { error: false, msg: 'Produto removido', data: newCart };
}


function clearLocalStorage() {
    localStorage.setItem(KEY_STORAGE, toString([]))
}

export {
    saveLocalItem,
    getLocalItems,
    updateLocalQuantity,
    removeItemCart,
    clearLocalStorage
}