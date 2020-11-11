<template>
    <ul class="container-informations-order">
        <li>
            <span class="text-medium bold">Nome do estabelecimento: </span>
            <span class="text-medium" style="white-space: pre;"> {{ order.name }} </span>
        </li>
        <li>
            <span class="text-medium bold">Realizado as:</span>
            <span class="text-medium" style="margin-left: 5px;"> {{ timedate }} </span>
        </li>
        <li>
            <span class="text-medium bold ">Pagamento:</span>
            <span class="text-medium"> {{ type_payment }} </span>
        </li>
        <li>
            <span class="text-medium bold ">Total dos itens:</span>
            <span class="text-medium"> {{ formatPrice(order.subtotal) }} </span>
        </li>
        <li>
            <span class="text-medium bold ">Total da entrega:</span>
            <span class="text-medium"> {{ formatPrice(order.delivery) }} </span>
        </li>
        <li>
            <span class="text-medium bold ">Total do pedido:</span>
            <span class="text-medium"> {{ formatPrice(order.amount) }} </span>
        </li>
    </ul>
</template>

<script>
import Format from "@/components/Format";

export default {
    name: "container-informations-order",
    props:{
        order:{
            type: Object
        }
    },
    computed:{
        timedate(){
            const date = new Date(this.order.createdAt)
            return date.toLocaleTimeString() + ' - ' + date.toLocaleDateString()
        },
        type_payment(){
            let type = ''
            if(this.order.type_payment === 'money') {
                return 'Dinheiro'
            }else
            if(this.order.type_payment === 'card-machine'){
                return "Cartão de credito na hora da entrega"
            }
            return type
        }
    },
    methods: {
        ...Format("formatPrice")
    }
}
</script>

<style lang="scss" scoped>
    .container-informations-order {
        border-bottom: solid 1px #ccc;
        padding-bottom: 10px;
        li{
            border-bottom: solid 1px #ccc;
            padding: 10px 0;
            &:last-child {
                border: none;
                padding-bottom: 0;
            }
        }
    }
    .spacing-row-header.skeleton {
        padding: 5px 0;
        margin: 10px 0;
    }
</style>