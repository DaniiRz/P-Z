<?php
// Se incluye la clase del modelo.
require_once('../../models/data/detalles_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se instancia la clase correspondiente.
    $detalle = new DetalleData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se compara la acción a realizar según la petición del controlador.
    switch ($_GET['action']) {
        case 'readOne':
            if (!$detalle->setIdProducto($_POST['idProducto'])) {
                $result['error'] = $detalle->getDataError();
            } elseif ($result['dataset'] = $detalle->readOne()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Datos inexistentes';
            }
            break;
        case 'readDetailsP':
            if (!$detalle->setIdProducto($_POST['idProducto'])) {
                $result['error'] = $detalle->getDataError();
            } elseif ($result['dataset'] = $detalle->readDetailsP()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Detalles inexistentes';
            }
            break;
        case 'selectColor':
            if (!$detalle->setnombreColor($_POST['colorProducto'])) {
                $result['error'] = $detalle->getDataError();
            } elseif ($result['dataset'] = $detalle->selectColor()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Colores del detalle inexistentes';
            }
            break;
        case 'selectTalla':
            if (!$detalle->setnumeroTalla($_POST['tallaProducto'])) {
                $result['error'] = $detalle->getDataError();
            } elseif ($result['dataset'] = $detalle->selectTalla()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Tallas del detalle inexistentes';
            }
            break;
        case 'readColor':
            if (!$detalle->setIdProducto($_POST['idProducto'])) {
                $result['error'] = $detalle->getDataError();
            } elseif ($result['dataset'] = $detalle->obtenerColoresProducto()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Colores del detalle inexistentes';
            }
            break;
        case 'readTalla':
            if (!$detalle->setIdProducto($_POST['idProducto'])) {
                $result['error'] = $detalle->getDataError();
            } elseif ($result['dataset'] = $detalle->obtenerTallasProducto()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Tallas del detalle inexistentes';
            }
            break;
        default:
            $result['error'] = 'Acción no disponible';
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
