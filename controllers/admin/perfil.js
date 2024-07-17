// Constantes para establecer los elementos del formulario de editar perfil.
const EDIT_FORM = document.getElementById('editForm'),
    NOMBRE_ADMINISTRADOR = document.getElementById('nombreAdmin'),
    APELLIDO_ADMINISTRADOR = document.getElementById('apellidoAdmin'),
    CORREO_ADMINISTRADOR = document.getElementById('correoAdmin');
// Constantes de los datos del perfil
const NOMBRE_ADMINISTRADOR_PERFIL = document.getElementById('nombreAdminPerfil');
const CORREO_ADMINISTRADOR_PERFIL = document.getElementById('correoAdminPerfil');
// Constante para establecer la modal de cambiar contraseña.
const PASSWORD_MODAL = new bootstrap.Modal('#passwordModal');
// Constante para establecer el formulario de cambiar contraseña.
const PASSWORD_FORM = document.getElementById('passwordForm');
// Constante para establecer la modal de editar perfil.
const PERFIL_MODAL = new bootstrap.Modal('#EditProfile');
// Constante para establecer el formulario de editar perfil.
const PROFILE_FORM = document.getElementById('editForm');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Petición para obtener los datos del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'readProfile');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
        const ROW = DATA.dataset;
        const nombreCompleto = `${ROW.nombre_admin} ${ROW.apellido_admin}`;
        NOMBRE_ADMINISTRADOR_PERFIL.textContent = nombreCompleto;
        CORREO_ADMINISTRADOR_PERFIL.textContent = ROW.correo_admin;
    } else {
        sweetAlert(2, DATA.error, null);
    }
});

// Mètodo del evento para cuando se envía el formulario de cambiar contraseña.
PASSWORD_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PASSWORD_FORM);
    // Petición para actualizar la constraseña.
    const DATA = await fetchData(USER_API, 'changePassword', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        PASSWORD_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para preparar el formulario al momento de cambiar la constraseña.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openPassword = () => {
    // Se abre la caja de diálogo que contiene el formulario.
    PASSWORD_MODAL.show();
    // Se restauran los elementos del formulario.
    PASSWORD_FORM.reset();
}

/*
*   Función para preparar el formulario al momento de editar el perfil.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openProfile = async () => {
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(USER_API, 'readProfile');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se abre la caja de diálogo que contiene el formulario.
        PERFIL_MODAL.show();
        // Se restauran los elementos del formulario.
        PROFILE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        NOMBRE_ADMINISTRADOR.value = ROW.nombre_admin;
        APELLIDO_ADMINISTRADOR.value = ROW.apellido_admin;
        CORREO_ADMINISTRADOR.value = ROW.correo_admin;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}