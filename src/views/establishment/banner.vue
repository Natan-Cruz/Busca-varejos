<template>
   <div class="container-banner">
       <div class="background-closed" v-show="is_closed">
            <div style="text-align:center">
                <p class="alert-closed bold">Estabelecimento fechado</p>
                <p class="alert-closed bold" v-if="teste">{{ teste }}</p>
            </div>
        </div>
        <span class="skeleton skeleton-banner"></span>
    </div>
</template>

<script>

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export default {
    name: "banner",
    props: {
        source_banner: {
            type:String
        },
        openingHours:{
            type: Array
        },
        inOperation:{
            type: [Number, Boolean]
        }
    },
    computed:{
        openToday(){
            if(this.openingHours){
                const currentOpeningHour = this.openingHours[dayjs().day()];
                const openToday = dayjs().isBefore(dayjs(currentOpeningHour.start, "HH-mm"), "hour")        
                return openToday;
            }else{
                return false;
            }
        },
        teste(){
            if(this.openingHours)
                return this.whenItOpens()
            else    
                return false
        },
        is_closed(){
            if(!this.openingHours || !this.inOperation) 
                return true;

            const currentOpeningHour = this.openingHours[dayjs().day()];

            const s = dayjs().isBetween(dayjs(currentOpeningHour.start, "HH-mm"), dayjs("23:59", "HH-mm")),
                e = dayjs().isBetween(dayjs("00:00", "HH-mm"), dayjs(currentOpeningHour.end, "HH-mm"));
                
            if(currentOpeningHour.closed === "1"){
                return true;
            }else{
                if(!(s && e)){
                    return true;
                }else{
                    return false;
                }
            }
        }
    },
    watch:{
        source_banner() {
            this.loadImage()
        }
    },
    methods:{
        whenItOpens(){
            const dayOfWeek = dayjs().day();
            // Verficar se abre hoje
            const currentOpeningHour = this.openingHours[dayOfWeek];
            if(!this.inOperation)
                return ""
            // Não abre hoje
            if(currentOpeningHour.closed === "1"){
                let msg;
                    for(let i = (dayOfWeek + 1); i < 7; i++){
                        const open = this.openingHours[i].closed
                        if(open === 0){
                            if(dayOfWeek + 1 === i)
                                msg = `Abre amanhã as ${currentOpeningHour.start}h`
                            else
                                msg = `Abre na ${this.openingHours[i].weekday} as ${currentOpeningHour.start}h`

                            break
                        }
                    }
                    return msg
            }else{
                const openToday = dayjs().isBefore(dayjs(currentOpeningHour.start, "HH-mm"), "hour")
                if(openToday){
                    return `Abre hoje às ${currentOpeningHour.start}h`
                }else{
                    let msg;
                    for(let i = (dayOfWeek + 1); i < 7; i++){
                        const open = this.openingHours[i].closed
                        if(open === 0){
                            if(dayOfWeek + 1 === i)
                                msg = `Abre amanhã as ${currentOpeningHour.start}h`
                            else
                                msg = `Abre na ${this.openingHours[i].weekday} as ${currentOpeningHour.start}h`

                            break
                        }
                    }
                    return msg
                }
            }
            
        },
        loadImage(){
            const skeleton = document.querySelector('.skeleton-banner');
            if (!this.source_banner) {
                // remove classe principal do skeleton
                return skeleton.classList.remove('skeleton');
            }else{
                const imgBanner = new Image();
                // Ouve o evento de load
                imgBanner.addEventListener('load', function() {
                    // exibi tag de img
                    skeleton.style.display = 'none'
                    imgBanner.style.width = "100%"
                    document.querySelector(".container-banner").appendChild(imgBanner)
                })

                // Ouve evento de error
                imgBanner.addEventListener('error', function() {
                    // adciona classe de erro de imagem
                    skeleton.classList.add('image-error')
                    // remove classe principal do skeleton
                    skeleton.classList.remove('skeleton');
                }, false);

                const url = `https://api.buscavarejos.com${ this.source_banner }`
                imgBanner.setAttribute("src", url)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-banner{
        width: 100%;
        height: 170px;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
        img{
            width: 100% ;
        }
    }

    .background-closed{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .alert-closed{
        font-size: 2.4em;
        line-height: 1em;
        color:#fff;
    }

    @media screen and (min-width:750px){
        .container-banner{
            height: 300px;
        }
    }
</style>