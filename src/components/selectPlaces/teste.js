const DB_NAME = "address"

/**
 * @returns "Retorna um objeto de endereço" 
 */
function getCoordernates() {
    return JSON.parse(window.localStorage.getItem(DB_NAME))
}

/**
 * 
 * @param { Object } address 
 * @param { String } address.completeAddress "Endereço por extenso"
 * @param { Number } address.latitude
 * @param { Number } address.longitude
 *
 */
function saveAddress(address) {
    window.localStorage.setItem(DB_NAME, JSON.stringify(address))
}
export {
    getCoordernates,
    saveAddress
}