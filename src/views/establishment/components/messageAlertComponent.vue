<template>
    <div class="container-alert-message" v-if="hasMessage && is_displayed">
        <p class="title-message bold">Mensagem do estabelecimento</p>
        <p class="text-medium"> {{ message.message }} </p>
        <button class="button button-primary text-medium" style="width:120px; float: right; margin-top: 15px" @click="closePopup">Ok, fechar</button>
    </div>
</template>

<script>
export default {
    name: "message-alert",
    props:{
        message:{
            type: Object,
            required: false,
            default: () => {}
        }
    },
    computed:{
        hasMessage(){
            if(!this.message) return false;
            
            const alreadyDisplayed = localStorage.getItem("message-alert") || -1

            if(this.message.id > alreadyDisplayed)
                return Object.entries(this.message).length;
            else
                return false;
        }
    },
    data(){
        return {
            is_displayed: true
        }
    },
    methods:{
        closePopup(){
            this.is_displayed = false
            localStorage.setItem("message-alert", this.message.id)
        }
    }
}
</script>

<style lang="scss" scoped>
    // 
    .container-alert-message{
        width: 70%;
        height: auto;
        position: fixed;
        top: 0;
        left: calc(50% - 35%);
        box-shadow: 1px 1px 6px rgba($color: #000000, $alpha: 0.5);
        z-index: 10000;
        background: #fff;
        padding: 20px;
    }
    .title-message{
        font-size: 2em;
        text-align: center;
        margin-bottom: 10px;
    }
</style>