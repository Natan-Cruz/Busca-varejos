<template>
    <div>
        <vue-headful 
            :title="title_page"
            :description="description_page">
        </vue-headful>
        <!--  -->
        <custom-header :establishment_name=establishment.name></custom-header>
        <!--  -->
        <main >
            <message-alert :message=establishment.alert_message></message-alert>
            <message-error :error=error @event-retry=fetchEstablishment ></message-error>
            
            <div v-if="!error.msg" style="position:relative; min-height:calc(100vh + 234px)">
                <link-back-page></link-back-page>
                <banner 
                    :source_banner=establishment.banner
                    :openingHours=establishment.opening_hours
                    :inOperation=establishment.in_operation >
                </banner>
                <informations :source_logo=establishment.logo  :establishment=establishment ></informations>
                <nav-bar></nav-bar>
            
                <transition name="sub-pages-establishment">
                    <router-view :informations=informations ></router-view>
                </transition>
            </div>
        </main>
    </div>  
</template>

<script>
import customHeader from './customHeader'

import linkBackPage from './back-page';
import banner from './banner';
import informations from './informations';
import navBar from './nav-bar'

import messageAlert from "./components/messageAlertComponent";
import messageError from "./components/messageErrorComponent";

import Axios from 'axios';

export default {
    name: "establishment",
    components:{
        customHeader,
        linkBackPage,
        banner,
        informations,
        navBar,
        messageAlert,
        messageError
    },
    computed:{
        title_page(){
            // Carregando informações do produto
            if(this.is_loading){
                return "Carregando...";
            }else{
                // Deu erro
                if(this.error.msg)
                    return this.error.msg;
                else
                    return this.establishment.name;
            }
        },
        description_page(){
            return `Pagina de produtos da ${this.establishment.name || 'loja'}, compre direto pela internet e receba em casa por delivery`
        },
        informations(){
            return {
                is_loading: this.is_loading,
                establishment: this.establishment
            }
        },
    },
    data(){
        return {
            is_loading: true,
            establishment: {},
            error:{
                msg: "",
                retry: false
            }
        }
    },
    created(){
        this.fetchEstablishment();
    },
    methods:{
        fetchEstablishment() {
            this.is_loading = true;
            this.error = {
                msg: "",
                retry: false
            }
            const url = `https://api.buscavarejos.com/usuarios/estabelecimentos/${this.$route.params.establishment}`; 
            Axios.get(url)
            .then( ({ data: establishment }) => this.establishment = establishment )
            .catch( error => {
                if (error.response) {
                    const errorName = error.response.data.name,
                        errorMsg = error.response.data.message;
                    
                    if(errorName === "BvjError")
                        this.error['retry'] = true

                    this.error['msg'] = errorMsg
                } else{
                    this.error['msg'] = "Ops, ocorreu algum problema!"
                    this.error['retry'] = true
                }
            })
            .finally(() => this.is_loading = false)
        },
        
    }
}
</script>

<style lang="scss" scoped>
    main{
        margin-top:60px;
    }
    .background-closed{
        width: 100%;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.5);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 500;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .alert-closed{
        font-size: 2.4em;
        line-height: 1em;
        color:#ed1641;
        margin: 33px 100px;
    }
    @media screen and (max-width:750px){
        main{
            margin-top: 110px;
        }
    }
</style>