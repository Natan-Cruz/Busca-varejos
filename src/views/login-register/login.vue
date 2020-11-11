<template>
    <div class="main">
        <vue-headful 
            title="Busca Varejos - Entrar"
            description="Bem vindo novamente ao Busca Varejos">
        </vue-headful>
        <div class="container-form">
            <h1 class="title">Bem vindo(a) de volta!</h1>
            <form action="#" @submit.prevent="loginLocal">
                <div class="group-input">
                    <label for="input-email" class="label-input">Email:</label>
                    <input type="email" id="input-email" class="input" placeholder="seu@email.com" v-model.trim="email">
                </div>
                <div class="group-input">
                    <label for="input-password" class="label-input">Senha:</label>
                    <div style="position: relative;">
                        <input type="password" id="input-password" class="input" placeholder="Sua senha" v-model.trim="password" autocomplete="current-password"> 
                        <span class="icon-eye" v-on:click="showPassword">
                            <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                                clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414">
                                <path fill="none" d="M.151 0h128v128h-128z" />
                                <clipPath id="a">
                                    <path d="M.151 0h128v128h-128z" />
                                </clipPath>
                                <g clip-path="url(#a)">
                                    <path
                                        d="M64.444 30.001c24.374.19 49.922 9.735 62.228 30.594.585.992 1.323 2.479 1.323 2.479.739 1.976-1.234 4.17-2.723 6.404C112.337 88.877 87.645 98 63.765 98c-24.269 0-50.062-9.445-62.05-30.589C1.1 66.326.336 64.69.336 64.69c-.52-1.494.721-3.14 1.684-4.753 11.808-19.784 36.516-29.743 61.276-29.936h1.148zm-1.127 4c-21.626.169-43.742 7.796-56.05 25.208-1.057 1.495-2.034 3.052-2.869 4.682 0 0 3.081 5.632 6.767 9.721 13.377 14.834 34.636 20.785 54.803 20.365 22.83-.475 46.856-9.45 57.836-29.797 0 0 .045-.454-.168-.839-10.846-19.342-35.36-29.154-59.213-29.34-.369-.001-.737-.001-1.106 0zm1.028 15c9.905.188 17.976 11.856 13.325 21.502-4.061 8.424-16.853 11.041-23.866 4.353-8.237-7.855-3.561-25.595 10.154-25.855h.387zm-.336 4c-7.254.137-13.177 8.704-9.773 15.764 2.981 6.185 12.358 8.102 17.502 3.196 3.46-3.298 4.392-8.958 2.086-13.2-1.921-3.536-5.498-5.788-9.815-5.76z"
                                        fill-rule="nonzero" />
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
                <!-- <router-link v-bind:to=" '/resetar_senha?origin_url=' + origin_url" class="link-form">Redefinir senha</router-link> -->
                <button type="button" @click="sendEmail" class="link-form" :disabled="is_loading_send_email"> {{ message_button}} </button>
                <router-link v-bind:to=" '/registrar?origin_url=' + origin_url " class="link-form" style="float: right;margin-bottom: 5px;">Criar usuario</router-link>

                <div class="container-message" v-if="errors.length">
                    <p class="text-medium">Por favor corrija os erro(s) abaixo:</p>
                    <ul class="list-errros">
                        <li class="message" v-for="error in errors" :key="error" :style="'opacity:1;height:min-content'">
                            {{ error }}
                        </li>
                    </ul>
                </div>
                
                <button-local :loading=loading></button-local>

                <p class="span-between">OU</p>    
            </form>
            <button-facebook @errorAuth='renderError'></button-facebook>
            <button-google @errorAuth='renderError'></button-google>
        </div>
    </div>

</template>

<script>
import firebase from 'firebase/app';
import buttonFacebook from './buttons/button-facebook';
import buttonGoogle from './buttons/button-google';
import buttonLocal from './buttons/button-local';
import messagePopup from '../../components/message-popup/message-popup';

export default {
    name: 'login',
    components:{
        buttonFacebook,
        buttonGoogle,
        buttonLocal
    },
    computed:{
        message_button(){
            return this.is_loading_send_email ? "Carregando..." : "Resetar senha"
        }
    },
    data(){
        return {
            errors:[],
            password:'',
            email:'',
            origin_url: this.getRedirect(),
            loading: false,
            is_loading_send_email: false
        }
    },
    methods: {
        sendEmail(){
            this.is_loading_send_email = true;
            firebase.auth().sendPasswordResetEmail(this.email)
                .then( () => {
                    messagePopup("Link para recuperar a senha enviado para seu email",4000)
                })
                .catch( () => {
                    messagePopup("Ops, de algum erro! Por favor tente novamente",4000)
                })
                .finally(() => this.is_loading_send_email = false);
        },
        renderError(errors){
            this.errors = errors
        },
        checkForm(){            
            if(this.email && this.password){
                return true
            }

            // 1º Verifica se email foi digitado
            if(!this.email){
                // Email nao digitado, retorna esse error
                this.errors.push("Email requirido")
            }else{
                // Email foi digitado, e será testado
                const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                if(!regex.test(this.email)){
                    // Não passou no teste
                    this.errors.push("Email invalido")
                }
            }
            // Verifica se a senha foi digitada
            if(!this.password){
                this.errors.push("Senha requirida")
            }

            return false
        },
        async loginLocal() {
            try {
                // Reseta arrays de errors
                this.errors = [];

                // Verifica se formulario está correto
                if(!this.checkForm()) return;

                this.loading = true;
                // Tenta o login

                const { user } = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)

                this.$store.dispatch('sincronizeCart',{
                    uid: user.uid
                })    
                
                this.$gtag.event('login', { method: 'Local' })

                this.$router.replace({ path: this.getRedirect() });
            } catch (error) {
                // Deu ruim!
                const errorCode = error.code

                const experatedErrors = {
                    "auth/wrong-password": "Senha incorreta",
                    "auth/user-not-found": "Conta não encontrada",
                    "auth/invalid-email": "Email invalido",
                    "auth/network-request-failed": "Erro na conexão com a internet"
                }
                const errorMessage = experatedErrors[error.code] ? experatedErrors[error.code] : "Erro desconhecido, por favor, tente novamente"
                // Salva um erro generico no arrays de errors
                this.errors = [];
                this.errors.push(errorMessage);
                // Mostra no navegador, para teste somente
                console.log(errorCode)
                console.log(errorMessage)
            }finally{
                this.loading = false;
            }
           
        },
        showPassword(){
            const inputPassword = document.getElementById('input-password');

            let type = inputPassword.type;
            if(type === "password")
                inputPassword.setAttribute('type','text')
            else
            if(type === "text")
                inputPassword.setAttribute('type','password')
        
        },
        getRedirect(){
            return this.$route.query.origin_url || '/'
        }
    }
}
</script>

<style lang="scss" scoped src="./style.scss"></style>