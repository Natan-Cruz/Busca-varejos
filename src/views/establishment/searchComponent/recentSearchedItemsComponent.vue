<template>
    <li class="search-item">
        <span class="text-medium" @click="$emit('event-select-item', suggest)" > {{  suggest.name }} </span>
        <span class="span-delete-word-search" @click="$emit('event-delete-word', suggest)" >&#10005;</span>
    </li>
</template>

<script>
export default {
    name: "recent-searched-item",
    props:{
        suggest: Object
    }
}
</script>

<style lang="scss" scoped>
    .search-item{
        padding: 10px 0;
        transition: 100ms;
        cursor: pointer;

        &:hover{
            opacity: 0.8;
            cursor: pointer;
        }

        &:active{
            transform: scale(0.98);
        }
    }

    .span-delete-word-search {
        font-size: 1.8em;
        float: right;
        cursor: pointer;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        padding: 0 5px;
        user-select: none;
        transition: 100ms;
        background: #fff;
        &:hover {
            background: rgb(219, 219, 219)
        }
        &:active {
            background: rgb(201, 201, 201);
            color: #fff;
        }
    }

</style>