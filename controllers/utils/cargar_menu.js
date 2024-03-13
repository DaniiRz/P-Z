document.addEventListener('DOMContentLoaded', function(){
    const contenedorMenu = document.getElementById("menuIndexPublic");
    contenedorMenu.innerHTML = generarMenuPublic();

    const contenedorFooter = document.getElementById("footerIndexPublic");
    contenedorFooter.innerHTML = generarFooterPublic();
});