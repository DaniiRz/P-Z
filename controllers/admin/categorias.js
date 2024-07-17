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
    MODAL_TITLE = document.getElementById('modalTitle'),
    BUTTON_TITLE = document.getElementById('buttonTitle'),
    CHART_MODAL = new bootstrap.Modal('#chartModal');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_CATEGORIA = document.getElementById('idCategoria'),
    NOMBRE_CATEGORIA = document.getElementById('nombreCategoria'),
    IMAGEN_CATEGORIA = document.getElementById('imagenCategoria');

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
                    <td>
                        <button type="button" class="btn btn-primary" onclick="openUpdate(${row.id_categoria})" aria-label="Editar ${row.nombre_categoria}">
                        <i class="bi bi-pen-fill"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_categoria})" aria-label="Eliminar ${row.nombre_categoria}">
                        <i class="fa-solid fa-trash"></i>
                        </button>
                        <button type="button" class="btn btn-info" onclick="openChart(${row.id_categoria})">
                        <i class="bi bi-bar-chart-fill"></i>
                        </button>
                        <button type="button" class="btn btn-warning" onclick="openReport(${row.id_categoria})">
                        <i class="bi bi-filetype-pdf"></i>
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
    BUTTON_TITLE.textContent = 'Agregar categoria';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    IMAGEN_CATEGORIA.required = true;
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
        BUTTON_TITLE.textContent = 'Actualizar categoría';
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

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar la categoría de forma permanente? Esto también eliminará todos los productos y sus detalles pertenecientes a esta categoría.');
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

/*
*   Función asíncrona para mostrar un gráfico parametrizado.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openChart = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCategoria', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CATEGORIA_API, 'readProductos', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con el error.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        CHART_MODAL.show();
        // Se declaran los arreglos para guardar los datos a graficar.
        let productos = [];
        let unidades = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            productos.push(row.nombre_producto);
            unidades.push(row.total);
        });
        // Se agrega la etiqueta canvas al contenedor de la modal.
        document.getElementById('chartContainer').innerHTML = `<canvas id="chart"></canvas>`;
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        barGraph('chart', productos, unidades, 'Cantidad de productos', 'Cantidad de productos por categoria');
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

/*
*   Función para abrir un reporte parametrizado de productos de una categoría.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openReport = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/productos_categoria.php`);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('idCategoria', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}