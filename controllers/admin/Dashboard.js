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
        pieGraph1('chart2', categorias, cantidades, 'Cantidad', 'Cantidad de productos por categoría');
    } else {
        document.getElementById('chart2').remove();
        console.log(DATA.error);
    }
}

const pieGraph1 = (canvas, legends, values, label, title) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvas), {
        type: 'pie',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            let value = tooltipItem.raw;
                            return `${value} productos`;
                        }
                    }
                }
            }
        }
    });
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
        barGraph1('chartProductos', productos, existencias, 'Cantidad en Existencias', 'Top 5 Productos con Más Existencias');
    } else {
        document.getElementById('chartProductos').remove();
        console.log(DATA.error);
    }
}

// Función para generar un color hexadecimal aleatorio
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


// Función para generar un gráfico de barras.
const barGraph1 = (canvas, xAxis, yAxis, legend, title) => {
    // Se declara un arreglo para guardar los colores aleatorios.
    let colors = xAxis.map(() => getRandomColor());
    
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvas), {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors, // Aplicar los colores aleatorios
                borderColor: colors.map(color => color), // Usar los mismos colores para el borde
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        autoSkip: false
                    }
                }
            }
        }
    });
}

// Función para generar un gráfico de barras.
const LineGraph = (canvas, xAxis, yAxis, legend, title) => {
    // Se declara un arreglo para guardar los colores aleatorios.
    let colors = xAxis.map(() => getRandomColor());
    
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvas), {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors, // Aplicar los colores aleatorios
                borderColor: colors.map(color => color), // Usar los mismos colores para el borde
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        autoSkip: false
                    }
                }
            }
        }
    });
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
            mes.push(row.nombre_siguiente_mes);
            ganancia.push(row.prediccion_siguiente_mes);
        });
        mes.push(DATA.dataset[0].nombre_siguiente_mes);
        ganancia.push(DATA.dataset[0].prediccion_siguiente_mes);
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        LineGraph('chart5', mes, ganancia, 'Ganancias $', 'Año');
    } else {
        document.getElementById('chart5').remove();
        console.log(DATA.error);
    }
}