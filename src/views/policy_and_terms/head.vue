<template>
    <header>
        <icon-back></icon-back>
        <logo-busca-varejos></logo-busca-varejos>
        <div class="empty-casing"></div>
    </header>
</template>

<script>
import iconBack from './icon-back'
import LogoBuscaVarejos from "../../components/logo-busca-varejos";

export default {
    name:"head-vue",
    components:{
        iconBack,
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
        padding: 0 10px;
        background: #fff;
        box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        -webkit-tap-highlight-color: transparent;
    }
    .empty-casing{
        width: 24px;
        height: 24px;
    }

</style>