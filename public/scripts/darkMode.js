window.addEventListener('DOMContentLoaded', () => {
    let btnSwitch = document.querySelector("#switch");

    btnSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        btnSwitch.classList.toggle('active');
    })
});