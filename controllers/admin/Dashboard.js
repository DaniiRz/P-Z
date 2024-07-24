// Constantes para completar la ruta de la API.
const CLIENTE_API = 'services/admin/clientes.php';
const CATEGORIA_API = 'services/admin/categorias.php';
const PRODUCTO_API = 'services/admin/producto.php';
const PEDIDO_API = 'services/admin/pedido.php';

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a las funciones que generan los gráficos en la página web.
    graficoPastelUsuarios();
    graficoPastelCategorias();
    graficoBarrasProductos();
    graficaGanancias();
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
        // Se declaran los arreglos para guardar los datos a graficar.
        let generos = [];
        let porcentajes = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            generos.push(row.genero_cliente);
            porcentajes.push(row.porcentaje);
        });
        // Llamada a la función para generar y mostrar un gráfico de pastel.
        pieGraph('chart1', generos, porcentajes, 'Porcentaje de género por clientes');
    } else {
        document.getElementById('chart1').remove();
        console.log(DATA.error);
    }
}

const graficoPastelCategorias = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(CATEGORIA_API, 'readProductosPorCategoria');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let categorias = [];
        let cantidades = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            categorias.push(row.nombre_categoria);
            cantidades.push(row.cantidad_productos);
        });
        // Llamada a la función para generar y mostrar un gráfico de pastel.
        pieGraph('chart2', categorias, cantidades, 'Cantidad', 'Cantidad de productos por categoría');
    } else {
        document.getElementById('chart2').remove();
        console.log(DATA.error);
    }
}

/*
*   Función asíncrona para mostrar un gráfico de barras con los productos con más existencias.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
// Función asíncrona para mostrar un gráfico de barras con los productos con más existencias.
const graficoBarrasProductos = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTO_API, 'topProductosConMasExistencias');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let productos = [];
        let existencias = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            productos.push(row.nombre_producto);
            existencias.push(row.existencias);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras.
        barGraph('chartProductos', productos, existencias, 'Cantidad en Existencias', 'Productos');
    } else {
        document.getElementById('chartProductos').remove();
        console.log(DATA.error);
    }
}

/*
*   Función asíncrona para mostrar un gráfico de pastel con el porcentaje de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const graficaGanancias = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PEDIDO_API, 'prediccionGanancia', null);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let mes = [];
        let ganancia = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            mes.push(row.nombre_mes);
            ganancia.push(row.ventas_mensuales);
        });
        mes.push(DATA.dataset[0].nombre_mes);
        ganancia.push(DATA.dataset[0].ventas_mensuales);
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        LineGraph('chart5', mes, ganancia, 'Ganancias $', 'Año actual');
    } else {
        document.getElementById('chart5').remove();
        console.log(DATA.error);
    }
}