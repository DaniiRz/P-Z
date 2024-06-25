// Constante para completar la ruta de la API.
const DETALLE_API = 'services/admin/detalle.php';
const COLOR_API = 'services/admin/color.php';
const TALLA_API = 'services/admin/tallas.php';

// Constante para establecer el formulario de buscar de detalle.
const SEARCH_FORM_DETALLE = document.getElementById('searchFormDetalle');

// Constantes para establecer los elementos de la tabla de detalles.
const TABLE_BODY_D = document.getElementById('tableBodyD'),
    ROWS_FOUND_D = document.getElementById('rowsFoundD');

// Constante para establecer los elementos del modal de detalle producto.
const SAVE_MODAL_DETALLE = new bootstrap.Modal('#modalDetalle'),
    MODAL_TITLE_D = document.getElementById('modalTitleD');

// Constante para establecer los elementos del modal de agregar detalle producto.
const SAVE_MODAL_DETALLE_AGREGAR = new bootstrap.Modal('#modalAgregarDetalle'),
    MODAL_TITLE_A = document.getElementById('modalTitleA');

// Constante de elementos del formulario de detalle producto 
const DETALLE_FORM = document.getElementById('formDetalle'),
    ID_PRODUCTOD = document.getElementById('idProductoD'),
    ID_DETALLE_PRODUCTO = document.getElementById('idDetalleProducto'),
    EXISTENCIAS = document.getElementById('existenciasProducto'),
    TALLA = document.getElementById('tallaProducto'),
    COLOR = document.getElementById('colorProducto'),
    IMAGEN_PRODUCTO = document.getElementById('imagenProducto');

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTableD = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND_D.textContent = '';
    TABLE_BODY_D.innerHTML = '';
    // Se verifica la acción a realizar.
    form ? action = 'searchRowsD' : 'readDetails';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(DETALLE_API, 'readDetails', form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY_D.innerHTML += `
            <tr>
                <td><img src="${SERVER_URL}images/productos/${row.img_producto}" height="50"</td>
                <td>${row.numero_talla}</td>
                <td>${row.nombre_color}</td>
                <td>${row.existencias}</td>
                <td>${row.precio_producto}</td>
                <td>
                    <button type="button" class="btn btn-info" onclick="openUpdateD(${row.id_detalle_producto})">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="openDeleteD(${row.id_detalle_producto})">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND_D.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_FORM_DETALLE.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM_DETALLE);
    FORM.append('idProducto', IDProducto);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTableD(FORM);
});

// Método del evento para cuando se envía el formulario de detalle.
DETALLE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    const action = (ID_DETALLE_PRODUCTO.value) ? 'updateRowD' : 'createRowD';
    //ID_DETALLE_PRODUCTO.value = 0; 
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(DETALLE_FORM);
    // Petición para guardar los datos del formulario.
    try {
        const DATA = await fetchData(DETALLE_API, action, FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA && DATA.status) {
            // Se cierra la caja de diálogo.
            SAVE_MODAL_DETALLE_AGREGAR.hide();
            // Se muestra un mensaje de éxito.
            sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTableD(FORM);
        } else {
            sweetAlert(2, DATA ? DATA.error : "Error desconocido", false);
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        sweetAlert(2, error.message, false); // Mostrar el mensaje de error exacto devuelto por la excepción
    }
});

/*
*   Función para abrir el modal con la tabla de detalle producto.
*   Parámetros: IDproducto.
*   Retorno: ninguno.
*/
// Variable para guardar el id del producto donde se esta trabajando.
let IDProducto;
const openCreateD = async (id) => {
    IDProducto = id;
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', id);
    // Se prepara el formulario.
    DETALLE_FORM.reset();
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL_DETALLE.show();
    MODAL_TITLE_D.textContent = 'DETALLE DEL PRODUCTO';
    // Se llena la tabla buscando el id del producto seleccionado.
    fillTableD(FORM);
}

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreateA = async () => {
    // Se prepara el formulario.
    DETALLE_FORM.reset();
    // Definir el id del producto como valor en el campo
    document.getElementById('idProductoD').value = IDProducto;
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL_DETALLE_AGREGAR.show();
    MODAL_TITLE_A.textContent = 'AGREGAR DETALLE DEL PRODUCTO';
    // Se inicializan los campos con los datos.
    fillSelect(COLOR_API, 'readAll', 'colorProducto');
    // Agregar evento de cambio al primer select
    document.getElementById('colorProducto').addEventListener('change', () => {
        // Obtener el valor seleccionado de la categoría
        const selectedColor = document.getElementById('colorProducto').value;
    });
    fillSelect(TALLA_API, 'readAll', 'tallaProducto');
    // Agregar evento de cambio al primer select
    document.getElementById('tallaProducto').addEventListener('change', () => {
        // Obtener el valor seleccionado de la categoría
        const selectedTalla = document.getElementById('tallaProducto').value;
    });
    // Colocar una imagen por defecto de ejemplo para el contenedor.
    document.getElementById('vista-previa').innerHTML = '<img src="../../resources/img/Imagen vacia.png" alt="" height="200px">';
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdateD = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idDetalleProducto', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(DETALLE_API, 'readOneD', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_DETALLE_AGREGAR.show();
        MODAL_TITLE_A.textContent = 'EDITAR DETALLE PRODUCTO';
        // Se prepara el formulario.
        DETALLE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_DETALLE_PRODUCTO.value = ROW.id_detalle_producto;
        EXISTENCIAS.value = ROW.existencias;
        COLOR.value = ROW.nombre_color;
        //IMAGEN_PRODUCTO.required =false;
        // Se llenan los combobox con los datos necesarios.
        fillSelect(COLOR_API, 'readAll', 'colorProducto', ROW.id_color);
        TALLA.value = ROW.numero_talla;
        fillSelect(TALLA_API, 'readAll', 'tallaProducto', ROW.id_talla);
        // Colocar la imagen del producto en el contenedor para obtener una vista previa
        const vistaPrevia = document.getElementById('vista-previa');
        vistaPrevia.innerHTML = `<img src="${SERVER_URL}images/productos/${ROW.img_producto}" alt="" height="200px">`;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDeleteD = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el detalle de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idDetalleProducto', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(DETALLE_API, 'deleteRowD', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTableD();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}