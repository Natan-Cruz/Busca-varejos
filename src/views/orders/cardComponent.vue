<template>
    <li class="card">
        <div class="row spacing">
            <p class="text-medium">Código do pedido: <span class="sub-text bold"> #{{ order.id_order }} </span></p>
        </div>
        <div class="spacing">
            <span class="text-medium bold"> {{ order.name }} </span>
        </div>
        <div class="spacing">
            <span class="text-medium bold">Total:</span>
            <span class="text-medium"> {{ formatPrice(order.amount) }}</span>
        </div>

        <div>
            <div class="spacing">
                <span class="text-medium bold">Realizado em:</span>
                <p class="text-medium" style="margin: 5px 0 0 15px;"> {{ new Date(order.createdAt).toLocaleString() }} </p>
            </div>
            <div class="spacing">
                <span class="text-medium bold">status:</span>
                <span class="text-medium"> {{ order.status }} </span>
            </div>
        </div>
        <router-link :to="`/pedidos/${this.order.id_order}`" class="button button-second text-medium" @click="$emit('event-select-order', order.id_order)">
            Mais detalhes
        </router-link>
    </li>
</template>

<script>
import Format from "@/components/Format";

export default {
    name:"item-order",
    props:{
        order:{
            type:Object
        }
    },
    methods:{
        ...Format("formatPrice")
    }
}
</script>

<style lang="scss" scoped>
    .spacing{
        margin: 5px 0;
        padding: 7px 0;
        border-bottom: solid 1px #c3c3c3;
    }
    .button{
        margin-top: 20px;
    }
    // 
    .card{
        width: 100%;
        height: 300px;
        background-color: #fff;
        box-shadow: 0 3px 6px rgba($color: #000000, $alpha: 0.3);
        border-radius: 5px;
        padding: 10px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        padding: 7px 20px;
    }
</style>