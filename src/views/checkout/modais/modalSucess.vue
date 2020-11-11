<template>
     <div class="modal modal-sucess">
        <div class="content-modal content-modal-sucess">
            <span class="text-modal">Pedido realizado com sucesso</span>
            <div class="container-list-number-orders">
                <p class="bold" style="font-size: 2.2em;" v-for="(order,i) in orders" :key="i">Nº do pedido: #{{ order }}</p>
            </div>
            <span class="text-modal">Você pode acompanhar o(s) pedido(s) por aqui.</span>
            <router-link v-bind:to="'/pedidos'" class="button button-second text-medium">Acompanhar</router-link>
            <div class="container-float-button">
                <button class="button button-primary text-medium button-exit-modal" @click="closeModal">Ok, voltar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"modal-sucess",
    props:{
        orders:Array
    }, 
    methods:{
         openModal(){
            this.open = true;

            if(this.loading) return;

            const modal = document.querySelector('.modal-sucess'),
                content = document.querySelector('.content-modal-sucess');

            modal.classList.add('display-modal_flex')
            requestAnimationFrame(() => {
                content.classList.add('show-content-modal')
                modal.classList.add('show-modal')
            })
            
        },
        closeModal(){
             const modal = document.querySelector('.modal-sucess'),
                content = document.querySelector('.content-modal-sucess');

            this.open = false;
                requestAnimationFrame(() => {
                content.classList.remove('show-content-modal');
                modal.classList.remove('show-modal')

            })
            setTimeout(() => {
                modal.classList.remove('display-modal_flex')
            }, 200)
        
            // window.location.reload();

        },
    }
}
</script>
<style lang="scss" scoped>
    .modal {
        width: 100%;
        height: 100vh;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .4);
        display: none;
        opacity: 0;
        transition: 50ms;
        z-index: 3000;
    }

    .display-modal_flex {
        display: flex;
    }

    .show-modal {
        opacity: 1;
    }

    .content-modal {
        width: 100%;
        max-width: 500px;
        height: auto;
        background: #fff;
        border-radius: 5px;
        transition: 200ms;
        transform: scale(.8);
        position: relative;
        margin: 0 20px;
        padding: 20px;
    }

    .show-content-modal {
        transform: scale(1)
    }

    // Texts
    .text-modal {
        display: block;
        text-align: center;
        font-size: 2em;
        margin: 10px 0;
    }

    .container-list-number-orders {
        max-height: 170px;
        overflow-x: hidden;
        overflow-y: auto;
        border-radius: 5px;
    }

    /* buttons */

    .container-float-button {
        width: 100%;
        height: 46px;
        position: relative;
        margin-top: 25px;
    }

    .button-exit-modal {
        width: 100px;
        position: absolute;
        right: 0;
    }
</style>