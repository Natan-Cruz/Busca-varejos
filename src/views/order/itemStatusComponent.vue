<template>
    <li class="group-span">
        <span class="text-medium"> <span class="sub-text bold"> {{ status.status }} as </span> <span class="sub-text" style="white-space: pre;">{{ timedate }} </span></span>
        <p class="text-medium status-message" v-if="status.message">{{ status.message }}</p>
    </li>
</template>

<script>
import dayjs from "dayjs";

export default {
    name:"item-status",
    props:{
        status: {
            type:Object
        }
    },
    computed:{
        timedate(){
			return dayjs(this.status.createdAt).format("HH:mm[h] [-] DD/MM")
        }
    }
}
</script>

<style lang="scss" scoped>
    .text-datetime-status{
        margin: 5px 0 0px 15px;
    }
    .group-span{
        padding: 10px 5px;
        border-bottom:solid 1px #ccc;
    }

    .status-message{
        color: #595959;
        margin-top: 5px;
    }
</style>