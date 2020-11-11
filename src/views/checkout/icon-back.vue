<template>
    <button @click=backPage class="back-icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
    </button>
</template>

<script>
export default {
    name:"icon-back",
    methods:{
        backPage(){
            this.$router.back();
        }
    }
}
</script>

<style lang="scss" scoped>
    .back-icon{
        display: block;
        width: 60px;
        height: 60px;
        padding: 15px;
        cursor: pointer;
        border:none;
        background-color:#fff;
        svg{
            width: 100%;
            height: 100%;
            transition:100ms;
            pointer-events: none;
        }
        &:active svg{
            transform: scale(.7)
        }
    }
    
</style>