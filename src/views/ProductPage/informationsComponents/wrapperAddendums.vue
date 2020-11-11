<template>
    <div class="group-addendums">
        <div class="header-group-addendums">
            <div class="content-header" :class="{ 'addendum-is_required' : addendum.required }">
                <p class="title"> {{ addendum.name }} </p>
                <p class="description"> {{ addendum.description }} </p>
            </div>
        </div>
        <div v-if="!addendum.type || addendum.type === 'checkbox'">
            <checkbox-item-addendum v-for="(item,i) in addendum.items" :key="i" 
                :item=item 
                :exceeded_limit=exceeded_limit
                :notAllowed='notAllowed'
                :value_exceeded="getValueExceeded(item.id)"
                @more-quantity=moreOne
                @minus-quantity=minusOne
                @is_checked_true=checked_true
                @is_checked_false=checked_false>
            </checkbox-item-addendum>
        </div>
        <div v-if="addendum.type === 'radio' " >
            <radio-item-addendum v-for="(item,i) in addendum.items" :key="i" 
                :item=item 
                :current_item_selected=current_radio_item_selected
                @is_checked_true=handleRadioInput
                :wrapper_addendums_id="addendum.id">
            </radio-item-addendum>
        </div>
    </div>
</template>

<script>
import checkboxItemAddendum from './items/checkbox'
import radioItemAddendum from "./items/radio";
import groupBylist from "./groupByList.wrapperAddendums";

export default {
    name:"wrapper-addendums",
    components:{
        checkboxItemAddendum,
        radioItemAddendum
    },
    props:{
        addendum:Object
    },
    computed:{
        // Verifica se a quantidade de adendos ultrapassou o limite
        exceeded_limit(){
            if(this.current.quantity > this.addendum.limit)
                return true
            else   
                return false
        },
        // Verifica se é permitido ultrapassar o limite de adendos
        notAllowed(){
            const allowed_exceed_limit = !!this.addendum.allowed_exceed_limit
            if((this.current.quantity >= this.addendum.limit) && !allowed_exceed_limit)
                return true
            else
                return false
        }
    },
    data(){
        return{
            list:[],
            grouped_addendums:[],
            current:{
                quantity: 0
            },
            current_radio_item_selected:{}
        }
    },
    watch:{
        list(addendums){
            const groupedAddendums = groupBylist(addendums,this.addendum.limit)
            this.grouped_addendums = groupedAddendums
            this.$emit('event-select-addendum', {
                index: this.addendum.id,
                list: groupedAddendums
            })
        }
    },
    methods:{
        handleRadioInput(item){
            if(!Object.entries(this.current_radio_item_selected).length){
                this.current_radio_item_selected = item
            }else{
                const index = this.list.map(function(e) { return e.a; }).lastIndexOf(this.current_radio_item_selected.id);
                this.list.splice( index, 1)
            }
            this.list.push({
                id: item.id,
                price: item.price,
                name: item.name
            })
            this.current_radio_item_selected = item
        },
        getValueExceeded(id){
            return this.grouped_addendums.filter( elem => {
                if(elem.id === id ) return elem
            })[0]
        },
        checked_true(itemAddendum){
            this.current.quantity += 1 
            this.list.push({
                id: itemAddendum.id,
                price: itemAddendum.price,
                name: itemAddendum.name
            })
        },
        checked_false(itemAddendum){
            this.current.quantity -= itemAddendum.lastCurrentQuantity 

            const index = this.list.map(function(e) { return e.a; }).lastIndexOf(itemAddendum.id);
            this.list.splice( index, 1)
        },
        minusOne(itemAddendum){
            this.current.quantity -= 1;
            
            const index = this.list.map(function(e) { return e.a; }).lastIndexOf(itemAddendum.id);
            this.list.splice( index, 1)
        },
        moreOne(itemAddendum){
            this.current.quantity += 1
            this.list.push({
                id: itemAddendum.id,
                price: itemAddendum.price,
                name: itemAddendum.name
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .group-addendums{
        position: relative;
    }
    .header-group-addendums{
        width: 100%;
        height: auto;
        margin-top: 20px;
        z-index: 1000;
    }
    
    .content-header{
        width: 100%;
        height: auto;
        background-color:rgb(228, 228, 228);
        padding: 5px 5%;
        position: relative;
    }
    // .content-header-fixed{
    //     position: sticky;
    //     top: 60px;
    // }
    .addendum-is_required::before{
        content: "*Requerido";
        font-size: 1.6em;
        font-weight: bold;
        position: absolute;
        right: 5%;
        color: #ed1641;
    }
    .title{
        font-size:2em;
        font-weight:bold;
    }
    .description{
        font-size:1.6em;
        color:#707070;
    }
</style>