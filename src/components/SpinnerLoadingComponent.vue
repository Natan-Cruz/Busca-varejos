<template>
    <div class="container-spinner-loading" :style="{ 'height': ctn_height }" v-if="loading" >
        <span class="spinner-loading" :style="{ 'position': position ,'width': width, 'height': height }"></span>
    </div>
</template>

<script>
export default {
    name:'spinner-loading',
    props: {
        loading: Boolean,
        width:{
            type:String,
            required: false,
            default: () => "40px"
        },
        height:{
            type: String,
            required: false,
            default: () => "40px"
        },
        ctn_height: {
            type: String,
            required: false,
            default: () => "50px"
        },
        position:{
            type: String,
            required: false,
            default: () => "absolute"
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-spinner-loading{
        position: relative;
    }
    .spinner-loading {
        border: solid 4px #fff;
        border-bottom: solid 4px #ed1641;
        border-radius: 50%;
        // position: absolute;
        top: calc(50% - 20px);
        left: calc(50% - 20px);
        transform: rotate(0deg);
        animation: animation-reload 1250ms infinite;
        display: block;
    }

    @keyframes animation-reload {
        to {
            transform: rotate(0deg);
        }
        from {
            transform: rotate(1080deg);
        }
    }
</style>