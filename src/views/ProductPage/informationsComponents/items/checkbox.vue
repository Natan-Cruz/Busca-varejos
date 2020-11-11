<template>
    <div class="container-item-addendum">
        <input type="checkbox" :id="`input-checkbox_${item.id}`" name="addendum" class="input-checkbox-addendum" 
            v-model="is_checked" 
            @change=changeCheckbox :disabled=notAllowed>
        <!--  -->
        <label :for="`input-checkbox_${item.id}`" class="row-type_02">
            <span class="span-input-radio"></span>
            <div style="padding-left: 15px">
                <span class="addendum-name"> {{ item.name }} </span>
                <p class="addendum-description" v-if="item.description"> {{ item.description }} </p>
            </div>
        </label>
        <div class="position_absolute_right">
            <p class="span-price" v-if="is_checked && value_exceeded.more_quantity"> +{{ formatPrice( item.price * value_exceeded.more_quantity ) }} </p>
            <div class="container-input-row"  v-if=is_checked > 
                <!-- Botão de -1 adendo -->
                <button class="btn-controll-input btn-minus-modal" @click="minusOne"> 
                    <svg mlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M19 13H5v-2h14v2z" />
                    </svg> 
                </button> 
                <!-- Input da quantidade de adendo -->
                <input type="number" class="input-quantity" min="1" v-model="current_quantity" disabled> 
                <!-- Botão de +1 adendo -->
                <button class="btn-controll-input btn-more-modal" @click=moreOne :disabled=notAllowed > 
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg> 
                </button> 
            </div>
        </div>
    </div>
</template>

<script>
import Format from "@/components/Format.js";

export default {
    name:"checkbox-item-addendum",
    props:{
        exceeded_limit:Boolean,
        item: Object,
        value_exceeded: Object,
        notAllowed:{
            type: Boolean
        }
    },
    mounted(){
        console.log(this.item)
    },
    data(){
        return{
            is_checked: false,
            current_quantity: 0
        }
    },
    methods: {
        changeCheckbox(){
            if(this.is_checked){
                this.current_quantity = 1;
                this.$emit("is_checked_true", {
                    id: this.item.id,
                    name: this.item.name,
                    quantity: this.current_quantity,
                    price: this.item.price

                });

            }else{
                const lastCurrentQuantity = this.current_quantity
                this.current_quantity = 0;

                this.$emit("is_checked_false", {
                    id: this.item.id,
                    name: this.item.name,
                    quantity: this.current_quantity,
                    lastCurrentQuantity,
                    price: this.item.price
                })

            }
        },
        minusOne(){
            const value = this.current_quantity;
            this.current_quantity = value - 1;

            if(this.current_quantity <= 0){
                this.current_quantity = 0
                this.is_checked = false
            }

            this.$emit("minus-quantity", {
                id: this.item.id,
                name: this.item.name,
                quantity: this.current_quantity,
                price: this.item.price
            })
        },
        moreOne(){
            const value = this.current_quantity;
            this.current_quantity = value + 1;

            this.$emit("more-quantity", {
                id: this.item.id,
                name: this.item.name,
                quantity: this.current_quantity,
                price: this.item.price
            })
        },
        ...Format('formatPrice')
    }
}
</script>

<style lang="scss" scoped>
    .container-item-addendum{
        width:100%;
        height: 58px;
        border-bottom: solid 1px rgba(0, 0, 0, .3);
        position: relative;
        -webkit-user-select:none;
    }

    .row-type_02 {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        cursor: pointer;
    }
    .position_absolute_right{
        width: auto;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        pointer-events: none;
        background: #fff;
        box-shadow: -7px 0 6px -2px rgba(0, 0, 0, 0.2);
    }
    .form-quantity{
        pointer-events: all;
        position: relative;
    }
    .input-checkbox-addendum {
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
        padding: 3px;
        &::before {
            content: '';
            display: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #ed1641;
        }
    } 
    .span-price{
        font-size: 1.6em;
        color:#707070;
        font-weight: bold;
        margin: 0 3px
    }

    .addendum-name{
        font-size: 1.8em;
        line-height: 1em;
        color: #000;
    }
    .addendum-description{
        font-size: 1.6em;
        line-height: 1em;
        color: #444;
    }

    .container-input-row {
        width: 100px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: all;
    }

    .input-quantity {
        width: 30px;
        height: 100%;
        border: none;
        font-size: 1.7em;
        text-align: center;
        font-weight: bold;
        &:disabled{
            background-color: #fff;
        }
    }

    .btn-controll-input {
        width: 40px;
        height: 100%;
        display: block;
        padding: 5px;
        cursor: inherit;
        user-select: none;
        position: relative;
        border: {
            top-left-radius: 5px;
            bottom-left-radius: 5px;
        }
        border: none;
        background-color: #fff;
        cursor: pointer;
        &:active {
            background-color: #ccc;
        }
        &:hover {
            background-color: rgb(230, 230, 230);
        }
        &:disabled {
            cursor: not-allowed;
            background: rgba($color: #e4e4e4, $alpha:0.5);
        }
        svg {
            transition: 100ms;
            width: 100%;
            height: 100%;
            pointer-events: none;
            fill:#ed1641;
        }
        &:active svg {
            transform: scale(.7);
        }
    }
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type=number] {
        -moz-appearance: textfield;
        appearance: textfield;
    }
</style>