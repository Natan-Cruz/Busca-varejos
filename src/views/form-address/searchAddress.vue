<template>
    <div class="row_flex" @click="selectUserLocalization">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path class="cls-locale" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
        </svg>
        <p class="text-medium text-locale">{{ text_local }}</p>
    </div>
</template>

<script>
import Axios from 'axios';
import messagePopup from '@/components/message-popup/message-popup';

export default {
    name: "search-address-component",
    data(){
        return{
            text_local: "Usar a localização atual",
            was_loaded: false
        }
    },
    methods:{
        selectUserLocalization(){
            this.text_local = 'Carregando...'

            const options = {
                enableHighAccuracy:true,
                timeout:10000,
                maximumAge:0
            };

            const success = (position) => {
                
                const { latitude, longitude, accuracy } = position.coords;
                if(accuracy > 1000)
                    return messagePopup("Não foi possivel usar a Geolocalização, a precisão é muito baixa!");

                const KEY_TOM_TOM = "GuI2W2hQetqpub4GvG4ST7YJUGyQeAWK";
                const url = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?returnSpeedLimit=false&allowFreeformNewLine=false&key=${KEY_TOM_TOM}`

                Axios.get(url)
                .then( response => {
                    const { addresses } = response.data;
                    const firstAddress = addresses[0].address;
                    const [ latitude, longitude ] = addresses[0].position.split(',');

                    const address = {
                        cep: firstAddress.extendedPostalCode || firstAddress.postalCode,
                        street: firstAddress.street || firstAddress.streetName,
                        neighborhood: firstAddress.municipalitySubdivision,
                        city: firstAddress.municipality || firstAddress.localName,
                        state: this.toUf(firstAddress.countrySubdivision),
                        latitude: latitude,
                        longitude: longitude
                    }
                    this.$emit("event-teste", address)
                    
                    this.text_local = 'Pronto!'
                    setTimeout(() => {
                        this.text_local = 'Usar a localização atual'
                    },1500)
                })
                .catch( error => {
                    if (error.response) 
                        messagePopup(error.response.data.msg, 4000)
                    else 
                        messagePopup('Ops, deu um problema, por favor tente novamente!', 4000)
                })
               
            }
            const error = (error) => {
                 switch (error.code) {
                    case error.PERMISSION_DENIED:
                        messagePopup('Você negou a sua localização',4000);
                        break;
                    case error.POSITION_UNAVAILABLE,
                        error.TIMEOUT,
                        error.UNKNOWN_ERROR:
                            messagePopup('Ops ocorreu um problema! Por favor tente novamente', 4000);
                        break;
                 }
            }

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition( success, error, options);
            }else{
                messagePopup('Serviço de geolocalização indisponivel', 4000)
            }
        },
        toUf(state){
            const states = {
                "Acre" : "AC",
                "Alagoas" : "AL",
                "Amapá" : "AP",
                "Amazonas" : "AM",
                "Bahia" : "BA",
                "Ceará" : "CE",
                "Distrito Federal" : "DF",
                "Espírito Santo" : "ES",
                "Goiás" : "GO",
                "Maranhão" : "MA",
                "Mato Grosso" : "MT",
                "Mato Grosso do Sul" : "MS",
                "Minas Gerais" : "MG",
                "Pará" : "PA",
                "Paraíba" : "PB",
                "Paraná" : "PR",
                "Pernambuco" : "PE",
                "Piauí" : "PI",
                "Rio de Janeiro" : "RJ",
                "Rio Grande do Norte" : "RN",
                "Rio Grande do Sul" : "RS",
                "Rondônia" : "RO",
                "Roraima" : "RR",
                "Santa Catarina" : "SC",
                "São Paulo" : "SP",
                "Sergipe" : "SE",
                "Tocantins" : "TO"
            }
            return states[state] ? states[state] : 0
        }
    }
}
</script>

<style lang="scss" scoped>
        // 
    .form-inpurt-search-address {
        position: relative;
        margin-top: 15px;
    }

    .row_flex {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: row;
        cursor: pointer;
        transition: 200ms;
        padding: 12px 0;
        margin: 10px 0;
        outline: none;
        
        &:active{
            transform: scale(0.98, 0.96);
        }
    }

    .text-locale {
        margin-left: 10px;
    }

    .cls-locale {
        fill: #ed1641;
}
</style>