<template>
    <div class="modal modal-add-rating"  @click="clickCloseModal">
        <div class="content-modal content-modal-add-rating">
            <message-error 
                :msg="error.msg" 
                :retry="error.retry" 
                @event-retry="verifyPermissionToWriteRating">
            </message-error>
            <!--  -->
            <spinner-loading :loading=is_loading position="relative"></spinner-loading>
            <!--  -->
            <div v-if="!error.msg && !is_loading">

                <p class="title">Adicionar avaliação</p>
                <!--  -->
                <div class="group-elements">
                    <!--  -->
                    <p class="sub-title text-medium">Classifique sua experiência de compra</p>
                    <!--  -->
                    <div class="container-stars-modal">
                        <div class="content-stars" @click="selectStarRatings">
                            <span class="span-icon-star" v-for="n in 5" :key="n" :data-rating="n" :class="n <= select_user_rating ? 'checked' : '' ">
                                <svg id="color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 23.92">
                                    <path class="body-star"
                                        d="M23.24,8.58,16,7.46,12.69.54a.77.77,0,0,0-1-.3.76.76,0,0,0-.29.3L8,7.46.75,8.58a.75.75,0,0,0-.62.86.86.86,0,0,0,.2.39l5.31,5.44L4.38,23a.76.76,0,0,0,.63.86.84.84,0,0,0,.47-.08L12,20.12l6.52,3.61a.75.75,0,0,0,1-.3.72.72,0,0,0,.08-.48l-1.26-7.68,5.31-5.44a.74.74,0,0,0,0-1A.87.87,0,0,0,23.24,8.58Z"
                                        transform="translate(0 -0.02)" />
                                    <path class="border-star"
                                        d="M22.89,8.69,15.83,7.61,12.67.9a.75.75,0,0,0-1-.29.71.71,0,0,0-.28.29L8.17,7.61,1.1,8.69A.72.72,0,0,0,.7,9.9l5.14,5.27L4.62,22.61a.73.73,0,0,0,.62.82.67.67,0,0,0,.44-.08L12,19.87l6.32,3.48a.71.71,0,0,0,1-.28.68.68,0,0,0,.08-.46l-1.22-7.44L23.29,9.9a.71.71,0,0,0,0-1A.68.68,0,0,0,22.89,8.69Z"
                                        transform="translate(0 -0.02)" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <!--  -->
                <div class="group-elements">
                    <p class="sub-title text-medium">Algum comentário a fazer?</p>
                    <textarea name="" id="" class="textarea-comment" v-model="comment" placeholder="Expresse sua opinião com intuito de ajudar outras pessoas a conhecer melhor o estabelecimento e seus produtos"></textarea>
                </div>
                <div class="group-elements">
                    <div class="flex_row">
                        <label for="private-rating-checkbox" class="text-medium">Tornar privada?</label>
                        <input type="checkbox" name="" id="private-rating-checkbox" v-model="is_private">
                    </div>
                    <p class="message-explanatory-rating">Só o estabelecimento terá acesso ao seu comentário</p>
                </div>

                <button class="button button-primary text-medium"
                    @click="saveRating" 
                    :disabled="btn_is_loading" 
                    :class=" btn_is_loading ? 'active-loading' : '' ">
                    <div class="ctn-text-button">
                        <p class="text-button">Salvar avaliação</p>
                    </div>
                    <span class="spinner-loading-button"></span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import messagePopup from '@/components/message-popup/message-popup';

import Request from '../../request';
import messageError from "../../message-error";
import { mapGetters } from 'vuex';

export default {
    name:"modal-add-rating",
    components:{
        messageError
    },
    computed:{
        uid(){
            if(this.user.loggedIn)
                return this.user.data.uid;
            else
                return undefined
        },
        ...mapGetters({
            user: "user"
        })
    },
    data(){
        return{
            select_user_rating: undefined,
            comment:"",
            is_private:false,
            is_loading: false,
            btn_is_loading: false,
            error:{}
        }
    },
    methods:{ 
        resetVariables(){
            // reseta variaveis
            this.select_user_rating = undefined;
            this.comment = "";
            this.is_private = false;
        },
        selectStarRatings(evt){
            const target = evt.target;
            if(target.tagName === "SPAN"){
                const rating = evt.target.getAttribute("data-rating");
                this.select_user_rating =  rating;
            }
        },
        clickCloseModal(e){
            const modal = document.querySelector('.modal-add-rating');
            if(e.target === modal){
                this.$emit('event-close-modal')
            }
        },
        verifyPermissionToWriteRating(){
            this.is_loading = true;
            this.error = {};

            const url = `https://api.buscavarejos.com/usuarios/estabelecimentos/${this.$route.params.establishment}/avaliacoes/permissao`,
                uid = this.uid

            Request.get(url,uid)
            .then( data => {
                console.log(data)
                if(data.permission){
                    this.error = {}
                }else{
                    this.error['msg'] = data.msg
                    this.error['retry'] = false;
                }
            })
            .catch( msgError => {
                console.error(msgError);
                this.error['msg'] = msgError;
                this.error['retry'] = true
            })
            .finally(() => this.is_loading = false);
        },
        saveRating(){
            this.btn_is_loading = true;

            const url =`https://api.buscavarejos.com/usuarios/estabelecimentos/avaliacoes`,
                uid = this.uid,
                body = {
                    id_establishment: this.$route.params.establishment,
                    uid_user: this.uid,
                    rating: this.select_user_rating,
                    comment: this.comment,
                    is_private: this.is_private 
                }
            Request.post(url,uid,body)
            .then( data => {
                const msg = data.msg;
                messagePopup(msg,3500)
                // fecha modal
                this.$emit('event-close-modal')
                this.$emit('event-reload-ratings');
            })
            .catch( msgError => messagePopup(msgError, 3500))
            .finally(() => this.btn_is_loading = false)
        }
    }
    
}
</script>

<style lang="scss" scoped>
    
    .modal{
        z-index: 10000;
    }
    // .modal{
    //     display:flex;
    //     opacity: 1;
    // }
    // .content-modal{
    //     transform:scale(1)
    // }

    .title{
        font-size: 1.8em;
        line-height: 1em;
        font-weight: bold;
        text-align: center;
        margin-bottom: 15px;
    }

    .group-elements{
        margin: 10px 0;
    }
    .sub-title{
        margin-bottom: 5px;
    }
    
    // Estilização das estrelas
    .container-stars-modal{
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .span-icon-star {
        width: 22px;
        height: 22px;
        margin-right: 5px;
        display: inline-block;
        svg {
            width: 100%;
            pointer-events: none;
            transition: fill 200ms;
        }
    }

    .checked .border-star {
        fill: #ffc107;
    }

    .body-star {
        fill: none;
    }

    .border-star {
        fill: none;
        stroke: #ffc107;
        stroke-width: 2px;
        stroke-miterlimit: 10;
    }
    // Comment 
    .textarea-comment{
        width: 100%;
        height: auto;
        min-height: 80px;
        resize: vertical;
        font-size: 1.5em;
        padding: 5px 10px;
        border: solid 1px #c8c8c8;
        border-radius: 5px;
    }
    // 
    .flex_row{
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content:start;
    }
    label{
        margin-right: 10px;
    }
    .message-explanatory-rating{
        font-size:1.4em;
        color:rgb(128, 128, 128);
    }

    
</style>