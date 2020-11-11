<template>
    <div class="container-select-ratings">
        <label for="input-select-ratings" class="label-select-ratings" :data-id="current_type_ratings.id" @click="openModal"> 
            <span class="label-text">{{ current_type_ratings.name }}</span> 
            <svg xmlns="http://www.w3.org/2000/svg"
                height="24" viewBox="0 0 24 24" width="24" class="svg-arrow-select">

                <path class="path" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg> 
        </label>
        <div class="modal modal-select-ratings" @click="clickCloseModal">
            <div class="content-modal content-select-ratings">
                <ul class="list-ratings" v-on:click.prevent="selectCategory"> 
                    <li data-id="0" data-name="Melhores avaliações" 
                        :style="current_type_ratings.id === 0 ? 'font-weight:bold' : '' ">
                        Melhores avaliaçoes
                    </li>
                    <li data-id="1" data-name="Mais recentes" 
                        :style="current_type_ratings.id === 1 ? 'font-weight:bold' : '' ">
                        Mais recentes
                    </li>
                    <li data-id="2" data-name="Suas avaliações" 
                        :style="current_type_ratings.id === 2 ? 'font-weight:bold' : '' ">
                        Suas avaliações
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"select-ratings",
    data(){
        return{
            current_type_ratings:{
                id:0,
                name:"Melhores avaliações"
            }
        }
    },
    methods:{
        openModal(){
            const modal = document.querySelector('.modal-select-ratings'),
                content = document.querySelector('.content-select-ratings');

            modal.classList.add('display-modal_flex')
            setTimeout(() => {
                requestAnimationFrame(() => {
                    content.classList.add('show-content-modal')
                    modal.classList.add('show-modal')
                })
            },50)
        },
        closeModal(){
             const modal = document.querySelector('.modal-select-ratings'),
                content = document.querySelector('.content-select-ratings');

            requestAnimationFrame(() => {
                content.classList.remove('show-content-modal');
                modal.classList.remove('show-modal')
            })
            setTimeout(() => {
                modal.classList.remove('display-modal_flex')
            }, 200)
        },
        clickCloseModal(e){
            const modal = document.querySelector('.modal-select-ratings');
            if(e.target === modal){
                this.closeModal()
            }
        },
        selectCategory(e){
            const id = e.target.getAttribute('data-id'),    
                name = e.target.getAttribute('data-name')

            this.current_type_ratings = {
                id:id,
                name: name
            }

            this.closeModal();
            this.$emit("event-change-type-ratings", id)
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-select-ratings {
        width: 100%;
        max-width: 300px;
        height: 50px;
        position: relative;
        margin: 20px 0;
    }
    .container-select {
        width: 100%;
        height: auto;
        cursor: pointer;
    }
    .label-select-ratings {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        cursor: pointer;
        box-shadow: 1px 1px 8px -1px rgba(0, 0, 0, 0.2);
        border-radius:5px;
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

    .content-modal{
        padding: 10px 20px;
    }

    .list-ratings{
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