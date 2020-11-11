<template>
    <div class="container-categorys">
        <label for="input-select-categorys" class="label-select-categorys" :data-id="current_category.id" @click="openModal"> 
            <span class="label-text">{{ current_category.name }}</span> 
            <svg xmlns="http://www.w3.org/2000/svg"
                height="24" viewBox="0 0 24 24" width="24" class="svg-arrow-select" :style="open ? 'transform:rotate(0)': '' ">

                <path class="path" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg> 
        </label>
        <div class="modal-categories" @click="clickCloseModal">
            <div class="content-modal-categories">
                <div class="wrapper">
                    <ul class="list-categories" @click="selectCategory"> 
                        <li data-id="0" data-name="Todas as categorias" :style="current_category.id === 0 ? 'font-weight:bold' : '' ">
                            Todas as categorias
                        </li>
                        <li 
                            v-for="category in categories" class="" 
                            :key="category.id"
                            :data-id="category.id" 
                            :data-name="category.name" 
                            :style="current_category.id === category.id ? 'font-weight:bold' : '' ">
                            {{ category.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"categories",
    props:{
        current_category: Object
    },
    data(){
        return{
            establishment_id: this.$route.params.establishment,
            categories:[],  
            open: false
        }
    },
    created(){
        this.getCategories()
    },
    methods: {
        getCategories(){
             fetch(`https://api.buscavarejos.com/usuarios/estabelecimentos/${ this.establishment_id }/categorias`)
            .then( res => res.json())
            .then( categories => this.categories = categories)
            .catch( e => console.error(e))
        },
        openModal(){
            this.open = true;

            if(this.loading) return;

            const modal = document.querySelector('.modal-categories'),
                contentPlaces = document.querySelector('.content-modal-categories');

            document.querySelector('html').style.overflow = 'hidden';

            modal.style.display = '-webkit-box';
            modal.style.display = '-ms-flex';
            modal.style.display = '-webkit-flex';
            modal.style.display = 'flex';

            requestAnimationFrame(() => {
                contentPlaces.classList.add('show-content-categories')
                modal.classList.add('show-modal')
            })
            
        },
        clickCloseModal(e){
            const modal = document.querySelector('.modal-categories')
            if( e && e.target  === modal){
                this.closeModal()
            }
        },
        closeModal(){
            const modal = document.querySelector('.modal-categories'),
                contentPlaces = document.querySelector('.content-modal-categories');
            const html = document.querySelector('html')

            this.open = false;
            requestAnimationFrame(() => {
                if (html.style.removeProperty) {
                    html.style.removeProperty("overflow")
                } else {
                    html.style.removeAttribute("overflow")
                }
                contentPlaces.classList.remove('show-content-categories');
                modal.classList.remove('show-modal');
            })
            setTimeout(() => {
                modal.style.display = 'none';
            }, 200)

        },
        selectCategory(e){
            const id = e.target.getAttribute('data-id');

            this.closeModal();
            if(id == 0){
                this.$router.push(`/estabelecimentos/${this.establishment_id}/produtos`)
            }else{
                this.$router.push(`/estabelecimentos/${this.establishment_id}/produtos?categoria=${id}`)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-categorys {
        position: relative;
        height: 50px;
    }
    .container-select {
        width: 100%;
        height: auto;
        cursor: pointer;
    }
    .label-select-categorys {
        width: 100%;
        max-width: 500px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .3);
        border-radius:5px;
        margin: 10px 0;
    }

    .label-text {
        width: calc(100% - 42px);
        font-size: 1.7em;
        font-weight: bold;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .svg-arrow-select {
        transform: rotate(180deg);
        transition: 200ms;
    }
    .path {
        fill: #000;
    }

    .modal-categories{
        width: 100%;
        height: 100%;
        display:none;
        justify-content:center;
        align-items: center;
        background:rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left:0;
        opacity: 0;
        transition: opacity 200ms;
        z-index: 10000;
    }
    .show-modal{
        opacity: 1;
    }
    // 
    .content-modal-categories{
        width: 80%;
        max-width: 500px;
        height: auto;
        max-height:80vh; 
        background:#fff;
        border-radius: 5px;
        transition: 250ms;
        transform:scale(.8);
        overflow: hidden;
    }
    .show-content-categories{
        transform:scale(1)
    }
    .wrapper{
        width: 100%;
        height: auto;
        max-height: 80vh;
         overflow: {
            x:hidden;
            y:auto
        }
    }
    .list-categories{
        width: 100%;
        height: auto;
        li{
            width:100%;
            height: 56px;
            font-size: 1.7em;
            line-height:1em;
            padding:20px 15px;
            cursor: pointer;
            transition: background 250ms, color 250ms;
            &:hover{
                background: #efefef;
                color:#5e5e5e;
            }
            &:active{
                background: #e9e9e9;
            }
        }
    }
</style>