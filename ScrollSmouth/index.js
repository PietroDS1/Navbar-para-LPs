// Função de scroll animado com duração customizada
function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // de 0 até 1

        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // Função de easing (mais suave que linear)
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
}

// Intercepta cliques da navbar
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault(); // evita o pulo instantâneo
        const target = link.getAttribute("href");
        smoothScroll(target, 950); // 1000ms = 1s
    });
});