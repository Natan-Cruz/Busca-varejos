<template>
    <div class="container-item" v-bind:data="`${ establishment.id }`">        
        <router-link :to="`/estabelecimentos/${establishment.id}/produtos`" class="name-establishment bold">{{ establishment.name }}</router-link>
        <ul class="list-sub-items">
            <slot>
                
            </slot>
        </ul>
    </div>
</template>

<script>
export default {
    name:"item-cart",
    props: {
        establishment:Object
    }  
}
</script>

<style lang="scss" scoped>
    .container-item{
        width: 95%;
        height: auto;
        background: #fff;
        margin: 10px auto;
        transition: opacity 250ms ease-in-out;
    }

    .name-establishment {
        font-size: 1.9em;
        margin: 0 0 10px 15px;
        display: block;
        color:#000;
        text-decoration: underline;
    }
    .list-sub-items {
        margin-bottom: 5px;
        padding: 0 5px;
    }
    
</style>
