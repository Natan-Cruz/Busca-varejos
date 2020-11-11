<template>
    <div style="padding-bottom:20px">
        <p class="text-title spacing-between-container-rows">Selecionar endereço</p>
        <!--  -->
        <error-component :msg="error_addresses" :retry="true" @event-retry="getAddressUser"></error-component>
        <!--  -->
        <spinner-loading :loading="is_loading_addresses" position="relative"></spinner-loading>
        <!--  -->
        <div class="container-select" v-if="!(error_addresses || is_loading_addresses) && addresses.length">
            <input type="checkbox" id="input-select" v-model="checked_select_address">

            <label for="input-select" class="label-select">
                <span class="select-query-orders">{{ current_address_complete }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="svg-arrow-select" :style="checked_select_address ? 'transform:rotate(0)' : '' ">
                    <path class="path" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            </label>

            <ul class="container-options" @click="selectAddress" :style="checked_select_address ? 'height:auto;overflow-y:auto': '' ">
                <li v-for="(address, i) in addresses" :key="i" :data-id="address.id" tabindex="0" :class="{ 'bold': address.id == currentAddressId }">
                    <p class="sub-text" 
                        style="margin-bottom: 5px; padding-bottom:5px;"
                        :style="{ 'border-bottom: solid 1px #ccc': address.name }">{{ address.name }}</p>
                    <span class="sub-text">{{ address.street }} {{ address.number ? " - Nº" + address.number : '' }} - {{ address.city }} - {{ address.state }} </span> </li>

                <router-link :to="'/enderecos/novo?redirect=/checkout'" class="button button-tertiary text-medium">Adicionar endereço</router-link>
            </ul>
        </div>
        <!--  -->
        <p class="text-medium" style="text-align:center; margin:30px;" v-if="!user.loggedIn">Para cadastrar um endereço é necessário ter uma conta, entre ou registre-se</p>

        <div v-if="!addresses.length && !is_loading_addresses && !error_addresses && user.loggedIn">
            <router-link :to="'/enderecos/novo?redirect=/checkout'" class="button button-second text-medium">Adicionar endereço</router-link>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    name: "address-component",
    props:{
        user:{
            type: Object
        }
    },
    data(){
        return{
            checked_select_address:false,
            addresses:[],
            currentAddressId: undefined,
            error_addresses: undefined,
            is_loading_addresses: false,
            current_address_complete: ""
        }
    },
    created(){
        if(this.user.loggedIn)
            this.getAddressUser()
    },
    watch:{
        currentAddressId(){
            const currentAddress = this.addresses.filter( adr => {
                if(adr.id === this.currentAddressId)
                    return adr
            })[0]
            
            if(!currentAddress)
                return;

            if(currentAddress.name)
                this.current_address_complete = currentAddress.name
            else
                this.current_address_complete = this.formatAddress(currentAddress)
        }
    },
    methods:{
        selectAddress(e){
            const node = e.target.closest('li')
            if(!node)
                return
            
            const idAddress = node.getAttribute("data-id")

            this.checked_select_address = false
            this.currentAddressId = parseInt(idAddress)
            this.$emit("event-get-prices-deliverys", parseInt(idAddress))
        },
        // Obtem todos os endereços do usuarios
        getAddressUser(){
            this.error_addresses = undefined;
            this.is_loading_addresses = true;

            Axios.get('https://api.buscavarejos.com/usuarios/enderecos',{
                headers:{
                    "uid": this.user.data.uid
                }
            })
            .then(  ({ data: addresses }) => {
                if(!addresses.length) 
                    return 

                this.addresses = addresses
                this.currentAddressId = addresses[0].id;

                this.$emit("event-get-prices-deliverys", addresses[0].id)
            })
            .catch( error => {
                console.log(error)
                this.error_addresses = "Ops, ocorreu algum problema ao tentar carregar seus endereços"
            })
            .finally(() => this.is_loading_addresses = false)
        },
        formatAddress(address){
             return `${address.street } 
                    ${ address.number ? " - Nº" + address.number : '' } - 
                    ${ address.city } - ${ address.state}`
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-address {
        position: relative;
    }
    .container-select {
        width: 100%;
        height: auto;
        cursor: pointer;
        position: relative;
    }

    .label-select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        padding: 0 15px;
        margin: 10px 0;
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .25);
    }

    .select-query-orders {
        width: calc(100% - 42px);
        font-size: 1.7em;
        font-weight: bold;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .svg-arrow-select {
        transform: rotate(180deg);
        transition: 200ms;
        position: absolute;
        top: 13px;
        right: 15px;
    }
    #input-select {
        display: none;
    }

    .container-options {
        width: 100%;
        height: 0;
        max-height: 228px;
        overflow: hidden;
        position: absolute;
        top: 58px;
        background: #fff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        transition: 200ms;
        z-index: 2000;
        li {
            height: auto;
            font-size: 1.7em;
            line-height: 1em;
            padding: 20px 30px;
            transition: 200ms;
            border-bottom: 1px solid #ccc;
        }
        li:last-child{
            border:none;
        }
        li:hover {
            background: rgba(126, 126, 126, 0.1);
        }
        li:active {
            background: rgba(179, 125, 27, .3);
        }
    }

    // "Adicionar endereço"
    .button{
        max-width: 500px;
        margin:0 auto;
    }

</style>