<template>
<div id="app">
    <vue-headful 
        :title="`Busca Varejos - Suas configurações ${ user.data ? this.user.data.displayName : 'Carregando'}`"
        description="Sua configurações no Busca Varejos">
    </vue-headful>
    <custom-header></custom-header>
    <main>
        <h1 class="title-content">Configurações</h1>
        <!--  -->
        <profile-component :user=user ></profile-component>
        <!--  -->
        <div class="wrapper-informations">
            <button class="button button-primary btn-logout" @click=logout>Sair</button>
        </div>
    </main>
</div>
</template>

<script>
import customHeader from "./customHeader";
import profileComponent from "./profileComponent";

import { mapGetters } from "vuex";
import firebase from 'firebase/app'


export default {
    name: "configurations",
    components:{
        customHeader,
        profileComponent
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

<style lang="scss" scoped src="./style.scss"></style>