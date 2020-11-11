<template>
    <div>
        <p class="title">Status do pedido</p>
        <!--  -->
        <ul class="group-status">
            <item-status v-for="(status,i) in order.status" :key=i :status=status></item-status>
        </ul>
    </div>
</template>

<script>
import itemStatus from './itemStatusComponent';

export default {
    name: "container-informations-status",
    components:{
        itemStatus
    },
    props:{
        order:{
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
    .title {
        font-size: 2em;
        line-height: 1em;
        font-weight: bold;
        padding-top: 10px;
    }
</style>