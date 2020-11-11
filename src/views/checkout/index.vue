<template>
  <div>
        <vue-headful 
            title="Busca Varejos - Checkout"
            description="Faça checkout no Busca Varejos de maneira simples e confortavel">
        </vue-headful>
        <custom-header></custom-header>
        <main>
            <div class="main" :class="translateX ? 'translateX-main ' : '' ">
                <container-left 
                    @event-translate-x="TranslateX" 
                    :user="user" 
                    :cart=cart>
                </container-left>
                <container-right 
                    @event-translate-x="TranslateX" 
                    :user="user" 
                    :cart=cart 
                    @event-open-modal-sucess="OpenModalSucess">
                </container-right>
            </div>
        </main>
        <modal-sucess ref="modal_sucess" :orders=arr_id_orders></modal-sucess>
        <modal-user-not-auth :loggedIn="user.loggedIn"></modal-user-not-auth>
  </div>
</template>

<script>
import customHeader from './customHeader';
import containerLeft from './containerLeft/index';
import containerRight from './containerRight/index';

import modalSucess from './modais/modalSucess';
import modalUserNotAuth from './modais/modalUsetNotAuth.vue';

import { mapGetters } from 'vuex'

export default {
    name: 'checkout',
    components:{
        customHeader,
        containerLeft,
        containerRight,
        modalSucess,
        modalUserNotAuth
    },
    computed:{
        ...mapGetters({
            user: "user",
            cart:"cart"
        })
    },
    data(){
        return{
            translateX:false,
            arr_id_orders:[]
        }
    },
    methods: {
        TranslateX(){
            this.translateX = this.translateX ? false : true
        },
        OpenModalSucess(arr_id_orders){
            this.arr_id_orders = arr_id_orders
            this.$refs['modal_sucess'].openModal()
        }
    }
}
</script>

<style lang="scss" scoped>
    html,body,#app,main {
        width: 100%;
        overflow-x: hidden;
    }
    .main {
        width: 100%;
        height: auto;
        padding: 70px 10px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .content-block {
        width: 49%;
        height: 100%;
        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        background: #fff;
        padding: 20px;
        position: relative;
    }
    @media screen and (max-width:750px) {
        .main {
            width: 200%;
            padding: 60px 0 0 0;
            
            -webkit-transform: translateX(-50%);
            /* Ch <36, Saf 5.1+, iOS < 9.2, An =<4.4.4 */
            -ms-transform: translateX(-50%);
            /* IE 9 */
            transform: translateX(-50%);
            /* IE 10, Fx 16+, Op 12.1+ */


            transition: 300ms;
        }
        
        .translateX-main {
            -webkit-transform: translateX(0);
            /* Ch <36, Saf 5.1+, iOS < 9.2, An =<4.4.4 */
            -ms-transform: translateX(0);
            /* IE 9 */
            transform: translateX(0);
            /* IE 10, Fx 16+, Op 12.1+ */
        }
        .content-block {
            width: 50%;
        }
        .sacola,
        .close {
            display: block;
        }
    }
</style>