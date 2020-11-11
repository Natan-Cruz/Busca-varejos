<template>
  <div>
        <vue-headful 
            :title="`Detalhe do pedido #${order_id}`"
            description="Detalhes do pedido">
        </vue-headful>
        <custom-header></custom-header>
        <main>
            <h1 class="title spacing">Detalhes do pedido #{{ order_id }}</h1>
            <!--  -->
            <spinner-loading :loading="is_loading" :ctn_height="'60vh'"></spinner-loading>
            <!--  -->
            <error-component :msg=error.msg :retry=error.retry @event-retry="fetchOrder(order_id)"></error-component>

            <div v-if="!is_loading && !error.msg">
                <container-informations-order :order=order></container-informations-order>
                <!--  -->
                <container-informations-products :order=order ></container-informations-products>
                <!--  -->
                <container-informations-status :order=order ></container-informations-status>
                <!--  -->
                <group-buttons :uid=user.data.uid :order_id=order.id :status_code="order.current_status.status_code" @event-refresh-order=fetchOrder(order_id)></group-buttons>
            </div> 
        </main>
  </div>
</template>

<script>
import customHeader from './customHeader';
import containerInformationsOrder from "./ctnOrder";
import containerInformationsProducts from "./ctnProducts";
import containerInformationsStatus from "./ctnStatus";
import groupButtons from "./groupButtons";
import { mapGetters } from 'vuex';
import Format from "@/components/Format";
import Axios from 'axios';

export default {
    name:"orders",
    components:{
        customHeader,
        containerInformationsOrder,
        containerInformationsProducts,
        containerInformationsStatus,
        groupButtons
    },
    computed:{
        ...mapGetters({
            user: "user"
        }),
    },
    data(){
        return{
            order: {},
            is_loading: true,
            error: {
                msg: "",
                retry: false
            },
            order_id: this.$route.params.id
        }
    },
    created(){
        this.fetchOrder(this.order_id)
    },
    methods: {
        ...Format("formatPrice"),
         
         async fetchOrder(id_order){
            this.is_loading = true;
            this.id_order = id_order;
            this.error = {
                msg: ""
            };
            try {
                const url = `https://api.buscavarejos.com/usuarios/pedidos/${id_order}`;
                const { data: order } = await Axios.get(url, {
                    headers:{
                        uid: this.user.data.uid
                    }
                })
                console.log(order)
                this.order = order;
            } catch (error) {
                console.error(error)
                let msg;
                if (error.response) 
                    msg = error.response.data.msg
                else
                    msg = 'Ops, deu um problema, por favor tente novamente!'
                    
                this.error = {
                    msg,
                    retry: true
                }
            }finally{
                this.is_loading = false
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    main {
        width: 90%;
        max-width: 500px;
        margin: 0 5%;
        padding-top: 60px;
    }

    .spacing {
        margin-bottom: 10px;
    }

    .title {
        display: block;
        font-size: 2.5em;
        font-weight: bold;
        margin: 15px 0 0px 0;
    }
</style>
