<template>
   <div class="container-images">
       <div class="wrapper-images">
            <div class="container-images-carrousel">
                <ul class="images-carrousel" >
                    <image-component
                        v-for="image in source_images" 
                        :image="image"  
                        :key="image.id">
                    </image-component>
                </ul>
            </div>
            <!-- Versão 2.0 -->
            <div class="container-blocks-images">
                <ul class="content-blocks-images">
                    <miniature-image 
                        v-for="(image,i) in source_images" 
                        :key="image.id" 
                        :image=image 
                        :index=i
                        @event-select-mini-image=selectMiniatureImage 
                        :is_selected="current_index === i" >
                    </miniature-image>
                </ul>
            </div>
       </div>
    </div>
</template>

<script>
import imageComponent from "./imageComponent";
import miniatureImage from './miniatureImageComponent';
import "intersection-observer";
import scrollama from "scrollama"; // or...

// instantiate the scrollama
const scroller = scrollama();
export default {
    name:"container-images",
    components:{
        imageComponent,
        miniatureImage
    },
    props: {
        source_images:  Array,
        is_loading: Boolean,
    },
    data(){
        return{
            current_image: {},
            current_index: 0
        }
    },
    mounted(){
        scroller
            .setup({
                step: ".wrapper-images",
                offset: '60px',
                progress: false
            })
            .onStepEnter( ({ element, direction }) => {
                if(direction === 'down')
                    element.classList.add("position-sticky")

            })
            .onStepExit( ({ element, direction }) => {
                if(direction === 'up')
                    element.classList.remove("position-sticky")
            })
        this.enableOrDisableScroll()
        window.addEventListener("resize", this.enableOrDisableScroll);
    },
    beforeDestroy(){
        scroller.destroy()
        window.removeEventListener("resize", this.enableOrDisableScroll);
    },
    watch:{
        source_images(newValue){
            this.current_image = newValue[0];
        }
    },
    methods:{
        selectMiniatureImage(index){
            this.current_index = index;
            document.querySelector(".images-carrousel").style.transform = `translateX(-${(index * 100)}%)`
        },
        enableOrDisableScroll(){
            const breakpoint = 650;
            if(window.innerWidth > breakpoint)
                scroller.enable();
            else
                scroller.disable();
            
            scroller.resize()
        },
        
    }
}
</script>

<style lang="scss" scoped>
    .container-images{
        border-bottom: solid 1px #ccc
    }
    .container-images-carrousel{
        width: 100%;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        min-height: 40vh;
        user-select: none;
    }
    .images-carrousel{
        // width: 100%;
        margin: 0 auto;
        height: auto;
        display: grid;
        // grid-template-columns: repeat(auto-fill, 100%);
        grid-auto-columns: 100%;
        grid-template-rows: auto;
        grid-auto-flow: column;
        column-gap: 10px;
        row-gap: 10px;
        padding: 2px;
        transition: 300ms;
    }

    .container-blocks-images {
        width: 100%;
        height: auto;
        overflow: {
            x: auto;
            y: none
        }
    }
    .content-blocks-images {
        width: auto;
        height: 100%;
        margin-top: 15px;
        white-space: nowrap;
        padding: 1px;
        margin-bottom: 15px;
        display: flex;
        flex-direction: row;
        justify-content: start;
    }
    .skeleton-content-blocks-images{
        height: 70px;
    }

    @media screen and (min-width:650px) {
        .container-image-product {
            max-height: 60vh;
        }
        // Breakpoint sticky
        .position-sticky{
            position: sticky;
            top: 80px;
        }
    }
</style>