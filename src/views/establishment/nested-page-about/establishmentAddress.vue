<template>
    <li class="li-row-info"> 
        <p class="text-medium bold">Endereço:</p> 
        <div class="content-informations-address">
            <p class="text-medium"> {{ informations.street }}, {{ informations.number }}</p> 
            <p class="text-medium"> {{ informations.neighborhood }} </p> 
            <p class="text-medium"> {{ informations.city }}, {{ informations.state }} </p> 
            <a :href="`https://www.google.com/maps/search/?api=1&query=${ informations.latitude },${ informations.longitude }`" target="_black" class="icon-external_link">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                        d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                </svg>
            </a>
        </div>
    </li>
</template>

<script>
export default {
    name: "establishment-address",
    props: {
        informations:{
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
    .content-informations-address{
        margin-top: 10px;
        padding-right: 40px;
    }
    .icon-external_link {
        position: absolute;
        top: calc(50% - 12px);
        right: 5px;
        width: 24px;
        height: 24px;
        cursor: pointer;
        svg {
            width: 100%;
        }
    }
</style>