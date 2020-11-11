<template>
     <div style="padding-bottom:20px">  
        <!--  -->
        <spinner-loading :loading="cart.is_loading" position="relative"></spinner-loading>
        <!--  -->
        <error-component :msg="cart.error" :retry="true" @event-retry="$store.dispatch('getCart')"></error-component>
        <!--  -->
        <p class="text-medium" style="text-align:center; margin:30px 0;" v-if="!cart.items.length && !cart.error && !cart.is_loading">Carrinho Vazio</p>
        <!--  -->
        <div v-if="cart.items.length && !cart.error">
            <div class="container-list-render">
                <div class="list-render list-render-checkout">
                    <div class="row row-border-bottom" v-for="(item, i) in cartResume.items" :key=i>
                        <span class="text-medium bold">{{ item.name }}</span>
                        <span class="text-medium">{{ formatPrice(item.amount) }}</span>
                    </div>
                </div>
                <div class="row_total">
                    <span class="text-medium bold" style="margin-right: 10px;">Total:</span>
                    <span class="text-medium total-checkout">{{ formatPrice(cart.amount) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Format from "@/components/Format.js";

export default {
    name: "cart-resume",
    props:{
        cart: {
            type: Object
        }
    },
    computed:{
        cartResume(){
            let cartResume = {
                amount: 0,
                items:[]
            }
            this.cart.items.forEach(({establishment, products}) => {
                cartResume.items.push({
                    name: establishment.name,
                    amount: products.reduce( (acc,cur) => acc += parseFloat(cur.amount), 0)
                })
            });
            this.$emit("calc-amount", {
                origin: "cart",
                amount: this.cart.amount
            })
            return cartResume
        }
    },
    methods:{
        ...Format('formatPrice')
    }
}
</script>

<style lang="scss" scoped>
    
    
</style>