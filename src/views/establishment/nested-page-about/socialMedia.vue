<template>
    <li class="li-row-info" v-if="(facebook || instagram || youtube)">
        <p class="text-medium bold">Nossas mídias socias:</p>
        <div class="row-social-medias">
            <a :href="facebook.link" class="circle-midia-social facebook" target="_blank" v-if="facebook"> 
                <svg height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
                    <path class="path-facebook-clear"
                        d="M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0c-3.159 0-5.323 1.987-5.323 5.639V9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877V6.062c.001-1.233.333-2.077 2.051-2.077z" />
                </svg> 
            </a>
            <a :href="instagram.link" class="circle-midia-social instagram" target="_blank" v-if="instagram"> 
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">  
                    <path class="path-instagram"
                        d="M17,0H7A7,7,0,0,0,0,7V17a7,7,0,0,0,7,7H17a7,7,0,0,0,7-7V7A7,7,0,0,0,17,0Zm5.1,17a5.11,5.11,0,0,1-5.1,5.1H7A5.1,5.1,0,0,1,1.88,17V7A5.09,5.09,0,0,1,7,1.88H17A5.1,5.1,0,0,1,22.13,7Z" />
                    <path class="path-instagram"
                        d="M12,5.53A6.47,6.47,0,1,0,18.47,12,6.47,6.47,0,0,0,12,5.53Zm0,11.06A4.59,4.59,0,1,1,16.59,12,4.6,4.6,0,0,1,12,16.59Z" />
                    <circle class="cls-1" cx="18.56" cy="5.44" r="0.94" />
                </svg> 
            </a>
            <a :href="youtube.link" class="circle-midia-social youtube" target="_blank" v-if="youtube">
                <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16.5">
                    <path class="path-youtube"
                        d="M23,5.34c-.65-1.16-1.36-1.37-2.8-1.45s-5-.14-8.18-.14-6.75,0-8.18.14S1.67,4.18,1,5.34,0,8.49,0,12H0c0,3.49.35,5.5,1,6.64S2.38,20,3.81,20.12s5.06.13,8.19.13,6.75-.05,8.19-.13,2.14-.31,2.79-1.47S24,15.5,24,12h0c0-3.51-.34-5.5-1-6.66ZM9,16.5v-9L16.5,12Z"
                        transform="translate(0 -3.75)" />
                </svg> 
            </a>
        </div>
    </li>
</template>

<script>
export default {
    name: "social-media",
    props:{
        contacts:{
            type: Array
        }
    },
    computed:{
        facebook() { return this.isHave("facebook") },
        instagram() { return this.isHave("instagram") },
        youtube() { return this.isHave("youtube") }
    },
    methods:{
        isHave(type_service){
            if(!this.contacts) return false

            const contact = this.contacts.filter(function(current){
                const currentTypeService = typeof current.type_service == 'string' ? current.type_service : ""
                return currentTypeService.toUpperCase() === type_service.toUpperCase()
            });

            return contact.length ? contact[0] : false
        }
    }
}
</script>

<style lang="scss" scoped>
    .row-social-medias {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: row;
        padding: 10px;
    }
    // 
    .circle-midia-social {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: block;
        padding: 10px;
        margin-right: 15px;
        svg {
            width: 100%;
            height: 100%;
        }
    }
    // Styling icons
    .facebook {
        background: #3a559f;
    }
    .instagram {
        background: #f09433;
        background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        // filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888', GradientType=1);
    }
    .youtube {
        background: #c4302b;
    }
    .whatsapp {
        background: #25d366;
    }

    .path-facebook-clear,
    .path-instagram,
    .path-youtube,
    .path-whatsapp {
        fill: #fff;
    }
</style>