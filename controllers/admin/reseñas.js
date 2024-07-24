const VALORACIONES_API = 'services/admin/valoraciones.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');

// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// Constantes para establecer los elementos del modal de valoración.
const MODAL_VALORACION = new bootstrap.Modal('#modalValoracion'),
    MODAL_TITLE_VALORACION = document.getElementById('modalTitle');

// Formulario de guardado
const SAVE_FORM = document.getElementById('saveForm'),
ID_VALORACION=document.getElementById('idValoracion'),
NOMBRE_PRODUCTO=document.getElementById('nombreProducto'),
VALORACION=document.getElementById('comentario'),
ESTADO_VALORACION=document.getElementById('estadoValoracion');

// Llenar la tabla de valoraciones al cargar la página.
document.addEventListener('DOMContentLoaded', () => {
    fillTable();
});

// Método de búsqueda.
SEARCH_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM = new FormData(SEARCH_FORM);
    fillTable(FORM);
});

// Método para llenar la tabla.
const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    let action = form ? 'searchRows' : 'readAll';
    const DATA = await fetchData(VALORACIONES_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.nombre_cliente}</td>
                    <td>${row.nombre_producto}</td>
                    <td>${row.comentario_cliente}</td>
                    <td>${row.fecha_valoracion}</td>
                    <td>${row.estado_valoracion}</td>
                    <td>
                        <button type="button" class="btn btn-warning" onclick="openUpdate(${row.id_valoracion})">
                            Editar
                        </button>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_valoracion})">
                            Eliminar
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

// Métodos para abrir los modals.
const openCreate = () => {
    SAVE_FORM.reset();
    MODAL_TITLE_VALORACION.textContent = 'Crear valoración';
    MODAL_VALORACION.show();
}

const openUpdate = async (id) => {
    MODAL_TITLE_VALORACION.textContent = 'Actualizar valoración';
    const FORM = new FormData();
    FORM.append('idValoracion', id);
    const DATA = await fetchData(VALORACIONES_API, 'readOne', FORM);
    if (DATA.status) {
        const row = DATA.dataset;
        document.getElementById('idValoracion').value = id;
        document.getElementById('nombreProducto').value = row.nombre_producto;
        document.getElementById('comentario').value = row.comentario_cliente;
        document.getElementById('estadoValoracion').value = row.estado_valoracion;
        MODAL_VALORACION.show();
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Métodos para actualizar datos.
SAVE_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(SAVE_FORM);
    let action = document.getElementById('idValoracion').value ? 'updateRow' : 'createRow';
    const DATA = await fetchData(VALORACIONES_API, action, FORM);
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        fillTable();
        MODAL_VALORACION.hide();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Métodos para eliminar datos.
const openDelete = async (id) => {
    const RESPONSE = await confirmAction('¿Desea eliminar esta valoración de forma permanente?');
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idValoracion', id);
        const DATA = await fetchData(VALORACIONES_API, 'deleteRow', FORM);
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}
