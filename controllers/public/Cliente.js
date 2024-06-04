// Constantes para establecer los elementos del formulario de guardar.
    const SAVE_FORM = document.getElementById('saveForm');

// Método del evento para cuando se envía el formulario de registrar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLIENTE_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true, 'login.html');
        // Se carga nuevamente la tabla para visualizar los cambios.
    } else {
        sweetAlert(2, DATA.error, false);
    }
});