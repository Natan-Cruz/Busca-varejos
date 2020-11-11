<template>
    <button class="button button-primary text-medium btn-add-rating" @click="$emit('event-open-modal')">
        Adicionar avaliação
    </button>
</template>

<script>
export default {
    name:"button-add-rating"
}
</script>

<style lang="scss" scoped>
    // Button
    //  Mobile 
    .btn-add-rating{
        position: fixed;
        bottom:0;
        left:0;
        border: {
            top-left-radius: 5px;
            top-right-radius: 5px;
            bottom-left-radius: 0;
            bottom-right-radius: 0;
        }
        z-index: 1  ;
    }
    @media screen and (min-width:550px){
        .btn-add-rating{
            width: 200px;
            margin: 0 5%;
            position:relative;
            border-radius: 5%;
        }
    }
</style>