export default function scrollCart() {
    let top = 0;
    const container = document.querySelector(".container-scroll")

    function event(evt) {
        const scrollTop = evt.target.scrollTop,
            toBtoom = scrollTop > top;

        if (top && toBtoom)
            document.querySelector('.content-cart').style.height = "100vh";

        top = scrollTop;
    }

    return {
        start() {
            container.addEventListener("scroll", event, false)
        },
        destroy() {
            container.removeEventListener("scroll", event, false)
        }
    }
}