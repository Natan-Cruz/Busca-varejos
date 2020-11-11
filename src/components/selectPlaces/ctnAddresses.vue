<template>
    <div class="separation-wrapper" @click="$emit('event-define-focus', 3)">
        <div v-if="loggedIn">
            <p class="text-medium bold">Seus endereços salvos:</p>

            <ul class="list-result-address" @click="selectAddress" style="margin:0">
                <li v-for="(address, i) in addresses" :key="i" 
                    :data-latitude="address.latitude" 
                    :data-longitude="address.longitude" tabindex="0">
                    <p class="sub-text" v-if="address.name">{{ address.name }}</p>
                    <span class="sub-text"> {{ formatFullAddress(address) }} </span>
                </li>
            </ul>
        </div>
        <router-link :to="linkToLogin" class="link-footer" v-else >Já tem uma conta? <span class="sub-text bold"> Entre aqui</span></router-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:"ctn-addresses",
    props:{
        loggedIn:{
            type: Boolean
        },
        uid: {
            type: String
        }
    },
    computed:{
        linkToLogin(){
            return `/login?origin_url=${this.$route.path}`
        }
    },
    data(){
        return{
            addresses:[]
        }
    },
    created(){
        this.getAddressUser()
    },
    methods:{
        getAddressUser(){
            this.errorAddressUser = null;

            if(!this.loggedIn) return;
        
            axios.get('https://api.buscavarejos.com/usuarios/enderecos',{
                headers:{
                    "uid": this.uid
                }
            })
            .then( response => {
                this.addresses = response.data
            })
            .catch( error => {
                this.errorAddressUser = {
                    msg: '',
                    retry: true
                }
                if (error.response) {
                    this.errorAddressUser['msg'] = error.response.data.msg                    
                } else if (error.request) {
                    if (error.message === "Network Error") {
                        this.errorAddressUser['msg'] = 'Ops, problema com a conexão com a internet, por favor tente novamente!'
                    }else{
                        this.errorAddressUser['msg'] = 'Ops, deu um problema, por favor tente novamente!'
                    }
                } 
            })
        },
        selectAddress(e){
            const latitude = e.target.getAttribute("data-latitude"),
                longitude = e.target.getAttribute("data-longitude"),
                completeAddress = e.target.textContent;

            this.$emit("event-set-current-place",{
                latitude,
                longitude,
                completeAddress
            })
        },
        formatFullAddress(address){
            return `${ address.street } ${ address.number ? " - Nº" + address.number : '' } - ${ address.city } - ${ address.state }`;
        }
    }
}
</script>

<style lang="scss" scoped>
     // 
    .list-result-address{
        width:100%;
        height: auto;
        max-height: 200px;
        overflow: {
            x:hidden;
            y:auto
        };
        margin:10px 0;
        li{
            font-size:1.6em;
            cursor: pointer;
            transition: background 200ms, padding 200ms, transform 150ms;
            padding: 5px 0;
            border-bottom:solid 1px #ccc;
            margin: 1px;
            line-height: 1.2em;
        }
        li:last-child{
            border:none;
        }
        li:hover, li:focus{
            background-color: #ececec;
            padding: 5px;
        }
        li:active{
            transform: scale(0.97)
        }
    }
    // 

    .link-footer{
        font-size:1.6em;
        line-height: 1em;
        color: #ed1641;
        display: block;
        text-align: center;
        margin-top: 10px;
        cursor: pointer;

        &:hover{
            text-decoration: underline;
        }
    }
</style>