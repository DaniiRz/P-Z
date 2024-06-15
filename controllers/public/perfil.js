// Constantes para establecer los datos del perfil.
const PROFILE_FORM = document.getElementById('profileForm'),
    NOMBRE_CLIENTE_PERFIL = document.getElementById('nombreClientePerfil'),
    APELLIDO_CLIENTE_PERFIL = document.getElementById('apellidoClientePerfil'),
    CORREO_CLIENTE_PERFIL = document.getElementById('correoClientePerfil'),
    DUI_CLIENTE_PERFIL = document.getElementById('duiClientePerfil'),
    TELEFONO_CLIENTE_PERFIL = document.getElementById('telefonoClientePerfil'),
    // Constantes para establecer los botones del perfil.
    botonEditar = document.getElementById('btnEditar'),
    botonGuardar = document.getElementById('btnGuardar');
// Constante para establecer la modal de cambiar contraseña.
const PASSWORD_MODAL = new bootstrap.Modal('#passwordModal');
// Constante para establecer el formulario de cambiar contraseña.
const PASSWORD_FORM = document.getElementById('passwordForm');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Petición para obtener los datos del usuario que ha iniciado sesión.
    const DATA = await fetchData(CLIENTE_API, 'readProfile');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
        const ROW = DATA.dataset;
        NOMBRE_CLIENTE_PERFIL.value = ROW.nombre_cliente;
        APELLIDO_CLIENTE_PERFIL.value = ROW.apellido_cliente;
        CORREO_CLIENTE_PERFIL.value = ROW.correo_cliente;
        DUI_CLIENTE_PERFIL.value = ROW.dui_client;
        TELEFONO_CLIENTE_PERFIL.value = ROW.telf_cliente;
    } else {
        // Si no hay un usuario que leer dentro del perfil, se enviara a registrarse.
        sweetAlert(4, DATA.message, true, 'registro_user.html');
    }
});

// Mètodo del evento para cuando se envía el formulario de cambiar contraseña.
PASSWORD_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PASSWORD_FORM);
    // Petición para actualizar la constraseña.
    const DATA = await fetchData(CLIENTE_API, 'changePassword', FORM);
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

// Método del evento para cuando se envía el formulario de editar perfil.
PROFILE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PROFILE_FORM);
    // Petición para actualizar los datos personales del usuario.
    const DATA = await fetchData(CLIENTE_API, 'editProfile', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Función para habilitar el botón "Guardar"
function habilitarBotonGuardar() {
    botonGuardar.disabled = false;
}

// Evento del boton editar para habilitar los campos y el boton Submit
botonEditar.addEventListener('click', () => {
    // Activar los campos para realizar cambios en el perfil
    NOMBRE_CLIENTE_PERFIL.readOnly = false;
    APELLIDO_CLIENTE_PERFIL.readOnly = false;
    CORREO_CLIENTE_PERFIL.readOnly = false;
    DUI_CLIENTE_PERFIL.readOnly = false;
    TELEFONO_CLIENTE_PERFIL.readOnly = false;

    // Llama a la función para habilitar el botón "Guardar"
    habilitarBotonGuardar();
});

// Evento del boton submit para confirmar la edicion y enviar el formulario
botonGuardar.addEventListener('click', () => {
    // Ejecute la función submit del formulario
    //PROFILE_FORM.submit();

    //Encuentra el botón de envío en el formulario y desencadena un evento de clic en él (En caso de agregar otro evento "Submit")
    PROFILE_FORM.querySelector('[type="submit"]').click();
});