<template>
<div class="container-menu-left">
    <menu-hamburger @event-open-menu="openMenuLeft"></menu-hamburger>
    <menu-left-component @event-close-menu=closeMenuLeft></menu-left-component>
</div>
</template>

<script>
import menuHamburger from './menuHamburger';
import menuLeftComponent from "./menuLeft"

export default {
    name: 'menu-left',
    components:{
        menuHamburger,
        menuLeftComponent
    },
    methods:{
        openMenuLeft(){
            const menuLeft = document.querySelector('.menu-left'),
                contentMenuLeft = document.querySelector('.content-menu-left');

            menuLeft.style.display = 'block';
            setTimeout(() => {
                requestAnimationFrame(function() {
                    contentMenuLeft.style.transform = "translateX(0)";
                    menuLeft.style.opacity = '1';
                    document.querySelector('html').style.overflow = 'hidden'
                })
            }, 50);
        },
        closeMenuLeft(){
            const menuLeft = document.querySelector('.menu-left'),
                contentMenuLeft = document.querySelector('.content-menu-left');

            requestAnimationFrame(function() {
                contentMenuLeft.style.transform = "translateX(-100%)";
                menuLeft.style.opacity = '0';
                
                const html = document.querySelector('html')
                if (html.style.removeProperty) {
                    html.style.removeProperty("overflow")
                } else {
                    html.style.removeAttribute("overflow")
                }
            })
            setTimeout(() => {
                menuLeft.style.display = 'none'
            }, 100);
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>