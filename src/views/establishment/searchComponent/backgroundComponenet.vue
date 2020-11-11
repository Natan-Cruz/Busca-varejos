<template>
    <div class="background" v-if="is_open" @click="$emit('event-close-search')"></div>
</template>

<script>
export default {
    name: "background-component",
    props:{
        is_open: Boolean
    }
}
</script>

<style lang="scss" scoped>
    .background{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba($color: #000000, $alpha: 0.4);

    }
</style>