const COLOR_API = 'services/admin/color.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM_COLORES = document.getElementById('searchFormColores');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY_COLORES = document.getElementById('tableBodyColores'),
    ROWS_FOUND_COLORES = document.getElementById('rowsFoundColores');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL_COLORES = new bootstrap.Modal('#ColorModal'),
    MODAL_TITLE_COLORES = document.getElementById('ColorTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM_COLORES = document.getElementById('saveFormColores'),
    ID_COLOR = document.getElementById('idColor'),
    NOMBRE_COLOR = document.getElementById('nombreColor');

// Metodo para llenar la tabla
const fillTableColores = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND_COLORES.textContent = '';
    TABLE_BODY_COLORES.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(COLOR_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY_COLORES.innerHTML += `
            <tr>
                <td>${row.nombre_color}</td>
                <td>
                    <button type="button" class="btn btn-danger" required onclick="openDeleteColores(${row.id_color})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-primary" required onclick="openUpdateColores(${row.id_color})">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                </td>
            </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND_COLORES.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTableColores();
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_FORM_COLORES.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM_COLORES);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTableColores(FORM);
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM_COLORES.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_COLOR.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_COLORES);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(COLOR_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL_COLORES.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTableColores();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});
// Método pora abrir el modal para agregar un color en el sitio privado.
const openCreateColores = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL_COLORES.show();
    MODAL_TITLE_COLORES.textContent = 'AGREGAR COLOR';
    // Se prepara el formulario.
    SAVE_FORM_COLORES.reset();
}
// Método pora abrir el modal para actualizar un color en el sitio privado.
const openUpdateColores = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idColor', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(COLOR_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_COLORES.show();
        MODAL_TITLE_COLORES.textContent = 'EDITAR COLOR';
        // Se prepara el formulario.
        SAVE_FORM_COLORES.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_COLOR.value = ROW.id_color;
        NOMBRE_COLOR.value = ROW.nombre_color;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openDeleteColores = async (id) => {
    console.log(id);
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el color de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idColor', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(COLOR_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTableColores();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}