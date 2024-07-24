const VALORACIONES_API = 'services/admin/valoraciones.php';
const CATEGORIAS_API = 'services/admin/categorias.php';
const PRODUCTOS_API = 'services/admin/producto.php';

// Formulario de búsqueda
const SEARCH_FORM = document.getElementById('searchForm');

// Elementos de la tabla
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// Elementos del modal de valoración
const MODAL_VALORACION = new bootstrap.Modal('#modalValoracion'),
    MODAL_TITLE_VALORACION = document.getElementById('modalTitle');

// Formulario de guardado
const SAVE_FORM = document.getElementById('saveForm'),
    ID_VALORACION = document.getElementById('idValoracion'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProducto'),
    VALORACION = document.getElementById('comentario'),
    CATEGORIA_PRODUC = document.getElementById('categoriaProducto'),
    PRODUCTO_VALORAR = document.getElementById('productoValorar'),
    ESTADO_VALORACION = document.getElementById('estadoValoracion'),
    LABEL_CATEGORIA_PRODUCTO = document.querySelector('label[for="categoriaProducto"]'),
    LABEL_NOMBRE_PRODUCTO_VALORA = document.querySelector('label[for="nombreProducto"]'),
    LABEL_NOMBRE_PRODUCTO = document.querySelector('label[for="productoValorar"]'),
    BTN_ENVIAR_VALO = document.getElementById('submitButton');

document.addEventListener('DOMContentLoaded', () => {
    fillTable();
});

SEARCH_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM = new FormData(SEARCH_FORM);
    fillTable(FORM);
});

const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    const action = form ? 'searchRows' : 'readAll';
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
                        <button type="button" class="btn btn-warning" onclick="verValoracion(${row.id_valoracion})">
                            Ver reseña
                        </button>
                    </td>
                </tr>
            `;
        });
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
};

const fillSelectEstadosValo = (estadoActual) => {
    const estados = ['Activa', 'Inactiva'];
    ESTADO_VALORACION.innerHTML = '';
    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        if (estado === estadoActual) {
            option.selected = true;
        }
        ESTADO_VALORACION.appendChild(option);
    });
};

const fillCategories = async () => {
    const DATA = await fetchData(CATEGORIAS_API, 'readAll');
    if (DATA.status) {
        CATEGORIA_PRODUC.innerHTML = '<option value="">Seleccione una categoría</option>';
        DATA.dataset.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id_categoria;
            option.textContent = cat.nombre_categoria;
            CATEGORIA_PRODUC.appendChild(option);
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
};

const fillProducts = async (categoryId = '') => {
    const FORM = new FormData();
    FORM.append('idCategoria', categoryId);
    const DATA = await fetchData(PRODUCTOS_API, 'readByCategory', FORM);
    if (DATA.status) {
        PRODUCTO_VALORAR.innerHTML = '<option value="">Seleccione un producto</option>';
        DATA.dataset.forEach(prod => {
            const option = document.createElement('option');
            option.value = prod.id_producto;
            option.textContent = prod.nombre_producto;
            PRODUCTO_VALORAR.appendChild(option);
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
};

CATEGORIA_PRODUC.addEventListener('change', () => {
    const categoryId = CATEGORIA_PRODUC.value;
    fillProducts(categoryId);
});

const openCreate = () => {
    // Mostrar/Ocultar elementos del modal
    CATEGORIA_PRODUC.style.display = 'block';
    PRODUCTO_VALORAR.style.display = 'block';
    NOMBRE_PRODUCTO.style.display = 'none';
    LABEL_NOMBRE_PRODUCTO_VALORA.style.display = 'none';
    LABEL_NOMBRE_PRODUCTO.style.display = 'block';
    LABEL_CATEGORIA_PRODUCTO.style.display = 'block';
    MODAL_TITLE_VALORACION.textContent = 'Crear valoración';
    SAVE_FORM.reset();
    fillCategories();
    fillSelectEstadosValo();
    fillProducts();
    MODAL_VALORACION.show();
};

const verValoracion = async (id) => {
    // Mostrar/Ocultar elementos del modal
    CATEGORIA_PRODUC.style.display = 'none';
    PRODUCTO_VALORAR.style.display = 'none';
    NOMBRE_PRODUCTO.style.display = 'block';
    LABEL_NOMBRE_PRODUCTO_VALORA.style.display = 'block';
    LABEL_NOMBRE_PRODUCTO.style.display = 'none';
    LABEL_CATEGORIA_PRODUCTO.style.display = 'none';

    MODAL_TITLE_VALORACION.textContent = 'Actualizar valoración';
    const FORM = new FormData();
    FORM.append('idValoracion', id);
    const DATA = await fetchData(VALORACIONES_API, 'readOne', FORM);
    if (DATA.status) {
        const row = DATA.dataset;
        ID_VALORACION.value = id;
        NOMBRE_PRODUCTO.value = row.nombre_producto;
        VALORACION.value = row.comentario_cliente;
        fillSelectEstadosValo(row.estado_valoracion);
        MODAL_VALORACION.show();
    } else {
        sweetAlert(4, DATA.error, true);
    }
};

SAVE_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(SAVE_FORM);
    const action = ID_VALORACION.value ? 'updateRow' : 'createRow';
    const DATA = await fetchData(VALORACIONES_API, action, FORM);
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        fillTable();
        MODAL_VALORACION.hide();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

ESTADO_VALORACION.addEventListener('change', async () => {
    const FORM = new FormData();
    FORM.append('idValoracion', ID_VALORACION.value);
    FORM.append('estadoValoracion', ESTADO_VALORACION.value);
    const DATA = await fetchData(VALORACIONES_API, 'updateEstadoValoracion', FORM);
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        MODAL_VALORACION.hide();
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

