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
*/
const loadTemplate = async () => {
    MAIN.insertAdjacentHTML('beforebegin', `
                <header>
                <div id="navbar">
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
                                        <img src="../../resources/img/casa 1.png" alt="" width="30" height="30">
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