const PEDIDOS_API = 'services/admin/pedido.php';
const DETALLES_PEDIDOS_API = 'services/admin/detallePedido.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
const SEARCH_FORM_DETALLE = document.getElementById('searchFormDetallePedido');

// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
const TABLE_BODY_DETALLE = document.getElementById('tableBodyD'),
    ROWS_FOUND_DETALLE = document.getElementById('rowsFoundD');

// Constantes para establecer los elementos del modal de detalle pedido.
const MODAL_DETALLE_PEDIDO = new bootstrap.Modal('#modalDetallePedido'),
    MODAL_TITLE_DETALLE_PEDIDO = document.getElementById('modalTitleD');

const ESTADO_PEDIDO_GENERAL = document.getElementById('estadoPedidoGeneral');

const SAVE_FORM = document.getElementById('saveForm'),
    ID_PEDIDO = document.getElementById('idPedido'),
    ESTADO_PEDIDO = document.getElementById('estadoPedido');

// Llenar la tabla de pedidos al cargar la página.
document.addEventListener('DOMContentLoaded', () => {
    fillTable();
    fillSelectEstadosReporte();
});

// Métodos de búsqueda.
SEARCH_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM = new FormData(SEARCH_FORM);
    fillTable(FORM);
});

SEARCH_FORM_DETALLE.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM = new FormData(SEARCH_FORM_DETALLE);
    fillTableDetalle(FORM);
});

// Métodos para llenar las tablas.
const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    let action = form ? 'searchRows' : 'readAll';
    const DATA = await fetchData(PEDIDOS_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.nombre_cliente}</td>
                    <td>${row.correo_cliente}</td>
                    <td>${row.fecha_pedido}</td>
                    <td>${row.direccion_pedido}</td>
                    <td>${row.estado_pedido}</td>
                    <td><button type="button" class="btn btn-warning" onclick="openDetalle(${row.id_pedido})">Ver detalles</button></td>
                </tr>
            `;
        });
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const fillTableDetalle = async (idPedido, form = null) => {
    ROWS_FOUND_DETALLE.textContent = '';
    TABLE_BODY_DETALLE.innerHTML = '';
    let action = form ? 'searchRowsDetalle' : 'readDetalles';
    const FORM = new FormData();
    FORM.append('idPedido', idPedido);
    const DATA = await fetchData(PEDIDOS_API, action, FORM);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY_DETALLE.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/productos/${row.img_producto}" alt="Imagen de ${row.img_producto}" height="50"></td>
                    <td>${row.nombre_producto}</td>
                    <td>${row.numero_talla}</td>
                    <td>${row.nombre_color}</td>
                    <td>${row.cantidad_producto}</td>
                    <td>${row.precio_producto}</td>
                </tr>
            `;
        });
        ROWS_FOUND_DETALLE.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Métodos para abrir los modals.
const openDetalle = async (id) => {
    MODAL_TITLE_DETALLE_PEDIDO.textContent = 'Detalles del pedido';
    const FORM = new FormData();
    FORM.append('idPedido', id);
    
    console.log('FormData entries:', [...FORM.entries()]); // Verifica los datos enviados

    const DATA = await fetchData(PEDIDOS_API, 'readOne', FORM);

    console.log('FetchData result:', DATA); // Verifica la respuesta de fetchData

    if (DATA.status) {
        const row = DATA.dataset;

        console.log('Row dataset:', row); // Verifica el contenido de row

        ID_PEDIDO.value = id;
        ESTADO_PEDIDO.value = row.estado_pedido;
        console.log('Estado Pedido value:', ESTADO_PEDIDO.value); // Verifica el valor de ESTADO_PEDIDO
        
        fillSelectEstados(row.estado_pedido);
        
        MODAL_DETALLE_PEDIDO.show();
        fillTableDetalle(id);
        
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Método para llenar el select de estados de pedido
const fillSelectEstados = (estadoActual) => {
    const estados = ['Pendiente', 'Cancelado', 'Completado', 'Anulado'];
    ESTADO_PEDIDO.innerHTML = '';
    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        if (estado === estadoActual) {
            option.selected = true;
        }
        ESTADO_PEDIDO.appendChild(option);
    });
}

// Método para llenar el select de estados de pedido
const fillSelectEstadosReporte = (estadoActual) => {
    const estados = ['Pendiente', 'Cancelado', 'Completado', 'Anulado'];
    ESTADO_PEDIDO_GENERAL.innerHTML = '';
    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        if (estado === estadoActual) {
            option.selected = true;
        }
        ESTADO_PEDIDO_GENERAL.appendChild(option);
    });
};


// Métodos para actualizar datos.
ESTADO_PEDIDO.addEventListener('change', async () => {
    const FORM = new FormData();
    FORM.append('idPedido', ID_PEDIDO.value);
    FORM.append('estadoPedido', ESTADO_PEDIDO.value);
    const DATA = await fetchData(PEDIDOS_API, 'updateEstado', FORM);
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        MODAL_DETALLE_PEDIDO.hide();
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*Funcion para abrir un reporte automatico de pedidos 
Parametros: ninguno 
Retorno: ninguno */
const openReport = () => {
    const estadoSeleccionado = ESTADO_PEDIDO_GENERAL.value; // Obtener el estado seleccionado del combo box
    fillSelectEstadosReporte();
    // Construir la URL del reporte con el estado seleccionado
    const url = `${SERVER_URL}reports/admin/pedidos_general.php?estadoPedidoGeneral=${encodeURIComponent(estadoSeleccionado)}`;

    // Abrir el reporte en una nueva pestaña
    window.open(url);
}