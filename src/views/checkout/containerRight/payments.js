import Axios from 'axios'

export default async function createOrder({ typePayment, userUid, userAaddressId }) {
    if (typePayment !== "money" && typePayment !== "card-machine")
        throw new Error("type_payment invalido")

    const url = `https://api.buscavarejos.com/usuarios/checkout/finalizar?type_payment=${typePayment}`
    const body = {
        id_user_address: userAaddressId
    }
    const { data } = await Axios.post(url, body, {
        headers: {
            "uid": userUid
        }
    })
    return { msg: data.msg, arrIdsOrders: data.arrIdsOrders }

}