<template>
   <div class="content-block left-block container-products">
        <div class="subheader-content">
            <h2 class="text-title">Lista de produtos</h2>
            <span class="close"  @click="$emit('event-translate-x')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
            </span>
        </div>
        <div class="content-products-cart">
            <!--  -->
            <spinner-loading :loading="cart.is_loading"></spinner-loading>
            <!--  -->
            <error-component :msg="cart.error" :retry="true" @event-retry="$store.dispatch('getCart')"></error-component>
            <!--  -->
            <p class="text-medium" style="text-align:center; margin:30px 0;" 
                v-if="!cart.items.length && !cart.error && !cart.is_loading">Carrinho Vazio</p>
            <!--  -->
            <div class="container-cart-scroll" v-if="cart.items.length && !cart.error">
                <!--  -->
                <p class="text-medium" style="text-align:center; margin:30px 0;" v-if="cart && cart.items.length <= 0">Carrinho Vazio</p>
                <!--  -->
                <item-cart v-else v-for="cart in cart.items" :key="cart.establishment.id" v-bind:establishment="cart.establishment">
                    <sub-item-cart v-for="item in cart.products" :key="item.id" v-bind:item="item"></sub-item-cart>
                </item-cart>
                <!--  -->
            </div>
        </div>
    </div>
</template>

<script>
import itemCart from "@/components/cart/item-cart";
import subItemCart from "@/components/cart/subitem-cart";

export default {
    name:"container-left",
    components:{
        itemCart,
        subItemCart
    },
    props:{
        user: Object,
        cart:Object,
    },
    data(){
        return {
            is_loading: false
        }
    }
}
</script>

<style lang="scss" scoped src="./cart.scss"></style>
<style lang="scss" scoped>
    .left-block {
        overflow : {
            x: hidden;
            y: auto
        };
    }
    .text-title{
        font-size:2.2em;
        line-height:1em;
        font-weight: bold;
    }

    .content-products-cart {
        width: 100%;
        min-height: 50px;
        margin-top: 20px;
        position: relative;
    }
    .subheader-content{
        position: relative;
    }
    .close {
        width: 36px;
        height: 36px;
        padding: 5px;
        cursor: pointer;
        display: block;
        border-radius: 50%;
        position: absolute;
        right: -7px;
        top: -7px;
        display: none;
        svg {
            width: 100%;
            height: 100%;
            pointer-events: none;
            transition: 100ms;
        }
        
        &:active {
        background: #e4e4e4;
        }
        &:active svg {
            transform: scale(.6);
        }
    }

    @media screen and (max-width:750px) {
        .close {
            display: block;
        }
    }
    .span-name-establishment{
        margin-left: 0 !important;
    }
    .container-item{
        width: 100%;
    }

</style>