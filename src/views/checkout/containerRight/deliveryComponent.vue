<template>
    <div class="container-delivery" v-if="user.loggedIn && addressUserId">
        <!--  -->
        <p class="text-medium" style="text-align:center; margin:30px 0;" v-if="!cart.items.length && !cart.error && !cart.is_loading">Carrinho Vazio</p>
        <!--  -->
        <div v-if="cart.items.length">
            <span class="text-medium" style="margin: 10px 0;font-size: 2em;display: block;">Taxas de entregas:</span>

            <error-component 
                :msg="error_delivery" 
                :retry="true" 
                @event-retry="loadPricesDelivery(addressUserId)">
            </error-component>

            <spinner-loading 
                :loading="is_loading_delivery" 
                position="relative">
            </spinner-loading>

            <div class="container-list-render" v-if="!is_loading_delivery && !error_delivery">
                <ul class="list-render list-render-delivery">
                    <!--  -->
                    <li class="row-border-bottom" v-for="(item, i) in deliverys.establishments" :key=i>

                        <div v-if="item.error" class="row">
                            <span class="text-medium bold">{{ item.msg }}</span>
                        </div>
                        <div v-else class="row">
                            <span class="text-medium bold">{{ item.name }}</span>
                            <span class="text-medium">{{ formatPrice(item.delivery.areaPrice) }}</span>
                        </div>
                    </li>
                    <!--  -->
                </ul>
                <div class="row_total">
                    <span class="text-medium bold" style="margin-right: 10px;">Total:</span>
                    <span class="text-medium total-delivery placeholder-animation placeholder-animation-price">{{ formatPrice(deliverys.amount) }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import Format from "@/components/Format.js";

export default {
    name: "delivery-component",
    props:{
        addressUserId:{
            type: Number
        },
        user:{
            type: Object,

        },
        cart: {
            type: Object
        }
    },
    data(){
        return{
            is_loading_delivery: false,
            deliverys:{
                items:[],
                amount:""
            },
            error_delivery: undefined
        }
    },
    watch:{
        addressUserId(addressId){
            this.loadPricesDelivery(addressId)
        }
    },
    methods:{
        ...Format('formatPrice'),
        // Funcão responsavel por obter preços da entrega
        async loadPricesDelivery(id_address){
            if(!id_address)
                return "addressId necessário"
            if(!this.user.loggedIn)
                return "Necessario login"

            this.error_delivery = undefined;
            this.is_loading_delivery = true;

            try {
                const url = `https://api.buscavarejos.com/usuarios/checkout/delivery/${id_address}`;
                const { data } = await axios.get(url,{
                    headers:{
                        "uid": this.user.data.uid
                    }
                })
                const { amount, establishments } = data
                this.deliverys['amount'] = amount;
                this.deliverys['establishments'] = establishments;

                this.$emit("calc-amount", {
                    origin: "delivery",
                    amount: amount
                })
            } catch (error) {
                console.error(error)
                this.error_delivery = "Ops, ocorreu algum problema ao tentar carregar o total das entregas"
            }
            finally{
                this.is_loading_delivery = false
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .container-delivery {
        position: relative;
        padding-bottom:20px
    }
    .container-select {
        width: 100%;
        height: auto;
        cursor: pointer;
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
        }
        li:hover {
            background: rgba(126, 126, 126, 0.1);
        }
        li:active {
            background: rgba(179, 125, 27, .3);
        }
    }

    .btn-link-option {
        padding: 0 !important;
        background: #ed1641;
        color: #fff;
        a {
            padding: 20px 30px;
            width: 100%;
            display: inline-block;
        }
    }
    #input-select {
        display: none;
        &:checked+.label-select {
            box-shadow: 0 1px 4px rgba(0, 0, 0, .4);
        }
        &:checked~.container-options {
            height: min-content;
        }
        &:checked+label>.svg-arrow-select {
            transform: rotate(0);
        }
    }
</style>