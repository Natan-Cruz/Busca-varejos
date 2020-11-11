/* eslint-disable */
import firebase from "firebase/app"
import axios from "axios";

async function updateDisplayName(name) {
    const currentUser = firebase.auth().currentUser;

    const promiseFirebase = currentUser.updateProfile({
        displayName: name
    })
    const url = "https://api.buscavarejos.com/usuarios";

    const promiseBVJ = axios.put(url, {
        name: name
    }, {
        headers: {
            "uid": currentUser.uid
        }
    })

    return await Promise.all([promiseFirebase, promiseBVJ])
}

async function updateEmail(email) {
    const currentUser = firebase.auth().currentUser;
    const providerId = currentUser.providerData[0].providerId
    const provider = getProvider(providerId)

    await currentUser.reauthenticateWithPopup(provider)

    const promiseFirebase = currentUser.updateEmail(email);

    const url = "https://api.buscavarejos.com/usuarios",
        body = {
            email: email
        },
        headers = {
            "uid": currentUser.uid
        }
    const promiseBVJ = axios.put(url, body, { headers });

    return await Promise.all([promiseFirebase, promiseBVJ]);
}

async function updatePhone(phone) {
    // const pattern = new RegExp(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/, "g");
    // console.log(phone.match(pattern))
    // if (!pattern.test(phone))
    //     throw "Numero inválido";

    const url = "https://api.buscavarejos.com/usuarios",
        body = {
            phone: phone
        },
        headers = {
            "uid": currentUser.uid
        }

    return await axios.put(url, body, headers);
}
async function updatePassword(oldPassword, password) {
    if (!oldPassword || !password) throw { code: "bvj/params-error" }

    const currentUser = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        oldPassword
    )
    console.log(oldPassword)
    await currentUser.reauthenticateWithCredential(credential);

    return await currentUser.updatePassword(password);
}

function emailWasVerified() {
    const { emailVerified } = firebase.auth().currentUser;
    return emailVerified
}

async function sendEmailVerification() {
    const currentUser = firebase.auth().currentUser;
    return await currentUser.sendEmailVerification();
}

function getProvider(providerId) {
    let provider = undefined;

    switch (providerId) {
        case "facebook.com":
            provider = new firebase.auth.FacebookAuthProvider();
            break
        case "google.com":
            provider = new firebase.auth.GoogleAuthProvider();
            break
    }
    if (!provider) throw new Error("Provider invalido");

    return provider
}

export {
    updateDisplayName,
    updateEmail,
    updatePassword,
    updatePhone,
    emailWasVerified,
    sendEmailVerification
}