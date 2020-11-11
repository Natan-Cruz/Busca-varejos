<template>
    <div class="container-inputs">
        <input type="checkbox" name="" id="input-products_order" class="input-select" checked>
        <label for="input-products_order" class="label-select">
            <span class="span-title">Produtos comprados</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                <path d="M0 0h24v24H0z" fill="none" />
                </svg>
        </label>
        <div class="content-expand">        
            <ul class="group-products">
                <item-product-component v-for="(product,i) in order.products" :key=i :product=product></item-product-component>
            </ul>
        </div>
    </div>
</template>

<script>
import itemProductComponent from "./itemProductComponent"
export default {
    name:"container-informations-products",
    components:{
        itemProductComponent
    },
    props:{
        order:{
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-inputs {
        width: 100%;
        // margin: 20px 0;
    }
    .label-select {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        background: #fff;
        margin-bottom: 0;
        transition: 250ms;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        padding: 10px 0;
        svg {
            transition: 250ms;
        }
    }

    .span-title {
        font-size: 2em;
        line-height: 1em;
        font-weight: bold;
    }

    .header-list-blocks:active {
        background: rgba(126, 126, 126, 0.2);
    }

    .input-select {
        display: none;
        &:checked+.label-select {
            border-bottom: solid 1px #ccc;
            padding: 10px 5px;
            box-shadow: 0 7px 8px -6px #00000054;
        }
        &:checked+.label-select>svg {
            transform: rotate(0);
        }
        &:checked~.content-expand {
            height: auto;
            border: none;
        }
    }

    .content-expand {
        width: 100%;
        height: 0;
        overflow: hidden;
        border-bottom: solid 1px #ccc;
        overflow: {
            x: hidden;
            y: auto;
        }
    }

</style>