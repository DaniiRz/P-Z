// Constante para completar la ruta de la API.
const CLIENTE_API = 'services/admin/clientes.php';

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la funciones que generan los gráficos en la página web.
    graficoPastelUsuarios();
});

/*
*   Función asíncrona para mostrar un gráfico de pastel con el porcentaje de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const graficoPastelUsuarios = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(CLIENTE_API, 'porcentajeGeneroUsuarios');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a gráficar.
        let generos = [];
        let porcentajes = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            generos.push(row.genero_cliente);
            porcentajes.push(row.porcentaje);
        });
        // Llamada a la función para generar y mostrar un gráfico de pastel. Se encuentra en el archivo components.js
        pieGraph('chart1', generos, porcentajes, 'Porcentaje de genero por clientes');
    } else {
        document.getElementById('chart1').remove();
        console.log(DATA.error);
    }
}