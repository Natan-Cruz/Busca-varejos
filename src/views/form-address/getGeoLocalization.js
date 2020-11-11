function getCurrentPosition(options) {
    return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator))
            reject("Geolocalição não é suportada");

        navigator.geolocation.getCurrentPosition((position) => {
            resolve(position)
        }, (error) => {
            resolve(swtchErrorMsg(error))
        }, options);
    })
}
const swtchErrorMsg = (error) => {
    let msg;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            msg = 'Você negou a sua localização';
            break;
        case error.POSITION_UNAVAILABLE,
        error.TIMEOUT,
        error.UNKNOWN_ERROR:
            msg = 'Ops ocorreu um problema! Por favor tente novamente'
            break;
    }

    return msg;
}
export default getCurrentPosition