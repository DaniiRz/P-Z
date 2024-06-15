// Constante para establecer el formulario de registro.
const SIGNUP_FORM = document.getElementById('signupForm');
// Constante para establecer el formulario de inicio de sesión.
const LOGIN_FORM = document.getElementById('loginForm');
// Constante para establecer el contenedor de registro.
const SIGNUP_CONTAINER = document.getElementById('ContainerRegistro');
// Constante para establecer el contenedor de inicio de sesión.
const LOGIN_CONTAINER = document.getElementById('ContainerLogin');
// Constante para establecer el link que abre el registro.
const LinkRegistro = document.getElementById('LinkRegistro');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Ocultar por defecto el contenedor del form de inicio de sesion.
    SIGNUP_CONTAINER.classList.add('d-none');
});

// Método del evento para cuando se envía el formulario de registrar.
SIGNUP_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLIENTE_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se oculta el contenedor del registro y se muestra el contenedor del login.
        SIGNUP_CONTAINER.classList.add('d-none');
        LOGIN_CONTAINER.classList.remove('d-none');
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Método del evento para cuando se envía el formulario de registrar.
LOGIN_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(LOGIN_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLIENTE_API, 'logIn', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

LinkRegistro.addEventListener("click", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se carga el otro formulario
    SIGNUP_CONTAINER.classList.remove('d-none');
    LOGIN_CONTAINER.classList.add('d-none');
});