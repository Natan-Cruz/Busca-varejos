<template>
    <div>
        <informations-skeleton class="wrapper-container-informations" v-if="informations.is_loading"></informations-skeleton>
        <ul class="wrapper-container-informations" v-else>
            <!-- Categorias do estabelecimentos -->
            <establishment-categories :categories=informations.establishment.categories></establishment-categories>
            <!-- Horario de atendimento -->
            <hours-attendence :opening_hours="informations.establishment.opening_hours" ></hours-attendence>
            <!-- Metodos de pagamentos -->
            <payments-methods :paymentsMethods=informations.establishment.payments_methods></payments-methods>
            <!-- Contatos -->
            <establishment-contacts :contacts="informations.establishment.contacts"></establishment-contacts>
            <!-- Midias socias -->
            <social-media :contacts="informations.establishment.contacts" ></social-media>
            <!-- Endereco -->
            <establishment-address :informations="informations.establishment" ></establishment-address>
            <!-- Sobre -->
            <establishment-history :informations="informations.establishment"></establishment-history>
        </ul>
    </div>
</template>

<script>
import establishmentCategories from "./establishmentCategories"
import hoursAttendence from "./hoursAttendence";
import paymentsMethods from "./paymentsMethods";
import establishmentAddress from "./establishmentAddress";
import establishmentContacts from "./establishmentContacts"
import socialMedia from "./socialMedia";
import establishmentHistory from "./establishmentHistory";

import informationsSkeleton from "./informationsSkeleton"

export default {
    name:"about-view",
    props:{
        informations:{
            type: Object
        }
    },
    components:{
        establishmentCategories,
        hoursAttendence,
        paymentsMethods,
        establishmentAddress,
        establishmentContacts,
        socialMedia,
        establishmentHistory,
        informationsSkeleton
    }
}
</script>

<style lang="scss" scoped>
    .wrapper-container-informations {
        width: 100%;
        height: 100%;
        overflow: {
            x: hidden;
            y: auto
        }
        padding: 20px 5% 0 5%;
    }

    .li-row-info {
        padding: 7px 0;
        border-bottom: solid 1px rgba(126, 126, 126, 0.3);
        position: relative;
    }

    /deep/.short-text { display: inline-block; }
    /deep/.full-text { display: none; }

    @media screen and (min-width:550px){
        .li-row-info {
            padding: 14px 0;
        }

        /deep/.short-text { display: none; }
        /deep/.full-text { display: inline-block; }
    }
</style>