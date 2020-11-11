<template>
    <router-link class="container-icon-back-page" :to="'/'" >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
    </router-link>
</template>

<script>
export default {
    name:'link-back-page'
}
</script>

<style lang="scss" scoped>
    .container-icon-back-page{
        width: 30px;
        height: 30px;
        position: absolute;
        top: 7px;
        left: 15px;
        border-radius: 50%;
        background: #fff;
        padding: 5px 4px;
        box-shadow: 0 0 4px rgba(255,255,255,.2);
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        z-index: 1;

        &:active {
            background: #e4e4e4;
        }
        svg{
            width: 20px;
            height: 20px;
            pointer-events: none;
            transition: 100ms;
        }

        &:active > svg {
            transform: scale(.6);
        }
    }
    .back-icon-page{
        width: 32px;
        height: 32px;
        padding: 3px;
        display: block;
        svg {
            width: 100%;
        }
    }
</style>