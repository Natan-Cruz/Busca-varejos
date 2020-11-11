<template>
    <div class="container-item-addendum">
         <div class="ctn_checkbox">
            <input type="radio" :name="`radio_${wrapper_addendums_id}`" 
                :id="`input_checkbox_${item.id}`" 
                class="input-checkbox-addendum" 
                @change="changeCheckbox">
            <span class="span-input-radio"></span>
        </div>
        <label :for="`input_checkbox_${item.id}`" class="label-checkbox-addendums">
            <div class="ctn_name">
                <div style="padding-left: 15px">
                    <span class="addendum-name"> {{ item.name }} </span>
                    <p class="addendum-description" v-if="item.description"> {{ item.description }} </p>
                </div>
            </div>
        </label>                        
    </div>
</template>

<script lang="ts">
export default {
    name:"radio-item-addendum",
    props:{
        item: {
            type: Object
        },
        wrapper_addendums_id:{
            type: Number
        }
    },
    methods: {
        changeCheckbox(){
            this.$emit("is_checked_true", {
                id: this.item.id,
                name: this.item.name,
                quantity: 1,
                price: this.item.price
            });
        }
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
    
    .ctn_checkbox{
        position: absolute;
        right: 0;
        top: 17px;
        background: #fff;
    }
    // A "label" ocupa todo o espaço da "li", isso é necessário
    // para ativação do "input:checkbox" no clique em toda extensão
    // da "li"
    .label-checkbox-addendums{
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: start;
        align-items: center;
        cursor: pointer;
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

    .input-checkbox-addendum {
        display: none;
        &:checked+.span-input-radio::before {
            display: block !important;
        }
    }

    .span-input-radio {
        display: block;
        width: 24px;
        height: 24px;
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