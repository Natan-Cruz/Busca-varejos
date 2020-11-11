<template>
    <header>
        <icon-back></icon-back>
        <cart></cart>
    </header>
</template>

<script>
import iconBack from './icon-back'
import cart from "../../components/cart/cart";
export default {
    name:'custom-header',
    components:{
        iconBack,
        cart,
    }
}
</script>

<style lang="scss" scoped>
    header {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        background: #fff;
        box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        -webkit-tap-highlight-color: transparent;
    }
</style>