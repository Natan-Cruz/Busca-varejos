<template>
   <li class="li-row-product">
        <div class="row-horizontal">
            <div class="container-input-collumn">
                <span class="btn-cart-quantity" @click=moreItem>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                </span>
                <input type="number" class="input-quantity" min="1" v-model=quantity @input=inputQuantity @blur=blurInput>
                <span class="btn-cart-quantity" @click=minusItem>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>
                </span>
            </div>
            <div class="container-img">
                <img :src="`https://api.buscavarejos.com${ item.photo }?width=70`" class="img-product" :alt="item.name">
            </div>
            <div class="ctn_01">
                <p class="text-medium bold">{{ item.name }}</p>
                <p class="text-medium bold" style="margin: 10px 0;">{{ formatPrice(item.amount) }}</p>
                <ul class="container-list-addendums">
                    <li v-for="(addendum,i) in item.addendums" :key="i"> {{ addendum }} </li>
                </ul>
            </div>
            <span class="span-icon-remove-cart" @click=removeItem>
                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" class="svg-btn-delete">
                    <path
                        d="M28 40H11.8c-3.3 0-5.9-2.7-5.9-5.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 2.2 1.8 3.9 3.9 3.9H28c2.2 0 3.9-1.8 3.9-3.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 3.2-2.7 5.9-5.9 5.9zM33.3 4.9h-7.6C25.2 2.1 22.8 0 19.9 0s-5.3 2.1-5.8 4.9H6.5C4.2 4.9 2.4 6.7 2.4 9s1.8 4 4.1 4h26.9c2.3 0 4.1-1.8 4.1-4.1s-1.9-4-4.2-4zM19.9 2c1.8 0 3.3 1.2 3.7 2.9h-7.5c.5-1.7 2-2.9 3.8-2.9zm13.4 9H6.5c-1.1 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1h26.9c1.1 0 2.1.9 2.1 2.1-.1 1.2-1 2.1-2.2 2.1z" />
                    <path
                        d="M12.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1zM26.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1zM19.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1z" />
                </svg>
            </span>
        </div>
       
        <div class="ctn_message">
            <p class="message-item" style="padding: 0 5px;" v-on:click="toggleMessage" :title=" item.message">{{ item.message }}</p>
        </div>
    </li>
</template>

<script>
import Format from "../Format";

export default {
    name:"sub-item-cart",
    data(){
        return{
            message:false,
            quantity: this.item.quantity
        }
    },
    props:{
        item: Object
    },
    methods:{
        ...Format("formatPrice"),
        removeItem(){
            this.$store.dispatch('removeCart',{
                id:this.item.id
            })
            this.$gtag.query('event', "remove_to_cart", {
                 id: this.item.id,
                 name: this.item.name
            })
        },
        moreItem(){
            this.quantity = this.quantity + 1
            this.$store.dispatch('updateCart',{
                id: this.item.id,
                quantity:this.quantity
            })
        },
        minusItem(){
            if(this.quantity === 1) return
           this.quantity = this.quantity - 1

            this.$store.dispatch('updateCart',{
                id: this.item.id,
                quantity:this.quantity
            })
        },
        inputQuantity(){
            if(this.quantity <= 1) return;

            this.$store.dispatch('updateCart',{
                id: this.item.id,
                quantity:this.quantity
            })        
        },
        blurInput(){
            if(!this.quantity || this.quantity <= 0)
                this.quantity = 1

            this.$store.dispatch('sincronizeCart',{
                id: this.item.id,
                quantity:this.quantity
            }) 
        },
        toggleMessage(e){
            const messageNode = e.target;

            if (this.message) {
                messageNode.style.whiteSpace = 'nowrap';
                this.message = false
            } else {
                messageNode.style.whiteSpace = 'normal'
               this.message = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .li-row-product {
        width: 100%;
        height: auto;
        overflow: hidden;
        position: relative;
        border-bottom: solid 1px rgba(171, 171, 171, 0.4);
        margin-bottom: 10px;
        padding-bottom: 7px;
        border-radius: 5px;
        box-shadow: 1px 1px 7px rgba(171, 171, 171, 0.3);
        padding: 7px;
    }

    .row-horizontal {
        width: 100%;
        height: 76px;
        display: flex;
        align-items: flex-start;
        justify-content: start;
        overflow: hidden;
        transition: 250ms ease-in-out;
        position: relative;
    }
    /*  */
    .container-input-collumn {
        width: 40px;
        height: 70px;
        border-radius: 5px;
        border: solid 1px rgba(165, 165, 165, .5);
        margin-right: 10px;
        flex-shrink: 0;
    }
    /* IMAGE PRODUCT */
    .container-img {
        width: 70px;
        height: 70px;
        box-shadow: 0 0 6px rgba(0, 0, 0, .15);
        border: solid 1px rgba(165, 165, 165, .15);
        border-radius: 5px;
        overflow: hidden;
        flex-shrink: 0;

            img {
            width: 100%;
        }
    }
    .ctn_01 {
        margin-left: 10px;
    }

    .span-icon-remove-cart {
        /* width: 40px; */
        height: 40px;
        border-radius: 50%;
        display: block;
        padding: 8px;
        transition: 150ms;
        position: absolute;
        bottom: 15px;
        right: 0;
        cursor: pointer;

        &:active {
            background: #bb112a;
        }

        svg {
            width: 24px;
            pointer-events: none;
        }
    }
    /*  */

    .message-item {
        padding: 5px 0;
        font-size: 1.6em;
        line-height: 1.2;
        color: #757575;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }
    /*  */

    .content-informations {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .container-informations-minimize {
        background: #fff;
        box-shadow: -1px 0 4px rgba(0, 0, 0, .3);
        padding: 20px;
    }
    .group-span {
        display: flex;
        justify-content: space-between;
    }
    /* PRODUCT QUATITY  */
    .container-input-quantity {
        width: auto;
        height: 27px;
        display: flex;
        justify-content: start;
        align-items: center;
        overflow: hidden;
        user-select: none;
    }
    .input-quantity {
        width: 100%;
        height: 28px;
        border: none;
        font-size: 1.7em;
        text-align: center;
    }
    .btn-cart-quantity {
        width: 100%;
        height: 20px;
        transition: 250ms;
        display: block;
        padding: 2px;
        cursor: pointer;

        &:active {
            transform: scale(.7);
        }

         svg {
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
    }

    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type=number] {
        -moz-appearance: textfield;
        appearance: textfield;
    }
    .btn-disabled:active {
        transform: none;
    }
    .container-list-addendums{
        width: 100%;
        margin-top: 5px;
        li{
            font-size: 1.6em;
            line-height: 1em;
            height: 1em;
            color: #757575;
            font-weight: bold;
            display: inline-block;
            margin: 0 5px 0 10px;
            position: relative;
        }
        li::before{
            content:"";
            display:block;
            width:6px;
            height: 6px;
            background-color: #757575;
            border-radius: 50%;
            position: absolute;
            left: -10px;
            top: 4px;
        }
    }
</style>
