const VALORACIONES_API = 'services/admin/valoraciones.php';

// Formulario de búsqueda
const SEARCH_FORM = document.getElementById('searchForm');

// Elementos de la tabla
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// Elementos del modal de valoración
const MODAL_VALORACION = new bootstrap.Modal('#modalValoracion'),
    MODAL_TITLE_VALORACION = document.getElementById('modalTitle');

// Constantes para establecer los elementos del componente Modal.
const CHART_MODAL = new bootstrap.Modal('#chartModal'),
    MODAL_TITLE = document.getElementById('chartTitle'); 
// Formulario de guardado
const SAVE_FORM = document.getElementById('saveForm'),
    ID_VALORACION = document.getElementById('idValoracion'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProducto'),
    VALORACION = document.getElementById('comentario'),
    ESTADO_VALORACION = document.getElementById('estadoValoracion');

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

const verValoracion = async (id) => {
    const FORM = new FormData();
    FORM.append('idValoracion', id);
    const DATA = await fetchData(VALORACIONES_API, 'readOne', FORM);
    if (DATA.status) {
        const row = DATA.dataset;
        ID_VALORACION.value = id;
        NOMBRE_PRODUCTO.value = row.nombre_producto;
        VALORACION.value = row.comentario_cliente;
        fillSelectEstadosValo(row.estado_valoracion);

        // Inhabilitar los campos
        NOMBRE_PRODUCTO.disabled = true;
        VALORACION.disabled = true;

        // Concatenar el nombre del cliente al título del modal
        MODAL_TITLE_VALORACION.textContent = `Valoración de ${row.nombre_cliente}`;

        MODAL_VALORACION.show();
    } else {
        sweetAlert(4, DATA.error, true);
    }
};

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

/*Funcion asincrona para mostrar grafico parametrizado de cuantos productos poseen cierta talla 
Parametros: ID 
Retorno: ninguno */
const openChart = async () => {
    try {
        // Obtener los datos de los productos más valorados desde el servidor
        const DATA = await fetchData(VALORACIONES_API, 'productosMasValorados');
        
        // Verificar si la respuesta es satisfactoria
        if (DATA.status) {
            // Mostrar el modal del gráfico
            CHART_MODAL.show();

            // Extraer nombres de productos y cantidad de valoraciones de los datos recibidos
            const productos = DATA.dataset.map(row => row.nombre_producto);
            const valoraciones = DATA.dataset.map(row => row.cantidad_valoraciones);

            // Agregar un elemento canvas al contenedor del modal
            document.getElementById('chartContainer').innerHTML = '<canvas id="chart"></canvas>';

            // Llamar a la función para generar y mostrar el gráfico radar
            radarGraph('chart', productos, valoraciones, 'Cantidad de valoraciones por producto');
        } else {
            // Mostrar mensaje de error si la petición no fue satisfactoria
            sweetAlert(4, DATA.error, true);
        }
    } catch (error) {
        // Manejar errores de forma adecuada, por ejemplo, mostrando un mensaje en consola
        console.error('Error al obtener los datos:', error);
    }
};





