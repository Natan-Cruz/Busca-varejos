<template>
    <div>
        <!--  -->
        <p class="text-title spacing-between-container-rows" style="margin-top: 35px ;">Métodos de pagamentos</p>

        <div class="container-method-payment" @change="$emit('event-set-method-payment', type_payment)">
            <!-- <div>
                <input type="radio" id="input-radio_01" name="method-payment" class="input-radio-method-payment" value="credit" v-model="type_payment">
                <label for="input-radio_01" class="row-type_02">
                    <span class="span-input-radio"></span>
                    <span class="text-medium" style="margin-left: 10px;">Pagar com cartão de crédito online ( Em breve! )</span>
                </label>
            </div> -->
            <div>
                <input type="radio" id="input-radio_02" name="method-payment" class="input-radio-method-payment" value="card-machine" v-model="type_payment">
                <label for="input-radio_02" class="row-type_02">
                    <span class="span-input-radio"></span>
                    <span class="text-medium" style="margin-left: 10px;">Pagar com cartão de crédito com motoboy </span>
                </label>
            </div>
            <div>
                <input type="radio" id="input-radio_03" name="method-payment" class="input-radio-method-payment" value="money" v-model="type_payment">
                <label for="input-radio_03" class="row-type_02">
                    <span class="span-input-radio"></span>
                    <span class="text-medium" style="margin-left: 10px;">Pagar com dinheiro</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"methods-payments",
    data(){
        return{
            type_payment: ""
        }
    }
}
</script>

<style lang="scss" scoped>
    /* Estilizacao responsavel pela parte depagamentos */
    .row-type_02 {
        /* margin: ; */
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 20px 0;
        border-bottom: solid 1px rgba(0, 0, 0, .3);
    }

    .input-radio-method-payment {
        display: none;
        &:checked+label>.span-input-radio::before {
            display: block !important;
        }
    }

    .span-input-radio {
        display: block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: transparent;
        border: solid 2px #ed1641;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before {
            content: '';
            display: none;
            width: 70%;
            height: 70%;
            border-radius: 50%;
            background: #ed1641;
        }
    }

</style>