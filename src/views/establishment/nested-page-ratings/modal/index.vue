<template>
    <div>
        <button-add-rating @event-open-modal="openModal"></button-add-rating>
        <modal-add-rating 
            @event-close-modal="closeModal" 
            @event-reload-ratings="$emit('event-reload-ratings')"
            ref="modal_add_rating">
        </modal-add-rating>
    </div>
</template>

<script>
import buttonAddRating from './button';
import modalAddRating from './modal';

export default {
    name:"modal-rating",
    components:{
        buttonAddRating,
        modalAddRating  
    },
    methods:{
        openModal(){
            const modal = document.querySelector('.modal-add-rating'),
                content = document.querySelector('.content-modal-add-rating');

            modal.classList.add('display-modal_flex')
            setTimeout(() => {
                requestAnimationFrame(() => {
                    content.classList.add('show-content-modal')
                    modal.classList.add('show-modal')
                })
            },50)
            this.$refs['modal_add_rating'].verifyPermissionToWriteRating()
        },
        closeModal(){
             const modal = document.querySelector('.modal-add-rating'),
                content = document.querySelector('.content-modal-add-rating');

            requestAnimationFrame(() => {
                content.classList.remove('show-content-modal');
                modal.classList.remove('show-modal')
            })
            setTimeout(() => {
                modal.classList.remove('display-modal_flex')
            }, 200)
            this.$refs['modal_add_rating'].resetVariables()
        }
    }
}
</script>

<style>

</style>