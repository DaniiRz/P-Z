// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/admin/producto.php';
const CATEGORIA_API = 'services/admin/categorias.php';

// Constante para establecer el formulario de buscar de productos.
const SEARCH_FORM = document.getElementById('searchForm');

// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// Constante para el modal de registro de producto.
const SAVE_MODAL_PRODUCTO = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle'),
    BUTTON_TITLE = document.getElementById('buttonTitle');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PRODUCTO = document.getElementById('idProducto'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProducto'),
    DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto'),
    CATEGORIA_PRODUCTO = document.getElementById('categoriaProducto'),
    CATEGORIA_PRODUCTO_S = document.getElementById('categoriaProductoS');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
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
            //se agrego la fila del boton de detalle producto, que abre un nuevo forms 
            TABLE_BODY.innerHTML += `
            <tr>
                <td>${row.nombre_producto}</td>
                <td>${row.nombre_categoria}</td>
                <td>${row.desc_producto}</td>
                <td>
                    <button type="button" class="btn btn-warning" onclick="openCreateD(${row.id_producto})">
                        <i class="bi bi-box-seam-fill"></i>
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-primary" onclick="openUpdate(${row.id_producto})">
                        <i class="bi bi-pen-fill"></i>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_producto})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
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

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
});

// Método del evento para cuando se envía el formulario de productos.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    const action = (ID_PRODUCTO.value) ? 'updateRow' : 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    try {
        const DATA = await fetchData(PRODUCTO_API, action, FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA && DATA.status) {
            // Se cierra la caja de diálogo.
            SAVE_MODAL_PRODUCTO.hide();
            // Se muestra un mensaje de éxito.
            sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA ? DATA.error : "Error desconocido", false);
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        sweetAlert(2, error.message, false); // Mostrar el mensaje de error exacto devuelto por la excepción
    }
});

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL_PRODUCTO.show();
    MODAL_TITLE.textContent = 'AGREGAR PRODUCTO';
    BUTTON_TITLE.textContent = 'Agregar producto';
    // Para ocultar el ComboBox de editar Categoria.
    CATEGORIA_PRODUCTO_S.style.display = 'none';
    document.getElementById('textCategoriaProductosS').style.display = 'none';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    // Llenar el primer select con las categorías
    fillSelect(CATEGORIA_API, 'readAll', 'categoriaProducto');

    // Agregar evento de cambio al primer select (categoriaProducto)
    document.getElementById('categoriaProducto').addEventListener('change', () => {
        // Obtener el valor seleccionado de la categoría
        const selectedCategoryId = document.getElementById('categoriaProducto').value;
    });
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_PRODUCTO.show();
        MODAL_TITLE.textContent = 'EDITAR PRODUCTO';
        BUTTON_TITLE.textContent = 'Editar producto';
        // Para mostrar el ComboBox de editar Categoria.
        CATEGORIA_PRODUCTO_S.classList.remove('none');
        document.getElementById('textCategoriaProductosS').classList.remove('none');
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_PRODUCTO.value = ROW.id_producto;
        NOMBRE_PRODUCTO.value = ROW.nombre_producto;
        DESCRIPCION_PRODUCTO.value = ROW.desc_producto;
        // Seleccionar la categoria seleccionada
        fillSelect(CATEGORIA_API, 'readOneP', 'categoriaProducto', FORM);
        // Seleccionar las categorias disponibles
        fillSelect(CATEGORIA_API, 'readAll', 'categoriaProductoS', ROW.id_categoria);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/

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