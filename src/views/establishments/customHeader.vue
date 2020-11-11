<template>
    <div class="container-header">
        <header>
            <menu-left></menu-left>
            <logo-busca-varejos></logo-busca-varejos>
            <div class="group-icons">
                <select-places @event-change-place="$emit('event-fetch-establishments')" :isRequiredPlace="true" ></select-places>
                <cart></cart>
            </div>
        </header>
    </div>
</template>

<script>
import MenuLeft from '@/components/menuLeft/index'
import LogoBuscaVarejos from "@/components/logo-busca-varejos";
import Cart from "@/components/cart/cart";
import selectPlaces from "@/components/selectPlaces/selectPlaces";

export default {
    name: "custom-header",
    components:{
        MenuLeft,
        LogoBuscaVarejos,
        Cart,
        selectPlaces
    },
}
</script>

<style lang="scss" scoped>
   .container-header{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5000;
    }
    header{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 10px;
        background: #fff;
        box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.2);
        -webkit-tap-highlight-color: transparent;
    }
    .group-icons{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    @media screen and (max-width:750px) {
        .container-header{
            height: 110px;
        }
    }
</style>