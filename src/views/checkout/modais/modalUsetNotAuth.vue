<template>
  <div class="modal display-modal_flex show-modal" v-if="!loggedIn">
        <div class="content-modal show-content-modal">
            <!--  -->
            <p class="title">Para prosseguir é necessário uma conta:</p>
            <!--  -->
            <div class="container-block-buttons">
                <!--  -->
                <router-link to="/login?origin_url=/checkout" class="button button-primary text-medium">Entrar</router-link>
                <!--  -->
                <p class="text-medium bold text-between">Ou</p>
                <!--  -->
                <router-link to="/registrar?origin_url=/checkout" class="button button-primary text-medium">Registrar-se</router-link>
                <!--  -->
                <router-link to="'/'" class="btn-go-home button-tertiary text-medium bold">Pagina inicial</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'modal-user-not-auth',
    props:{
        loggedIn:{
            type: Boolean
        }
    }
}
</script>
<style lang="scss" scoped>
    .modal-user-not-auth{
        opacity: 1;
        display: flex;
    }
    .content-modal{
        max-width: 400px;
    }
    .title{
        font-size: 1.9em;
        line-height: 1em;
        text-align: center;
        margin-bottom: 20px;
    }
    .text-between{
        margin: 14px 0;
        text-align: center;
    }
    .button{
        max-width: 180px;
        margin: 0 auto;
    }
    .btn-go-home{
        width: 100%;
        height: 17px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;
        :disabled {
            opacity: .7;
        }
        margin-top: 30px;
    }
</style>