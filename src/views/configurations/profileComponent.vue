<template>
    <div class="wrapper-informations">
        <p class="subtitle-content">Perfil</p>
        <div class="content-settings-profile">
            <!--  -->
            <div class="ctn-person-picture">
                <div class="ctn-image">
                    <img :src="user.data.photoURL" :alt="user.data.displayName" class="img-tag-profile-picture" v-if="user.loggedIn && user.data.photoURL">
                    <svg v-else xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </div>
                <!-- <p class="p-action p-picture">Alterar foto</p> -->
            </div>
            <!--  -->
            <ul class="ctn-profile-informations">
                <li class="block-info" :class="{ 'spinner-loading': displayName.is_loading }" >
                    <input type="text" class="input-profile-information input-name" 
                        v-model="displayName.value" 
                        :disabled="displayName.disabled || displayName.is_loading" 
                        :class="{ 'input-disabled-loading': displayName.is_loading }"
                        @keydown.enter="saveInformations(displayName)"
                        ref="input_name">
                    <!--  -->
                    <button class="mini-button" 
                        v-if="displayName.disabled" @click="setEditable(displayName, 'input_name')">
                        Editar nome
                    </button>
                    <!--  -->
                    <div v-else>
                        <button class="mini-button" :disabled="displayName.is_loading" 
                            @click="setDisabled(displayName)">
                            Cancelar
                        </button>
                        <button class="mini-button-second" :disabled="displayName.is_loading" 
                            @click="saveInformations(displayName)">
                            Salvar
                        </button>
                    </div>
                </li>
                <!-- EMAIL -->
                <li class="block-info" :class="{ 'spinner-loading': email.is_loading }">
                    <p class="text-email-not-verified" v-if="!emailWasVerified" > <span class="sub-text">&#9888;</span>  Email não verificado!</p>
                    <input type="text" class="input-profile-information" 
                        v-model="email.value" 
                        :disabled="email.disabled || email.is_loading" 
                        :class="{ 'input-disabled-loading': email.is_loading }"
                        @keydown.enter="saveInformations(email)"
                        ref="input_email">
                    <!--  -->
                    <div v-if="email.disabled">
                        <button class="mini-button" 
                            @click="setEditable(email, 'input_email')">
                            Editar email
                        </button>
                        <button class="mini-button-second" v-if="!emailWasVerified" @click="sendEmail">
                            Verificar email
                        </button>
                    </div>
                    <!--  -->
                    <div v-else>
                        <button class="mini-button" :disabled="email.is_loading" 
                            @click="setDisabled(email)">
                            Cancelar
                        </button>
                        <button class="mini-button-second" :disabled="email.is_loading" 
                            @click="saveInformations(email)">
                            Salvar
                        </button>
                    </div>
                </li>
                    
                <!-- PASSWORD -->
                <li class="block-info" v-if="notDisplayPassword" :class="{ 'spinner-loading': password.is_loading }">
                    <p style="font-size: 2em; line-height: 1em">********</p>
                    <!--  -->
                    <button class="mini-button" @click="$refs['modal_alter_password'].openModal()">
                        Editar senha
                    </button>
                    <!--  -->
                </li>
                <!-- PHONE -->
                <li class="block-info" :class="{ 'spinner-loading': phone.is_loading }">
                    <p class="text-email-not-verified" v-if="!phoneWasVerified" ><span class="sub-text">&#9888;</span> Telefone não confirmado!</p>
                    <input type="text" class="input-profile-information" 
                        v-model="phone.value" 
                        :disabled="phone.disabled || phone.is_loading" 
                        :class="{ 'input-disabled-loading': phone.is_loading }"
                        :placeholder="phone.placeholder"
                        @keydown.enter="saveInformations(phone)"
                        ref="input_phone">
                    <!--  -->
                    <div v-if="phone.disabled">
                        <button class="mini-button" 
                            @click="setEditable(phone, 'input_phone')">
                            Editar telefone
                        </button>
                        <button class="mini-button-second" v-if="!phoneWasVerified">
                            Verificar telefone
                        </button>
                    </div>
                    <!--  -->
                    <div v-else>
                        <button class="mini-button" :disabled="phone.is_loading" 
                            @click="setDisabled(phone)">
                            Cancelar
                        </button>
                        <button class="mini-button-second" :disabled="phone.is_loading" 
                            @click="saveInformations(phone)">
                            Salvar
                        </button>
                    </div>
                </li>
                <div class="recaptcha-container" id="recaptcha-container"></div>
                <li class="container-logged-with spacing" v-if="user.data.providerId === 'facebook.com'">
                    <span class="span-icon-service-Oauth icon-facebook"></span>
                    <span class="text-medium">Logado com Facebook</span>
                </li>
                <li class="container-logged-with spacing" v-if="user.data.providerId === 'google.com'">
                    <span class="span-icon-service-Oauth icon-google"></span>
                    <span class="text-medium">Logado com Google</span>
                </li>
            </ul>
        </div>
        <!--  -->
        <modal ref="modal_alter_password">
             <div class="group-input spacing">
                <label for="input-old-password" class="label-input">Sua senha:</label>
                <input type="text" id="input-old-password" class="input" v-model="password.oldValue">
            </div>
            <div class="group-input spacing">
                <label for="input-alter_password" class="label-input">Sua nova senha:</label>
                <input type="text" id="input-alter_password" class="input" v-model="password.value">
            </div>
            <button class="button button-second text-medium" style="margin-top:15px;" @click="saveInformations(password)">Salvar</button>
        </modal>
    </div>
