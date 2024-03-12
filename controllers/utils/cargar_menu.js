document.addEventListener('DOMContentLoaded', function(){
    const contenedorMenu = document.getElementById("menuIndexPublic");
    contenedorMenu.innerHTML = generarMenuIndexPublic();

    const contenedorFooter = document.getElementById("footerIndex");
    contenedorFooter.innerHTML = generarFooterIndex();
});