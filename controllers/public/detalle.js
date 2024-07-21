// Constantes para completar la ruta de la API.
const DETALLE_API = 'services/public/detalle.php';
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// Constante para establecer el formulario de agregar un producto al carrito de compras.
const SHOPPING_FORM = document.getElementById('shoppingForm');

//contsnate para establecer la ruta de la API de detalle 
const PEDIDO_API = 'services/public/pedido.php'; 

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Detalles del producto';
    // Constante tipo objeto con los datos del producto seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', PARAMS.get('id'));
    // Petición para solicitar los datos del producto seleccionado.
    const DATA = await fetchData(DETALLE_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se colocan los datos en la página web de acuerdo con el producto seleccionado previamente.
        document.getElementById('idProducto').value = DATA.dataset.id_producto;
        document.getElementById('imagenProducto').src = SERVER_URL.concat('images/productos/', DATA.dataset.img_producto);
        document.getElementById('precioProducto').textContent = DATA.dataset.precio_producto; 
        document.getElementById('categoriaProducto').textContent = (DATA.dataset.nombre_categoria);
        document.getElementById('nombreProducto').textContent = DATA.dataset.nombre_producto;
        document.getElementById('descripcionProducto').textContent = DATA.dataset.desc_producto;
        document.getElementById('existenciasProducto').textContent = ('Quedan ' + DATA.dataset.total_existencias + ' Existencias');
        // Llenar el combobox de colores con los datos necesarios.
        fillSelect(DETALLE_API, 'readColor', 'colorProducto', FORM);
        // Llenar el combobox de tallas con los datos necesarios.
        fillSelect(DETALLE_API, 'readTalla', 'tallaProducto', FORM);
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
        // Se limpia el contenido cuando no hay datos para mostrar.
        document.getElementById('detalle').innerHTML = '';
    }
});


// Método del evento para cuando se envía el formulario de agregar un producto al carrito.
SHOPPING_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SHOPPING_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PEDIDO_API, 'createDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
    if (DATA.status) {
        sweetAlert(1, DATA.message, false, 'carrito_compras.html'); //sesion iniciada
    } else if (DATA.session) {
        sweetAlert(2, DATA.error, false);
    } else {
        sweetAlert(3, DATA.error, true, 'registro_user.html'); //iniciar sesion 
    }
});