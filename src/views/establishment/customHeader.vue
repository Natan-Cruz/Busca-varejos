<template>
    <div class="container-header">
        <header>
            <menu-left></menu-left> <!-- Fixo -->
            <logo-busca-varejos></logo-busca-varejos> <!-- Fixo -->
            <div class="group-icons">
                <select-places :isRequiredPlace="false" ></select-places> <!-- movel -->
                <search :name=establishment_name></search> <!-- Fixo -->
                <cart></cart> <!-- Fixo -->
            </div>
        </header>
    </div>
</template>

<script>
import MenuLeft from '@/components/menuLeft/index'
import LogoBuscaVarejos from "@/components/logo-busca-varejos";
import Cart from "@/components/cart/cart";
import search from './searchComponent/Search';

import selectPlaces from "@/components/selectPlaces/selectPlaces";


export default {
    name: "custom-header",
    components:{
        MenuLeft,
        LogoBuscaVarejos,
        Cart,
        search,
        selectPlaces
    },
    props: {
        establishment_name:String
    }
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