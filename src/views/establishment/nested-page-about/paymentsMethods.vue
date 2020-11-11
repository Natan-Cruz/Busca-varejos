<template>
    <li class="li-row-info" v-if="paymentsMethods.length"> 
        <input type="checkbox" name="" id="input-select_methods_payments" class="input-select"> 
        <label for="input-select_methods_payments" class="label-select"> 
            <span class="text-medium bold">Metodos de pagamentos</span> 
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg> 
        </label>
        <div class="content-expand">
            <p class="sub-title" v-if="moneys.length">Dinheiro</p>
            <ul class="list-methods-payments" v-for="pay in moneys" :key=pay.id>
                <li class="payment-card">
                    <img :src="`https://api.buscavarejos.com${pay.icon}`" :alt="pay.flag">
                    <span>{{ pay.flag }}</span>
                </li>
            </ul>

            <p class="sub-title" v-if="credits.length" >Cartão de credito</p>
            <ul class="list-methods-payments">
               <li class="payment-card" v-for="(pay) in credits" :key=pay.id >
                    <img :src="`https://api.buscavarejos.com${pay.icon}`" :alt="pay.flag">
                    <span>{{ pay.flag }}</span>
                </li>
            </ul>

            <p class="sub-title" v-if="debits.length">Cartão de débito</p>
            <ul class="list-methods-payments">
                <li class="payment-card" v-for="(pay) in debits" :key=pay.id >
                    <img :src="`https://api.buscavarejos.com${pay.icon}`" :alt="pay.flag">
                    <span>{{ pay.flag }}</span>
                </li>
            </ul>

            <p class="sub-title" v-if="foodVoucher.length">Vale alimentação</p>
            <ul class="list-methods-payments">
                <li class="payment-card" v-for="(pay) in foodVoucher" :key=pay.id >
                    <img :src="`https://api.buscavarejos.com${pay.icon}`" :alt="pay.flag">
                    <span>{{ pay.flag }}</span>
                </li>
            </ul>
        </div>
    </li>
</template>

<script>
// Pagamentos na hora da entrega
export default {
    name: "payments-methods",
    props: {
        paymentsMethods:{
            type: Array
        }
    },
    computed:{
        moneys(){
            return this.paymentsMethods.filter( pay => {
                return pay && pay.type === "money"
            })
        },
        credits(){
            return this.paymentsMethods.filter( pay => {
                return pay && pay.type === "credit"
            })
        },
        debits(){
            return this.paymentsMethods.filter( pay => {
                return pay && pay.type === "debit"
            })
        },
        foodVoucher(){
            return this.paymentsMethods.filter( pay => {
                return pay && pay.type === "food-voucher"
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .label-select {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        background: #fff;
        padding-right: 10px;
        margin-bottom: 0;
        transition: 150ms;

        svg {
            transform: rotate(180deg);
            transition: 150ms cubic-bezier(.75, .19, .67, .43);
        }

        &:hover{
            opacity: 0.8;
        }
    }
    .header-list-blocks:active {
        background: rgba(126, 126, 126, 0.2);
    }

    .input-select {
        display: none;
        &:checked+.label-select {
            margin-bottom: 10px;
            border-bottom: solid 1px;
            padding-bottom: 5px;
        }
        &:checked+.label-select>svg {
            transform: rotate(0);
        }
        &:checked~.content-expand {
            height: auto !important;
        }
    }

    .content-expand {
        width: 100%;
        height: 0;
        overflow: hidden;
        transition: 200ms;
    }

    .list-methods-payments{
        margin-bottom: 15px;
    }
    
    .sub-title{
        font-size: 1.6em;
        color: #666;
    }

    .payment-card {
        width: auto;
        height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        background-color: hsl(0, 0%, 92%);
        box-shadow: 1px 1px 6px rgba($color: #ccc, $alpha: 0.6);
        padding: 8px;
        margin: 4px 10px 4px 0;
        border-radius: 4px;
        img {
            height: 20px;
            margin-right: 10px;
        }
        span{
            font-size: 1.6em;
        }
    }
</style>