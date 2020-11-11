<template>
    <div class="content-informations">
        <p class="skeleton skeleton-name spacing"></p>   
        <p class="skeleton skeleton-description spacing"></p> 

        <!-- price -->
        <p class="skeleton skeleton-price spacing"></p>        

        <!-- input -->
        <div class="skeleton skeleton-row-horizontal-modal spacing"></div>

        <!-- textarea message -->
        <div class="skeleton skeleton-textarea spacing"></div>

        <!-- button -->
        <button class="skeleton skeleton-button text-medium spacing">Adicionar no carrinho</button>
    </div>
</template>

<script>
export default {
    name:"skeleton-informations-product",
    props:{
        is_loading: Boolean
    }
}
</script>

<style lang="scss" scoped>
    .spacing{
        margin-top: 15px;
    }
    .skeleton-name{
        width: 70%;
        height:26px;
        max-width: 400px;
        color: #ccc;
    }
	.skeleton-description{
		width:100%;
		height: 42px;
        color:#ccc;
	}
	.skeleton-price {
        width: 80px;
        font-size: 3.5em;
        height: 1em;
        color: #ccc;
    }

   .skeleton-row-horizontal-modal {
        height: 56px;
        width: 100%;
    }
    .skeleton-textarea {
        width: 100%;
        height: 80px;
    }
    .skeleton-button{
        width: 100%;
        height: 52px;
        border-radius: 5px;
        border: none;
        background: #ccc;
        color: rgb(153, 153, 153);
        cursor: pointer;
    }
</style>