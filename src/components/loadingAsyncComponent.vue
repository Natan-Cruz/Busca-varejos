<template>
    <div class="main">
        <spinner-loading :loading="true"></spinner-loading>
    </div>
</template>

<script>
export default {
    name:"loading"
}
</script>

<style lang="scss" scoped>
    .main{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
</style>