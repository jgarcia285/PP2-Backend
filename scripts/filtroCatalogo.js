document.addEventListener("DOMContentLoaded", function (event) {

    //Filtrar elementos del catalogo
    const todo = document.querySelectorAll(".micro, .pvideo, .pmadre, .ram, .gabinete, .monitor")
    const micro = document.querySelectorAll(".micro");
    const pvideo = document.querySelectorAll(".pvideo");
    const pmadre = document.querySelectorAll(".pmadre");
    const ram = document.querySelectorAll(".ram");
    const gabinete = document.querySelectorAll(".gabinete");
    const monitor = document.querySelectorAll(".monitor");

    document.querySelector("#todo").addEventListener("click", () => todo.forEach(el => el.style.display = "initial"));

    document.querySelector("#micro").addEventListener("click", () => {
        todo.forEach(el => el.style.display = "none");
        micro.forEach(el => el.style.display = "initial");
    });

    document.querySelector("#pvideo").addEventListener("click", () => {
        todo.forEach(el => el.style.display = "none");
        pvideo.forEach(el => el.style.display = "initial");
    });

    document.querySelector("#pmadre").addEventListener("click", () => {
        todo.forEach(el => el.style.display = "none");
        pmadre.forEach(el => el.style.display = "initial");
    });

    document.querySelector("#ram").addEventListener("click", () => {
        todo.forEach(el => el.style.display = "none");
        ram.forEach(el => el.style.display = "initial");
    });

    document.querySelector("#gabinete").addEventListener("click", () => {
        todo.forEach(el => el.style.display = "none");
        gabinete.forEach(el => el.style.display = "initial");
    });

    document.querySelector("#monitor").addEventListener("click", () => {
        todo.forEach(el => el.style.display = "none");
        monitor.forEach(el => el.style.display = "initial");
    });
});