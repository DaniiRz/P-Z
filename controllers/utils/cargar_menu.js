document.addEventListener('DOMContentLoaded', function(){

    const contenedorMenu = document.getElementById("menuContent");
    const navbarHTML = generarMenuIndex();

    contenedorMenu.innerHTML = navbarHTML;


}) 

document.addEventListener('DOMContentLoaded', function(){

    const contenedorFooter = document.getElementById("footerContent");
    const footerHTML = generarFooterIndex();

    contenedorFooter.innerHTML = footerHTML;


}) 