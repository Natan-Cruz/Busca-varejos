<template>
    <div class="container-coments">
        <h2 class="message-explanatory text-medium">As avaliações e comentários abaixos expressam a opinião exclusiva de quem os escreveu</h2>
        <!-- Selecionar tipo de avaliaçoes -->
        <div class="container-flex_row">
            <select-ratings 
                @event-change-type-ratings="selectTypeRatings">
            </select-ratings>
            <modal-rating  @event-reload-ratings=selectTypeRatings></modal-rating>
        </div>
        <!-- container error -->
       <message-error :msg=error.msg :retry=error.retry @event-retry="selectTypeRatings"></message-error>
        <!-- spinner loading -->
        <div class="container-spinner-loading" v-if="is_loading">
            <spinner-loading :loading=is_loading></spinner-loading>
        </div>
        <p class="text-medium" style="text-align:center;margin-top:60px" v-if="msg"> {{ msg }} </p>
        <!-- Avaliações -->
        <item-rating @event-remove-rating=removeRating v-for="(user_rating,i) in user_ratings" :key="i" :rating=user_rating></item-rating>
        <!-- Adicioanr ou editar avaliação -->
    </div>
</template>

<script>
import selectRatings from "./select-ratings";
import itemRating from './item-rating';
import modalRating from './modal/index';
import messageError from '../message-error';
import { mapGetters } from 'vuex';
import messagePopup from '../../../components/message-popup/message-popup';

import Request from '../request.js'

export default {
    name:"ratings-view",
    components:{
        selectRatings,
        itemRating,
        modalRating,
        messageError
    },
    computed:{
        ...mapGetters({
            user:"user"
        })
    },
    data(){
        return{
            user_ratings: [],
            is_loading: false,
            error: {},
            msg:""
        }
    },
    created(){
        this.selectTypeRatings()
    },
    methods:{
        removeRating(rating_id){
            
            const url =`https://api.buscavarejos.com/usuarios/estabelecimentos/avaliacoes`,
                uid = this.user.loggedIn ? this.user.data.uid : false;

            Request.delete(url, uid, { rating_id })
            .then( data => {
                const msg = data.msg;
                this.user_ratings = this.user_ratings.filter( rating => {
                    if(rating.rating.id !== rating_id)
                        return rating
                })
                messagePopup(msg, 3500)
            })
            .catch( msgError => this.defineError(msgError))
            .finally(() => this.is_loading = false)
        },
        selectTypeRatings(id = 1){
            this.is_loading = true;
            this.user_ratings = [];
            this.error = {};
            this.msg = "";

            const types = new Map()
            types.set(1, "best_ratings")
            types.set(2, "most_recent")
            types.set(3, "your_ratings")

            const typeRatings = types.get(id) || types.get(1)

            const establishmentId = this.$route.params.establishment;

            const url =`https://api.buscavarejos.com/usuarios/estabelecimentos/${establishmentId}/avaliacoes?type=${typeRatings}`,
                uid = this.user.loggedIn ? this.user.data.uid : null;

            Request.get(url,uid)
            .then( data => {
                if(data.msg){
                    this.msg = data.msg
                }else{
                    this.user_ratings = data.user_ratings;
                }
            })
            .catch( msgError => this.defineError(msgError))
            .finally(() => this.is_loading = false)
        },
        defineError(msg, is_button = true ){
            this.error = {
                msg: msg,
                retry: is_button
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .container-flex_row{
        width:100%;
        height: 50px;
        display:flex;
        justify-content:start;
        align-items: center;
        flex-direction: row;
    }
    .container-coments{
        width: 100%;
        padding:0 5% 100px 5%;
    }
    // 
    .message-explanatory{
        margin:15px 0;
        padding-left:10px;
        position: relative;
        &::before {
            content:"";
            display:block;
            width: 4px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background-color:#eb2a51;
        }
    }
    // 
    .container-spinner-loading{
        width: 100%;
        margin: 25px 0;        
    }
</style>
