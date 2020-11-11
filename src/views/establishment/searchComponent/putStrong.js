/**
 * Coloca o texto em nregito nas sugestões
 * @param { String } word Texto de base
 * @param { String } wordSearched Palavra pesquisada
 */
export default function putStrong(word, wordSearched) {
    word = word.toLowerCase();
    wordSearched = wordSearched.toLowerCase()
    return word.replace(wordSearched, `<span class="sub-text" style="font-weight: normal;">${wordSearched}</span>`);
}