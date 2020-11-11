<template>
<div class="container-cart">
    <icon-cart :numbers_items_cart="quantityItens"></icon-cart>

    <div class="container-sacola"> 
        <div class="box-relative-cart">
            <div class="background-opacity-black-cart" @click="closeCart"></div>
            <div class="content-cart">
                <div class="header-sacola">
                    <div class="expand-content-icon">
                        <div class="content-expand-icon"></div>
                    </div>
                    <span class="text-medium bold">Meu carrinho</span>
                    <span class="close-icon-cart" @click="closeCart">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>                
                    </span>
                </div>
                <div class="container-scroll">
                    <spinner-loading :loading="cartItems.is_loading"></spinner-loading>
                    <error-component :msg="cartItems.error" :retry="true" @event-retry="$store.dispatch('getCart')"></error-component>
                    <p class="text-medium" style="text-align:center; margin:30px 0;" v-if="!cartItems.items.length && !cartItems.error && !cartItems.is_loading">Carrinho Vazio</p>
                    <item-cart v-else v-for="cart in cartItems.items" :key="cart.establishment.id" :establishment="cart.establishment">
                        <sub-item-cart v-for="item in cart.products" :key="item.id" :item="item"></sub-item-cart>
                    </item-cart>
                </div>
                <footer-cart :amount=cartItems.amount :loading=is_loading :numbers_items_cart="quantityItens" @event-close-cart=closeCart></footer-cart>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import iconCart from './icon-cart'
import itemCart from "./item-cart"
import subItemCart from "./subitem-cart";
import footerCart from "./footer-cart"
import { mapGetters } from "vuex";

export default {
    name:"cart",
    components:{
        iconCart,
        itemCart,
        subItemCart,
        footerCart
    },
    computed:{
        ...mapGetters({
            cartItems: "cart"
        }),
        quantityItens(){
            let numbers = 0;
            if(this.cartItems.items.length)
                this.cartItems.items.forEach(function(item) {
                    numbers += item.products.length;
                })
            
            return numbers;
        }
    },
    data(){
        return{
            is_loading:false,
            top: undefined
        }
    },
    methods:{
        closeCart(){
           const containerCart = document.querySelector('.container-sacola'),
                contentCart = document.querySelector('.content-cart'),
                background = document.querySelector('.background-opacity-black-cart');

            requestAnimationFrame(() => {
                contentCart.style.transform = 'translateY(80vh)';
                background.style.opacity = 0;
            })

            setTimeout(() => {
                containerCart.style.display = 'none'
            }, 250);

            const html = document.querySelector('html')
            if (html.style.removeProperty) {
                html.style.removeProperty("overflow")
            } else {
                html.style.removeAttribute("overflow")
            }
        }
    }
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
