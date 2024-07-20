const PEDIDOS_API = 'services/admin/pedido.php';
const DETALLES_PEDIDOS_API = 'services/admin/detallePedido.php';
const ESTADOS_API = 'services/admin/estados_pedidos.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
      ROWS_FOUND = document.getElementById('rowsFound');

// Constantes para establecer los elementos de la tabla.
const  TABLE_BODY_DETALLE = document.getElementById('tableBodyD'),
ROWS_FOUND_DETALLE = document.getElementById('rowsFoundD');

// Constantes para establecer los elementos del modal de detalle pedido.
const MODAL_DETALLE_PEDIDO = new bootstrap.Modal('#modalDetallePedido'),
      MODAL_TITLE_DETALLE_PEDIDO = document.getElementById('modalTitleD'),
      SEARCH_FORM_DETALLE = document.getElementById('searchFormDetallePedido'),
      ESTADO_PEDIDO = document.getElementById('estadoPedido');

// Método para llenar la tabla de pedidos.
const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    let action = form ? 'searchRows' : 'readAllPending';
    const DATA = await fetchData(PEDIDOS_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.nombre_cliente}</td>
                    <td>${row.correo_cliente}</td>
                    <td>${row.direccion_pedido}</td>
                    <td>${row.fecha_pedido}</td>
                    <td>${row.estado_pedido}</td>
                    <td><button type="button" class="btn btn-info" onclick="openDetalle(${row.id_pedido})">Ver detalles</button></td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="openUpdate(${row.id_pedido})">
                        <i class="bi bi-pen-fill"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_pedido})">
                        <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Evento para buscar pedidos.
SEARCH_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM = new FormData(SEARCH_FORM);
    fillTable(FORM);
});

// Método para abrir el modal de detalles del pedido.
const openDetalle = async (id) => {
    MODAL_TITLE_DETALLE_PEDIDO.textContent = 'Detalles del pedido';
    const FORM = new FormData();
    FORM.append('idPedido', id);
    const DATA = await fetchData(PEDIDOS_API, 'readOne', FORM);
    if (DATA.status) {
        MODAL_DETALLE_PEDIDO.show();
        fillTableDetalle(id);
        fillSelect(ESTADOS_API, 'readAll', 'estadoPedido', row.estado_pedido);
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Método para llenar la tabla de detalles del pedido.
const fillTableDetalle = async (idPedido, form = null) => {
    ROWS_FOUND_DETALLE.textContent = '';
    TABLE_BODY_DETALLE.innerHTML = '';
    let action = form ? 'searchRowsDetalle' : 'readDetallePedido';
    const FORM = new FormData();
    FORM.append('idPedido', idPedido);
    const DATA = await fetchData(PEDIDOS_API, action, FORM);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY_DETALLE.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/productos/${row.img_producto}" alt="Imagen de ${row.img_producto}" height="50"></td>
                    <td>${row.id_talla}</td>
                    <td>${row.id_color}</td>
                    <td>${row.cantidad_producto}</td>
                    <td>${row.precio_producto}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="openUpdateDetalle(${row.id_detalle})">Editar</button>
                        <button type="button" class="btn btn-danger" onclick="openDeleteDetalle(${row.id_detalle})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
        ROWS_FOUND_DETALLE.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Evento para buscar detalles del pedido.
SEARCH_FORM_DETALLE.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM = new FormData(SEARCH_FORM_DETALLE);
    fillTableDetalle(FORM);
});

// Método para actualizar el estado del pedido.
ESTADO_PEDIDO.addEventListener('change', async () => {
    const FORM = new FormData();
    FORM.append('idPedido', ID_PEDIDO.value);
    FORM.append('estadoPedido', ESTADO_PEDIDO.value);
    const DATA = await fetchData(PEDIDOS_API, 'updateEstado', FORM);
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Método para abrir el formulario de edición de un pedido.
const openUpdate = async (id) => {
    const FORM = new FormData();
    FORM.append('idPedido', id);
    const DATA = await fetchData(PEDIDOS_API, 'readOne', FORM);
    if (DATA.status) {
        const ROW = DATA.dataset;
        document.getElementById('idPedido').value = ROW.id_pedido;
        document.getElementById('estadoPedido').value = ROW.estado_pedido;
        MODAL_DETALLE_PEDIDO.show();
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Método para eliminar un pedido.
const openDelete = async (id) => {
    const RESPONSE = await confirmAction('¿Desea eliminar el pedido de forma permanente?');
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idPedido', id);
        const DATA = await fetchData(PEDIDOS_API, 'deleteRow', FORM);
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// Método para abrir el formulario de edición de un detalle del pedido.
const openUpdateDetalle = async (id) => {
    const FORM = new FormData();
    FORM.append('idDetalle', id);
    const DATA = await fetchData(PEDIDOS_API, 'readOneDetalle', FORM);
    if (DATA.status) {
        const ROW = DATA.dataset;
        document.getElementById('idDetalle').value = ROW.id_detalle;
        document.getElementById('cantidadProducto').value = ROW.cantidad_producto;
        document.getElementById('precioProducto').value = ROW.precio_producto;
        MODAL_DETALLE_PEDIDO.show();
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Método para eliminar un detalle del pedido.
const openDeleteDetalle = async (id) => {
    const RESPONSE = await confirmAction('¿Desea eliminar el detalle del pedido de forma permanente?');
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idDetalle', id);
        const DATA = await fetchData(PEDIDOS_API, 'deleteRowDetalle', FORM);
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
            fillTableDetalle(FORM.get('idPedido'));
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// Llenar la tabla de pedidos al cargar la página.
document.addEventListener('DOMContentLoaded', () => {
    fillTable();
});
