<template>
    <li class="block-address">
        <div class="container-options-address">
            <input type="checkbox" name="" :id="`id-${ address.id }`" class="checkbox-category">
            <label :for="`id-${ address.id }`" style="position: relative;">
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
            <div class="content-options-address text-medium" :data-id=address.id>
                <!-- <router-link :to="`/enderecos/editar/${address.id}`" class="sub-text option-address">Editar</router-link> -->
                <p class="sub-text option-address" @click="$emit('event-delete-address', address.id)" >Desabilitar</p>
            </div>
        </div>
        <div class=" spacing">
            <label for="input-street" class="label" style="width: 150px;">Nome do endereço:</label>
            <input type="text" class="input" :value=address.name disabled style="width: auto;display: block;">
        </div>
        <div class="ctn">
            <input type="checkbox" name="" :id="`abc-${address.id}`" class="input-checkbox-more">

            <label :for="`abc-${address.id}`" class="label-icon-container_more">
            <span class="text-medium bold more-view">Mostrar mais</span>
            <span class="text-medium bold minus-view" style="display: none;">Mostrar menos</span>

            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            </label>
            <div class="container-more">
                <div class="content-scroll">
                    <div class="group-input spacing">
                        <span class="span-label bold">Cep:</span>
                        <span class="span-value">{{ address.cep }}</span>
                    </div>
                    <div class="group-input">
                        <span class="span-label bold">Rua:</span>
                        <span class="span-value"> {{ address.street }} </span>
                    </div>
                    <div class="group-input">
                        <span class="span-label bold">Nº:</span>
                        <span class="span-value"> {{ address.number }} </span>
                    </div>
                    <div class="group-input">
                        <span class="span-label bold">Complemento:</span>
                        <span class="span-value"> {{ address.complement }} </span>
                    </div>
                    <div class="group-input spacing">
                        <span class="span-label bold">Bairro:</span>
                        <span class="span-value"> {{ address.neighborhood }} </span>
                    </div>
                    <div class="group-input spacing">
                        <span class="span-label bold">Cidade:</span>
                        <span class="span-value"> {{ address.city }} </span>
                    </div>
                    <div class="group-input spacing">
                        <span class="span-label bold">Estado:</span>
                        <span class="span-value"> {{ address.state }} </span>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>

export default {
    name:"item-address",
    props:{
        address:{
            type: Object
        }
    },
    methods: {
        editAddress(){
            this.$emit('EventOpenModalEditAddress', this.address.id)
        }
    }
}
</script>

<style lang="scss" scoped src="./item-style.scss"></style>