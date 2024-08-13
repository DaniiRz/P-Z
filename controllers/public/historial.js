// Constante para completar la ruta de la API.
const HISTORIAL_API = 'services/public/historial.php';

const CARD = document.getElementById('cardBody')

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const DATA = await fetchData(HISTORIAL_API, 'readHistorial');
        
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se inicializa la card de pedidos.
            CARD.innerHTML = '';
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                CARD.innerHTML += `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Pedido #${row.id_pedido}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Fecha: ${row.fecha_pedido}</h6>
                            <p class="card-text">Producto: ${row.nombre_producto}</p>
                            <p class="card-text">Cantidad: ${row.cantidad_producto}</p>
                            <p class="card-text">Precio Unitario: $${row.precio_producto}</p>
                            <p class="card-text">Total: $${(row.cantidad_producto * row.precio_producto).toFixed(2)}</p>
                        </div>
                    </div>
                `;
            });
        } else {
            // Se presenta un mensaje de error cuando no existen datos para mostrar.
            CARD.innerHTML = DATA.error;
        }
    } catch (error) {
        // Manejo de errores en la solicitud fetch
        CARD.innerHTML = DATA.error;
    }
});
