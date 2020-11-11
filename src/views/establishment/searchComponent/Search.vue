<template>
    <div class="container-search">
        <magnifying-glass-icon 
            @event-open-search="openContainerSearch">
        </magnifying-glass-icon>
        <background-component 
            @event-close-search="closeContainerSearch" 
            :is_open=is_open >
        </background-component>
        <container-search 
            @event-close-search=closeContainerSearch  
            :establishment_name=name 
            ref="content_search" >
        </container-search>
    </div>
</template>

<script>
import magnifyingGlassIcon from "./magnifyingGlassIconComponent";
import containerSearch from "./contentSearchComponent";
import backgroundComponent from "./backgroundComponenet";

export default {
    name: "search",
    components: {
        magnifyingGlassIcon,
        containerSearch,
        backgroundComponent
    },
    props: {
        name: String // Nome do estabelecimentos
    },
    data(){
        return{
            is_open: false
        }
    },
    methods: {
        openContainerSearch() {
            this.is_open = true;
            const contentSearch = document.querySelector('.content-search'),
                contentInput = document.querySelector('.content-input'),
                iconBackInputSearch = document.querySelector('.icon-back-input-search');

            document.querySelector('html').style.overflow = 'hidden'

            // Define foco no campo de pesquisa
            setTimeout(() => {
                document.querySelector('.input-search').focus();
            }, 50)

            contentSearch.style.display = 'block';

            requestAnimationFrame(() => {
                contentInput.classList.add('show-content_input');
                iconBackInputSearch.classList.add('show-icon_back');
                iconBackInputSearch.classList.remove('hide-icon_back')
            })

            this.$refs['content_search'].getRecentSuggest()
        },
        closeContainerSearch() {
            this.is_open = false
            const contentSearch = document.querySelector('.content-search'),
                contentInput = document.querySelector('.content-input'),
                iconBackInputSearch = document.querySelector('.icon-back-input-search');

            const html = document.querySelector('html')
            if (html.style.removeProperty) {
                html.style.removeProperty("overflow")
            } else {
                html.style.removeAttribute("overflow")
            }

            requestAnimationFrame(() => {
                iconBackInputSearch.classList.remove('show-icon_back');
                iconBackInputSearch.classList.add('hide-icon_back')
                contentSearch.style.display = 'none';
                contentInput.classList.remove('show-content_input');
                // Retira foco no campo de pesquisa
                document.querySelector('.input-search').blur();
            })

            this.$refs['content_search'].clearInput()
        }
    }
}
</script>
<style lang="scss">
    
    @media screen and (min-width:550px) {
        .container-search {
            position: relative;
        }
    }
</style>