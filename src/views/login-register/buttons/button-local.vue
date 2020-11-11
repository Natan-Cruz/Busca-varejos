<template>
    <button type="submit" class="button button-local" :disabled="loading" :class=" loading ? 'active-loading' : '' ">
        <div class="ctn-text-button">
            <span class="text-button">Continuar</span>
        </div>
        <span class="spinner-loading-button"></span>
    </button>
</template>
<script>
export default {
    name:"button-local",
    props:{
        loading: Boolean,
    },
    methods: {
        loginLocal(){
            this.$emit('clickEventLoginLocal')
        }
    }
}
</script>
<style lang="scss" src="./button.scss" scoped></style>
<style lang="scss" scoped>
    .button-local{
        background: #e40f0c;
        color:#fff;
        margin-top: 15px;
    }
</style>