<template>
    <div class="content-block right-block">
        <sub-header @event-translate-x="$emit('event-translate-x')"></sub-header>
        <!--  -->
        <cart-resume :cart=cart @calc-amount="calcAmount"></cart-resume>
        <!--  -->
        <div style="height:1px">
            <hr>
        </div>
        <!--  -->
        <address-component 
            :user=user 
            @event-get-prices-deliverys=setShippingAddress>
        </address-component>
        <delivery-component 
            :user=user
            :cart=cart 
            @calc-amount=calcAmount 
            :addressUserId=address_user_id>
        </delivery-component>
        <!--  -->
        <div>
            <!-- <hr> -->
        </div>
        <!--  -->
        <!-- <discount-coupon></discount-coupon> -->
        <!--  -->
        <div style="height:1px">
            <hr>
        </div>
        <!--  -->
        <cart-total :is_loading=false :amount="values.amount"></cart-total>
        <!--  -->
        <div style="height:1px">
            <hr>
        </div>
        <methods-payments @event-set-method-payment=setMethodPayment></methods-payments>
        <!--  -->
        <checkout-button :is_loading_check_out="is_loading_check_out" @event-check-out="finishOrder"></checkout-button>
    </div>
</template>

<script>
import createOrder from './payments.js'
import messagePopup from '../../../components/message-popup/message-popup';

import subHeader from "./subHeaderComponent";
import cartResume from "./cartResumeComponent"
import deliveryComponent from "./deliveryComponent"
// import discountCoupon from "./discountCouponComponent";
import cartTotal from "./cartTotalComponent"
import methodsPayments from "./methodsPaymentsComponent"
import checkoutButton from "./checkoutButtonComponent";
import addressComponent from "./addressComponent";

export default {
    name:"container-right",
    components:{
        subHeader,
        cartResume,
        addressComponent,
        deliveryComponent,
        // discountCoupon,
        cartTotal,
        methodsPayments,
        checkoutButton
    },
    props:{
        user: {
            type: Object
        },
        cart: {
            type: Object
        }
    },
    data(){
        return{
            values: {
                cart: 0,
                delivery: 0,
                coupon: 0,
                amount: 0
            },
            is_loading_check_out: false,
            address_user_id: undefined,
            type_payment: undefined
        }
    },
    methods:{
        calcAmount({ origin, amount }){
            if(origin !== "cart" && origin !== "delivery" && origin !== "coupon")
                return;
                
            this.values[origin] = parseFloat(amount);
            this.values.amount = (function(values){
                return (parseFloat(values.cart) + parseFloat(values.delivery) + parseFloat(values.coupon));
            })(this.values)
        },
        setShippingAddress(address_user_id){
            if(address_user_id) this.address_user_id = address_user_id
        },
        setMethodPayment(type_payment){
            if(type_payment) this.type_payment = type_payment
        },
        finishOrder(){
            if(!this.address_user_id)
                return messagePopup("Por favor escolha um endereço para entrega");

            if(!this.user.loggedIn)
                return messagePopup("Faça o login ou cria sua conta antes!")

            if(!this.type_payment)
                return messagePopup("Escolha o metódo de pagamento!")

            createOrder({
                typePayment: this.type_payment,
                userUid: this.user.data.uid,
                userAaddressId: this.address_user_id
            })
            .then( ({ msg, arrIdsOrders }) => {
                // Limpa carrinho
                this.$store.dispatch("clearCart")    
                // Abre modal de sucesso
                this.$emit("event-open-modal-sucess", arrIdsOrders)
                // Emite notificao
                messagePopup(msg,5000)
            })
            .catch( () => messagePopup("Não foi possivel finalizar seu pedido! Por favor tente novamente",5000) )
            .finally(() => this.is_loading_check_out = false )
        }
    }
}
</script>
<style lang="scss">
    .text-title{
        font-size:2.2em;
        line-height:1em;
        font-weight: bold;
    }

    .spacing-between-container-rows {
        margin: 30px 0 15px 0;
        display: block;
    }

    .container-list-render {
        position: relative;
        min-height: 50px;
    }
    .list-render {
        height: auto;
    }
    .row {
        margin: 5px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .row_total {
        margin: 15px 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .row-border-bottom {
        padding: 10px 0;
        border-bottom: solid 1px rgba(177, 177, 177, .5);
    }
</style>
<style lang="scss" scoped>
    .right-block {
        padding-bottom: 70px;
    }
    /* checkout */
    hr {
        border-color: rgb(235, 235, 235);
        position: absolute;
        left: 0;
        width: 100%;
    }
</style>