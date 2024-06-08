const SUBCATEGORIA_API = 'services/admin/subcategoria.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#SubcategoriaModal'),
    MODAL_TITLE = document.getElementById('SubcategoriaTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_SUBCATEGORIA = document.getElementById('idSubcategoria'),
    NOMBRE_SUBCATEGORIA = document.getElementById('nombreSubcategoria'),
    DESCRIPCION_SUBCATEGORIA = document.getElementById('descripcionSubcategoria'),
    IMAGEN_SUBCATEGORIA = document.getElementById('imagenSubcategoria');

document.addEventListener('DOMContentLoaded', () => {
    //funcion para mostrar la tabla con registros existentes
    fillTable();
});

//metodo de envio del formulario de busqueda 
SEARCH_FORM.addEventListener('submit', (event) => {
    //evitar que la pagina se recargue al enviar el forms de busqueda
    event.preventDefault();
    //constante tipo objeto con datos del forms 
    const FORM = new FormData(SEARCH_FORM);
    //funcion de llenado de tabla con resultados 
    fillTable(FORM);
});

//metodo del evento de guardar 
SAVE_FORM.addEventListener('submit', async (event) => {
    //evitar que la pagina se recargue al enviar el forms de busqueda
    event.preventDefault();
    //verificar accion a realizar
    (ID_SUBCATEGORIA.value) ? action = 'updateRow' : action = 'createRow';
    //objeto con los datos del forms 
    const FORM = new FormData(SAVE_FORM);
    //guardar datos del forms
    const DATA = await fetchData(SUBCATEGORIA_API, action, FORM);
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
    const DATA = await fetchData(SUBCATEGORIA_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                    <tr>
                        <td class="text-center ImagenTablas"> 
                            <img src="${SERVER_URL}images/subcategorias/${row.imagen_subcategoria}">
                        </td>
                        <td>${row.nombre_subcategoria}</td>
                        <td>${row.descripcion_subcategoria}</td>
                        <td>
                            <button type="button" class="btn btn-primary" onclick="openUpdate(${row.id_subcategoria})">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_subcategoria})">
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

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/

const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'CREAR SUBCATEGORIA';
    // Se prepara el formulario.
    SAVE_FORM.reset();
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idSubcategoria', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(SUBCATEGORIA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'EDITAR SUBCATEGORIA';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_SUBCATEGORIA.value = ROW.id_subcategoria;
        NOMBRE_SUBCATEGORIA.value = ROW.nombre_subcategoria;
        DESCRIPCION_SUBCATEGORIA.value = ROW.descripcion_subcategoria;
        IMAGEN_SUBCATEGORIA.value = ROW.imagen_subcategoria;
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
    const RESPONSE = await confirmAction('¿Desea eliminar la Subcategoría de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idSubcategoria', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(SUBCATEGORIA_API, 'deleteRow', FORM);
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