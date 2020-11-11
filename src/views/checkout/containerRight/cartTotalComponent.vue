<template>
    <div class="container-amount">
        <div class="row">
            <p class="text-title  bold">Total do pedido</p>
            <p class="text-title" :class="is_loading ? 'skeleton skeleton-amount-order' : '' "> {{ formatPrice(amount) || "--,--" }}</p>
        </div>
    </div>
</template>

<script>
import Format from "@/components/Format";

export default {
    name: "cart-total",
    props:{
        is_loading:{
            type:Boolean,
            required: false,
            default: () => false
        },
        amount: {
            type: Number,
            required: false
        }
    },
    methods:{
        ...Format("formatPrice")
    }
}
</script>

<style lang="scss" scoped> 
    .container-amount{
        margin: 30px 0 15px 0;
    }
</style>