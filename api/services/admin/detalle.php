<?php
// Se incluye la clase del modelo.
require_once('../../models/data/detalles_data.php');
require_once('../../helpers/validator.php'); //se incluye validator 

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $detalle = new DetalleData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRowsD':
                if (!Validator::validateSearch($_POST['searchDetalle'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $detalle->searchRowsD()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRowD':
                $_POST = Validator::validateForm($_POST);
                // Verifica que todas las claves necesarias existen en $_POST
                if (
                    isset($_POST['idProductoD']) &&
                    isset($_POST['existenciasProducto']) &&
                    isset($_POST['tallaProducto']) &&
                    isset($_POST['colorProducto']) &&
                    isset($_FILES['imagenProducto'])
                )
                    if (
                        !$detalle->setIdProducto($_POST['idProductoD']) or
                        !$detalle->setExistencias($_POST['existenciasProducto']) or
                        !$detalle->setIdtalla($_POST['tallaProducto']) or
                        !$detalle->setIdcolor($_POST['colorProducto']) or
                        !$detalle->setImagen($_FILES['imagenProducto'])
                    ) {
                        $result['error'] = $detalle->getDataError();
                    } elseif ($detalle->createRowsD()) {
                        $result['status'] = 1;
                        $result['message'] = 'Detalle creado correctamente';
                        // Se asigna el estado del archivo después de agregar.
                        $result['fileStatus'] = Validator::saveFile($_FILES['imagenProducto'], $detalle::RUTA_IMAGEN);
                    } else {
                        $result['error'] = 'Ocurrió un problema al crear el detalle';
                    }
                else {
                    // Maneja el caso en que alguna clave no esté definida en $_POST
                    $result['error'] = 'Faltan datos necesarios para crear el detalle del producto';
                }
                break;
            case 'readDetails':
                if (!$detalle->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $detalle->getDataError();
                } elseif ($result['dataset'] = $detalle->readDetails()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen detalles registrados';
                }
                break;
            case 'readOneD':
                if (!$detalle->setIdDetalle($_POST['idDetalleProducto'])) {
                    $result['error'] = $detalle->getDataError();
                } elseif ($result['dataset'] = $detalle->readOneD()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Detalle inexistente';
                }
                break;
            case 'updateRowD':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detalle->setIdDetalle($_POST['idDetalleProducto']) or
                    !$detalle->setExistencias($_POST['existenciasProducto']) or
                    !$detalle->setImagen($_FILES['imagenProducto']) or
                    !$detalle->setIdcolor($_POST['colorProducto']) or
                    !$detalle->setIdtalla($_POST['tallaProducto'])
                ) {
                    $result['error'] = $detalle->getDataError();
                } elseif ($detalle->updateRowsD()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalle modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenProducto'], $detalle::RUTA_IMAGEN, $detalle->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el detalle';
                }
                break;
            case 'deleteRowD':
                if (!$detalle->setIdDetalle($_POST['idDetalleProducto'])) {
                    $result['error'] = $detalle->getDataError();
                } elseif ($detalle->deleteRowsD()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalle eliminado correctamente';
                    // Se asigna el estado del archivo después de borrar.
                    $result['fileStatus'] = Validator::deleteFile($detalle::RUTA_IMAGEN, $detalle->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el detalle';
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
