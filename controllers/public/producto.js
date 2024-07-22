// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/public/producto.php';
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
const PRODUCTOS = document.getElementById('productos');

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Se define un objeto con los datos de la categoría seleccionada.
    const FORM = new FormData();
    FORM.append('idCategoria', PARAMS.get('id'));
    // Petición para solicitar los productos de la categoría seleccionada.
    const DATA = await fetchData(PRODUCTO_API, 'readProductosCategoria', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se asigna como título principal la categoría de los productos.
        MAIN_TITLE.textContent = `Productos / ${PARAMS.get('nombre')}`;
        // Se inicializa el contenedor de productos.
        PRODUCTOS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada producto.
            PRODUCTOS.innerHTML += `
                <div class="col">
                    <div class="card cartaSubcategoria mb-3">
                        <img src="${SERVER_URL}images/productos/${row.img_producto}" class="card-img-top" alt="${row.nombre_producto}">
                        <div class="card-body text-center">
                            <h5 class="card-title fw-light">${row.nombre_producto}</h5>
                            <h6 class="card-title fw-light">En existencias: ${row.existencias}</h6>
                            <h6 class="card-title fw-light">Precio por unidad: ${row.precio_producto}</h6>
                            <a href="detalle_producto.html?id=${row.id_producto}" class="btn btn-primary m-2" data-id="${row.id_producto}"> <i class="bi bi-bag-fill"></i> Ver detalles</a>
                        </div>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        MAIN_TITLE.textContent = DATA.error;
    }
});