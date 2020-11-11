export default function renderImage(source) {
    return new Promise((resolve, reject) => {
        const img = new Image()

        img.addEventListener('load', () => resolve(img), false)
        img.addEventListener('error', error => reject(error), false)

        img.setAttribute('src', `https://api.buscavarejos.com${source}`)
    })
}