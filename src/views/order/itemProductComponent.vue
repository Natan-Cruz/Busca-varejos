<template>
  <li class="row-grid">
        <div class="container-img">
            <img :src="`https://api.buscavarejos.com${product.source}?width=60`" :alt="product.name" class="image-product">
        </div>
        <div class="ctn_info">
            <p class="text-medium text-name bold"> {{ product.name }} </p>
            <div style="padding-top: 2px">
                <span class="text-medium bold text-aling-right">Preço:</span>
                <span class="text-medium">{{ formatPrice(product.price) }} </span>
            </div>
            <div>
                <span class="text-medium bold text-aling-right"> Quantidade:</span>
                <span class="text-medium">{{ product.quantity }} </span>
            </div>
            <div>
                <span class="text-medium bold text-aling-right">Total:</span>
                <span class="text-medium">{{ formatPrice(product.amount) }} </span>
            </div>
        </div>
        <ul class="list-addendums" :style=" addendums.length ? 'border-top:solid 1px #ccc' : '' " v-if="addendums.length">
			<li v-for="(addendum,i) in addendums" :key="i"> {{ addendum.quantity }}x - {{ addendum.name }} </li>
		</ul>
        <div class="ctn_message" :style=" product.message ? 'border-top:solid 1px #ccc' : '' " v-if="product.message">
            <p class="message-item" style="padding: 0 5px;" @click="toggleMessage" :title=product.message> {{ product.message }} </p>
        </div>
    </li>
</template>

<script>
import Format from "@/components/Format";

export default {
    name:"item-product-component",
    props:{
        product:Object
    },
    computed:{
        addendums(){
			return this.product.addendums ? this.product.addendums.split("&").map(o => JSON.parse(o)) : []
		}
    },
    data(){
        return {
            message: false
        }
    },
    methods:{
        ...Format("formatPrice"),
        toggleMessage(e){
            const messageNode = e.target;

            if (this.message) {
                messageNode.style.whiteSpace = 'nowrap';
                this.message = false
            } else {
                messageNode.style.whiteSpace = 'normal'
               this.message = true
            }
        }
    }
}
</script>

<style lang="scss" scoped src="./row-grid.scss"></style>
<style lang="scss" scoped>
    .text-name{
        border-bottom: solid 1px #ccc;
        padding-bottom: 3px;
        white-space: nowrap;
    }
    .text-aling-right{
        width: 100px;
        text-align:right;
        display:inline-block;
        margin-right: 10px;
    }
</style>