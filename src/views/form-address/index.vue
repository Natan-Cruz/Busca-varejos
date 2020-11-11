<template>
   <div>
        <vue-headful 
            title="Busca Varejos - Novo endereço"
            description="Adicionar um novo endereço no Busca Varejos">
        </vue-headful>
        <head-vue></head-vue>
        <main>
            <h1 class="title">Novo endereço</h1>
            <!--  -->
            <search-address-component @event-teste=teste></search-address-component>
            <!--  -->
            <hr>
            <!--  -->
            <container-form-address :uid=user.data.uid ref="form_address"></container-form-address>
        </main>
   </div>
</template>

<script>
import headVue from './customHeader';
import { mapGetters } from 'vuex';
import searchAddressComponent from "./searchAddress"
import containerFormAddress from "./containerFormAddress";

export default {
    name:"form-address",
    components:{
        headVue,
        searchAddressComponent,
        containerFormAddress
    },
    computed:{
        ...mapGetters({
            user: "user"
        })
    },
    methods:{
        teste(address){
            this.$refs['form_address'].setAddress(address)
        }
    }
}
</script>
<style lang="scss" scoped>
    main {
        width: 80%;
        max-width: 600px;
        margin: 0 auto;
        padding-top: 60px;
    }

    .container-hr {
        width: 100%;
        height: 2px;
        padding: 15px;
    }

    hr {
        width: 100%;
        height: 1px;
        border: solid 1px #ccc;
        position: absolute;
        left: 0;
    }

    .title {
        font-size: 2.5em;
        font-weight: bold;
        margin-top: 10px;
    }
    
</style>