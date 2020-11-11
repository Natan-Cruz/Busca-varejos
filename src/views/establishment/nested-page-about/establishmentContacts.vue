<template>
    <li class="li-row-info"> 
        <p class="text-medium bold">Contato(s):</p>
        <ul class="list-contacts">
            <li class="contact" v-for="contact of filteredContacts" :key="contact.id">
                <span class="text-medium bold type-service" >{{ contact.type_service }}:</span>
                <a :href="contact.link" class="text-medium contact-link" target="_black">{{ contact.fallback }}</a>
            </li>
        </ul>
    </li>
</template>

<script>
export default {
    name: "establishment-contacts",
    props: {
        contacts: Array
    },
    computed:{
        filteredContacts(){
            if(!this.contacts) return;
            const removeServices = ["facebook", "instagram", "youtube"];
            const pattern = new RegExp("\\b" + removeServices.join("\\b|\\b") + "\\b", 'gi');

            return this.contacts.filter(function(current) {
                return current.type_service.search(pattern) === -1;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .contact{
        margin: 10px 0;
    }
    .contact-link {
        text-decoration: underline;
        color: #555;
        margin-left: 7px;
    }
    .type-service{
        padding-left: 10px;
        position: relative;

        &::after{
            content: "";
            width: 6px;
            height: 6px;
            display: block;
            border-radius: 50%;
            background-color: #000;
            position: absolute;
            top: 9px;
        }
    }
</style>