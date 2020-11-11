<template>
    <button class="button button-primary" 
        @click="$emit('event-add-in-cart')" 
        :class="{ 'active-loading': button_is_loading}">
        <div class="ctn-text-button">
            <span class="text-button">Adicionar no carrinho</span> 
            <span class="text-button">{{ formatPrice(amount) }}</span> 
        </div>
        <span class="spinner-loading-button"></span>
    </button>
</template>

<script>
import Format from "@/components/Format.js";

export default {
    name:"button-add-cart",
    props: {
        button_is_loading: Boolean,
        amount: Number
    },
    methods: {
        ...Format("formatPrice")
    }
}
</script>

<style lang="scss" scoped>
    .button{
        position: fixed;
        bottom:0;
        left:0;
        border: {
            top-left-radius: 5px;
            top-right-radius: 5px;
            bottom-left-radius: 0;
            bottom-right-radius: 0;
        }
        z-index: 1000;
    }
    .ctn-text-button{
        width: 100%;
        justify-content: space-around;
    }
    @media screen and (min-width:650px) {
        .button{
            position: relative;
            margin: 15px 0;
            border-radius: 5px;
        }
    }
</style>