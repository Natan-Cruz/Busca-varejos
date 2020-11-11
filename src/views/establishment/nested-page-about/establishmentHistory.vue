<template>
    <li class="li-row-info" v-if="informations.history">
        <p class="text-medium bold">Descrição:</p>
        <p class="establishment-description">
            {{ informations.history }}
        </p>
    </li>
</template>

<script>
export default {
    name: "establishment-history",
    props:{
        informations:{
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
    .establishment-description {
        width: 100%;
        height: auto;
        resize: none;
        font-size: 1.6em;
        line-height: 1.2em;
        padding: 7px 5px 7px 10px;
        border-bottom: solid 1px rgba(168, 168, 168, .2);
        border-radius: 5px;
        margin-top: 10px;
    }
</style>