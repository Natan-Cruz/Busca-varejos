<template>
    <li class="li-row-info" style="padding-top:0" v-if="categories.length"> 
        <p class="text-medium bold">Categoria(s):</p> 
        <ul class="list-categories">
            <li v-for="category in categories" :key="category.id" class="span-category">
                {{ category.name }}
            </li>
        </ul>
    </li>
</template>

<script>
export default {
    name: "establishment-categories",
    props: {
        categories :{
            type:Array,
            required: false,
            default: () => []
        }
    }
}
</script>

<style lang="scss" scoped>
    .list-categories{
        margin-top: 10px;
    }
    .span-category{
        display: inline-block;
        font-size: 1.7em;
        color: #555;
        line-height: 1em;
        text-shadow: 0 1px 1px rgba(0,0,0,.1);
        margin-left: 20px;
        position: relative;
        
        &::before{
            content: '';
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #555;
            display: block;
            position: absolute;
            top: 6px;
            left: -10px;
        }
    }

</style>