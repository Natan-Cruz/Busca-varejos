<template>
    <div class="container-select-places">
        <bar-select-places 
            @event-open-modal="openModal" 
            @event-close-modal="closeModal" 
            :open=open 
            :is_loading=is_loading 
            :current_address=address.current_address>
        </bar-select-places>
        <modal-select-places 
            @event-open-modal="openModal" 
            @event-close-modal="closeModal" 
            @event-set-address=setAddress>
        </modal-select-places>
    </div>
</template>

<script>
import barSelectPlaces from './bar';
import modalSelectPlaces from './modal';

export default {
    name: "select-places",
    props:{
        isRequiredPlace:{
            type:Boolean,
            required: false,
            default: () => false
        }
    },
    components:{
        barSelectPlaces,
        modalSelectPlaces
    },
    data(){
        return {
            open:false,
            is_loading:false,
            address: {},
        }
    },
    mounted(){
        const address = this.getLocalAddress();
        if(address){
            this.address = {
                current_address: address.completeAddress,
                latitude:address.latitude,
                longitude:address.longitude
            }

            this.$emit('event-fetch-establishments', address)
        }else{
            if(this.isRequiredPlace)
                this.openModal();
        }
    },
    methods: {
        setAddress({ latitude, longitude, completeAddress }){
            this.saveLocalAddress(latitude, longitude, completeAddress );
            this.address = {
                current_address: completeAddress,
                latitude: latitude,
                longitude: longitude
            }
            this.$emit("event-change-place", {
                latitude, longitude, completeAddress
            })
            this.closeModal()
        },
        openModal(){
            const modal = document.querySelector('.modal-select-place'),
                content = document.querySelector('.content-modal-select-place');

            modal.classList.add('display-modal_flex')
            setTimeout(() => {
                requestAnimationFrame(() => {
                    content.classList.add('show-content-modal')
                    modal.classList.add('show-modal')
                })
            },50)
            this.open = true
        },
        closeModal(){
            const modal = document.querySelector('.modal-select-place'),
                content = document.querySelector('.content-modal-select-place');

            requestAnimationFrame(() => {
                content.classList.remove('show-content-modal');
                modal.classList.remove('show-modal')
            })
            setTimeout(() => {
                modal.classList.remove('display-modal_flex')
            }, 200)
            this.open = false
        },
        getLocalAddress(){
            return JSON.parse(window.localStorage.getItem("address"))
        },
        saveLocalAddress(latitude,longitude,completeAddress){
            window.localStorage.setItem("address", JSON.stringify({ latitude, longitude,completeAddress }));
        },
    }
}
</script>

<style lang="scss" scoped>
    .container-select-places{
        width:100%;
        max-width: 360px;
        height: auto;
        position: relative;
        z-index: 1500;
        margin-right: 20px;
    }
    
    @media screen and (max-width:750px) {
        .container-select-places{
            max-width: initial;
            position: absolute;
            left: 0;
            top:60px;
        }
    }
</style>