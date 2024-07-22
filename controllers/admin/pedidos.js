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

const SAVE_FORM = document.getElementById('saveForm'),
    ID_PEDIDO = document.getElementById('idPedido'),
    ESTADO_PEDIDO = document.getElementById('estadoPedido');

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
    let action = form ? 'searchRows' : 'readAllPending';
    const DATA = await fetchData(PEDIDOS_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.nombre_cliente}</td>
                    <td>${row.correo_cliente}</td>
                    <td>${row.fecha_actual}</td>
                    <td>${row.direccion_pedido}</td>
                    <td>${row.estado_pedido}</td>
                    <td><button type="button" class="btn btn-warning" onclick="openDetalle(${row.id_pedido})">Ver detalles</button></td>
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

const fillTableDetalle = async (idPedido, form = null) => {
    ROWS_FOUND_DETALLE.textContent = '';
    TABLE_BODY_DETALLE.innerHTML = '';
    let action = form ? 'searchRowsDetalle' : 'readOne';
    const FORM = new FormData();
    FORM.append('idPedido', idPedido);
    const DATA = await fetchData(PEDIDOS_API, action, FORM);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY_DETALLE.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/productos/${row.img_producto}" alt="Imagen de ${row.img_producto}" height="50"></td>
                    <td>${row.nombre_producto}</td>
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

// Métodos para abrir los modals.
const openDetalle = async (id) => {
    MODAL_TITLE_DETALLE_PEDIDO.textContent = 'Detalles del pedido';
    const FORM = new FormData();
    FORM.append('idPedido', id);
    const DATA = await fetchData(PEDIDOS_API, 'readOne', FORM);
    if (DATA.status) {
        const row = DATA.dataset;
        MODAL_DETALLE_PEDIDO.show();
        fillTableDetalle(id);
        fillSelectEstados(row.estado_pedido);
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

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


// Métodos para actualizar datos.
ESTADO_PEDIDO.addEventListener('change', async () => {
    const FORM = new FormData();
    FORM.append('idPedido', document.getElementById('idPedido').value);
    FORM.append('estadoPedido', ESTADO_PEDIDO.value);
    const DATA = await fetchData(PEDIDOS_API, 'updateEstado', FORM);
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Métodos para eliminar datos.
const openDeleteDetalle = async (id) => {
    const RESPONSE = await confirmAction('¿Desea eliminar el detalle del pedido de forma permanente?');
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idDetalle', id);
        const DATA = await fetchData(DETALLES_PEDIDOS_API, 'deleteRowDetalle', FORM);
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

// Método para llenar el select de estados de pedido
const fillSelectEstados = (estadoActual) => {
    const estados = ['Pendiente', 'Finalizado', 'Entregado', 'Anulado'];
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