<template>
     <button class="button button-facebook" @click="loginFacebook" :disabled="loading" :class=" loading ? 'active-loading' : '' ">
        <div class="ctn-text-button">
            <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455.73 455.73">
                <path class="cls-1"
                    d="M0,0V455.73H242.7v-176H183.37V207.83H242.7V147.47A79.48,79.48,0,0,1,322.18,68h62v64.62H339.82a25.26,25.26,0,0,0-25.25,25.26v50h68.52l-9.47,71.86H314.57v176H455.73V0Z" />
            </svg>
            <span class="text-button">
                Continue com Facebook</span>
        </div>
        <span class="spinner-loading-button"></span>
    </button>
</template>
<script>
import firebase from 'firebase/app';
import axios from 'axios';

export default {
    name:"button-facebook",
    data(){
        return{
            loading:false
        }
    },
    methods: {
        async loginFacebook (){
            try {
                this.loading = true;
                this.$emit("errorAuth", []);
                
                const provider = new firebase.auth.FacebookAuthProvider();
                const { user } = await firebase.auth().signInWithPopup(provider)

                await axios.post('https://api.buscavarejos.com/usuarios',{
                    uid: user.uid,
                    name: user.displayName,
                    picture: user.photoURL
                })

                this.$store.dispatch('sincronizeCart',{
                    uid: user.uid
                })      
                
                this.$gtag.event("login", { method: "Facebook" })
               
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
    .button{
        margin-bottom: 15px;
    }
    .button-facebook{
        background: #4267B2;
        color: #fff;
    }
</style>