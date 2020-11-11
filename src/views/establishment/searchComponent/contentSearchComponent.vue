<template>
    <div class="content-search">
        <div class="content-input">
            <input type="text" class="input-search" :placeholder="`Pesquise em ${ establishment_name }`" v-model="wordSearched" @input="toSearch">                
            <div class="icon-back-input-search" @click="$emit('event-close-search')">
                <!-- Exibido em mobile -->
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="back-icon-search" >
                    <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            </div>
            <div class="container-delete-search" :style=" wordSearched ? 'display:block' : 'display:none' " @click="clearInput"> 
                <spinner-loading :loading="is_loading" :width="'24px'" :height="'24px'" :position="'relative'" ></spinner-loading>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" v-if="!is_loading">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg> 
            </div>
        </div>
        <div class="container-autosuggestion">
            <p class="text-medium" v-if="suggestions.suggestion" style="margin:5px 0 10px 0"> 
                Você quer dizer? <span class="suggestion-correctly-word" @click="wordSearched = suggestions.suggestion; suggestions.suggestion = null"> {{ suggestions.suggestion }} </span> 
            </p>
            <ul class="list-result-autosuggestion"> 
                <searched-item 
                    v-for="suggest of suggestions.products" 
                    :key="suggest.id" 
                    :suggest=suggest 
                    @event-select-item="selectItem"
                    :wordSearched=wordSearched
                ></searched-item>
            </ul>
            <!--  -->
            <p class="text-medium" v-if="noProductsFound">Nenhum produto encontrado</p>
            <!--  -->
            <div class="container-list-result-words-search" v-if="recentsSuggetions.length">
                <p class="last-searchs">Sua ultimas pesquisas</p>
                <!--  -->
                <ul class="list-result-words-search"> 
                    <recent-searched-item 
                        v-for="word of recentsSuggetions" 
                        :key="word.id" 
                        :suggest=word
                        @event-select-item=selectItem
                        @event-delete-word=deleteWord>
                    </recent-searched-item>
                </ul>
                <!--  -->
            </div>
        </div>
    </div>
</template>

<script>
import { saveSearch, getWordsSearch, deleteWordSearched } from './words-searchs.js';
import searchedItem from "./searchedItemComponent";
import recentSearchedItem from "./recentSearchedItemsComponent";

export default {
    name: "container-search",
    components:{
        searchedItem,
        recentSearchedItem
    },
    props:{
        establishment_name: {
            type: String,
            required: false,
            default: () => "Pesquise no estabelecimento"
        }
    },
    data() {
        return {
            wordSearched: '',
            idTimeOut: undefined,
            // Objecto com id e nome
            suggestions: [],
            // Objecto com id e nome
            recentsSuggetions: [],
            noProductsFound: false,
            is_loading: false
        }
    },
    methods:{
        selectItem(suggest){
            saveSearch({
                id_establisment: this.$route.params.establishment,
                id: suggest.id,
                name: suggest.name
            })
            this.$emit('event-close-search')
            this.$router.push({ path: `/estabelecimentos/${this.$route.params.establisment_id}/produtos/${suggest.id}` })
        },
        deleteWord(suggest){
            deleteWordSearched(suggest.timestamp)
            this.getRecentSuggest()
        },
        toSearch() {
            const timeToSearch = 250;

            // Se palavra for vazia em questão de texto
            // Limpa container
            if (this.wordSearched.length === 0) return this.suggestions = []

            // Se palavra conter 1 caractere, retorna
            if (this.wordSearched.length < 3) return;

            // Espera um tempo definido para realizar a busca no servidor
            if (this.idTimeOut)
                clearTimeout(this.idTimeOut)

            // Define TimeOut
            this.idTimeOut = setTimeout(() => {
                this.is_loading = true
                const url = `https://api.buscavarejos.com/usuarios/estabelecimentos/${this.$route.params.establishment}/prod/pesquisar/${this.wordSearched}`;
                fetch(url, {
                        method: "GET"
                    })
                    .then(res => {
                        if (res.status !== 400 && res.status !== 200)
                            throw "Erro de conexão";

                        return res.json()
                    })
                    .then(suggestions => {
                        this.suggestions = suggestions
                        this.noProductsFound = !suggestions.products.length
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => this.is_loading = false) 
            }, timeToSearch);
        },
        getRecentSuggest(){
            this.recentsSuggetions = getWordsSearch(this.$route.params.establishment);
        },
        clearInput() {
            this.wordSearched = '';
            this.suggestions = [];
            this.noProductsFound = false
        }
    }
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
