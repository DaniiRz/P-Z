// Constante para completar la ruta de la API.
const ADMINISTRADOR_API = 'services/admin/administrador.php';



/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear administrador';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    ALIAS_ADMINISTRADOR.disabled = false;
    CLAVE_ADMINISTRADOR.disabled = false;
    CONFIRMAR_CLAVE.disabled = false;
}
