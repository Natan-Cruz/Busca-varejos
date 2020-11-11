<template>
    <div class="container-image-product" 
        :class="{ 'skeleton' : is_loading, 'image-error' : error , 'image-not-found': not_found}" 
        ref="main_image"> 
    </div>
</template>

<script>
import renderImage from "./renderImage";

export default {
    name: "image-component",
    props: {
        image: {
            type: Object
        }
    },
    data(){
        return{
            is_loading: true,
            not_found: false,
            image_is_render:false,
            error: false
        }
    },
    mounted(){
        this.loadImage();
    },
    methods:{
        loadImage(){
            this.not_found = false;
            this.error = false;

            const ctnMainImage = this.$refs['main_image']
            
            if (this.image.source) {
                renderImage(this.image.source)
                .then( image => {

                    const aspecRatioImage = image.width / image.height,
                        aspecRatioCtnImage = ctnMainImage.offsetWidth / ctnMainImage.offsetHeight

                    // Imagem é retangular e maior em eixo y
                    if(aspecRatioImage < 1){
                        // eslint-disable-line no-use-before-define
                        image.style.maxHeight = '40vh'
                    } 

                    // Imagem é quadrada
                    if(aspecRatioImage === 1){
                         // eslint-disable-line no-use-before-define
                        if( aspecRatioCtnImage > 1){
                            image.style.maxHeight = '40vh'
                        }
                        if(aspecRatioCtnImage === 1 || aspecRatioCtnImage < 1){
                            image.style.width = '100%';
                        }
                    }
                    // Imagem é retangular e maior em eixo x
                    if(aspecRatioImage > 1){
                         // eslint-disable-line no-use-before-define
                        image.style.width = '100%';
                    }

                    ctnMainImage.innerHTML = ''
                    ctnMainImage.appendChild(image);

                    this.is_loading = false;
                })
                .catch( () => {
                    this.error = true;
                    this.is_loading = false;
                })

                
            } else {
                this.not_found = true;
                this.is_loading = false;
            }
        },
        reloadImage(src){
            renderImage(src)
            .then( image => {
                if( image.width >= image.height){
                    image.style.width = '100%'
                }else{
                    image.style.height = '100%'
                }
                document.querySelector('.container-image-product').innerHTML = ''
                document.querySelector('.container-image-product').appendChild(image);
            })
            .catch( err => {
                console.error(err)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-image-product {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        overflow: hidden;
        min-height: 40vh;
        user-select: none;
    }
</style>