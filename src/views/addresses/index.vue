<template>
	<div>
		<vue-headful 
            title="Busca Varejos - Meus endereços"
            description="Meus endereços salvos do usuário no Busca Varejos">
        </vue-headful>
		<custom-header></custom-header>
		<main>
            <p class="title">Meus endereços</p>
			<!--  -->
			<spinner-loading :loading="isLoading" position="relative"></spinner-loading>
			<!--  -->
			<error-component :msg=errorMsg :retry="true" @event-retry="fetchAddresses" ></error-component>
			<!--  -->
            <ul class="container-card-addresses" v-show="!isLoading && !errorMsg">
				<item-address @EventOpenModalEditAddress=openModalEditAddress @event-delete-address=deleteAddress v-for="(address, i) in addresses" :key="i" :address=address></item-address>
				<router-link :to="'/enderecos/novo?redirect=/enderecos'" class="card-add-address text-medium bold">
				Adicionar novo endereço
				</router-link>
            </ul>

        </main>
		<!-- <modal-edit-address ref="modal_edit"></modal-edit-address> -->
		<!-- <modal-delete-address></modal-delete-address> -->
	</div>
</template>

<script>
import customHeader from './customHeader';
import itemAddress from './item-address';

// import modalEditAddress from './modal-edit-address';
// import modalDeleteAddress from './modal-delete-address';
import { mapGetters } from 'vuex'
import axios from 'axios'
import messagePopup from '../../components/message-popup/message-popup';

export default {
	name:"addresses",
    components:{
		customHeader,
		itemAddress
	},
	data(){
		return{
			addresses:[],
			isLoading:true,
			errorMsg: ""
		}
	},
	computed:{
		...mapGetters({
			user: "user"
		})
	},
	created(){
		this.fetchAddresses()
	},
	methods:{
		openModalEditAddress(id_address){
			this.$refs['modal_edit'].openModal(id_address)
		},
		openModalDeleteAddress(id_address){
			alert(id_address)
		},
		fetchAddresses(){
			this.isLoading = true;
			this.errorMsg = "";

			const url = 'https://api.buscavarejos.com/usuarios/enderecos';

			axios.get(url, {
				headers:{
					uid: this.user.data.uid
				}
			})
			.then( ({ data: addresses }) => this.addresses = addresses )
            .catch(error => {
				let msg;
				if (error.response)
					msg = error.response.data.msg;
                else
					msg = 'Ops, deu um problema, por favor tente novamente!';

				this.errorMsg = msg;
			})
			.finally(() => {
				this.isLoading = false
			})     
		},
		deleteAddress(addressId){
			const url = `https://api.buscavarejos.com/usuarios/enderecos/${addressId}`;

			axios.delete(url, {
				headers:{
					uid: this.user.data.uid
				}
			})
			.then(() => {
				messagePopup("Endereço desabilidado!")
				this.addresses = this.addresses.filter( adr => {
					if(adr.id !== addressId)
						return adr
				})
			})
            .catch(() => {
				messagePopup("Ops, deu um problema, por favor tente novamente!",4000)
			})
 
		}
	}	
}
</script>
<style lang="scss" scoped>
	main {
		width: 90%;
		margin: 70px auto 0 auto;
	}

	.title {
		font-size: 2.5em;
		font-weight: bold;
		margin-bottom: 20px;
	}
	.spacing {
		margin-bottom: 10px;
	}


	.container-card-addresses {
        width: 100%;
        margin: 0 auto;
        height: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        column-gap: 20px;
        row-gap: 15px;
        padding: 2px;
	}

	.card-add-address{
		width: 100%;
		height: auto;
		max-height: 143px;
		border-radius: 5px;
		box-shadow: 1px 1px 6px rgba(0, 0, 0, .2);
		overflow: hidden;
		padding: 20px;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ed1641;
		cursor: pointer;
		
		&:hover{
			opacity: 0.8;
		}
	}
	
    @media screen and (max-width: 755px) and (min-width: 500px) {
        .container-card-addresses {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }
</style>