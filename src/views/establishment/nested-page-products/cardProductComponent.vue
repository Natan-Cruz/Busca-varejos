<template>
   <router-link :to="productPath" class="card-product" :title="product.name">
       <!--  -->
        <div class="container-image skeleton" :id="`id-${ product.id }`"></div>
        <!--  -->
        <div class="container-description-block"> 
            <!--  -->
            <p class="text-medium" :title=product.name style="margin-top:5px;font-weight:bold;"> {{ product.name }}</p>
            <!--  -->
            <div class="content-spans" style="margin-top: 5px;"> 
                <p class="text-description" v-if="product.description"> {{ product.description }}  </p> 
                <p class="text-medium" style="margin-top:5px;">{{ formatPrice(product.price)}} </p>
            </div>
        </div>
        <!--  -->
    </router-link>
</template>

<script>
import Format from "@/components/Format.js";

export default {
    name:"item-product",
    props:{
        product: {
            type:Object
        }
    },
    computed:{
        productPath(){
            const establishmentId = this.$route.params.establishment,
                productId = this.product.id;
                
            return `/estabelecimentos/${establishmentId}/produtos/${productId}`
        }
    },
    mounted(){
        this.loadImage()
    },
    methods:{
        loadImage(){
            const skeleton = document.getElementById(`id-${this.product.id}`);
            if (this.product.photo) {

                const image = new Image()

                image.addEventListener('load', () => {
                    skeleton.classList.remove('skeleton');
                    if(image.width > image.height){
                        image.style.width = '100%'
                    }else{
                        image.style.height = '100%'
                    }
                    skeleton.appendChild(image);
                })

                image.addEventListener('error', function() {
                    skeleton.classList.remove('skeleton');
                    skeleton.classList.add('image-error')
                }, false)

                image.setAttribute('src', `https://api.buscavarejos.com${this.product.photo}?height=120&quality=80`)
            } else {
                skeleton.classList.remove('skeleton');
                skeleton.classList.add('image-not-found')
            }
        },
        ...Format("formatPrice")
    }
}
</script>
<style lang="scss" scoped>
    .card-product {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        color: #000;
        overflow: hidden;
        box-shadow:0px 1px 4px rgba(212, 212, 212, 0.05);
        border: solid 1px rgba(212, 212, 212, 0.5);
    }
    
    .container-image{
        width: 100%;
        height:120px;
        border-radius:5px;
        overflow: hidden;
        display:flex;
        justify-content:center;
        align-items: center;
    }

    .container-description-block{
        padding: 10px;
    }

    .text-medium{
        width: 100%;
        height: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .text-description{
        font-size:1.5em;    
        line-height: 1.5em;
        max-height: 90px;
        overflow: hidden;
        margin-bottom: 5px;
    }
</style>