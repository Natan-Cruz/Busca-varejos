<template>
  <div class="modal modal-select-place">
        <div class="background-modal" @click="closeModal"></div>
        <div class="content-modal content-modal-select-place" ref="content">
            <!-- Pesquisa de endereco -->
            <ctn-search-address :class="{ 'blur':  !(focusPoint === 1) && focusPoint !== undefined}"
                @event-set-current-place="defineCurrentPlace" @event-define-focus="defineFocus" ref="ctn_search_address">
            </ctn-search-address>
            <!-- Pesquisa de localizacao -->
            <ctn-search-geolocalization :class="{ 'blur':  !(focusPoint === 2) && focusPoint !== undefined}" 
                @event-set-current-place="defineCurrentPlace" @event-define-focus="defineFocus">
            </ctn-search-geolocalization>
            <!-- Enderecos salvos -->
            <ctn-addresses :class="{ 'blur':  !(focusPoint === 3) && focusPoint !== undefined}"
                :loggedIn=user.loggedIn 
                :uid="(user.data) && user.data.uid" 
                @event-set-current-place="defineCurrentPlace"
                @event-define-focus="defineFocus">
            </ctn-addresses>
        </div>
    </div>
</template>

<script>
import ctnSearchAddress from "./ctnSearchAddresses"
import ctnSearchGeolocalization from "./ctnSearchGeolocalization";
import ctnAddresses from "./ctnAddresses"
import { mapGetters } from 'vuex';

export default {
    name:"modal-select-places", 
    components:{
        ctnSearchAddress,
        ctnSearchGeolocalization,
        ctnAddresses
    },
    computed:{
        ...mapGetters({
            user: "user"
        })
    },
    data(){
        return{
            focusPoint: undefined
        }
    },
    methods: {
        defineFocus(index){
            this.focusPoint = index;
        },
        defineCurrentPlace(address){
            this.$emit("event-set-address", address)
            this.defineFocus(undefined);
        },
        closeModal(){            
            this.$emit("event-close-modal")
            this.defineFocus(undefined);

            this.$refs['ctn_search_address'].destroy()
        },
        isEmpty(obj) {
            if(!obj) return false;
            return Object.keys(obj).length === 0;
        }
    }
}
</script>
<style lang="scss" scoped>
    
    .content-modal-select-place{
        margin: 0 10px;
        max-height: 95vh;
        overflow: {
            y:auto;
            x:hidden;
        };
    }

    .background-modal{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left:0;
        background-color: rgba($color: #000000, $alpha: 0.2);
    }
    
    ::v-deep .separation-wrapper{
        border-top: solid 1px #ccc;
        padding-top: 10px;
        margin-top: 13px;
    }

    .blur{
        transition: 150ms;
        filter:blur(1px)
    }
</style>