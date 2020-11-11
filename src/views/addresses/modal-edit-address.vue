<template>
    <div class="modal modal-edit-address" ref="modal_edit" @click="closeModal">
        <div class="content-modal content-edit-address" ref="content_modal_edit">

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"modal-edit-address",
    data(){
        return{
            address:null
        }
    },
    methods:{
        openModal(id_address){
            const modal = this.$refs['modal_edit'],
                content = this.$refs['content_modal_edit'];

            modal.classList.add('display-modal_flex')
            requestAnimationFrame(() => {
                content.classList.add('show-content-modal')
                modal.classList.add('show-modal')
            })

            this.fetchAddress(id_address)
        },
        closeModal(e){
            const modal = this.$refs['modal_edit'],
                content = this.$refs['content_modal_edit'];

           if(e.target === modal){
                 requestAnimationFrame(() => {
                    content.classList.remove('show-content-modal');
                    modal.classList.remove('show-modal')

                })
                setTimeout(() => {
                    modal.classList.remove('display-modal_flex')
                }, 200)
            }
        },
        fetchAddress(id_address){
            axios.get(`https://api.buscavarejos.com/usuarios/enderecos/${id_address}`, {
				headers:{
					uid:69
				}
			})
			.then( response => {
				const address = response.data;
				console.log(address)
               
                this.address = address
            })
            .catch(error => {
                this.error = {
                    msg: '',
                    retry: true
                }
                if (error.response) {
                    this.error['msg'] = error.response.data.msg
                    
                } else if (error.request) {
                    if (error.message === "Network Error") {
                        this.error['msg'] = 'Ops, problema com a conexão com a internet, por favor tente novamente!'
                    }else{
                        this.error['msg'] = 'Ops, deu um problema, por favor tente novamente!'
                    }
                } 
            })      
        }
    }
}
</script>

<style>

</style>