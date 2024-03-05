document.addEventListener('DOMContentLoaded', function(){

    const contenedorMenu = document.getElementById("menuContent");
    const navbarHTML = generarMenuIndex();

    contenedorMenu.innerHTML = navbarHTML;


}) 