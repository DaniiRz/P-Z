/* Controlador de uso general en las páginas web del sitio privado.
*   Sirve para manejar la plantilla del encabezado y pie del documento.
*/

// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
MAIN.style.paddingTop = '75px';
MAIN.style.paddingBottom = '100px';
MAIN.classList.add('container');
// Se establece el título de la página web.
document.querySelector('title').textContent = 'PULL & ZARA - Administración';
// Constante para establecer el elemento del título principal.
const MAIN_TITLE = document.getElementById('mainTitle');
MAIN_TITLE.classList.add('text-center', 'py-3');

/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*//*
const loadTemplate = async () => {
    MAIN.insertAdjacentHTML('beforebegin', `
                <header>
                <div id="navbar fixed-top">
                <nav class="navbar navbar-light bg-light">
                    <div class="container - fluid">
                        <a class="navbar-brand" href="../admin/index.html">
                            <img src="../../resources/img/pull&zara (5).png" alt="" width="130" height="110">
                        </a>
                        <ul class="navbar-nav d-flex flex-row me-1">
                            <div class="iconHome">
                                <li class="nav-item me-3 me-lg-0">
                                    <a class="nav-link text-white" href="../admin/index.html">
                                        <img src="../../resources/img/casa 1.png" alt="" width="30" height="30">
                                    </a>
                                </li>
                            </div>
                            <div class="iconProfile">
                                <li class="nav-item me-lg-0"> <!-- Cambiamos la clase de margen aquí -->
                                    <a class="nav-link text-white" href="../admin/index.html">
                                        <img src="../../resources/img/usuario.png" alt="" width="30" height="30">
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </nav>
            </div>
                </header>
            `);
    // Se agrega el pie de la página web después del contenido principal.
    MAIN.insertAdjacentHTML('afterend', `
                <footer>
                    <nav class="navbar fixed-bottom bg-body-tertiary">
                        <div class="container">
                            <div>
                                <p><a class="nav-link" href="https://github.com/dacasoft/coffeeshop" target="_blank"><i class="bi bi-github"></i> CoffeeShop</a></p>
                                <p><i class="bi bi-c-square-fill"></i> 2018-2024 Todos los derechos reservados</p>
                            </div>
                            <div>
                                <p><a class="nav-link" href="../public/" target="_blank"><i class="bi bi-cart-fill"></i> Sitio público</a></p>
                                <p><i class="bi bi-envelope-fill"></i> dacasoft@outlook.com</p>
                            </div>
                        </div>
                    </nav>
                </footer>
            `);
};

// Aquí cargamos la plantilla después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
    await loadTemplate(); // Llamamos a la función para cargar la plantilla
});

*/

//Función para generar una plantilla - navbar/

// Función para cargar y mostrar la navbar
function loadNavbar() {
    fetch('navbar.html') // Realiza una solicitud para obtener el contenido de la navbar.html
        .then(response => response.text()) // Convierte la respuesta a texto
        .then(data => { // Manipula el contenido obtenido
            document.getElementById('navbar-container').innerHTML = data; // Inserta el contenido en el contenedor
        })
        .catch(error => console.error('Error al cargar la navbar:', error)); // Maneja errores si los hay
}

// Función para cargar y mostrar el footer
function loadFooter() {
    fetch('footer.html') // Realiza una solicitud para obtener el contenido de la footer.html
        .then(response => response.text()) // Convierte la respuesta a texto
        .then(data => { // Manipula el contenido obtenido
            document.getElementById('footer-container').innerHTML = `
            
            
        <footer class="bg-dark fixed-bottom">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <img src="../../resources/img/pull&zarablanco.png" alt="pull&zara logo" class="logo mb-1"
                            width="100px" height="100px">
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
                <div class="row">
                    <div class="col">
                        <p class="text-muted small">© 2024 PULL & ZARA. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
        
        `; // Inserta el contenido en el contenedor
        })
        .catch(error => console.error('Error al cargar el footer:', error)); // Maneja errores si los hay
}

// Llama a las funciones para cargar y mostrar la navbar y el footer cuando se cargue la página
document.addEventListener('DOMContentLoaded', function () {
    loadNavbar();
    loadFooter();
});


/*

document.addEventListener('DOMContentLoaded', function () {
    function createNavbar() {
        const navbarContainer = document.getElementById('myFooter');
        if (navbarContainer) {
            navbarContainer.innerHTML = `<footer class="fixed-bottom">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 d-flex justify-content-center">
                        <p class="text-lg-center">Derechos Reservados &copy; 2024</p>
                    </div>
                    <div class="col-lg-4 d-flex justify-content-center">
                        <div class="social-icons">
                            <a href=""><img src="../../resources/img/facebook.png" alt=""></a>
                            <a href=""><img src="../../resources/img/instagram.png" alt=""></a>
                            <a href=""><img src="../../resources/img/tik-tok.png" alt=""></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>`;
}
}

createNavbar();
});
*/