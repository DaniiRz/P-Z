/* Controlador de uso general en las páginas web del sitio privado.
* Sirve para manejar la plantilla del encabezado y pie del documento.
*/

// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
MAIN.classList.add('container');
// Constante para establecer el elemento del título principal.
const MAIN_TITLE = document.getElementById('mainTitle');
//MAIN_TITLE.classList.add('text-center', 'py-3');

/* Función asíncrona para cargar el encabezado y pie del documento.
* Parámetros: ninguno.
* Retorno: ninguno.
*/

function generarMenuIndex() {

const menuContent = `

<div id="navbar" class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-on-scroll">
        <div class="container">
            <a class="navbar-brand" href="../admin/inicio_admin.html">
                <img src="../../resources/img/pull&zara (5).png" alt="" width="120" height="100">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item ms-5">
                        <a class="nav-link active" aria-current="page" href="../admin/admin_usuarios.html">Usuarios</a>
                    </li>
                    <li class="nav-item ms-5">
                        <a class="nav-link active" aria-current="page"
                            href="../admin/admin_categorias.html">Categorias</a>
                    </li>
                    <li class="nav-item ms-5">
                        <a class="nav-link active" aria-current="page" href="../admin/admin_talla.html">Tallas</a>
                    </li>
                    <li class="nav-item ms-5">
                        <a class="nav-link active" aria-current="page" href="../admin/admin_reseñas.html">Reseñas</a>
                    </li>
                    <li class="nav-item ms-5">
                        <a class="nav-link active" aria-current="page"
                            href="../admin/admin_productos.html">Productos</a>
                    </li>
                    <li class="nav-item ms-5">
                        <a class="nav-link active" aria-current="page" href="../admin/admin_pedidos.html">Pedidos</a>
                    </li>
                    <li class="nav-item ms-5">
                        <a class="nav-link active" aria-current="page"
                            href="../admin/admin_administradores.html">Administradores</a>
                    </li>
                    <li class="nav-item ms-5">
                        <a class="nav-link text-white" href="../admin/inicio_admin.html">
                            <img class="navbar-image" src="../../resources/img/casa 1.png" alt="" width="30"
                                height="30">
                        </a>
                    </li>
                    <li class="nav-item ms-5">
                        <a class="nav-link text-white" href="../admin/perfil_admin.html">
                            <img class="navbar-image" src="../../resources/img/usuario.png" alt="" width="30"
                                height="30">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>`;

return menuContent;

}

function generarFooterIndex() {

const footerIndex = `
<footer class="bg-dark text-white fixed-bottom">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <img src="../../resources/img/pull&zarablanco.png" alt="pull&zara logo" class="logo mb-1" width="60px"
                    height="60px">
                <p class="text-white">Design amazing digital experiences that create more happy in the world</p>
            </div>
            <div class="col-md-6 d-flex justify-content-end align-items-center">
                <div class="social-icons align-self-start">
                    <a href="https://www.facebook.com" target="_blank"><img src="../../resources/img/facebook.png"
                            alt="Facebook"></a>
                    <a href="https://www.instagram.com" target="_blank"><img src="../../resources/img/instagram.png"
                            alt="Instagram"></a>
                    <a href="https://twitter.com" target="_blank"><img src="../../resources/img/x.png" alt="X"></a>
                    <a href="https://www.tiktok.com/" target="_blank"><img src="../../resources/img/tik-tok.png"
                            alt="Tik Tok"></a>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <p class="text-muted small">© 2024 PULL & ZARA. Todos los derechos reservados.</p>
            </div>
        </div>
    </div>
</footer>
`;
return footerIndex;

}

document.getElementById("cerrar-sesion").addEventListener("click", function() {
    window.location.href = "../admin/index.html";
});