<template>
    <div class="wrapper-category">
            <!--  -->
        <p class="bold category-name">{{ category.category }}</p>
            <!--  -->
        <div class="list-items"> 
            <slot></slot>
        </div>
        <div class="container-button-show-more">
            <router-link  :to="`/estabelecimentos/${establishment_id}/produtos?categoria=${category.id}`" class="button button-tertiary text-medium" v-if="showButton">Ver mais {{ category.category }}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name:"wrapper-category",
    props: {
        category:{
            type: Object
        },
        quantityItems:{
            type:Number
        },
        currentCategoryId:{
            type: Number
        }
    },
    computed:{
        establishment_id(){
            return this.$route.params.establishment
        },
        showButton(){
            return this.quantityItems === 6 && this.currentCategoryId === 0
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrapper-category {
        width: 100%;
        height: auto;
        overflow: hidden;
        transition: 300ms ease-in-out;   
    }

    .row-name-category {
        position: relative;
        display:block;
        color:#000;
        svg {
            position: absolute;
            top: 8px;
            right: 0;
            width: 18px;
            height: 18px;
        }
    }

    .category-name{
        margin: {
            top: 15px;
            bottom: 5px;
        };
        font-size: 2.1em;
    }
    .list-items {
        width: 100%;
        margin: 0 auto;
        height: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        grid-template-rows: auto;
        column-gap: 10px;
        row-gap: 10px;
        padding: 2px;
    }
    .button-tertiary{
        cursor: pointer;
    }
    @media screen and (min-width:550px) {
        .list-items {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            grid-template-rows: auto;
            column-gap: 20px;
            row-gap: 20px;
        }
        .button-tertiary{
            margin: 5px 0 10px 0;
        }
    }
</style>