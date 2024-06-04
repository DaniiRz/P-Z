//footer y navbar para web publica

// Constante de uso general para la pagina publica
const CLIENTE_API = 'services/public/clientes.php';

function generarMenuPublic() {

    const menuIndexPublic = `
    <div id="navbar" class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="../public/index.html">
                <img src="../../resources/img/pull&zara (5).png" alt="" width="120" height="100">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item ms-5">
                        <a class="nav-link active" aria-current="page"
                            href="../../views/public/catalogo_blusas.html"> Blusas </a>
                    </li>
                    <li class="nav-item ms-5">
                        <a class="nav-link active" aria-current="page"
                            href="../../views/public/catalogo_jeans.html"> Jeans </a>
                    </li>
                    <li class="nav-item ms-5">
                        <a class="nav-link active" aria-current="page"
                            href="../../views/public/catalogo_shorts.html"> Shorts </a>
                    </li>
                    <li class="nav-item ms-5">
                        <a class="nav-link active" aria-current="page" href="../public/catalogo_abrigos.html">
                            Abrigos </a>
                    </li>
                    <li class="nav-item ms-5 pe-5">
                        <a class="nav-link active" aria-current="page" href="../public/catalogo_vestidos.html">
                            Vestidos </a>
                    </li>
                </ul>

                <ul class="navbar-nav d-flex flex-row justify-content-auto">
                    <li class="nav-item ms-5">
                        <a class="nav-link text-white" href="../public/index.html">
                            <img class="navbar-image" src="../../resources/img/casa 1.png" alt="" width="30"
                                height="30">
                        </a>
                    </li>
                    <li class="navbar-nav d-flex flex-row justify-content-auto">
                        <a class="nav-link text-white" href="../public/perfil_usuario.html">
                            <img class="navbar-image" src="../../resources/img/usuario.png" alt="" width="30"
                                height="30">
                        </a>
                    </li>
                    <li class="navbar-nav d-flex flex-row justify-content-auto">
                        <a class="nav-link text-white" href="../public/carrito_compras.html">
                            <img class="navbar-image" src="../../resources/img/carrito-de-compras.png" alt=""
                                width="30" height="30">
                        </a>
                    </li>
                </ul>
                <div class="container-input">
  <input type="text" placeholder="Search" name="text" class="input">
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

