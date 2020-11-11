<template>
     <button class="button button-google" @click="loginGoogle" :disabled="loading" :class=" loading ? 'active-loading' : '' ">
        <div class="ctn-text-button">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path class="cls-1"
                    d="M5.32,14.5l-.84,3.12-3.05.07A12,12,0,0,1,1.34,6.48h0L4.06,7l1.19,2.7a7.22,7.22,0,0,0,.07,4.82Z" />
                <path class="cls-1"
                    d="M23.79,9.76A11.74,11.74,0,0,1,24,12a12.21,12.21,0,0,1-.26,2.51,12,12,0,0,1-4.23,6.85h0l-3.42-.18-.49-3a7.17,7.17,0,0,0,3.08-3.65H12.26V9.76H23.79Z" />
                <path class="cls-1"
                    d="M19.51,21.36h0A12,12,0,0,1,1.43,17.69L5.32,14.5A7.14,7.14,0,0,0,15.6,18.16Z" />
                <path class="cls-1"
                    d="M19.66,2.76,15.77,6A7,7,0,0,0,12,4.87,7.13,7.13,0,0,0,5.25,9.68L1.34,6.48h0A12,12,0,0,1,19.66,2.76Z" />
            </svg>
            <span class="text-button">
                Continue com Google</span>
        </div>
        <span class="spinner-loading-button"></span>
    </button>
</template>
<script>
import firebase from 'firebase/app';
import axios from 'axios';

export default {
    name:"button-google",
    data(){
        return{
            loading: false
        }
    }, 
    methods:{
        async loginGoogle(){
            try {
                this.loading = true;
                this.$emit("errorAuth", []);

                const provider = new firebase.auth.GoogleAuthProvider();
                const { user } = await firebase.auth().signInWithPopup(provider)

                await axios.post('https://api.buscavarejos.com/usuarios',{
                    uid: user.uid,
                    name: user.displayName,
                    picture: user.photoURL
                })
               
                this.$store.dispatch('sincronizeCart',{
                    uid: user.uid
                })      
                
                this.$gtag.event('login',  { method: 'Google' })

                this.$router.replace({ path: this.getRedirect() });
            } catch (error) {
                const experatedErrors = {
                    "auth/popup-closed-by-user": "Você fechou o popup de autenticação",
                    "auth/network-request-failed": "Erro na conexão com a internet"
                }
                const errorMessage = experatedErrors[error.code] ? experatedErrors[error.code] : "Erro desconhecido, por favor, tente novamente"
                // Salva um erro generico no arrays de errors
                this.$emit("errorAuth", [errorMessage]);
                console.log(error)
            }finally{
                this.loading = false;
            }
        },
        getRedirect(){
            return this.$route.query.origin_url || '/'
        }
    }
}
</script>
<style lang="scss" scoped src="./button.scss"></style>
<style lang="scss" scoped>
    .button-google{
        background: #DB4437;
        color: #fff;
    }
</style>