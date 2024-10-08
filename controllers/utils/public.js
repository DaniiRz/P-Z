//footer y navbar para web publica

// Constante de uso general para la pagina publica
const CLIENTE_API = 'services/public/clientes.php';

const MAIN_TITLE = document.getElementById('mainTitle');
//Aqui almacenamos en una funcion la plantilla del navbar en el sitio publico.
function generarMenuPublic() {

    const menuIndexPublic = `
    <div id="navbar" class="fixed-top">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="../public/index.html">
                    <img src="../../resources/img/pull&zara (5).png" alt="" width="120" height="100">
                </a>
                <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <div class="d-flex ms-auto">
                        <ul class="navbar-nav d-flex flex-row align-items-center">
                            <li class="nav-item">
                                <a class="nav-link text-white" href="../public/perfil_usuario.html">
                                    <img class="navbar-image" src="../../resources/img/usuario.png" alt="" width="25" height="25">
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="../public/carrito_compras.html">
                                    <img class="navbar-image" src="../../resources/img/carrito-de-compras.png" alt="" width="25" height="25">
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="../public/historial_compras.html">
                                    <i class="fa-solid fa-bag-shopping fa-xl" style="color: #000000;"></i>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="../public/index.html">
                                    <img class="navbar-image" src="../../resources/img/casa 1.png" alt="" width="25" height="25">
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="container-input ms-3">
                        <input type="search" placeholder="Search" id="search" name="search" class="input">
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                            <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </nav>
    </div>

    `;
    return menuIndexPublic;
}

