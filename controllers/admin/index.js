
const USER_API = 'services/admin/administrador.php';
// Constante para establecer el formulario de registro del primer usuario.
const SIGNUP_FORM = document.getElementById('signupForm');
// Constante para establecer el formulario de inicio de sesión.
const LOGIN_FORM = document.getElementById('loginForm');
// Constante para establecer el elemento del título principal.
const MAIN_TITLE = document.getElementById('mainTitle');
// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Petición para consultar los usuarios registrados.
    const DATA = await fetchData(USER_API, 'readUsers');
    // Se comprueba si existe una sesión, de lo contrario se sigue con el flujo normal.
    if (DATA.session) {
        // Se direcciona a la página web de bienvenida.
        location.href = 'inicio_admin.html';
    } else if (DATA.status) {
        // Se establece el título del contenido principal.
        MAIN_TITLE.textContent = 'Iniciar sesión';
        // Se muestra el formulario para iniciar sesión.
        LOGIN_FORM.classList.remove('d-none');
        sweetAlert(4, DATA.message, true);
    } else {
        // Se establece el título del contenido principal.
        MAIN_TITLE.textContent = 'Registrar primer usuario';
        // Se muestra el formulario para registrar el primer usuario.
        SIGNUP_FORM.classList.remove('d-none');
        sweetAlert(4, DATA.error, true);
    }
});

// Método del evento para cuando se envía el formulario de registro del primer usuario.
SIGNUP_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);
    // Petición para registrar el primer usuario del sitio privado.
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Método del evento para cuando se envía el formulario de inicio de sesión.
LOGIN_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(LOGIN_FORM);
    // Petición para iniciar sesión.
    const DATA = await fetchData(USER_API, 'logIn', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'inicio_admin.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});




/*
// Valores definidos para realizar el inicio de sesión
var correoPredefinido = "admin@ricaldone.edu.sv";
var contrasenaPredefinida = "Rical_2024";

function validarInicios() {
    var correo = document.getElementById('correo').value;
    var contrasena = document.getElementById('contrasena').value;

    // Verificar que los campos no estén vacíos y si lo están, enviar una advertencia
    if (correo.trim() === '') {
        Swal.fire({
            icon: 'warning',
            text: 'Por favor, ingrese su correo electrónico.'
        });
        return;
    }
    if (contrasena.trim() === '') {
        Swal.fire({
            icon: 'warning',
            text: 'Por favor, ingrese su contraseña.'
        });
        return;
    }

    // Verificar que la sintaxis del correo sea correcta
    var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
        Swal.fire({
            icon: 'error',
            text: 'Por favor, ingrese un correo electrónico válido.'
        });
        return;
    }

    // Verificar si el correo electrónico y la contraseña coinciden con los predefinidos
    if (correo !== correoPredefinido || contrasena !== contrasenaPredefinida) {
        Swal.fire({
            icon: 'error',
            text: 'Correo electrónico o contraseña incorrectos.'
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        text: 'Inicio de sesión exitoso. ¡Bienvenido!'
    });

    // Redireccionar a otra página después de 2 segundos
    setTimeout(function() {
        window.location.href = "../admin/inicio_admin.html";
    }, 1000);*/
