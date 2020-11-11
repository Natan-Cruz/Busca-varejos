<template>
    <div v-if="preset.concludeOrder || preset.cancelOrder" >
        <p class="title">Ações</p>

        <button class="button button-primary button-mark-as-concluded text-medium" 
			:disabled=is_loading
			v-if="preset.concludeOrder"
            @click="concludeOrder">
            Marcar como entregue
        </button>
        <button class="button button-second button-cancel-order text-medium" 
			:disabled=is_loading
			v-if="preset.cancelOrder"
            @click="cancelOrder">
            Cancelar pedido
        </button>
    </div>
</template>

<script>
import Axios from 'axios'
import messagePopup from '@/components/message-popup/message-popup'
import presets from "./presetsButtons";

export default {
	name: "group-buttons",
	props:{
		uid:{
			type: String
		},
		order_id: {
			type: Number
		},
		status_code:{
			type: Number
		}
	},
    data(){
        return{
			is_loading: false,
			preset: presets.get(this.status_code)
        }
    },
    methods:{
        async concludeOrder(){
			try{
				this.is_loading = true

				const url = "https://api.buscavarejos.com/usuarios/pedidos/status",
					body = {
						order_id: this.order_id,
						status: 4
					}

				await Axios.post(url, body ,{
					headers:{
						"uid": this.uid
					}
                })
				messagePopup("Pedido concluido!", 4000);
				this.$emit("event-refresh-order")
				
			}catch(error){
				console.error(error)
				if(error.response){
					const msg = error.response.data.msg
					messagePopup(msg, 4000)
				}else{
					const msg = 'Ops, ocorreu um problema, por favor tente novamente!';
					messagePopup(msg, 4000)
				}
			}finally{
				this.is_loading = false
			}
        },
		async cancelOrder(){
			const aswer = confirm("Voce têm certeza que deseja cancelar o pedido?")
			if(!aswer) return;

			try{	
				this.is_loading = true
				const url = "https://api.buscavarejos.com/usuarios/pedidos/status",
					body = {
						order_id: this.order_id,
						status: 6,
						message: "Pedido cancelado pelo cliente"
					}
					
				await Axios.post(url,body, {
					headers:{
						"uid": this.uid
					}
				})
				messagePopup("Pedido cancelado!!")
				this.$emit("event-refresh-order")
			}catch(error){
				if(error.response){
					const msg = error.response.data.msg
					messagePopup(msg, 4000)
				}else{
					const msg = 'Ops, ocorreu um problema, por favor tente novamente!';
					messagePopup(msg, 4000)
				}
			}finally{
				this.is_loading = false
			}
		},
    }
}
</script>

<style lang="scss" scoped>
    .title {
        font-size: 2em;
        line-height: 1em;
        font-weight: bold;
        padding-top: 10px;
    }
    .button-mark-as-concluded {
        background-color: #27b852;
        margin: 10px 0;
        color: #fff;
    }

    .button-cancel-order {
        background-color: #e32227;
        margin: 10px 0;
        color: #fff;
    }

    .skeleton-button {
        height: 50px;
        background-color: #ccc;
        color: #ccc;
        border: #ccc;
    }
</style>    