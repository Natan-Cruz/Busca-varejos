<template>
    <div class="container-msg-error" v-if="error.msg">
        <p class="text-error">
            {{ error.msg }}
        </p>
        <div class="group-buttons-errors">
            <router-link to="/" class="button button-second button-back text-medium">
                Voltar
            </router-link>
            <button class="button button-primary button-retry text-medium" @click="$emit('event-retry')" v-if=error.retry >
                Tentar novamente
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "message-error",
    props:{
        error: Object
    }
}
</script>

<style lang="scss" scoped>
    .container-msg-error{
        width: 80%;
        margin: 0 auto;
        height: calc(100vh - 60px);
        display: flex;
        justify-content:center;
        flex-direction: column;
        align-items:center
    }
    .text-error{
        margin: {
            top:30px;
            bottom:20px
        }
        text-align: center;
        font-size: 1.7em;
    }
    .group-buttons-errors{
        width: 100%;
        max-width: 400px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .button:first-child{
        margin-right: 10px;
    }
</style>