<template>
    <router-link tag="a" v-bind:to="`/estabelecimentos/${ establishment.id }/produtos`" class="item">
        <div class="container-image skeleton" :id="`id-${establishment.id}`"></div>
        <div class="background-closed-establishment" v-if=is_closed>
            <p class="alert-closed bold">Fechado</p>
        </div>
        <div class="informations-establishment">
            <span class="span bold">{{ establishment.name }}</span>
            <div class="description-establishment" style="margin: 10px 0;">
                <div class="description-establishment"> 
                    <span class="span-icon-star"> 
                        <svg id="color" mlns="http://www.w3.org/2000/svg" viewBox="0 0 24 23.96" >
                            <path class="cls-star"
                                d="M23.36,8.6,16,7.47l-3.3-7a.78.78,0,0,0-1.36,0L8,7.47.63,8.6A.75.75,0,0,0,.21,9.86l5.36,5.5L4.3,23.12a.76.76,0,0,0,1.11.78L12,20.26l6.59,3.64a.75.75,0,0,0,1.1-.78l-1.27-7.76,5.36-5.5a.74.74,0,0,0-.42-1.26Z"
                                transform="translate(0 -0.03)" />
                        </svg> 
                    </span> 
                <span class="span span-ratings">{{ formatRatings(establishment.rating) }}</span>
                 </div>
                <div class="description-establishment list-category"> 
                    <span v-for="name in establishment.categorys" :key="name" class="span-category">
                        {{ name }}
                    </span>
                </div>
            </div>
            <div class="description-establishment"> 
                <div class="group-info" style="margin-left: 5px;"> 
                    <span class="span">{{ establishment.distance.toFixed(2) }} Km</span>
                </div>
                <!-- <span class="span" style="margin: 0 5px;"> - </span>
                <div class="group-info"> 
                    <span class="span">{{ formatPrice(delivery_price) }}</span> 
                </div> -->
            </div>
        </div>
    </router-link> 
</template>

<script>
import Format from "@/components/Format.js";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export default {
    name:"item",
    props:{
        establishment: Object
    },
    computed:{
        delivery_price(){
            const { price_km, distance, minimum_price } = this.establishment;
            if(price_km * distance < minimum_price)
                return minimum_price;
            else
                return price_km * distance
        },
        is_closed(){
            const { opening_hours, in_operation } = this.establishment;

            if(!opening_hours || !in_operation) return true;
            
            const currentOpeningHour = opening_hours[dayjs().day()],
                isBetweenHours = dayjs().isBetween(dayjs(currentOpeningHour.start, "HH-mm"), dayjs(currentOpeningHour.end, "HH-mm"));

            if(currentOpeningHour.closed === "1"){
                return true;
            }else{
                if(!isBetweenHours){
                    return true;
                }else{
                    return false;
                }
            }
        }
    },
    mounted(){
        this.renderImage()
    },
    methods: {
        renderImage(){
            const containerImg = document.getElementById(`id-${this.establishment.id}`);
            if(this.establishment.logo){
                const image = new Image()

                image.addEventListener('load', () => {
                    containerImg.classList.remove('skeleton')
                    containerImg.appendChild(image);
                })

                image.addEventListener('error', function(){
                    containerImg.classList.remove('skeleton');
                    containerImg.classList.add('image-error')
                }, false)
                
                const uriImage = `https://api.buscavarejos.com${this.establishment.logo}?width=90`;
                image.setAttribute('src', uriImage)
                image.style.width = "100%"
            }else{
                containerImg.classList.remove('skeleton');
                containerImg.classList.add('image-not-found')
            }
        },
        formatRatings(rating){
            rating = parseFloat(rating).toFixed(1)

            const splited = rating.split('.')

            if (splited.length === 1) {
                return `${rating},0`
            }

            if (splited[1].length === 1) {
                return `${rating.replace('.', ',')}`
            }
        },
        ...Format("formatPrice")
    }
}
</script>

<style lang="scss" scoped>
    /* modelo de exibicao 2 */
    .item{
        display: flex;
        width: 100%;
        height: 90px;
        margin:10px 0;
        border-radius: 5px;
        box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.15);
        background: #fff;
        overflow: hidden;
        color:#000;
        transition: transform 250ms;
        position: relative;
        &:hover{
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
        }

        &:active{
            transform:scale(0.98)
        }
    }
    
    .container-image{
        width: 90px;
        max-width: 90px;
        height: 90px;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 1px 0 8px rgba(129, 129, 129, 0.3);    
    }

    .background-closed-establishment{
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.5);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 500;
    }
    .alert-closed{
        font-size: 2.4em;
        line-height: 1em;
        color:#ed1641;
        margin: 33px 100px;
    }
    // 
    .informations-establishment{
        width: calc(100% - 90px);
        height: 100%;
        padding: 7px 10px;
    }

    .description-establishment{
        height:20px;
        display: flex;
        justify-content: start;
        align-items: center;
    }
    .span{
        font-size: 1.7em;
        line-height: 1em;
    }
    .span-category{
        display: block;
        font-size: 1.7em;
        color: #666;
        line-height: 1em;
        text-shadow: 0 1px 1px rgba(0,0,0,.1);
        margin-left: 20px;
        position: relative;
        white-space: nowrap;
        &::before{
            content: '';
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #666;
            display: block;
            position: absolute;
            top: 6px;
            left: -10px;
        }
    }

    .span-ratings{
        display: inline-block;
        margin-left: 5px;
        color: #ffc107;
        font-weight: bold;
    }

    .span-icon-star{
        width: 20px;
        height: 20px;
        display: inline-block;

        & > svg{
            width: 100%;
        }
    }
    .cls-star {
        fill: #ffc107;
    }

    /* P */
    .message-info{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left:0;
        padding: 0 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    // .image-not-found, .image-error{
    //     background: #000;
    // }
</style>