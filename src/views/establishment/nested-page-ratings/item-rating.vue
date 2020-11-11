<template>
    <div class="container-rating">
        <div class="more-options" v-if="rating.is_owner">
            <input type="checkbox" name="" class="checkbox-options-product" :id="`id-${rating.rating.id}`">
			<label  style="position: relative;" class="label-options-product" :for="`id-${rating.rating.id}`">
				<span class="span-icon-table option">
					<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M13 16a3 3 0 106 0 3 3 0 00-6 0zM13 26a3 3 0 106 0 3 3 0 00-6 0zM13 6a3 3 0 106 0 3 3 0 00-6 0z" />
					</svg>
				</span>
				<span class="span-icon-table close">
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"
						width="24">
						<path
							d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
						<path d="M0 0h24v24H0z" fill="none" />
					</svg>
				</span>
			</label>
			<div class="container-box">
				<p class="text-medium" data-id="1" @click="removeRating">Remover</p>
			</div>
        </div>
        <div class="header-rating">
            <div class="content-user-picture">
                <img :src="rating.user.picture" :alt="rating.user.name">
            </div>
            <div class="user-name_ratings">
                <p class="span-user-name text-medium bold"> {{ rating.user.name }} </p>
                <div class="container-stars">
                    <span class="span-icon-star" v-for="n in 5" :key=n :class="n <= rating.rating.rating ? 'checked' : '' ">
                        <svg id="color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 23.92">
                            <path class="body-star"
                                d="M23.24,8.58,16,7.46,12.69.54a.77.77,0,0,0-1-.3.76.76,0,0,0-.29.3L8,7.46.75,8.58a.75.75,0,0,0-.62.86.86.86,0,0,0,.2.39l5.31,5.44L4.38,23a.76.76,0,0,0,.63.86.84.84,0,0,0,.47-.08L12,20.12l6.52,3.61a.75.75,0,0,0,1-.3.72.72,0,0,0,.08-.48l-1.26-7.68,5.31-5.44a.74.74,0,0,0,0-1A.87.87,0,0,0,23.24,8.58Z"
                                transform="translate(0 -0.02)" />
                            <path class="border-star"
                                d="M22.89,8.69,15.83,7.61,12.67.9a.75.75,0,0,0-1-.29.71.71,0,0,0-.28.29L8.17,7.61,1.1,8.69A.72.72,0,0,0,.7,9.9l5.14,5.27L4.62,22.61a.73.73,0,0,0,.62.82.67.67,0,0,0,.44-.08L12,19.87l6.32,3.48a.71.71,0,0,0,1-.28.68.68,0,0,0,.08-.46l-1.22-7.44L23.29,9.9a.71.71,0,0,0,0-1A.68.68,0,0,0,22.89,8.69Z"
                                transform="translate(0 -0.02)" />
                        </svg>
                    </span>
                </div>
            </div>
            <span class="span-date-published">{{ date_published }}</span>
        </div>
        <div class="body-rating">
            <p class="text-comment"> {{ rating.rating.comment }} </p>
        </div>
    </div>
</template>

<script>
export default {
    name:"item-rating",
    props:{
        rating: Object
    },
    computed:{
        date_published(){
            const createdAt = this.rating.rating.createdAt
            if(createdAt){
                const date = new Date(createdAt);
                const day = date.getDate(),
                    month = date.getMonth() + 1;
                    
                return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}`
            }else{
                return "";
            }
        }
    },
    methods:{
        removeRating(){
            this.$emit("event-remove-rating", this.rating.rating.id)
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-rating{
        margin-top:15px;
        position: relative;
        box-shadow: 1px 1px 8px -1px rgba(0, 0, 0, 0.2);
        padding:7px;
        padding-right: 24px;
    }
    // Estilo do comentario
    .header-rating{
        width:100%;
        height: 40px;
        position: relative;
        display:flex;
        justify-content:start;
        align-items: center;
    }
    .content-user-picture{
        width:40px;
        height: 40px;
        border-radius:50%;
        border:solid 2px #fff;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        overflow: hidden;
        img{
            width: 100% ;
        }
    }
    .user-name_ratings{
        margin-left:10px;
    }
    .span-date-published{
        font-size: 1.6em;
        color:rgb(145, 145, 145);
        line-height: 1em;
        position: absolute;
        top: 12px;
        right: 0;
    }
    // Messagem do comentario
    .body-rating{
        width:100%; 
        height: auto;
    }
    .text-comment{
        font-size:1.6em;
    }

    // Estilização das estrelas
    .span-icon-star {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        display: inline-block;
    }

    .checked .border-star {
        fill: #ffc107;
    }

    .span-icon-star svg {
        width: 100%;
        pointer-events: none;
    }

    .body-star {
        fill: none;
    }

    .border-star {
        fill: none;
        stroke: #ffc107;
        stroke-width: 2px;
        stroke-miterlimit: 10;
    }
    // 
    .more-options{
        position:absolute;
        top: calc(50% - 20px);
        right: 0;
    }
    .span-icon-table {
        width: 24px;
        height: 40px;
        border-radius: 50%;
        display: block;
        padding: 8px 0;
        transition: 150ms;
        cursor: pointer;
        svg {
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        &:active svg {
            transform: scale(.8)
        }
    }

    // 
    .close {
        position: absolute;
        top: 0;
        opacity: 0;
    }

    .option {
        opacity: 1;
    }

    // 
    .checkbox-options-product {
        display: none;
        &:checked~.container-box {
            width: 90px;
            height: auto;
        }
        &:checked+label>.option {
            opacity: 0;
        }
        &:checked+label>.close {
            opacity: 1;
        }
    }

    .container-box {
        width: 0;
        height: 0;
        position: absolute;
        right: 30px;
        top: 10px;
        background: #fff;
        box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        overflow: hidden;
        transition: 150ms;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        z-index: 2000;
        p {
            cursor: pointer;
            transition: background-color 150ms, font-size 150ms;
            text-align: center;
            padding: 10px;
            line-height: 17px !important;
        }
        p:hover {
            background-color: rgb(228, 228, 228);
        }
        p:active {
            background-color: rgb(207, 207, 207);
            font-size: 1.6em;
        }
    }
</style>