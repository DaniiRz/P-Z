const CATEGORIA_API = 'services/admin/categorias.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#AgregarCategoria'), 
    MODAL_TITLE = document.getElementById('exampleModal1Label');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_CATEGORIA = document.getElementById('idCategoria'),
    NOMBRE_CATEGORIA = document.getElementById('nombreCategoria'),
    IMAGEN_CATEGORIA = document.getElementById('imagenCategoria');


document.addEventListener('DOMContentLoaded', () => {
    //funcion para mostrar la tabla con registros existentes
    fillTable();
});

//metodo de envio del formulario de busqueda 
SAVE_FORM.addEventListener('submit', (event) => {
    //evitar que la pagina se recargue al enviar el forms de busqueda
    event.preventDefault();
    //contsnate tipo objeto con datos ddel forms 
    const FORM = new FormData(SEARCH_FORM);
    //funcion de llenado de tabla con resultados 
    fillTable(FORM);
});

//metodo del evento de guardar 
SAVE_FORM.addEventListener('submit', async (event) => {
    //evitar que la pagina se recargue al enviar el forms de busqueda
    event.preventDefault();
    //verificar accion a realizar
    (ID_CATEGORIA.value) ? action = 'updateRow' : action = 'createRow';
    //objeto con los datos del forms 
    const FORM = new FormData(SAVE_FORM);
    //guardar datos del forms
    const DATA = await fetchData(CATEGORIA_API, action, FORM);
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
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';

    const action = form ? 'searchRows' : 'readAll';
    const DATA = await fetchData(CATEGORIA_API, action, form);

    if (DATA.status) {
        let rowsHtml = '';
        DATA.dataset.forEach(row => {
            rowsHtml += `
                <tr>
                    <td><img src="${SERVER_URL}images/categorias/${row.imagen_categoria}" alt="Imagen de ${row.nombre_categoria}" height="50"></td>
                    <td>${row.nombre_categoria}</td>
                    <td><button type="button" class="btn btn-warning" data-bs-toggle="modal"
                    data-bs-target="#AgregarSubCategoria">Ver Sub-categorias</button></td>
                    <td>
                        <button type="button" class="btn btn-info" onclick="openUpdate(${row.id_categoria})" aria-label="Editar ${row.nombre_categoria}">
                        <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_categoria})" aria-label="Eliminar ${row.nombre_categoria}">
                        <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        TABLE_BODY.innerHTML = rowsHtml;
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
    MODAL_TITLE.textContent = 'Crear categoría';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    IMAGEN_CATEGORIA.required=true;
}


/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCategoria', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar categoría';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        IMAGEN_CATEGORIA.required=false;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_CATEGORIA.value = ROW.id_categoria;
        NOMBRE_CATEGORIA.value = ROW.nombre_categoria;
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
    const RESPONSE = await confirmAction('¿Desea eliminar la categoría de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCategoria', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CATEGORIA_API, 'deleteRow', FORM);
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




