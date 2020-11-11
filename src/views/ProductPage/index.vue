<template>
  <div>
        <vue-headful 
            :title="title_page"
            :description="description_page">
        </vue-headful>
        <custom-header></custom-header>
        <main>    
            <error-component :msg="error.msg" :retry="error.retry" @event-retry="fetchProduct"></error-component>
            <div class="display-grid" v-if="!error.msg">
                <container-images :source_images=product.source_images :is_loading=is_loading></container-images>

                <div class="background-closed" v-if="is_closed && !is_loading && !error.msg">
                    <p class="alert-closed" style="margin-right:15px">&#9888;</p> <p class="alert-closed bold">Estabelecimento fechado</p>
                </div>

                <skeleton-informations-product v-if="is_loading"></skeleton-informations-product>
                <container-informations :product=product v-else></container-informations>
            </div>
      </main>
  </div>
</template>

<script>
import customHeader from './customHeader';
import ContainerImages from './ImagesComponents/container-images';
import ContainerInformations from './informationsComponents/container-informations';
import skeletonInformationsProduct from './skeleton-informations-product';

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Axios from 'axios';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export default {
    name: 'product',
    components:{
        customHeader,
        ContainerImages,
        ContainerInformations,
        skeletonInformationsProduct
    },
    computed:{
        title_page(){
            // Carregando informações do produto
            if(this.is_loading){
                return "Carregando...";
            }else{
                // Deu erro
                if(this.error.msg){
                    return this.error.msg;
                }else
                // Deu tudo certo
                if(this.product){
                    return this.product.name;
                }else{
                    return ""
                }
            }
        },
        description_page(){
            if(this.product){
                if(this.product.description){
                    return this.product.description
                }else{
                    return this.product.name
                }
            }else{
                return "Pagina do produto - Busca Varejos"
            }
        },
        is_closed(){
            if(!this.establishment.in_operation) 
                return true;
            else
                return false;
            // if(!this.establishment.opening_hours || !this.inOperation) 
            //     return true;

            // const currentOpeningHour = this.establishment.opening_hours[dayjs().day()];

            // const s = dayjs().isBetween(dayjs(currentOpeningHour.start, "HH-mm"), dayjs("23:59", "HH-mm")),
            //     e = dayjs().isBetween(dayjs("00:00", "HH-mm"), dayjs(currentOpeningHour.end, "HH-mm"));
                
            // if(currentOpeningHour.closed === "1"){
            //     return true;
            // }else{
            //     if(!(s && e)){
            //         return true;
            //     }else{
            //         return false;
            //     }
            // }
        }
    },
    data(){
        return{
            product: {},
            establishment:{},
            is_loading:true,
            error: {
                msg: "",
                retry: false
            }
        }
    },
    created(){
        this.fetchProduct();
    },
    methods: {
        fetchProduct(){
            this.is_loading = true;
            this.error = {
                msg:"",
                retry: false
            };

            const establishmentId = this.$route.params.establishment,
                productId = this.$route.params.product,
                url = `https://api.buscavarejos.com/usuarios/estabelecimentos/${establishmentId}/produtos/${productId}`;

            Axios.get(url)
            .then( ({ data }) => {
                const { establishment, product } = data

                this.product = product;
                this.establishment = establishment;

                if(establishment.id !== this.$route.params.establishment)
                    this.$router.replace(`/estabelecimentos/${establishment.id}/produtos/${product.id}`)
                
            })
            .catch( error => {
                 if (error.response) {
                    const errorName = error.response.data.name,
                        errorMsg = error.response.data.message;
                    
                    if(errorName !== "BvjError")
                        this.error['retry'] = true;

                    this.error['msg'] = errorMsg;
                } else{
                    this.error['msg'] = "Ops, ocorreu algum problema!"
                    this.error['retry'] = true
                }
            })
            .finally(() => {
                this.is_loading = false
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .group-icons {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .display-grid {
        position: relative;
        padding: {
            top: 80px;
            left: 5%;
            bottom: 60px;
            right: 5%;
        };
    }

    .container-msg-error{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content:center;
        flex-direction: column;
        align-items:center
    }

    .background-closed{
        width: 100%;
        height: 42px;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0 20px;
    }
    .alert-closed{
        font-size: 2.2em;
        line-height: 1em;
        color:#fff;
    }
    
    @media screen and (min-width:650px) {
        .display-grid {
            position: relative;
            padding: {
                top: 100px;
                left: 5%;
                bottom: 0;
                right: 5%;
            };
            display:grid;
            grid-template-areas: 'image description';
            grid-template-columns: repeat(2, 50%);
            grid-template-rows: 100%;
        }
        .container-images {
            width: 100%;
            height: auto;
            grid-area: image;
            padding: 0 10px;
        }
        .content-informations {
            grid-area: description;
            padding: 0 10px;
            position: relative;
        }
        .textarea-message,
        .skeleton-textarea {
            height: 160px;
        }
    }
</style>