<template>
   <div class="container-informations">
       <div class="content-informations">
            <div class="container-logo-establishment">
                <span class="skeleton skeleton-logo"></span>
                <img src="" alt=" Foto da logo" class="img-logo-establishment" style="display: none;">
            </div>
            <div style="padding: 0 0 3px 10px;width: calc(100% - 120px);">
                <p class="name-establishment" :class=" !establishment.name ? 'skeleton': ''">{{ establishment.name }}</p>
                <!-- Stars of ratings -->
                <div class="description-establishment"> 
                    <span class="span-icon-star"> 
                        <svg id="color" mlns="http://www.w3.org/2000/svg" viewBox="0 0 24 23.96" >
                            <path class="cls-star"
                                d="M23.36,8.6,16,7.47l-3.3-7a.78.78,0,0,0-1.36,0L8,7.47.63,8.6A.75.75,0,0,0,.21,9.86l5.36,5.5L4.3,23.12a.76.76,0,0,0,1.11.78L12,20.26l6.59,3.64a.75.75,0,0,0,1.1-.78l-1.27-7.76,5.36-5.5a.74.74,0,0,0-.42-1.26Z"
                                transform="translate(0 -0.03)" />
                        </svg> 
                    </span> 
                    <span class="text-medium span-ratings">{{ formatRatings(establishment.rating) }}</span>
                </div>
            </div>
       </div>
    </div>
</template>

<script>
export default {
    name:"informations",
    props: {
        source_logo: String,
        establishment: {
            type: Object,
            required: false,
            default: () => {}
        }
    },
    watch:{
        source_logo(newVal){
            if(newVal !== undefined && newVal !== null){
                this.loadLogo()
            }
            
        }
    },
    methods: {
        formatRatings(rating){
            if(!rating)
                return "-,--"
                
            rating = parseFloat(rating).toFixed(1)

            const splited = rating.split('.')

            if (splited.length === 1) {
                return `${rating},0`
            }

            if (splited[1].length === 1) {
                return `${rating.replace('.', ',')}`
            }
        },
        loadLogo(){
             const imgLogo = document.querySelector('.img-logo-establishment'),
                skeleton = document.querySelector('.skeleton-logo')

            // "Caso não há uma src de image retorna"
            if (!this.source_logo) {
                // adciona classe de imagem nao encontrada
                skeleton.classList.add('image-not-found')
                // remove classe principal do skeleton
                return skeleton.classList.remove('skeleton');
            }

            // Ouve o evento de load
            imgLogo.addEventListener('load', function() {
                // exibi tag de img
                imgLogo.style.display = 'block'
                    // oculta skeleton
                skeleton.style.display = 'none'
            })

            // Ouve evento de error
            imgLogo.addEventListener('error', function() {
                 // adciona classe de erro de imagem
                skeleton.classList.add('image-error')
                // remove classe principal do skeleton
                skeleton.classList.remove('skeleton');
            }, false);

            // seta src da imagem
            imgLogo.src = 'https://api.buscavarejos.com' + this.source_logo + "?width=115"
            // imgLogo.src = this.source_logo
        }
    }
}
</script>
<style lang="scss" scoped>
    .container-informations{
        width: 100%;
        height: 50px;
        position: relative;
    }
    .content-informations{
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: start;
        align-items: flex-end;
        flex-direction: row;
        // margin-top: 140px;
        position: absolute;
        top:-30px;
        left: 0;
        padding:0 5%;
    }
    .name-establishment{
        width: 100%;
        max-width: 600px;
        height: 1em;
        font-size: 2em;
        line-height: 1em;
        white-space: nowrap;
        text-transform: capitalize;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-bottom: 5px;
        font-weight: bold;
        margin-bottom: 3px;
    }
    .container-logo-establishment{
        width: 80px;
        height: 80px;
        border-radius: 5px;
        padding: 3px;
        box-shadow: 0 0 4px rgba(0, 0, 0, .2);
        background: #fff;
        flex-shrink: 0;
        img{
            width: 100%;
        }
    }

    .description-establishment{
        height:20px;
        display: flex;
        justify-content: start;
        align-items: center;
    }
    .span-ratings{
        display: inline-block;
        margin-left: 5px;
        color: #ffc107;
        font-weight: bold;
    }

    .span-icon-star{
        width: 20px;
        height: 20px;
        display: inline-block;

        & > svg{
            width: 100%;
        }
    }
    .cls-star {
        fill: #ffc107;
    }
    

    @media screen and (min-width:750px){
        .container-logo-establishment{
            width: 120px;
            height: 120px;
        }
    }
</style>