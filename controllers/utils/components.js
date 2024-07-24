/*
*   CONTROLADOR DE USO GENERAL EN TODAS LAS PÁGINAS WEB.
*/
// Constante para establecer la ruta base del servidor.
const SERVER_URL = 'http://localhost/P-Z/api/';

/*
*   Función para mostrar un mensaje de confirmación. Requiere la librería sweetalert para funcionar.
*   Parámetros: message (mensaje de confirmación).
*   Retorno: resultado de la promesa.
*/
const confirmAction = (message) => {
    return swal({
        title: 'Advertencia',
        text: message,
        icon: 'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: false,
                visible: true
            },
            confirm: {
                text: 'Sí',
                value: true,
                visible: true
            }
        }
    });
}

const sweetAlert = async (type, text, timer, url = null) => {
    // Se compara el tipo de mensaje a mostrar.
    switch (type) {
        case 1:
            title = 'Éxito';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error';
            break;
        case 3:
            title = 'Advertencia';
            icon = 'warning';
            break;
        case 4:
            title = 'Aviso';
            icon = 'info';
    }
    // Se define un objeto con las opciones principales para el mensaje.
    let options = {
        title: title,
        text: text,
        icon: icon,
        closeOnClickOutside: false,
        closeOnEsc: false,
        button: {
            text: 'Aceptar'
        }
    };
    // Se verifica el uso del temporizador.
    (timer) ? options.timer = 3000 : options.timer = null;
    // Se muestra el mensaje.
    await swal(options);
    // Se direcciona a una página web si se indica.
    (url) ? location.href = url : undefined;
}


/*
*   Función asíncrona para cargar las opciones en un select de formulario.
*   Parámetros: filename (nombre del archivo), action (acción a realizar), select (identificador del select en el formulario) y filter (dato opcional para seleccionar una opción o filtrar los datos).
*   Retorno: ninguno.
*/
const fillSelect = async (filename, action, select, filter = undefined) => {
    // Se verifica si el filtro contiene un objeto para enviar a la API.
    const FORM = (typeof filter === 'object') ? filter : null;
    // Petición para obtener los datos.
    const DATA = await fetchData(filename, action, FORM);
    let content = '';

    // Se comprueba si DATA no es undefined y si el elemento select existe en el DOM.
    if (DATA && DATA.status && document.getElementById(select)) {
        content += '';

        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se obtiene el dato del primer campo de la sentencia SQL.
            const value = Object.values(row)[0];
            // Se obtiene el dato del segundo campo de la sentencia SQL.
            const text = Object.values(row)[1];
            // Se verifica el valor del filtro para enlistar las opciones.
            const SELECTED = (typeof filter === 'number') ? filter : null;

            if (value != SELECTED) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option>No hay opciones disponibles</option>';
    }

    // Se verifica si el elemento select existe en el DOM antes de intentar establecer su innerHTML.
    const selectElement = document.getElementById(select);
    if (selectElement) {
        selectElement.innerHTML = content;
    } else {
        console.error(`Elemento select con id '${select}' no encontrado en el DOM.`);
    }
}

/*
*   Función para generar una paleta de oclores
*   Parámetros: ninguno.
*   Retorno: xAsis.
*/
const generateColorPalette = (numColors) => {
    const palette = [];
    const baseColors = [[49, 49, 49], [73, 120, 144], [3, 99, 148], [185, 185, 185]]; // Colores base RGB

    for (let i = 0; i < numColors; i++) {
        const baseColor = baseColors[i % baseColors.length]; // Rotar entre los colores base
        const variation = (i / numColors) * 0.5; // Variación de brillo entre 0 y 0.5
        const r = Math.round(baseColor[0] * (1 - variation));
        const g = Math.round(baseColor[1] * (1 - variation));
        const b = Math.round(baseColor[2] * (1 - variation));
        const color = `rgba(${r}, ${g}, ${b}, 1)`; // Opacidad de 1
        palette.push(color);
    }

    return palette;
}

/*
*   Función para generar un gráfico de barras verticales. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), xAxis (datos para el eje X), yAxis (datos para el eje Y), legend (etiqueta para los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
const barGraph = (canvas, xAxis, yAxis, legend, title) => {
    const colors = generateColorPalette(xAxis.length); // Generar paleta de colores

    new Chart(document.getElementById(canvas), {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors
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
            }
        }
    });
}


/*
*   Función para generar un gráfico de pastel. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
const pieGraph = (canvas, legends, values, title) => {
    const numColors = values.length; // Número de colores necesarios
    const colors = generateColorPalette(numColors); // Generar paleta de colores

    new Chart(document.getElementById(canvas), {
        type: 'pie',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors // Usar la paleta de colores generada
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

/*
*   Función para generar un gráfico lineal. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
const LineGraph = (canvas, xAxis, yAxis, legend, title) => {
    const colors = generateColorPalette(xAxis.length); // Generar paleta de colores

    new Chart(document.getElementById(canvas), {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors, // Aplicar la paleta de colores
                borderColor: colors, // Usar los mismos colores para el borde
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
*   Función asíncrona para cerrar la sesión del usuario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const logOut = async () => {
    // Se muestra un mensaje de confirmación y se captura la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de cerrar la sesión?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Petición para eliminar la sesión.
        const DATA = await fetchData(USER_API, 'logOut');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.exception, false);
        }
    }
}

/*
*   Función asíncrona para cerrar la sesión del usuario publico.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const logOutPublic = async () => {
    // Se muestra un mensaje de confirmación y se captura la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de cerrar la sesión?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Petición para eliminar la sesión.
        const DATA = await fetchData(CLIENTE_API, 'logOut');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.exception, false);
        }
    }
}

/*
*   Función asíncrona para intercambiar datos con el servidor.
*   Parámetros: filename (nombre del archivo), action (accion a realizar) y form (objeto opcional con los datos que serán enviados al servidor).
*   Retorno: constante tipo objeto con los datos en formato JSON.
*/
const fetchData = async (filename, action, form = null) => {
    // Se define una constante tipo objeto para establecer las opciones de la petición.
    const OPTIONS = {};
    // Se determina el tipo de petición a realizar.
    if (form) {
        OPTIONS.method = 'post';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'get';
    }
    try {
        // Se declara una constante tipo objeto con la ruta específica del servidor.
        const PATH = new URL(SERVER_URL + filename);
        // Se agrega un parámetro a la ruta con el valor de la acción solicitada.
        PATH.searchParams.append('action', action);
        // Se define una constante tipo objeto con la respuesta de la petición.
        const RESPONSE = await fetch(PATH.href, OPTIONS);
        // Se retorna el resultado en formato JSON.
        return await RESPONSE.json();
    } catch (error) {
        // Se muestra un mensaje en la consola del navegador web cuando ocurre un problema.
        console.log(error);
    }
}

const radarGraph = (canvas, legends, values, title) => {
    let colors = values.map(() => '#' + (Math.random().toString(16)).substring(2, 8));

    // Configurar los datos del gráfico
    new Chart(document.getElementById(canvas), {
        type: 'radar',
        data: {
            labels: legends,
            datasets: [{
                label: title,
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    suggestedMin: 0 // Establecer el mínimo del eje radial a 0
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false // Ocultar la leyenda porque ya tenemos etiquetas en el radar
                }
            }
        }
    });
};