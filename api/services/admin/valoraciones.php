<?php
// Se incluye la clase del modelo y el validador.
require_once('../../models/data/valoraciones_data.php');
require_once('../../helpers/validator.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $valoracion = new ValoracionesData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createValoracion':
                // Validar los datos recibidos
                $_POST = Validator::validateForm($_POST);
                if (
                    isset($_POST['idvaloracionProducto']) &&
                    isset($_POST['valoracion']) &&
                    isset($_POST['comentario']) &&
                    isset($_POST['idCliente']) &&
                    isset($_POST['fechaValoracion'])
                ) {
                    // Asignar valores al objeto $valoracion
                    $valoracion->setId($_POST['idvaloracionProducto']);
                    $valoracion->setValoracion($_POST['valoracion']);
                    $valoracion->setComentario($_POST['comentario']);
                    $valoracion->setIdCliente($_POST['idCliente']);
                    $valoracion->setFechaValoracion($_POST['fechaValoracion']);

                    // Intentar crear la valoración
                    if ($valoracion->createValoracion()) {
                        $result['status'] = 1;
                        $result['message'] = 'Valoración creada correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al crear la valoración';
                    }
                } else {
                    // Maneja el caso en que alguna clave no esté definida en $_POST
                    $result['error'] = 'Faltan datos necesarios para crear la valoración';
                }
                break;
            case 'updateValoracion':
                $_POST = Validator::validateForm($_POST);
                if (
                    isset($_POST['idValoracion']) &&
                    isset($_POST['valoracion']) &&
                    isset($_POST['comentario'])
                ) {
                    $valoracion->setId($_POST['idValoracion']);
                    $valoracion->setValoracion($_POST['valoracion']);
                    $valoracion->setComentario($_POST['comentario']);

                    if ($valoracion->updateValoracion()) {
                        $result['status'] = 1;
                        $result['message'] = 'Valoración actualizada correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al actualizar la valoración';
                    }
                } else {
                    $result['error'] = 'Faltan datos necesarios para actualizar la valoración';
                }
                break;
            case 'deleteValoracion':
                if (isset($_POST['idValoracion'])) {
                    $valoracion->setId($_POST['idValoracion']);
                    if ($valoracion->deleteValoracion()) {
                        $result['status'] = 1;
                        $result['message'] = 'Valoración eliminada correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al eliminar la valoración';
                    }
                } else {
                    $result['error'] = 'Falta el ID de la valoración a eliminar';
                }
                break;
            case 'getValoracionesByvaloracion':
                if (isset($_POST['idvaloracionProducto'])) {
                    $valoracion->setId($_POST['idvaloracionProducto']);
                    if ($result['dataset'] = $valoracion->getValoracionesByvaloracion()) {
                        $result['status'] = 1;
                        $result['message'] = 'Valoraciones encontradas';
                    } else {
                        $result['error'] = 'No hay valoraciones para este valoracion de producto';
                    }
                } else {
                    $result['error'] = 'Falta el ID del valoracion de producto';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
?>