</template>

<script>
import messagePopup from '../../components/message-popup/message-popup';
import modal from './modal';
import { 
    updateDisplayName, 
    updateEmail,
    updatePassword, 
    updatePhone, 
    emailWasVerified,
    sendEmailVerification
} from "./profile.auth";

export default {
    name: "profile-component",
    components:{
        modal
    },
    props:{
        user:{
            type: Object
        }
    },
    computed:{
        notDisplayPassword(){
            const providerId = this.user.data.providerId;
            if(providerId === "facebook.com" || providerId === "google.com")    
                return false;
            else    
                return true;
        }
    },
    data(){
        return{
            displayName: {
                type:"displayName",
                value: this.user.data.displayName,
                default: this.user.data.displayName,
                disabled: true,
                is_loading: false
            },
            email:{
                type:"email",
                value: this.user.data.email,
                default: this.user.data.email,
                disabled: true,
                is_loading: false
            },
            password:{
                type:"password",
                value: "",
                oldValue: "",
                disabled: true,
                is_loading: false
            },
            phone:{
                type:"phone",
                value: this.user.data.phone,
                default: this.user.data.phone,
                disabled: true,
                is_loading: false,
                placeholder: "Sem telefone"
            },
            emailWasVerified: true,
            phoneWasVerified: true
        }
    },
    created(){
        this.emailWasVerified = emailWasVerified()
    },
    methods:{
        setEditable(field, RefInput){
            const input = this.$refs[RefInput];
            if(field)
                field.disabled = false;

            setTimeout(() => {                
                if(input)
                    input.focus();
            }, 220);
        },
        setDisabled(field){        
            if(!field) return;

            field.disabled = true;
            field.is_loading = false
        },
        sendEmail(){
            sendEmailVerification()
            .then( res => console.log(res))
            .catch( err => console.error(err))
        },
        async saveInformations(field){
            try {
                if(!field) return;
                if(field.is_loading) return;

                field.is_loading = true

                const { type, value } = field;
                switch(type){
                    case 'displayName':
                        await updateDisplayName(value)
                        break
                    case 'email':
                        await updateEmail(value)
                        break
                    case "password":
                        await updatePassword(field.oldValue, value)
                        break
                    case "phone":
                        await updatePhone(value)
                }
                      
            } catch (error) {
                // Deu ruim!
                const experatedErrors = {
                    "auth/wrong-password": "Senha incorreta",
                    "auth/too-many-requests": "Muitas tentativas, tente novante mais tarde",
                    "auth/network-request-failed": "Erro na conexão com a internet",
                    "bvj/params-error": "Senha atual e nova senha obrigatórios"
                }
                const errorMessage = experatedErrors[error.code] ? experatedErrors[error.code] : "Ops, ocorreu um erro!"
                messagePopup(errorMessage, 5000);

                field.value = field.default || ""
            }finally{
                field.is_loading = false;
                field.disabled = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped src="./profile.style.scss"></style>
<style lang="scss">
    // 
    .label-input {
        font-size: 1.7em;
        display: block;
        margin-bottom: 3px;
    }

    .input {
        width: 100%;
        height: 50px;
        border-radius: 5px;
        border: none;
        font-size: 1.7em;
        padding-left: 15px;
        display: block;
        background: rgb(233, 233, 233);
        &:focus {
            box-shadow: inset 0px 0 8px -6px #000000d9;
        }
    }
</style>