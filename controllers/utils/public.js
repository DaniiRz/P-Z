//footer y navbar para web publica

function generarMenuPublic() {

    const menuIndexPublic = `
    <div id="navbar fixed-top">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="../public/index.html">
                    <img src="../../resources/img/pull&zara (5).png" alt="" width="120" height="100">
                </a>
           
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            
                <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item ms-5">
                <a class="nav-link active" aria-current="page" href="../../views/public/catalogo_blusas.html"> Blusas </a>
            </li>
            <li class="nav-item ms-5">
                <a class="nav-link active" aria-current="page" href="../../views/public/catalogo_jeans.html"> Jeans </a>
            </li>
            <li class="nav-item ms-5">
                <a class="nav-link active" aria-current="page" href="../../views/public/catalogo_shorts.html"> Shorts </a>
            </li>
            <li class="nav-item ms-5">
                <a class="nav-link active" aria-current="page" href="../public/catalogo_abrigos.html"> Abrigos </a>
            </li>
            <li class="nav-item ms-5 pe-5">
                <a class="nav-link active" aria-current="page" href="../public/catalogo_vestidos.html"> Vestidos </a>
            </li>
        </ul>
                
                    <ul class="navbar-nav d-flex flex-row justify-content-auto">
                        <li class="nav-item ms-5">
                            <a class="nav-link text-white" href="../public/index.html">
                                <img class="navbar-image" src="../../resources/img/casa 1.png" alt="" width="30" height="30">
                            </a>
                        </li>
                        <li class="navbar-nav d-flex flex-row justify-content-auto">
                            <a class="nav-link text-white" href="../public/perfil_usuario.html">
                                <img class="navbar-image" src="../../resources/img/usuario.png" alt="" width="30" height="30">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    `;
    return menuIndexPublic;
}

