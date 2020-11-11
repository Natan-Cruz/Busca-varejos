<template>
    <ul>
        <li class="li-row-info" v-for="n in 4" :key="n"> 
            <p class="skeleton skeleton-name"></p> 
            <div class="skeleton skeleton-detail">
                
            </div>
        </li>         
    </ul>
</template>

<script>
export default {
    name: "informations-skeleton"
}
</script>

<style lang="scss" scoped>
    .li-row-info{
        margin: 10px 0;
    }
    .skeleton-name{
        width: 200px;
        height: 30px;
    }
    .skeleton-detail{
        width: 100%;
        height: 60px;
        margin-top: 5px;
    }
</style>