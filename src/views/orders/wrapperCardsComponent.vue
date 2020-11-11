<template>
    <div class="orders-container">
        <p class="title">{{ title }}</p>
        <ul class="list-items">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
export default {
    name: "wrapper-cards",
    props:{
        title: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
    .orders-container{
        margin-bottom: 20px;
    }
    .title{
        font-size: 2.2em;
        margin: {
            bottom: 20px;
        };
        font-weight: bold;
    }

    .list-items {
        width: 100%;
        margin: 0 auto;
        height: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        grid-template-rows: 300px;
        column-gap: 20px;
        row-gap: 15px;
        padding: 2px;
    }
    @media screen and (max-width: 755px) and (min-width: 500px) {
        .list-items {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }
</style>