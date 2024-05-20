// Constante para completar la ruta de la API.
const PRODUCTO_API = '../../api/services/admin/producto.php';
const CATEGORIA_API = '../../api/services/admin/categorias.php';
const SUBCATEGORIA_API = '../../api/services/admin/subcategoria.php';
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#btnAgregar'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PRODUCTO = document.getElementById('idProducto'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProducto'),
    CANTIDAD_PRODUCTO = document.getElementById('cantidadProducto'),
    PRECIO_PRODUCTO = document.getElementById('precioProducto'),
    EXISTENCIAS_PRODUCTO = document.getElementById('existenciasProducto'),
    SUBCATEGORIA_PRODUCTO = document.getElementById('subcategoriaProducto'),
    CATEGORIA_PRODUCTO = document.getElementById('categoriaProducto'),
    DESC_PRODUCTO = document.getElementById('descProducto'),
    IMAGEN_PRODUCTO = document.getElementById('imageNProducto'),
    COLOR_PRODUCTO = document.getElementById('colorProducto'),
    TALLA_PRODUCTO = document.getElementById('tallaProducto');

    // Método del evento para cuando el documento ha cargado.
    document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Gestionar productos';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_PRODUCTO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ID_PRODUCTO, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Metodo para llenar la tabla
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PRODUCTO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.NOMBRE_PRODUCTO}</td>
                    <td>${row.CATEGORIA_PRODUCTO}</td>
                    <td>${row.SUBCATEGORIA_PRODUCTO}</td>
                    <td>${row.NOMBRE_PRODUCTO}</td>
                    <td>${row.EXISTENCIAS_PRODUCTO}</td>
                    <td class="text-center">
                    <button class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#btnDetalles">Detalles</button>
                    </td>
                    <td class="text-center">
                    <button class="btn btn-success" data-bs-toggle="modal"
                        data-bs-target="#btnEditar">Editar</button>
                    <button class="btn btn-danger">Eliminar</button>
                </td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Agregar producto';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    EXISTENCIAS_PRODUCTO.disabled = false;
    fillSelect(CATEGORIA_API, 'readAll', 'categoriaProducto');
    fillSelect(SUBCATEGORIA_API, 'readAll', 'subcategoriaProducto');
}

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Editar Producto';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        EXISTENCIAS_PRODUCTO.disabled = true;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_PRODUCTO.value = ROW.id_producto;
        NOMBRE_PRODUCTO.value = ROW.nombre_producto;
        CANTIDAD_PRODUCTO.value = ROW.cantidad_producto;
        PRECIO_PRODUCTO.value = ROW.precio_producto;
        EXISTENCIAS_PRODUCTO.value = ROW.existencias;
        DESC_PRODUCTO.value = ROW.desc_producto;
        IMAGEN_PRODUCTO.value = ROW.img_producto;
        COLOR_PRODUCTO.value = ROW.id_color;
        TALLA_PRODUCTO.value = ROW.id_talla;
        fillSelect(CATEGORIA_API, 'readAll', 'categoriaProducto', ROW.id_categoria);
        fillSelect(SUBCATEGORIA_API, 'readAll', 'subcategoriaProducto', ROW.id_sub_categoria);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el producto de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idProducto', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PRODUCTO_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}