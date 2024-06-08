// Constante para completar la ruta de la API.
const SUBCATEGORIA_API = 'services/public/subcategoria.php';
// Constante para establecer el contenedor de categorías.
const SUBCATEGORIAS = document.getElementById('Subcategoria');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'SUBCATEGORIAS';
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(SUBCATEGORIA_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        SUBCATEGORIAS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece la página web de destino con los parámetros.
            let url = `productos.html?id=${row.id_sub_categoria}&nombre=${row.nombre_sub_categoria}`;
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            SUBCATEGORIAS.innerHTML += `
                <div class="col">
                    <div class="card cartaSubcategoria mb-3">
                        <img src="${SERVER_URL}images/subcategorias/${row.imagen_subcategoria}" class="card-img-top">
                        <div class="card-body text-center">
                            <h5 class="card-title">${row.nombre_sub_categoria}</h5>
                            <p class="card-text">${row.descripcion_subcategoria}</p>
                            <a href="${url}" class="btn btn-primary">Ver productos</a>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
    }
});