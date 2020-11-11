<template>
	<div class="container-maps">
		<div class="container-loading" v-if="is_loading">
			<span class="spinner-loading"></span>
		</div>
		<div id="map" class="map" ref="map" ></div>
	</div>
</template>
<script>
import { map, Marker, FullscreenControl, NavigationControl } from "@tomtom-international/web-sdk-maps";

import { createCircleDistance, createPolygon, isMobileOrTablet } from "./utils";
import Axios from 'axios';
import { getCoordernates } from "../../../components/selectPlaces/teste";
import { mapGetters } from 'vuex';

export default {
    name: 'maps-view',
    props:{
		informations:{
            type: Object
		}
	},
	computed:{
		...mapGetters({
			user:"user"
		})
	},
	data(){
		return{
			is_loading:false,
			map: undefined,
			deliverysAreas: []
		}
	},
	created(){
		this.fetchDeliveryAreas()
	},
	mounted(){
		this.is_loading = true
		console.log(isMobileOrTablet()	)
		this.map = map({
			key: "GuI2W2hQetqpub4GvG4ST7YJUGyQeAWK",
			container: "map",
			language:"pt-BR",
			zoom: 12,
			center: [-46.4858749, -24.015829],
			trackResize: true,
			dragPan: !isMobileOrTablet()

		});
        this.map.addControl(new FullscreenControl());
        this.map.addControl(new NavigationControl());
		
        this.map.on('load', () => {
            this.deliverysAreas.forEach( area => {
                // Desenha poligono
                const layer = createPolygon(area.coordenates)
                this.map.addLayer(layer);
				// Define popup			
			})

			this.map.getCanvas().style.outline = "none"

			this.drawCirclesDistance();

			this.setMarkerUser()

			this.is_loading = false
			if(!this.informations.is_loading){
				this.setMarkerEstablishment()
			}
		})
	},
	watch:{
		informations(){
			this.setMarkerEstablishment();
			
		}
	},
	methods:{
		fetchDeliveryAreas(){
			const url = `https://api.buscavarejos.com/usuarios/estabelecimentos/${this.$route.params.establishment}/deliverys-areas`
			Axios.get(url)
			.then( ({ data: deliverysAreas }) => {
				this.deliverysAreas = deliverysAreas
			})
			.catch( error => {
				console.log(error)
			})
		},
		setMarkerEstablishment(){
			const { latitude: lat, longitude: lng, logo} = this.informations.establishment

            this.map.setCenter([lng,lat])
            
			const element = document.createElement("div")
			element.setAttribute("id","marker")
            element.style.backgroundImage = `url(https://api.buscavarejos.com${logo})`
            
			new Marker({ element: element }).setLngLat([ lng, lat ]).addTo(this.map)
		},
		setMarkerUser(){
			if(!getCoordernates())
				return ;
				
			const { latitude: lat, longitude: lng} = getCoordernates();
			const element = document.createElement("div")
			element.setAttribute("id","marker-user")
			if(this.user.loggedIn)
				element.style.backgroundImage = `url(${this.user.data.photoURL})`

			new Marker({ element: element }).setLngLat([ lng, lat ]).addTo(this.map)
		},
		drawCirclesDistance(){
			const stepDistance = 1000 //in meters
			const { latitude: lat, longitude: lng } = this.informations.establishment
			let radius = 1000
			for(let i = 0; i < 5; i++){
				const layer = createCircleDistance([lng, lat], radius)
				this.map.addLayer(layer)
				radius += stepDistance
			}
		}
	}
}
</script>
<style lang="scss">
	#marker, #marker-user{
		background-size: cover;
		width: 20px;
		height: 20px;
		box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
		border-radius: 5px;
	}
</style>
<style scoped>
	.container-maps{
		position: relative;
		height: 100vh;
	}
	#map{
		height: 100%;
	}
	.container-loading{
		width: 100%;
		height: 100%;
		display:flex;
		justify-content:center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
	}
	.spinner-loading {
        width: 60px;
        height: 60px;
        border: solid 4px #fff;
        border-bottom: solid 4px #ed1641;
        border-radius: 50%;
        transform: rotate(0deg);
        animation: animation-reload 1250ms infinite reverse;
        display: block;
    }

    .animation-running {
        animation-play-state: running !important;
        display: block;
    }

    @keyframes animation-reload {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(1080deg);
        }
    }
</style>
