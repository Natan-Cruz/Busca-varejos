import axios from "axios"
import store from '../store/store.js';
import Pushy from "pushy-sdk-web"
const appId = "5f975177035ffd813dc87d66"
    // [ADICIONA NOTIFICAÇÃO]
async function requestPermission() {
    // Caso tenha, prossegue para obtenção do token
    const deviceToken = await Pushy.register({ appId: appId });
    console.log(deviceToken)
        //Na clausula está sendo avaliado duas condições
        // Se token ja foi salvo(no caso a negação)
        // e
        // Se usuario está logado, uma proteção para não quebrar o backend 
    if (!isTokenSentToServer() && isLoggedIn()) {
        // Caso entre nesse bloco
        // Primeiro irá salvar o token no servidor
        console.log(deviceToken)
        await sendTokenToServer(deviceToken)
            // Depois define que foi salvo no navagador
            // Isso evita requisições desnecessarias
        setTokenSentToServer(true);

        return true
    }
}
// Envia token para o servidor
async function sendTokenToServer(currentToken) {
    const url = 'https://api.buscavarejos.com/usuarios/notification',
        body = {
            token: currentToken,
            device: `${window.innerWidth}x${window.innerHeight}`,
            navigator: GetBrowserInfo(),
            plataform: navigator.platform
        },
        header = {
            headers: {
                "uid": store.state.user.data.uid
            }
        };

    await axios.post(url, body, header);
}

// [REMOVE NOTIFICAÇÃO]
async function deleteToken() {
    // Obtem o token atual
    const currentToken = await Pushy.register({ appId: appId });
    // delete o token do servidor
    await deleteTokenToServer(currentToken);
    // seta variavel local com falsa
    setTokenSentToServer(false);
    // retorna true
    return true;
}

async function deleteTokenToServer(token) {
    const url = `https://api.buscavarejos.com/usuarios/notifications/${token}`,
        header = {
            headers: {
                "uid": store.state.user.data.uid
            }
        };

    await axios.delete(url, header)
}


// Verifica se usuario(loja) está logado
function isLoggedIn() {
    return store.state.user.loggedIn || false
}
// Verfica se token já foi salvo no servidor
function isTokenSentToServer() {
    const pushyTokenSentToServer = window.localStorage.getItem('pushyTokenSentToServer')
    if (pushyTokenSentToServer === '1')
        return true;

    if (pushyTokenSentToServer === '0')
        return false;

    return undefined;
}
// Define que token já foi salvo no servidor
function setTokenSentToServer(sent) {
    window.localStorage.setItem('pushyTokenSentToServer', sent ? '1' : '0');
}

function GetBrowserInfo() {
    let ua = navigator.userAgent,
        tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE ', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }

    return `${M[0]};${M[1]}`
}

export {
    requestPermission,
    deleteToken,
    isTokenSentToServer
}