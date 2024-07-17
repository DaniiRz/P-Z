// Constante para establecer la URL del servicio PHP
const PEDIDO_ADMIN_API = 'services/admin/pedido.php';

// Constantes para establecer los elementos de la tabla de pedidos
const TABLE_BODY = document.getElementById('tableBody');
const ROWS_FOUND = document.getElementById('rowsFound');

// Constante para establecer el formulario de búsqueda de pedidos
const SEARCH_FORM = document.getElementById('searchForm');

// Constante para el modal de registro de producto.
const MODAL_DETALLE_PEDIDO = new bootstrap.Modal('#modalDetallePedido'),
    MODAL_TITLE = document.getElementById('modalTitleD');

// Evento cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    fillTable(); // Llenar la tabla al cargar la página
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

// Función para llenar la tabla de pedidos
const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    const action = form ? 'searchOrders' : 'readAllOrders';
    const DATA = await fetchData(PEDIDO_ADMIN_API, action, form);
        if (DATA.status) {
            let rowsHtml = '';
            DATA.dataset.forEach(row => {
                rowsHtml += `
                    <tr>
                        <td>${row.nombre_cliente}</td>
                        <td>${row.correo}</td>
                        <td>${row.direccion_pedido}</td>
                        <td>
                            <button class="btn btn-info btn-sm" onclick="openDetallePedido(${row.id_pedido})">
                                Detalle
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
};

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
    form ? action = 'searchRowsD' : 'readDetail';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PEDIDO_ADMIN_API, 'readDetail', form);
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

// Función para abrir el detalle de un pedido
const openDetallePedido = async (idPedido) => {
    try {
        const response = await fetch(`${SERVICE_URL}?action=getOrderDetails&idPedido=${idPedido}`);
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del pedido');
        }
        const data = await response.json();

        if (data.status === 1) {
            console.log('Detalles del pedido:', data.dataset); // Aquí puedes manejar los detalles del pedido
        } else {
            console.error('Error en la respuesta del servidor:', data.error);
            // Puedes manejar este error mostrando una alerta o mensaje al usuario
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        // Puedes manejar este error mostrando una alerta o mensaje al usuario
    }
};
