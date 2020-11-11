<template>
    <div>
        <span class="text-title spacing-between-container-rows">Cupons de descontos</span>
        <div class="container-discount-coupon">
            <form action="#">
                <label for="input-coupon" class="text-medium">Adicione um cupom de desconto abaixo</label>
                <div class="group-input-coupon">
                    <input type="text" name="" id="input-coupon" class="input-coupon" placeholder="Digite o cupom aqui">
                    <button type="submit" class="button button-second text-medium button-valide-coupon">
                <div class="ctn-text-button">
                    <span class="text-button">Validar</span>
                </div>
                <span class="spinner-loading-button"></span>
            </button>
                </div>
                <p class="text-medium message-coupon bold" style="margin-top:5px">Cupom invalido</p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "discount-coupon"
}
</script>

<style lang="scss" scoped>
    /* CUPONS */

    .group-input-coupon {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        position: relative;
        &::before {
            display: block;
            content: '#';
            font-size: 2.5em;
            line-height: 1em;
            position: absolute;
            left: 5px;
            top: 17px;
        }
    }

    .input-coupon {
        width: 100%;
        height: 50px;
        border-radius: 5px;
        border: none;
        font-size: 1.7em;
        padding-left: 15px;
        display: block;
        background: rgb(245, 245, 245);
        margin-right: 15px;
        padding-left: 27px;
        &:focus {
            box-shadow: inset 0px 0 8px -6px #000000d9;
        }
    }

    .button-valide-coupon {
        width: 100px;
        &:active {
            transform: scale(.95, .95);
            transition: 200ms;
        }
    }

    .loading-button {
        border-bottom: solid 4px #ed1641;
    }

    .ctn-text-button {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .message-coupon {
        height: 0;
        overflow: hidden;
        transition: 200ms;
    }
</style>