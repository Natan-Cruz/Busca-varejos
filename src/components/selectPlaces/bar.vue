<template>
   <div class="bar-select-place" @click="$emit('event-open-modal')">
       <!--  -->
        <div class="background-disabled" v-show="is_loading"></div>
        <!--  -->
        <span class="span select-value-master"> {{ current_address }} </span>
        <!--  -->
        <span class="span-icon-arrow" >
            <!--  -->
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="svg-arrow-select"> 
                <path class="abc" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/> 
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <!--  -->
        </span>
        <!--  -->
    </div>
</template>

<script>
export default {
    nmae:'bar-select-places',
    props:{
        open: {
            type:Boolean
        },
        is_loading: {
            type:Boolean
        },
        current_address: {
            type: String,
            required: false,
            default: () => "Defina seu endereço"
        }
    }
}
</script>

<style lang="scss" scoped>
    .bar-select-place{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .15);
        border-top: solid 1px rgba(0, 0, 0, .1);
        position: relative;
        margin-right: 15px;
        background-color: #fff;
    }
    .background-disabled{
        position:absolute;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        background:rgba(113, 113, 113, 0.55);
        display:none;
    }
    
    .span{
        font-size:1.7em;
        font-weight:bold;
    }
    .select-value-master{
        width: calc(100% - 30px);
        font-size: 1.7em;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .sub-text{
        font: inherit;
        padding-left: 10px;
    }
</style>