<?php
// Se incluye la clase del modelo.
require_once('../../models/data/valoraciones_data.php');
require_once('../../helpers/validator.php'); //se incluye validator 

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $valoracion = new ValoracionesData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $valoracion->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createValoracion':
                $_POST = Validator::validateForm($_POST);
                // Verifica que todas las claves necesarias existen en $_POST
                if (
                    isset($_POST['idProducto']) &&
                    isset($_POST['valoracion']) &&
                    isset($_POST['comentario']) &&
                    isset($_POST['idCliente']) &&
                    isset($_POST['fechaValoracion']) &&
                    isset($_POST['estadoValoracion'])
                ) {
                    if (
                        !$valoracion->setIdProducto($_POST['idProducto']) or
                        !$valoracion->setComentario($_POST['comentario']) or
                        !$valoracion->setIdCliente($_POST['idCliente']) or
                        !$valoracion->setFechaValoracion($_POST['fechaValoracion']) or
                        !$valoracion->setEstadoValoracion($_POST['estadoValoracion'])
                    ) {
                        $result['error'] = $valoracion->getDataError();
                    } elseif ($valoracion->createValoracion()) {
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
            case 'readAll':
                if ($result['dataset'] = $valoracion->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen valoraciones registradas';
                }
                break;
            case 'readOne':
                if (!$valoracion->setId($_POST['idValoracion'])) {
                    $result['error'] = $valoracion->getDataError();
                } elseif ($result['dataset'] = $valoracion->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Valoración inexistente';
                }
                break;
            case 'updateValoracion':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$valoracion->setId($_POST['idValoracion']) or
                    !$valoracion->setComentario($_POST['comentario']) or
                    !$valoracion->setEstadoValoracion($_POST['estadoValoracion'])
                ) {
                    $result['error'] = $valoracion->getDataError();
                } elseif ($valoracion->updateValoracion()) {
                    $result['status'] = 1;
                    $result['message'] = 'Valoración actualizada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar la valoración';
                }
                break;
            case 'updateEstadoValoracion':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$valoracion->setId($_POST['idValoracion']) or
                    !$valoracion->setEstadoValoracion($_POST['estadoValoracion'])
                ) {
                    $result['error'] = $valoracion->getDataError();
                } elseif ($valoracion->updateEstadoValoracion()) {
                    $result['status'] = 1;
                    $result['message'] = 'Valoración actualizada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar la valoración';
                }
                break;
            case 'deleteValoracion':
                if (!$valoracion->setId($_POST['idValoracion'])) {
                    $result['error'] = $valoracion->getDataError();
                } elseif ($valoracion->deleteValoracion()) {
                    $result['status'] = 1;
                    $result['message'] = 'Valoración eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la valoración';
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

