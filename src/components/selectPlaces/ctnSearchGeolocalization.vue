<template>
    <div class="separation-wrapper" @click="$emit('event-define-focus', 2)">
        <p class="text-medium bold">Ou use sua localização atual:</p>

        <div class="row_flex" @click="selectUserLocalization">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path class="cls-locale" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
            </svg>
            
            <p class="text-medium text-locale">{{ text_local }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ctn-search-geolocalization",
    props:{

    },
    data(){
        return{
            text_local: "Usar localização"
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

            const sucess = (position) => {
                const { latitude, longitude } = position.coords;
                const KEY_TOM_TOM = "GuI2W2hQetqpub4GvG4ST7YJUGyQeAWK";
                const url = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?returnSpeedLimit=false&allowFreeformNewLine=false&key=${KEY_TOM_TOM}`
                axios.get(url)
                .then( response => {
                    const { addresses } = response.data;
                    const firstAddress = addresses[0].address;

                    const completeAddress = `${firstAddress.streetName} ${firstAddress.streetNumber ? " - Nº" + firstAddress.streetNumber : ''} - ${ firstAddress.municipality} - ${firstAddress.municipalitySubdivision}`;

                    console.log(response.data)
                    this.$emit("event-set-current-place",{
                        latitude,
                        longitude,
                        completeAddress
                    })
                    
                    setTimeout(() => {
                        this.text_local = 'Usar a localização atual'
                    },300)
                })
                .catch( error => {
                    console.error(error)
                    this.text_local = 'Erro ao obter sua localização! Tente novamente'
                })
               
            }
            const error = (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        this.text_local = 'Não é possível obter sua localização!';
                        break;
                    case error.POSITION_UNAVAILABLE,
                        error.TIMEOUT,
                        error.UNKNOWN_ERROR:
                        this.text_local = 'Erro ao obter sua localização! Tente novamente'
                        break;
                }
                console.log(error)
            }

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition( sucess, error, options);
            }else{
                console.log('Sentimos muito, mas o serviço de geolocalização não é suportado por seu navagador')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    // Geolocation
    .row_flex{
        display:flex;
        justify-content: start;
        align-items: center;
        flex-direction: row;
        cursor: pointer;
        transition: 200ms ease-in-out;
        padding: 15px 0;
        margin-top: 10px;

        &:hover, &:focus{
            background-color: #ececec;
            padding: 15px 10px;
        }

        &:active{
            transform: scale(.9)
        }
    } 
    .text-locale{
        margin-left: 10px;
    }
    .cls-locale{
        fill:#ed1641;
    }
</style>