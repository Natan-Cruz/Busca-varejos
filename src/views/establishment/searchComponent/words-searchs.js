function saveSearch(word) {
    if (!('localStorage' in window))
        return;

    const STORAGE_NAME = 'word_search'

    word.timestamp = Date.now();

    const wordsLocal = JSON.parse(localStorage.getItem(STORAGE_NAME));
    if (!(wordsLocal)) {
        localStorage.setItem(STORAGE_NAME, JSON.stringify([word]))
        return;
    }

    const prod = wordsLocal.filter(elem => {
        if (elem.id == word.id)
            return elem
    });

    if (prod.length) return

    wordsLocal.push(word)

    localStorage.setItem(STORAGE_NAME, JSON.stringify(wordsLocal));

    return wordsLocal
}

function getWordsSearch(id_establisment) {
    if (!('localStorage' in window))
        return;

    const STORAGE_NAME = 'word_search'

    const wordsLocal = JSON.parse(localStorage.getItem(STORAGE_NAME));
    if (!wordsLocal) return [];

    const resWords = wordsLocal.filter(word => {
        if (word.id_establisment == id_establisment)
            return word;
    });

    return resWords
}

function deleteWordSearched(timestamp) {
    if (!('localStorage' in window))
        return;

    const STORAGE_NAME = 'word_search';

    const wordsLocal = JSON.parse(localStorage.getItem(STORAGE_NAME));
    if (!wordsLocal) return;

    const resWords = wordsLocal.filter(word => {
        if (word.timestamp != timestamp)
            return word;
    });

    localStorage.setItem(STORAGE_NAME, JSON.stringify(resWords))
    return resWords

}
export {
    saveSearch,
    getWordsSearch,
    deleteWordSearched
}