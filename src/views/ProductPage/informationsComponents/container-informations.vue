<template>
    <div class="content-informations">
        <!--  -->
        <p class="text-medium bold" style="margin-top: 15px;"> {{ product.name }} </p>
        <!--  -->
        <p class="description-product" v-if="product.description"> {{ product.description }} </p>
        <!-- Preco do produto -->
        <div class="row-horizontal-modal">
            <p class="text-medium bold price" :class="{ 'old-price': discount}"> {{ product.price ? formatPrice(product.price) : '0,00'}}</p> 
            <p class="text-medium bold price" style="margin-left:5px">/ {{ product.unit }}</p> 

            <p class="text-medium bold price-discount" v-if="discount" >{{ product.price ? formatPrice(product.price) : 'R$ 0,00'}}</p> 
        </div>
        <!--  -->
        <div class="row-horizontal-modal" style="justify-content:space-between">
            <form action="#" class="form-quantity" @submit.prevent="" >
                <div class="container-input-row"> 
                    <span class="btn-controll-input btn-minus-modal" @click="minusOne"> 
                        <svg mlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M19 13H5v-2h14v2z" />
                        </svg> 
                    </span> 
                    <input type="number" class="input-quantity-modal" min="1" v-model="current_quantity"> 
                    <span class="btn-controll-input btn-more-modal" @click=moreOne> 
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                        </svg> 
                    </span> 
                </div>
                <button type="submit" style="display: none;">ok</button>
            </form>
            <div> 
                <span class="text-medium" style="display: inline-block;text-align: right;">Total:</span> 
                <span class="text-medium bold" style="margin-left: 5px;">{{ formatPrice(current_amount) }}  </span>
            </div>
        </div>
        <!--  -->
        <wrapper-addendums v-for="(addendum,i) in product.addendums" :key="i" 
            :addendum=addendum 
            @event-select-addendum=selectAddendum>
        </wrapper-addendums>
        <!--  -->
        <div class="spacing" > 
            <textarea name="" id="" class="textarea-message" v-model="message" 
            placeholder="Há alguma mensagem em especial para este produto?"></textarea> 
        </div>
        <!--  -->
        <button-add-cart 
            @event-add-in-cart="addProductInCart" 
            :button_is_loading=button_is_loading 
            :amount=amount>
        </button-add-cart>
    </div>
</template>

<script>
import messagePopup from '@/components/message-popup/message-popup';
import Format from "@/components/Format.js";

import ButtonAddCart from './button';
import wrapperAddendums from './wrapperAddendums'

export default {
    name:"container-informations",
    components:{
        wrapperAddendums,
        // radioAddendums,
        ButtonAddCart,
        // testeAddendums
    },
    props:{
        product: Object
    },
    computed:{
        amount(){
            return this.current_amount + this.current_amount_addendums
        }
    },
    data(){
        return{
            button_is_loading: false,
            description_is_open:false,
            discount: false,  
            current_quantity:1,
            message: '',
            current_amount: this.product.price,
            current_amount_addendums:0,
            addendums: []    
        }
    },
    watch:{  
        current_quantity(newVal){
            this.current_amount = newVal * this.product.price;

            if(newVal <= 0) this.current_quantity = 1
        }
    },
    methods: {
        selectAddendum(obj){
            // { index, list }
            this.addendums = this.addendums.filter( ad => {
                if(ad.index !== obj.index) return ad
            });

            this.addendums.push(obj);
            
            let amount = 0;

            this.addendums.forEach( elem => {
                elem.list.forEach( ({ more_quantity, price  }) => {
                    amount += more_quantity ? (price * more_quantity) : 0
                })
            })
            this.current_amount_addendums = amount
        },
        openOrCloseDescription(){
            this.description_is_open = !this.description_is_open
        },
        minusOne(){
            const value = this.current_quantity;
            this.current_quantity = value - 1;
        },
        moreOne(){
            const value = this.current_quantity;
            this.current_quantity = value + 1;
        },
        addProductInCart(){
            this.button_is_loading = true;
            const addendums = [];

            this.addendums.forEach( elem => {
                elem.list.forEach( obj => addendums.push(obj))
            })

            const item = {
                id_product: this.product.id,
                price: this.product.price,
                quantity: this.current_quantity,
                message: this.message,
                addendums: addendums
            }
            // this.$gtag.query('event', "add_to_cart", {
            //      id: this.product.id,
            //      name: this.product.name,
            //      category: this.product.category,
            //      price: this.product.price,
            //      quantity: this.current_quantity,
            // })
            // console.log(item)
            this.$store.dispatch('addCart',item).then( msg => {
                console.log(msg)
                messagePopup(msg,3500);
                this.button_is_loading = false
            })
        },
        ...Format("formatPrice")
    }
}
</script>
<style lang="scss" scoped src="./style.scss"></style>
