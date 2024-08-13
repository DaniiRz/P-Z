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
                   <div class="card card-custom mb-5">
                                <div class="card-header card-header-custom">
                                   <h6 class="card-title mb-2 text-center" >¡Gracias por su compra!</h6>
                                 </div>
                        <div class="card-body d-flex">
                                <div class="flex-grow-1">
                                    <h6 class="card-subtitle mb-2 text-muted-custom">Fecha: ${row.fecha_pedido}</h6>
                                    <p class="card-text">Producto: ${row.nombre_producto}</p>
                                    <p class="card-text">Cantidad: ${row.cantidad_producto}</p>
                                    <p class="card-text">Precio Unitario: $${row.precio_producto}</p>
                                    <p class="card-text">Total: $${(row.cantidad_producto * row.precio_producto).toFixed(2)}</p>
                                </div>
                                <div>
                                    <img src="../../resources/img/cart (2).png" class="ml-5 mr-3" style="max-height: 150px; object-fit: cover;">
                                </div>
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
