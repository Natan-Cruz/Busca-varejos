<template>
    <div class="wrapper-nav-bar">
        <div class="container-nav-bar">
            <div class="content-links">
                <!-- <router-link :to="`/estabelecimentos/${establishment_id}/promocoes`" class="item-nav-bar">
                    Promoções
                </router-link> -->
                <router-link :to="`/estabelecimentos/${establishment_id}/produtos`" class="item-nav-bar">
                    Produtos
                </router-link>
                <router-link :to="`/estabelecimentos/${establishment_id}/avaliacoes`" class="item-nav-bar">
                    Avaliações
                </router-link>
                <router-link :to="`/estabelecimentos/${establishment_id}/informacoes`" class="item-nav-bar">
                    Sobre
                </router-link>
                <router-link :to="`/estabelecimentos/${establishment_id}/mapa`" class="item-nav-bar">
                    Mapa
                </router-link>
            </div>
            <div class="slider">
                <div class="bar" ref="bar"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"nav-bar",
    computed:{
        establishment_id(){
            return this.$route.params.establishment
        }
    },
    watch:{
        $route (){
            this.translateBar()            
        }
    },
    mounted(){
        this.translateBar()
    },
    methods:{
        translateBar(){
            // if(this.setMarker('promocoes')){
            //     this.$refs['bar'].style.marginLeft = "0"
            // }
            if(this.setMarker('produtos')){
                this.$refs['bar'].style.marginLeft = "0%"
            }
            if(this.setMarker('avaliacoes')){
                this.$refs['bar'].style.marginLeft = "125px"
            }
            if(this.setMarker('informacoes')){
                this.$refs['bar'].style.marginLeft = "250px"
            }
            if(this.setMarker('mapa')){
                this.$refs['bar'].style.marginLeft = 125 * 3 + "px"
            }
        },
        setMarker( path ){
            const pathname = this.$route.path;
            if(pathname.indexOf(path) > 0)
                return true;
            else
                return false
        }
    }
}
</script>

<style lang="scss" scoped>
    $quantity-items:4;
    $proportion: unquote(100 / $quantity-items + "%");
    
    .wrapper-nav-bar{
        width: 100%;
        border: {
            top:solid 1px #ccc;
            bottom:solid 1px #ccc
        };
        margin:15px 0;
    }
    .container-nav-bar{
        width: 90%;
        overflow: {
            x: auto;
            y: hidden;
        };
        position: relative;
        margin:  0 5%;
    }
    .content-links{
        width: unquote(125 * $quantity-items + "px");
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
    }
  
    .item-nav-bar{
        width: $proportion;
        padding:10px 0;
        font-size: 2em;
        color:#000;
        text-decoration: none;
        text-align:center;
    }
    .slider{
        width: 100%;
        height: 5px;
        display: block;
        background: transparent;
        margin-top: 10px;
        border-radius: 5px;
        position:absolute;
        bottom:-2px;
    }

    .slider .bar{
        width: 125px;
        height: 5px;
        background: #ed1641;
        border-radius: 5px;
        transition: all 500ms ease-in-out;
    }
    // 
    .active_01{
        margin-left: 0;
    }
</style>