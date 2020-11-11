<template>
    <div class="menu-left">
        <div class="background-menu-left" @click="$emit('event-close-menu')"></div>
        <div class="content-menu-left">
            <!--  -->
            <div class="container-not-logged" v-if="!user.loggedIn">
                <button @click="to(`/login?origin_url=${pathname}`)" class="button button-primary text-medium">Entrar</button>
                <span class="text-medium bold span-between-menu-left">Ou</span>
                <button tag="a" @click="to(`/registrar?origin_url=${pathname}`)" class="button button-primary text-medium">Registre-se</button>
            </div>
            <!--  -->
            <div class="container-logged">
                <div class="container-options-user" v-if="user.loggedIn">
                    <div class="content-img">
                        <img v-bind:src="`${ user.data ? user.data.photoURL : '' }`" v-if="user.data.photoURL" alt="">
                    </div>
                    <div class="group-spans">
                        <span class="span-menu-left">{{ user.data.displayName }}</span>
                    </div>
                </div>
                <ul class="group-pages">
                    <li class="li-page" @click="to(`/estabelecimentos`)" :class=" { 'li-page-actual': setMarker('estabelecimento') } ">
                        <p class="link-page">Estabelecimentos</p>
                    </li>
                    <div v-if="user.loggedIn">
                        <li class="li-page" @click="to(`/pedidos`)" :class=" { 'li-page-actual': setMarker('pedidos') } ">
                            <p class="link-page">Meus pedidos</p>
                        </li>
                        <li class="li-page" @click="to(`/enderecos`)" :class=" { 'li-page-actual': setMarker('enderecos') } ">
                            <p class="link-page">Meus endereços</p>
                        </li>
                        <li class="li-page" @click="to(`/configuracoes`)" :class=" { 'li-page-actual' : setMarker('configuracoes') } " >
                            <span class="link-page" :class="{ 'attention-detail': attention }" :title="attention && 'Complete seu perfil' ">Configurações</span>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'menu-left-component',
    computed:{
        ...mapGetters({
            user: "user"
        }),
        pathname(){
            return this.$route.path
        }
    },
    data(){
        return{
            attention: false
        }
    },
    methods:{
        to(path){
            this.$emit("event-close-menu")
            if(this.$route.path === path)
                return
            setTimeout(() => {
                this.$router.push({ path: path})
            }, 130);
        },
        setMarker( path ){
            if(this.pathname.indexOf(path) > 0)
                return true;
            else
                return false
        }
    }
  }
</script>

<style lang="scss" scoped src="./style.scss"></style>