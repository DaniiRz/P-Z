// Este archivo se carga cuando el contenido HTML ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    
    // Obtiene el elemento con el ID "footerIndex"
    const contenedorFooter = document.getElementById("footerIndex");
    
    // Llama a la función generarFooterIndex() y coloca su resultado dentro del elemento contenedorFooter
    contenedorFooter.innerHTML = generarFooterIndex();

    // Obtiene el elemento con el ID "menuContent"
    const contenedorMenuPrivado = document.getElementById("menuContent");
    
    // Llama a la función generarMenuIndex() y coloca su resultado dentro del elemento contenedorMenuPrivado
    contenedorMenuPrivado.innerHTML = generarMenuIndex();
});

// Este evento se dispara cuando el contenido HTML ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    
    // Obtiene el elemento con el ID "menuIndexPublic"
    const contenedorMenu = document.getElementById("menuIndexPublic");

    // Verifica si el elemento existe
    if (contenedorMenu) {
        // Si existe, llama a la función generarMenuPublic() y coloca su resultado dentro del elemento contenedorMenu
        contenedorMenu.innerHTML = generarMenuPublic();
    }
});

// Este evento se dispara cuando se realiza scroll en la ventana del navegador
window.addEventListener('scroll', () => {
    
    // Obtiene el elemento con la clase "navbar"
    const navbar = document.querySelector('.navbar');
    
    // Verifica si se ha hecho scroll hacia abajo
    if (window.scrollY > 0) {
        // Si es así, agrega la clase "navbar-scrolled" al elemento navbar
        navbar.classList.add('navbar-scrolled');
    } else {
        // Si no, remueve la clase "navbar-scrolled" del elemento navbar
        navbar.classList.remove('navbar-scrolled');
    }
});