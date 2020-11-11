<template>
  <div class="modal" :class="is_open ? 'display-modal_flex show-modal' : '' " @click="eventCloseModal">
      <div class="content-modal" :class="is_open ? 'show-content-modal' : '' " >
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    name:"modal",
    data(){
        return{
            is_open:false
        }
    },
    methods:{
        eventCloseModal(evt){
            if(evt.target.classList.contains('modal')){
                this.is_open = false
            }
        },
        openModal(){
            this.is_open = true
        },
        closeModal(){
            this.is_open = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .content-modal{
        margin: 0 20px;
        padding: 20px;
    }
</style>