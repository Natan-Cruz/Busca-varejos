<template>
    <div class="footer-cart">
        <div class="content-footer-cart">
            <span class="text-medium bold">Subtotal</span>
            <span class="text-medium" :class="loading === 'true' ? 'skeleton' : '' "> {{ formatPrice(amount) }}</span>
        </div>
        <button @click=redirecToCheckout class="button-go-checkout" v-if="numbers_items_cart > 0">Finalizar compra</button>
    </div>
</template>
<script>
import Format from "../Format";

export default {
    name:"footer-cart",
    props:{
        amount: {
            type: Number,
            required: false,
            default: () => 0
        },
        loading: Boolean,
        numbers_items_cart: Number
    },
    methods:{
        redirecToCheckout(){
            this.$emit("event-close-cart")
            this.$router.push({ path: "/checkout" })
        },
        ...Format("formatPrice")
    }
}
</script>
<style lang="scss" scoped>
    .footer-cart {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .content-footer-cart {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items:center;
        flex-direction: row;
        background: #fff;
        box-shadow: -1px 0 4px rgba(0, 0, 0, .3);
        padding: 20px;
    }
   .skeleton {
        position: relative;
        overflow: hidden;
        width: 64px;
        height: 100%;
        background: #ccc;
        color:#ccc;
        display: block;
        border-radius:5px;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #ccc, #dedede, #ccc);
            animation: progress 1s ease-in-out infinite;
        }
    }

    @keyframes progress {
        0% {
            transform: translate3d(-100%, 0, 0);
        }
        100% {
            transform: translate3d(100%, 0, 0);
        }
    }
    .button-go-checkout{
        width: 100%;
        height: 100%;
        font-size: 1.8em;
        font-weight: bold;
        line-height: 1em;
        color: #fff;
        background:#ed1641;
        display:block;
        text-align: center;
        padding: 20px 0;
        border:none;
        &:hover{
            background:#d3143b;
        }
    }
</style>