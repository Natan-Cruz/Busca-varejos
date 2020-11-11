<template>
<div id="app">
    <vue-headful 
        :title="`Busca Varejos - Suas configurações ${ user.data ? this.user.data.displayName : 'Carregando'}`"
        description="Sua configurações no Busca Varejos">
    </vue-headful>
    <custom-header></custom-header>
    <main>
        <div class="ctn-person-picture">
            <div class="ctn-image">
                <img :src="user.data.photoURL" :alt="user.data.displayName  " class="img-tag-profile-picture" v-if="user.loggedIn && user.data.photoURL">
            </div>
            <p class="p-action p-picture">Alterar foto</p>
        </div>
        <div class="ctn-profile-informations">
            <div class="block-info blc-info-name">
                <p class="p-name-person">{{ user.data.displayName }}</p>
                <p class="p-action">Editar nome</p>
            </div>
            <div class="block-info blc-info-email">
                <p class="p-person-info p-person">{{ user.data.email }}</p>
                <p class="p-person-info p-action">Editar email</p>
            </div>
            <div class="block-info blc-info-senha">
                <p class="p-person-info p-person">******</p>
                <p class="p-person-info p-action">Editar Senha</p>
            </div>
            <div class="block-info blc-info-senha">
                <p class="p-person-info p-person">{{ user.data.phone }}</p>
                <p class="p-person-info p-action">Editar Telefone</p>
            </div>
        </div>
        <!-- <div>
            <div class="container-logged-with spacing" v-if="user.data.providerId === 'facebook.com'">
                <span class="span-icon-service-Oauth icon-facebook"></span>
                <span class="text-medium">Logado com Facebook</span>
            </div>
                <div class="container-logged-with spacing" v-if="user.data.providerId === 'google.com'">
                    <span class="span-icon-service-Oauth icon-google"></span>
                    <span class="text-medium">Logado com Google</span>
                </div>
        </div> -->

        <!-- <div>
            <button class="btn-exit" @click="logout">Sair</button>
        </div> -->
    </main>
</div>
</template>

<script>
import customHeader from "./customHeader";
import { mapGetters } from "vuex";
import firebase from 'firebase/app'


export default {
    name: "configurations",
    components:{
        customHeader
    },
    computed:{
        ...mapGetters({
            user: "user"
        })
    },
    methods:{
        logout(){
            firebase.auth().signOut()
            .then(() => {
                this.$router.push({ path: '/'  });
            })
            .catch( err => {
                console.log(err)
                this.logout()
            })
        }
    }
}
</script>

<style lang="scss" scoped src="./teste.scss"></style>