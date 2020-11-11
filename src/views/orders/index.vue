<template>
  <div>
        <vue-headful 
            title="Busca Varejos - Meus pedidos"
            description="Todos os pedidos realizados no Busca Varejos">
        </vue-headful>
        <custom-header></custom-header>
        <main>
            <h1 class="title spacing">Meus pedidos</h1>
            <!--  -->
            <spinner-loading :loading="is_loading" :ctn_height="'60vh'"></spinner-loading>
            <!--  -->
            <error-component :msg=errorMsg :retry="true" @event-retry="fetchOrders"></error-component>

            <wrapper-cards v-for="(order, i) in orders" :key="i" :title=order.title>
                <card-component v-for="item in order.items" :key="item._id" 
                    :order=item
                ></card-component>
            </wrapper-cards>
        </main>
  </div>
</template>

<script>
import customHeader from './customHeader';
import wrapperCards from "./wrapperCardsComponent";
import cardComponent from "./cardComponent";

import groupByOrders from "./groupByOrders";

import { mapGetters } from 'vuex';
import axios from 'axios';

import dayjs from "dayjs"
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    relativeTime: {
        future: "%s",
        past: "%s",
        s: 'Há pouco tempo',
        m: "Há pouco tempo",
        mm: "Há pouco tempo",
        h: "Há pouco tempo",
        hh: "Há %d horas",
        d: "Há um dia",
        dd: "Há %d dias",
        M: "Há um mês",
        MM: "Há %d meses",
        y: "Há um ano",
        yy: "Há %d anos"
    }
})

// import { requestPermission } from "../../firebase/messaging"


export default {
    name:"orders",
    components:{
        customHeader,
        wrapperCards,
        cardComponent
    },
    computed:{
        ...mapGetters({
            user: "user"
        })
    },
    data(){
        return{
            orders:[],
            is_loading: true,
            error: {
                msg: "",
                retry: false
            },
        }
    },
    created(){
        this.fetchOrders();
        // requestPermission()
    },
    methods: {
        fetchOrders(){
            this.is_loading = true;
            this.errorMsg = "";

            const url = 'https://api.buscavarejos.com/usuarios/pedidos';
			axios.get(url, {
				headers:{
					uid: this.user.data.uid
				}
			})
			.then( ({ data: orders }) => {
                if(!orders.length){
                    return this.error = {
                        msg: "Nenhum pedido",
                        retry: false
                    }
                }

                orders.map( ord => {
                    ord.group_title = dayjs(ord.createdAt).fromNow()
                    return ord
                })
                this.orders = groupByOrders(orders)
            })
            .catch(error => {
                let msg;
                if (error.response) 
                    this.error['msg'] = error.response.data.msg;
                else
                    msg = 'Ops, ocorreu um problema, por favor tente novamente!'
                
                this.errorMsg = msg
			})
			.finally(() => {
				this.is_loading = false
			})     
        }
    }
}
</script>
<style lang="scss" scoped src="./style.scss"></style>
