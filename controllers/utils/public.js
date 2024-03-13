//footer y navbar para web publica

function generarMenuPublic() {

    const menuIndexPublic = `
    <div id="navbar fixed-top">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="../admin/index.html">
                    <img src="../../resources/img/pull&zara (5).png" alt="" width="120" height="100">
                </a>
           
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            
                <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item ms-5">
                            <a class="nav-link active" aria-current="page" href="#"> Blusas </a>
                        </li>
                        <li class="nav-item ms-5">
                            <a class="nav-link active" aria-current="page" href="#"> Jeans </a>
                        </li>
                        <li class="nav-item ms-5">
                            <a class="nav-link active" aria-current="page" href="#"> Shorts </a>
                        </li>
                        <li class="nav-item ms-5">
                            <a class="nav-link active" aria-current="page" href="#"> Abrigos </a>
                        </li>
                        <li class="nav-item ms-5 pe-5">
                            <a class="nav-link active" aria-current="page" href="#"> Vestidos </a>
                        </li>
                    </ul>
                
                    <ul class="navbar-nav d-flex flex-row justify-content-auto">
                        <li class="nav-item ms-5">
                            <a class="nav-link text-white" href="../admin/index.html">
                                <img class="navbar-image" src="../../resources/img/casa 1.png" alt="" width="30" height="30">
                            </a>
                        </li>
                        <li class="nav-item ms-3">
                            <a class="nav-link text-white" href="../admin/perfil_admin.html">
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

function generarFooterPublic() {

    const footerIndexPublic = `
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

    <div class="row">
        <div class="col">
            <p class="text-muted small">© 2024 PULL & ZARA. Todos los derechos reservados.</p>
        </div>
    </div>
    `;
    return footerIndexPublic;
}