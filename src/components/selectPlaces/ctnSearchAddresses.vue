<template>
    <div @click="$emit('event-define-focus', 1)">
        <!--  -->
        <p class="text-medium bold">Pesquise seu endereço:</p>            
        <!--  -->
        <form action="#" class="form-inpurt-search-address">

            <input type="text" class="input-address" placeholder="Rua ou cep" v-model="query">

            <button type="submit" class="button button-tertiary button-search-address" 
                :class="{ 'active-loading-button': isLoadingQuery }"
                @click.prevent="searchGeocoding">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-icon-magnifying"
                    width="48px" height="48px">
                    <path
                        d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z" />
                </svg> 
                <span class="spinner-loading-button"></span>
            </button>
        </form>
        <!--  -->
        <ul class="list-result-address" @click="selectAddress">
            <li v-for="(address, i) in addresses" :key="i" 
                :data-latitude="address.position.lat" 
                :data-longitude="address.position.lon" tabindex="0">
                    {{formatFullAddress(address.address)}}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ctn-search-address",
    data(){
        return{
            addresses:[],
            isLoadingQuery:false,
            query:"",
            idTimeOut: undefined,
            error:{
                msg: ""
            }
        }
    },
    watch:{
        query(){
            this.searchGeocoding()
        }
    },
    methods:{
        destroy(){
            this.addresses = [];
            this.query = "";
        },
        searchGeocoding(){
            const KEY_TOM_TOM = "GuI2W2hQetqpub4GvG4ST7YJUGyQeAWK";
            const timeToSearch = 250;

            if(this.query.length === 0 ) {
                this.query = '';
                this.addresses = [];
            }
            if(this.query.length < 5) return ;

            if(this.idTimeOut)
                clearTimeout(this.idTimeOut);

            this.idTimeOut = setTimeout(() => {
                this.isLoadingQuery = true;
                const url = `https://api.tomtom.com/search/2/geocode/${this.query}.json?countrySet=BR&limit=5&lat=-23.537397&lon=-46.637034&radius=70000&key=${KEY_TOM_TOM}`
                axios.get(url)
                .then( ({ data }) => {
                    const { results } = data;
                    this.addresses = results
                })
                .catch( error => {
                    if (error.response) {
                        this.error['msg'] = error.response.data.msg
                        this.error['retry'] = false;
                        
                    } else if (error.request) {
                        if (error.message === "Network Error") {
                            this.error['msg'] = 'Ops, problema com a conexão com a internet, por favor tente novamente!'
                        }else{
                            this.error['msg'] = 'Ops, deu um problema, por favor tente novamente!'
                        }
                    } 
                })
                .finally(() => {
                    this.isLoadingQuery = false;
                })
            }, timeToSearch)
        },
        selectAddress(e){
            const latitude = e.target.getAttribute("data-latitude"),
                longitude = e.target.getAttribute("data-longitude"),
                completeAddress = e.target.textContent;

            this.$emit("event-set-current-place",{
                latitude,
                longitude,
                completeAddress
            })
        },
        formatFullAddress(address){
            const { streetName, streetNumber, municipality, municipalitySubdivision } = address;
            return `${ streetName } ${ streetNumber ? " - Nº" + streetNumber : '' } - ${ municipality } - ${ (municipalitySubdivision) ? municipalitySubdivision : ""  }`;
        }
    }
}
</script>

<style lang="scss" scoped>
    // 
    .form-inpurt-search-address{
        position: relative;
        margin-top:15px;
    }
    .input-address{
        width:100%;
        height: 56px;
        border-radius:5px;
        border:none;
        background-color: #e0e0e0;
        font-size:1.8em;
        line-height: 1em;
        padding-left: 15px;
        &::placeholder{
            color:rgb(49, 49, 49);
        }
    }
    

    .button-search-address{
        width: 54px;
        height: 54px;
        position:absolute;
        top: 1px;
        right: 1px;
        cursor: pointer;
        background-color: #e0e0e0;
        transition:100ms;
        &:hover{
            background-color: #d8d8d8;
        }
        svg {
            width: 30px;
            height:30px;
            pointer-events: none;
            transition: 100ms;
            fill:#ed1641;
        }
        &:active svg {
            transform: scale(.6);
        }
        &:hover svg{
            fill:#f51845;
        }
    }    
    .active-loading-button{
        &>.svg-icon-magnifying{
            display: none;
        }
        &>.spinner-loading-button {
            animation-play-state: running !important;
            display: block;
        }
    }
    .spinner-loading-button{
        border-bottom: solid 4px #ed1641;
    }   
    // 
    .list-result-address{
        width:100%;
        height: auto;
        overflow: {
            x:hidden;
            y:auto
        };
        margin:10px 0;
        li{
            font-size:1.6em;
            cursor: pointer;
            transition: background 200ms, padding 200ms, transform 150ms;
            padding: 7px 0;
            border-bottom:solid 1px #ccc;
            margin: 1px;
        }
        li:last-child{
            border:none;
        }
        li:hover, li:focus{
            background-color: #ececec;
        }
        li:active{
            transform: scale(0.97)
        }
    }
</style>