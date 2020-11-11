<template>
<div>
    <vue-headful 
        title="Busca Varejos - Estabelecimentos"
        description="Delivery de varejos, uma série de estabelecimentos para se comprar online, tudo com praticidade e conforto">
    </vue-headful>
    <custom-header @event-fetch-establishments="loadEstablishments"></custom-header>
    <!--  -->
    <get-permission-locale v-if="notEstablishmentFounded && !error.msg" @show-error=showError></get-permission-locale>
    <!--  -->
    <main>
        <spinner-loading :loading="is_loading"></spinner-loading>
        <!--  -->
        <error-component :msg="error.msg" :retry="error.retry" @event-retry="loadEstablishments" ></error-component>
        <!--  -->
        <div class="container-items" v-if="!error.msg">
            <Item v-for="establishment of establishments" :key="establishment.id" :establishment="establishment"></Item>
        </div>
    </main>
    <!--  -->
</div>
</template>

<script>
import customHeader from './customHeader'
import Item from "./item";
import getPermissionLocale from './get-permission-locale';
import axios from 'axios'

export default {
    name: "establishments",
    components:{
        customHeader,
        Item,
        getPermissionLocale
    },
    data () {
        return {
            is_loading: false,
            establishments: [],
            error: {
                msg: '',
                retry: true
            },
            notEstablishmentFounded: false
        }
    },
    created(){
        this.loadEstablishments()
    },
    methods: {
        showError(error){
            console.log(error)
            this.error = error
        },
        loadEstablishments(){
            // console.log(latitude,longitude,completeAddress)
            const address = this.getLocalAddress();
            if(address){
                this.fetchEstablishments({
                    latitude: address.latitude,
                    longitude: address.longitude
                })    
            }
        },
        fetchEstablishments({latitude, longitude}){
            const url = `https://api.buscavarejos.com/usuarios/estabelecimentos?latitude=${latitude}&longitude=${longitude}`

            this.is_loading = true;
            this.error = {
                msg: '',
                retry: true
            };
            this.establishments = [];
            this.notEstablishmentFounded = false;
            
            axios.get(url)
            .then( response => {
                const establishments = response.data;
                if(!establishments.length){
                    this.notEstablishmentFounded = true;
                }else{
                    this.establishments = establishments
                }
            })
            .catch(error => {
                let msg;
                if (error.response) 
                    msg = error.response.data.msg
                else    
                    msg = 'Ops, ocorreu um problema!';
                    
                this.error = {
                    msg,
                    retry: true
                }
            }) 
            .finally( () => {
                this.is_loading = false
            })      
        },
        getLocalAddress(){
            return JSON.parse(window.localStorage.getItem("address"))
        }
    }
}
</script>

<style lang="scss" scoped>
    main{
        margin-top: 60px;
        padding:20px;
    }
    .container-items{
        width:100%;
        height: auto;
        display:flex;
        justify-content: start;
        flex-direction: column;
        align-items: center;
    }
    .container-spinner-loading{
        margin: 25px 0;        
    }

    @media screen and (max-width:750px){
        main{
            margin-top: 110px;
        }
    }
</style>