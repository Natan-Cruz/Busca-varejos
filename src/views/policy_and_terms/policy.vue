<template>
    <div>
        <head-vue></head-vue>
        <main>
            <h2>Política Privacidade</h2>
            <p>A sua privacidade é importante para nós. É política do Busca Varejos respeitar a sua privacidade em relação a
                qualquer informação sua que possamos coletar no site <a href=https://api.buscavarejos.com  class="sub-text" >Busca Varejos</a>, e outros
                sites que possuímos e operamos.
            </p>
            <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por
                meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como
                será usado. 
            </p>
            <p>
                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos
                dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso,
                divulgação, cópia, uso ou modificação não autorizados.
            </p>
            <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
            </p>
            <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle
                sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidades
            </p>
            <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer
                alguns dos serviços desejados.
            </p>
            <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e
                informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais,
                entre em contato conosco.
            </p>
            <h3>Mais informações</h3>
            <p>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa
                ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso
                site.
            </p>
            <p>Esta política é efetiva a partir de <strong class="sub-text">September</strong>/<strong class="sub-text">2020</strong>.</p>
        </main>
    </div>
</template>

<script>
import headVue from './head'
export default {
    name:"policy",
    components:{
        headVue
    }
}
</script>

<style lang="scss" scoped>
    main{
        width: 80%;
        max-width: 700px;
        margin: 70px auto 0 auto;
    }
    h2, h3{
        font-size: 2em;
        margin: 15px 0;
    }
    p{
        font-size: 1.7em;
        line-height:1.2em;
        margin:5px 0;
    }
</style>