<template>
    <header>
        <menu-left></menu-left>
        <logo-busca-varejos></logo-busca-varejos>
        <div class="empty-casing"></div>
    </header>
</template>

<script>
import MenuLeft from '@/components/menuLeft/index'
import LogoBuscaVarejos from "@/components/logo-busca-varejos";

export default {
    name: "custom-header",
    components:{
        MenuLeft,
        LogoBuscaVarejos
    }
}
</script>

<style lang="scss" scoped>
    header{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 20px;
        background: #fff;
        box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.2);
    }
    .empty-casing{
        width: 24px;
        height: 24px;
    }
</style>