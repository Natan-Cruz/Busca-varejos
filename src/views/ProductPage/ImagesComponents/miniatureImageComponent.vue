<template>
    <!-- <li class="container-mini-image" :class="`block-image-item-${image.id} skeleton`" @click="$emit('event-select-mini-image')"> -->
    <li class="container-mini-image" 
        :class="{ 'skeleton' : is_loading, 'image-error' : error , 'image-not-found': not_found, 'miniature-selected': is_selected && (!error || not_found) }" 
        @click="selectImage" ref="miniature">

    </li>
</template>

<script>
import renderImage from "./renderImage";

export default {
    name:"miniature-image",
    props:{
        image: {
            id:Number,
            source:String
        },
        index: Number,
        is_selected:{
            type: Boolean,
            required: false,
            default: () => true
        },
    },
    data(){
        return{
            is_loading: true,
            not_found: false,
            error: false
        }
    },
    mounted(){
        this.loadImage()
    },
    methods: {
        selectImage(){
            if(this.error)
                this.loadImage();

            if(this.is_selected)
                return 
                
            this.$emit('event-select-mini-image',this.index )
        },
        loadImage(){
            this.is_loading = true;
            this.not_found = false;
            this.error = false;

            const ctnImage = this.$refs['miniature']
            ctnImage.innerHTML = ''

            if (this.image.source) {
                renderImage(`${this.image.source}?width=70`)
                .then( img => {
                    if( img.width > img.height){
                        img.style.width = '100%'
                    }else{
                        img.style.height = '100%'
                    }
                    img.setAttribute('class','miniature-image');

                    ctnImage.appendChild(img);

                    this.is_loading = false;
                })
                .catch( () => {
                    this.error = true;
                    this.is_loading = false;
                })
            } else {
                this.is_loading = false;
                this.not_found = true;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .container-mini-image{
        width: 70px;
        height: 70px;
        border-radius: 5px;
        margin-right: 10px;
        cursor: pointer;
        overflow: hidden;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 3px;
        box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.3);
        position: relative;
        user-select: none;

        &:hover{
            opacity: .8;
            transition: opacity 100ms;
        }


    }
    .mini-image{
        width:100%;
    }
    .miniature-selected::after{
        content: "";
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba($color: #c9c9c9, $alpha: 0.2);
    }
    .image-not-found::after , .image-error::after {
        white-space: pre-wrap;
    }
</style>