const CATEGORIA_API = 'services/admin/categorias.php';
const SUBCATEGORIA_API = 'services/admin/subcategoria.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY_SUB = document.getElementById('subcategoriaTableBody'),
    ROWS_FOUND_SUB = document.getElementById('rowsFound_sub');
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#AgregarCategoria'),
    MODAL_TITLE = document.getElementById('exampleModal1Label');
const SAVE_MODAL_SUB = new bootstrap.Modal('#AgregarSubCategoriaFORM');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_CATEGORIA = document.getElementById('idCategoria'),
    NOMBRE_CATEGORIA = document.getElementById('nombreCategoria'),
    IMAGEN_CATEGORIA = document.getElementById('imagenCategoria');

const SAVE_FORM_SUB = document.getElementById('saveFormSub'),
    ID_SUBCATEGORIA = document.getElementById('idSubcategoria'),
    NOMBRE_SUBCATEGORIA = document.getElementById('nombreSubcategoria'),
    IMAGEN_SUBCATEGORIA = document.getElementById('imagenSubcategoria');

let currentCategoryId = null;

document.addEventListener('DOMContentLoaded', () => {
    // Función para mostrar la tabla con registros existentes
    fillTable();
});

// Método de envío del formulario de búsqueda
SEARCH_FORM.addEventListener('submit', (event) => {
    // Evitar que la página se recargue al enviar el formulario de búsqueda
    event.preventDefault();
    // Constante tipo objeto con datos del formulario
    const FORM = new FormData(SEARCH_FORM);
    // Función de llenado de tabla con resultados
    fillTable(FORM);
});

// Método del evento de guardar para categorías
SAVE_FORM.addEventListener('submit', async (event) => {
    // Evitar que la página se recargue al enviar el formulario de búsqueda
    event.preventDefault();
    // Verificar acción a realizar
    const action = ID_CATEGORIA.value ? 'updateRow' : 'createRow';
    // Objeto con los datos del formulario
    const FORM = new FormData(SAVE_FORM);
    // Guardar datos del formulario
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

// Método del evento de guardar para subcategorías
SAVE_FORM_SUB.addEventListener('submit', async (event) => {
    // Evitar que la página se recargue al enviar el formulario de búsqueda
    event.preventDefault();
    // Verificar acción a realizar
    const action = ID_SUBCATEGORIA.value ? 'updateRow' : 'createRow';
    // Objeto con los datos del formulario
    const FORM = new FormData(SAVE_FORM_SUB);
    FORM.append('idCategoria', currentCategoryId);
    // Guardar datos del formulario
    const DATA = await fetchData(SUBCATEGORIA_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    console.log(ID_SUBCATEGORIA.value);
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL_SUB.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTableSub(currentCategoryId);
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
                    <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                    data-bs-target="#AgregarSubCategoria" onclick="openSubCategoryModal(${row.id_categoria});">Ver Sub-categorias</button></td>
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
*   Función asíncrona para llenar la tabla de subcategorías con los registros disponibles.
*   Parámetros: idcat (id de la categoría), form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTableSub = async (idCategoria, form = null) => {
    ROWS_FOUND_SUB.textContent = '';
    TABLE_BODY_SUB.innerHTML = '';

    const action = form ? 'searchRows' : 'readAll';
    const FORM = new FormData();
    FORM.append('idCategoria', idCategoria); // 'idCategoria' es la clave y idCategoria es el valor.

  /*Si hay un formulario de búsqueda, también añadimos sus datos.
    Este código se asegura de que cualquier dato que venga de un formulario
    de búsqueda (form) se agregue a un nuevo objeto FormData llamado FORM.
   */
    if (form) {
        for (let key of form.keys()) {
            FORM.append(key, form.get(key));
        }
    }

    const DATA = await fetchData(SUBCATEGORIA_API, action, FORM);

    if (DATA.status) {
        let rowsHtml = '';
        if (Array.isArray(DATA.dataset)) {
            DATA.dataset.forEach(row => {
                rowsHtml += `
                    <tr>
                        <td class="text-center ImagenTablas"> 
                            <img src="${SERVER_URL}images/subcategorias/${row.imagen_subcategoria}">
                        </td>
                        <td>${row.nombre_subcategoria}</td>
                        <td>
                            <button type="button" class="btn btn-primary" onclick="openUpdateSub(${row.id_sub_categoria})">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button type="button" class="btn btn-danger" onclick="openDeleteSub(${row.id_sub_categoria})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        } else {
            rowsHtml = '<tr><td colspan="3">No hay subcategorías disponibles.</td></tr>';
        }
        TABLE_BODY_SUB.innerHTML = rowsHtml;
        ROWS_FOUND_SUB.textContent = DATA.message;
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
    IMAGEN_CATEGORIA.required = true;
}

const openCreateSub = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL_SUB.show();
    // Se prepara el formulario.
    SAVE_FORM_SUB.reset();
    IMAGEN_SUBCATEGORIA.required = true;
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
        IMAGEN_CATEGORIA.required = false;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_CATEGORIA.value = ROW.id_categoria;
        NOMBRE_CATEGORIA.value = ROW.nombre_categoria;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openUpdateSub = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idSubcategoria', id);
    console.log(id);
    console.log(FORM);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(SUBCATEGORIA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    console.log(DATA.status)
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_SUB.show();
        // Se prepara el formulario.
        SAVE_FORM_SUB.reset();
        IMAGEN_SUBCATEGORIA.required = false;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_SUBCATEGORIA.value = ROW.id_sub_categoria;
        NOMBRE_SUBCATEGORIA.value = ROW.nombre_subcategoria;
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

const openDeleteSub = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar la subcategoria de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('id_sub_categoria', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(SUBCATEGORIA_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTableSub(currentCategoryId);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// Función para abrir el modal de subcategorías y establecer la categoría actual
const openSubCategoryModal = (idCategoria) => {
    currentCategoryId = idCategoria;
    fillTableSub(idCategoria);
}
