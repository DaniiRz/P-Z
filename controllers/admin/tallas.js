const TALLA_API = 'services/admin/tallas.php';
const SUBCATEGORIA_API = '../../api/services/admin/tallas.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#TallaModal'),
    MODAL_TITLE = document.getElementById('TallaTitle'), 
    CHART_MODAL = new bootstrap.Modal('#chartModal'); 

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_TALLA = document.getElementById('idTalla'),
    NUMERO_TALLA = document.getElementById('nombreTalla');

// Metodo para llenar la tabla
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(TALLA_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
            <tr>
                <td>${row.numero_talla}</td>
                <td>
                    <button type="button" class="btn btn-danger" required onclick="openDelete(${row.id_talla})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-primary" required onclick="openUpdate(${row.id_talla})">
                       <i class="fa-solid fa-square-pen"></i>
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

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_TALLA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(TALLA_API, action, FORM);
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

const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'AGREGAR TALLA';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    fillSelect(SUBCATEGORIA_API, 'readAll', 'subcategoriaTalla');
}

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idTalla', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(TALLA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'EDITAR TALLA';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_TALLA.value = ROW.id_talla;
        NUMERO_TALLA.value = ROW.numero_talla;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openDelete = async (id) => {
    console.log(id);
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar la talla de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idTalla', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(TALLA_API, 'deleteRow', FORM);
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


/*Funcion asincrona para mostrar grafico parametrizado de cuantos productos poseen cierta talla 
Parametros: ID 
Retorno: ninguno */

const openChart = async (id) => {
    //se define constante de tipo objeto con los datos del registro seleccionado 
    const FORM = new FormData(); 
    FORM.append('idTalla', id); 
    //Peticicon para obtener los datos solicitados 
    const DATA = await fetchData(TALLA_API, 'readProductoTalla', FORM); 
    //se comprueba si la respuesta es atisfactoria, sino se muestra un error 
    if(DATA.status){
        //caja de dialogo con titulo
        CHART_MODAL.show(); 
        //arreglos para guardar los datos de la grafica 
        let productos = []; 
        let tallas = []; 
        //se recorre el conjunto de registros por medio dek objeto row 
        DATA.dataset.forEach(row => {
            //datos arreglados 
            productos.push(row.cantidad_productos); 
            tallas.push(row.numero_talla); 
        }); 
        //se agrega etiqueta canvas al contenedor del modal 
        document.getElementById('chartContainer').innerHTML = `<canvas id="chart"></canvas>`;
        //se llama la funcon para generar y mostrar un grafico de barras ubicado en component.js
        barGraph('chart', tallas, productos,'Cantidad de Productos', 'Productos por tallas'); 
    } else {
        sweetAlert(4, DATA.error, true); 
    }
}
