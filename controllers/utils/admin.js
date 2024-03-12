/* Controlador de uso general en las páginas web del sitio privado.
*   Sirve para manejar la plantilla del encabezado y pie del documento.
*/

// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
MAIN.classList.add('container');
// Se establece el título de la página web.
document.querySelector('title').textContent = 'PULL & ZARA - Administración';
// Constante para establecer el elemento del título principal.
const MAIN_TITLE = document.getElementById('mainTitle');
MAIN_TITLE.classList.add('text-center', 'py-3');

/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/

function generarMenuIndex() {

    const menuIndex = `<div id="navbar fixed-top">
<nav class="navbar navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="../admin/index.html">
            <img src="../../resources/img/pull&zara (5).png" alt="" width="130" height="110">
        </a>
        <ul class="navbar-nav d-flex flex-row me-1">
            <div class="iconHome">
                <li class="nav-item me-3 me-lg-0">
                    <a class="nav-link text-white" href="../admin/pagina_principal.html">
                        <img src="../../resources/img/casa 1.png" alt="" width="30" height="30">
                    </a>
                </li>
            </div>
            <div class="iconProfile">
                <li class="nav-item me-lg-0"> <!-- Cambiamos la clase de margen aquí -->
                    <a class="nav-link text-white" href="../admin/perfil_admin.html">
                        <img src="../../resources/img/usuario.png" alt="" width="30" height="30">
                    </a>
                </li>
            </div>
        </ul>
    </div>
</nav>
</div>`;
    return menuIndex;

}

function generarFooterIndex() {

    const footerIndex = `
<div class="container">
    <div class="row align-items-center">
            <div class="col-md-6">
                <img src="../../resources/img/pull&zarablanco.png" alt="pull&zara logo" class="logo mb-1"
                width="60px" height="60px">
                <p class="text-white">Design amazing digital experiences that create more happy in the world</p>
            </div>
        <div class="col-md-6 d-flex justify-content-end align-items-center">
            <div class="social-icons align-self-start">
                <a href="https://www.facebook.com" target="_blank"><img
                    src="../../resources/img/facebook.png" alt="Facebook"></a>
                <a href="https://www.instagram.com" target="_blank"><img
                    src="../../resources/img/instagram.png" alt="Instagram"></a>
                <a href="https://twitter.com" target="_blank"><img src="../../resources/img/x.png"
                    alt="X"></a>
                <a href="https://www.tiktok.com/" target="_blank"><img src="../../resources/img/tik-tok.png"
                    alt="Tik Tok"></a>
            </div>
        </div>
    </div>
</div>

    <div class="row">
        <div class="col">
            <p class="text-muted small">© 2024 PULL & ZARA. Todos los derechos reservados.</p>
        </div>
    </div>`;
    return footerIndex;

}

