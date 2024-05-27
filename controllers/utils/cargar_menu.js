document.addEventListener('DOMContentLoaded', function () {

    const contenedorFooter = document.getElementById("footerIndex");
    contenedorFooter.innerHTML = generarFooterIndex();

    const contenedorMenuPrivado = document.getElementById("menuContent");
    contenedorMenuPrivado.innerHTML = generarMenuIndex();
});

document.addEventListener('DOMContentLoaded', function () {
    const contenedorMenu = document.getElementById("menuIndexPublic");

    // Verifica si el elemento existe
    if (contenedorMenu) {
        contenedorMenu.innerHTML = generarMenuPublic();
    }
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});