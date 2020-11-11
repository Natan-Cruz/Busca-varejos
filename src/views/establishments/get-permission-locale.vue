<template>
    <div class="container-msg">
        <p class="text" v-for="(msg, i) of messages" :key="i">
            {{ msg }}
        </p>
        <router-link v-if="!is_messaging_supported" tag="a" v-bind:to="`/registrar?origin_url=${pathname}`" class="button-create-account">Registre-se</router-link>

        <button type="button" class="button button-second" v-if="show_btn" 
            @click="saveTokenNotification" 
            :disabled="is_loading" 
            :class=" is_loading ? 'active-loading' : '' ">
            <div class="ctn-text-button">
                <p class="text-button">Sim, pode enviar</p>
            </div>
            <span class="spinner-loading-button"></span>
        </button>
    </div>
</template>

<script>
import axios from 'axios';
/*eslint-disable */
// import { requestPermission, setTokenSentToServer, isTokenSentToServer } from '@/firebase/messaging';

export default {
    name:"get-permission-locale",
    data(){
        return {
            error: undefined ,
            is_loading: false,
            messages:[],
            show_btn: undefined,
            is_messaging_supported: true,
            pathname: this.$route.path,
            address: {}
        }
    },
    created(){
        this.address = this.getLocalAddress()
        if(isTokenSentToServer()){
            this.show_btn = false
            this.messages = []
            this.messages.push('Notificação ativada. Te enviaremos um notificação assim que um estabelecimento entrar em operação!')
        }else{
            this.show_btn = true;
            this.messages = [];
            this.messages = [
                'Nenhum estabelecimento encontrado em um raio de 15km do seu endereço!',
                'Podemos te enviar uma notificação quando um estabelecimento entrar em operação?'
            ];
        }
    },
    methods:{
        getLocalAddress(){
            return JSON.parse(window.localStorage.getItem("address"))
        },
        getUrlSharer(){
            return this.$route.query.url_sharer
        },
        async saveTokenNotification(){
            try{
                if(!isTokenSentToServer()){
                    this.is_loading = true;

                    const url_sharer = this.getUrlSharer();
                    const token = await requestPermission();

                    await axios.post('https://api.buscavarejos.com/usuarios/notification',{
                        url_sharer: url_sharer,
                        token: token,
                        geolocation:{
                            latitude:this.address.latitude,
                            longitude:this.address.longitude
                        }
                    });

                    setTokenSentToServer(true)
                    this.show_btn = false
                    this.messages = []
                    this.messages.push('Notificação ativada. Te enviaremos um notificação assim que um estabelecimento entrar em operação!')
                }else{
                    this.show_btn = false
                    this.messages = [];
                    this.messages = [
                        'Sentimos muito, mas não foi possível ativar as notificações'
                    ];
                }
            }catch(error){
                this.error = {
                    msg: '',
                    retry: true
                }

                // Erro por parte do firebase messaging
                if(error.code === "messaging/not-supported"){
                    this.messages = [];
                    this.messages = [
                        "Sentimos muito! Mas seu navegador não suporta receber notificações",
                        "Mas não há problema, crie a sua conta que te avisaremos no seu email"
                    ];
                    this.show_btn = false;
                    setTokenSentToServer(true)
                    return this.is_messaging_supported = false;
                }else
                if(error.code){
                    const experatedErrors = {
                        "messaging/permission-blocked": "Você negou o acesso a sua localização",
                    }
                    const errorMessage = experatedErrors[error.code] ? experatedErrors[error.code] : "Erro desconhecido, por favor, tente novamente"
                    this.error['msg'] = errorMessage
                }
                // Erro por parte do axios
                // Solicitação processada pelo servidor, porém o mesmo retorna um erro
                if (error.response) {
                    this.error['msg'] = error.response.data.msg
                } else
                // Solitação não processada pelo servidor, ocorreu um erro no trejeto da requisição
                if (error.request) {
                    if (error.message === "Network Error") {
                        this.error['msg'] = 'Ops, problema com a conexão com a internet, por favor tente novamente!'
                    }else{
                        this.error['msg'] = 'Ops, deu um problema, por favor tente novamente!'
                    }
                } 
                console.log(error)
                // Despacha um evento de error, que é captada e renderiza pelo component pai
                this.$emit('show-error',this.error)
            }finally{
                this.is_loading = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
     .container-msg{
        width: 80%;
        margin: 0 auto;
    }
    .text{
        text-align: center;
        font-size: 1.7em;
        margin-bottom:20px;
        &:first-child{
            margin-top: 30px;
        }
    }
    .button-create-account{
        width: 100%;
        max-width: 400px;
        font-size: 1.7em;
        margin: 0 auto;
        height: 50px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border-radius: 5px;
        :disabled {
            opacity: .7;
        }
        background: #ed1641;
        border: none;
        color: #fff;
        transition: 250ms;
        &:active {
            transform: scale(.95, .95);
        }
        &:hover {
            color: rgba(0, 0, 0, 0.7);
        }
    }
    .button{
        max-width: 300px;
        margin: 0 auto;
    }
</style>