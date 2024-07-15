<?php
// Se incluye la clase del modelo.
require_once('../../models/data/productos_data.php');
require_once('../../helpers/validator.php'); //se incluye validator 

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $producto = new ProductoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $producto->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                // Verifica que todas las claves necesarias existen en $_POST
                if (
                    isset($_POST['nombreProducto']) &&
                    isset($_POST['categoriaProducto']) &&
                    isset($_POST['descripcionProducto'])
                ) {
                    if (
                        !$producto->setNombreproducto($_POST['nombreProducto']) or
                        !$producto->setDescripcion($_POST['descripcionProducto']) or
                        !$producto->setCategoria($_POST['categoriaProducto'])
                    ) {
                        $result['error'] = $producto->getDataError();
                    } elseif ($producto->createRows()) {
                        $result['status'] = 1;
                        $result['message'] = 'Producto creado correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al crear el producto';
                    }
                } else {
                    // Maneja el caso en que alguna clave no esté definida en $_POST
                    $result['error'] = 'Faltan datos necesarios para crear el producto';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $producto->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen productos registrados';
                }
                break;

                case 'readProductosCategoriaMobile':
                    if (!$producto->setCategoria($_POST['idCategoria'])) {
                        $result['error'] = $producto->getDataError();
                    } elseif ($result['dataset'] = $producto->readProductosCategoriaMobile()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'Producto inexistente';
                    }
                    break;
            case 'readOne':
                if (!$producto->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $producto->getDataError();
                } elseif ($result['dataset'] = $producto->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$producto->setIdProducto($_POST['idProducto']) or
                    !$producto->setNombreproducto($_POST['nombreProducto']) or
                    !$producto->setDescripcion($_POST['descripcionProducto']) or
                    !$producto->setCategoria($_POST['categoriaProductoS'])
                ) {
                    $result['error'] = $producto->getDataError();
                } elseif ($producto->updateRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el producto';
                }
                break;
            case 'deleteRow':
                if (!$producto->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $producto->getDataError();
                } elseif ($producto->deleteRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el producto';
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
