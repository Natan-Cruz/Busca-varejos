<template>
    <button class="button button-primary text-medium" :disabled=is_loading_check_out
        @click="$emit('event-check-out')" 
        :class="is_loading_check_out ? 'active-loading': '' ">
        <div class="ctn-text-button">
            <span class="text-button">Finalizar pedido</span>
        </div>
        <span class="spinner-loading-button"></span>
    </button>
</template>

<script>
export default {
    name:"checkout-button",
    props:{
        is_loading_check_out: Boolean
    }
}
</script>

<style lang="scss" scoped>
    .btn-position-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
    }

</style>