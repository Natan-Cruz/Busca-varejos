<template>
    <li @click="$emit('event-select-item', suggest )" class="search-item">
        <div class="container-img">
            <img :src="`https://api.buscavarejos.com${suggest.source}?width=50&quality=70`" :alt="suggest.name">
        </div>
        <div class="container-info">
            <p class="text-medium product-name" :title="suggest.name" v-html="product_name"></p>
            <p class="text-medium">  {{ formatPrice(suggest.price) }} </p>
        </div>
    </li>
</template>

<script>
import Format from "@/components/Format.js";
import putStrong from "./putStrong";

export default {
    name: "searched-item",
    props:{
        wordSearched: String,
        suggest: Object
    },
    computed:{
        product_name(){
            return putStrong(this.suggest.name, this.wordSearched)
        }
    },
    methods:{
        ...Format('formatPrice')
    }
}
</script>

<style lang="scss" scoped>
    .search-item{
        width: 100%;
        display: grid;
        grid-template-areas: "ctn_img ctn_info";
        grid-template-columns: 50px 1fr;
        grid-template-rows: 50px;
        column-gap: 20px;
        border-bottom: solid 1px rgba($color: #000000, $alpha: 0.1);
        transition: 100ms;
        margin: 15px 0;

        &:hover{
            opacity: 0.8;
            cursor: pointer;
        }

        &:active{
            transform: scale(0.98);
        }
    }

    .container-img{
        grid-area: ctn_img;
        width: 100%;

        img{
            width: 100%;
        }
    }

    .container-info{
        grid-area: ctn_info;
        width: 100%;
        height: 100%;
        overflow: hidden;
        p{
            padding: 2px 0;
        }
        p:first-child{
            font-weight: bold;
        }
    }

    .product-name{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>