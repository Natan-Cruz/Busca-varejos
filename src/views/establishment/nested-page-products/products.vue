<template>
    <div style="padding:0 5%">
        <categories :current_category="current_category"></categories>
        <div class="container-items">
            <item-category v-for="category in categories_prods" :key="category.id" :category="category" :quantityItems="category.products.length" :currentCategoryId=current_category.id> 
                <item-product v-for="product in category.products" :key="product.id" :product="product"></item-product>
            </item-category>
        </div>
        <spinner-loading :loading="is_loading" position="absolute" top="50px"></spinner-loading>
        <message-error :msg=errorMsg :retry="true" @event-retry="querys"></message-error>
    </div>
</template>

<script>
import categories from './customSelectCategories.vue';
import itemCategory from './wrapperCategoryComponent';
import itemProduct from './cardProductComponent';
import messageError from '../message-error';
import Request from '../request';

export default {
    name:"products-view",
    components:{
        categories,
        itemCategory,
        itemProduct,
        messageError
    },
    computed:{
        establishment_id(){
            return this.$route.params.establishment
        }
    },
    data(){
        return{
            categories_prods:[],
            current_category:{
                id:0,
                name: "Todas as categorias"
            },
            is_loading: true,
            errorMsg: ""
        }
    },
    watch:{
        $route (){
            this.querys()
        }
    },
    created(){
        this.querys()
    },
    methods:{
        getProducts(){
            this.is_loading = true;
            this.categories_prods = [];
            this.errorMsg = ""
            const url = `https://api.buscavarejos.com/usuarios/estabelecimentos/${this.establishment_id}/produtos`

            Request.get(url)
            .then( categories => {
                this.categories_prods = categories

                this.current_category = {
                    id: 0,
                    name: "Todas as categorias"
                }

            })
            .catch( msgError => this.errorMsg = msgError )
            .finally(() => this.is_loading = false)
        },
        selectCategory({ id }){
            if(id === 0){
                return this.getProducts()
            }
            this.is_loading = true;
            this.categories_prods = [];
            this.errorMsg = "";

            const url = `https://api.buscavarejos.com/usuarios/estabelecimentos/${this.establishment_id}/produtos?categoria=${id}`;
            Request.get(url)
            .then( categories => {
                this.categories_prods = categories
                this.current_category = {
                    id: categories[0].id,
                    name: categories[0].category
                }

            })
            .catch( msgError => this.defineError(msgError))
            .finally(() => this.is_loading = false)
        },
        querys(){
            const query = this.$route.query;

            if(query.categoria){
                this.selectCategory({ id: query.categoria })
            }else{
                this.getProducts()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-spinner-loading{
        margin: 25px 0;        
    }
</style>