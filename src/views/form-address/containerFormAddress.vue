<template>
    <div class="container-form-address" >
        <!-- <div class="row-sub-title">
            <h2 class="sub-title">Dados endereçais</h2>
            <div class="icon-close-container-form-address" @click="closeContainerForm" tabindex="0">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </div>
        </div> -->
        <div class="group-input spacing">
            <input type="text" id="input-name-address" class="input" v-model=name autocomplete="off" placeholder="Ex.: Minha casa, trabalho, etc..." required>
            <label for="input-name-address" class="label">Nome do endereço(Opcional):</label>
        </div>
        <div class="group-input spacing group-input-name">
            <input type="text" id="input-cep" class="input input-address input-logradouro" v-model=cep maxlength="9"  required v-mask="'#####-###'">
            <label for="input-cep" class="label">Cep</label>
        </div>
        <div class="group-input spacing group-input-name">
            <input type="text" id="input-street" class="input" required v-model=street>
            <label for="input-street" class="label">Nome da rua</label>
        </div>
        <div class="spacing row">
            <div class="group-input" style="width: 49%;">
                <input type="number" id="input-number" class="input" required v-model=number>
                <label for="input-number" class="label">Nº</label>
            </div>
            <div class="group-input" style="width: 49%;">
                <input type="text" id="input-complement" class="input" v-model=complement required >
                <label for="input-complement" class="label">Complemento</label>
            </div>
        </div>
        <div class="group-input spacing">
            <input type="text" id="input-neighborhood" class="input" required v-model=neighborhood>
            <label for="input-neighborhood" class="label">Bairro</label>
        </div>
        <div class="group-input spacing">
            <input type="text" id="input-city" class="input" required v-model=city>
            <label for="input-city" class="label">Cidade</label>
        </div>
        <div class="group-input spacing">
            <select name="" id="input-uf" class="select-uf input-address" v-model=state required>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
                <option value="EX">Estrangeiro</option>
            </select>
            <label for="input-uf" class="label">Estado</label>
        </div>

        <div class="group-input spacing" style="margin-top: 30px">
            <textarea class="text-medium textarea" placeholder="Algo para ajudar o entregador" v-model=reference_point required ></textarea>
            <label for="input-reference_point" class="label">Ponto de referência(Opcional)</label>
        </div>

        <button type="button" class="button button-primary text-medium spacing " 
            @click="saveAddress"
            :disabled="isLoading" 
            :class=" isLoading ? 'active-loading' : '' ">
            <div class="ctn-text-button">
                <span class="text-button">Salvar endereço</span>
            </div>
            <span class="spinner-loading-button"></span>
        </button>
    </div>
</template>

<script>
import Axios from 'axios';
import messagePopup from '@/components/message-popup/message-popup';
import {mask} from 'vue-the-mask'

export default {
    name:"container-form-address",
    directives:{
        mask
    },
    props:{
        uid:{
            type: String
        }
    },
    data(){
        return{
            isLoading: false,
            name: "",
            cep: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state:0,
            reference_point: "",
            latitude:undefined,
            longitude:undefined
        }
    },
    methods:{
        saveAddress(){
            this.isLoading = true;

            const address = this.getAddress()
            Axios.post('https://api.buscavarejos.com/usuarios/enderecos', address, {
                headers: {
                    "uid": this.uid
                }
            })
            .then( response => {
                this.resetForm()
                messagePopup(response.data.msg, 4000);
                setTimeout(() => {
                    this.$router.replace({ path: this.getRedirect() })
                }, 1000);
            })
            .catch( error => {
                if (error.response) 
                    messagePopup(error.response.data.msg, 4000)
                else
                    messagePopup('Ops, deu um problema, por favor tente novamente!', 4000)
                    
            })
            .finally(() => {
                this.isLoading = false;
            })
        },
        getRedirect(){
            return this.$route.query.redirect || '/enderecos'
        },
        setAddress(address){
            this.cep = address.cep;
            this.street = address.street;
            this.neighborhood = address.neighborhood;
            this.city = address.city;
            this.state = address.state;
            this.latitude = address.latitude;
            this.longitude = address.longitude;
        },
        getAddress(){
            return {
                name: this.name,
                cep: this.cep,
                street: this.street,
                number: this.number,
                complement: this.complement,
                neighborhood: this.neighborhood,
                city: this.city,
                state: this.state,
                reference_point: this.reference_point,
                latitude: this.latitude,
                longitude: this.longitude
            }
        },
        resetForm(){
            this.name = "";
            this.cep = "";
            this.street = "";
            this.number = "";
            this.complement = "";
            this.neighborhood = "";
            this.city = "";
            this.state = 0;
            this.reference_point = "";
            this.latitude = undefined;
            this.longitude = undefined;
        }
    }
}
</script>

<style lang="scss" scoped>   
    .spacing {
        margin-top: 25px;
    }
    .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .group-input{
        position: relative;
    }

    
    .label {
        font-size: 1.7em;
        line-height: 1em;
        display: block;
        padding-bottom: 10px;
        position: absolute;
        left: 15px;
        top: 16px;
        transition: 100ms;
    }

    .input {
        width: 100%;
        height: 50px;
        font-size: 1.7em;
        display: block;
        border:none;
        border-bottom: solid 2px #ccc;
        background: #fff;
        outline: none;
        &::placeholder{
            display:none;
            opacity: 0;
            color:transparent;
        }
    }

    .input:valid,
    .input:focus {
        // border-bottom: 2px solid #26a69a;  
        border-bottom: solid 2px #000;
        &::placeholder{
            display:block;
            opacity: 1;
            color:#888;
        }
    }

    .input:valid + label,
    .input:focus + label {
        top: -10px;
        left:0;
        font-size: 1.5rem;
        pointer-events: none;
    }

    .select-uf {
        width: 100%;
        height: 46px;
        border-radius: 3px;
        font-size: 1.6em;
        padding-left: 15px;
        display: block;
        border:none;
        border-bottom: solid 2px #ccc;
        outline: none;
        option{
            font-size: 1em;
        }
        &:focus{
            border-bottom: solid 2px #000;
        }
    }
    .select-uf:valid,
    .select-uf:focus {
        // border-bottom: 2px solid #26a69a;  
        border-bottom: solid 2px #000;
    }

    .select-uf:valid + label,
    .select-uf:focus + label {
        top: -7px;
        left:0;
        font-size: 1.5rem;
        pointer-events: none;
    }

    .textarea{
        width: 100%;
        height: 92px;
        padding: 10px;
        border-radius: 5px;
        resize: vertical;
        outline: none;
        border: solid 2px #ccc;
        &::placeholder{
            display:none;
            opacity: 0;
            color:transparent;
        }
    }
    .textarea:focus {
        &::placeholder{
            display: block;
            opacity: 1;
            color:#888;
        }
    }
    .textarea:valid + label,
    .textarea:focus + label {
        top: -20px;
        left:0;
        font-size: 1.5rem;
        pointer-events: none;
    }
</style>