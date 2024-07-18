<?php
// Se incluye la clase del modelo.
require_once('../../models/data/detalle_pedido_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $detallePedido = new DetallePedidoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'error' => null, 'exception' => null, 'dataset' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            // Acción para buscar filas en la tabla de detalle pedido.
            case 'searchRows':
                if ($result['dataset'] = $detallePedido->searchRows()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se encontraron coincidencias';
                }
                break;
            // Acción para crear un nuevo detalle de pedido.
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detallePedido->setCantidadProducto($_POST['cantidadProducto']) ||
                    !$detallePedido->setPrecioProducto($_POST['precioProducto']) ||
                    !$detallePedido->setIdPedido($_POST['idPedido']) ||
                    !$detallePedido->setIdDetalleProducto($_POST['idDetalleProducto'])
                ) {
                    $result['error'] = $detallePedido->getDataError();
                } elseif ($detallePedido->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalle de pedido creado correctamente';
                } else {
                    $result['error'] = 'No se pudo crear el detalle del pedido';
                }
                break;
            // Acción para actualizar un detalle de pedido.
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detallePedido->setIdDetalle($_POST['idDetalle']) ||
                    !$detallePedido->setCantidadProducto($_POST['cantidadProducto']) ||
                    !$detallePedido->setPrecioProducto($_POST['precioProducto']) ||
                    !$detallePedido->setIdPedido($_POST['idPedido']) ||
                    !$detallePedido->setIdDetalleProducto($_POST['idDetalleProducto'])
                ) {
                    $result['error'] = $detallePedido->getDataError();
                } elseif ($detallePedido->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalle de pedido actualizado correctamente';
                } else {
                    $result['error'] = 'No se pudo actualizar el detalle del pedido';
                }
                break;
            // Acción para eliminar un detalle de pedido.
            case 'deleteRow':
                if (!$detallePedido->setIdDetalle($_POST['idDetalle'])) {
                    $result['error'] = $detallePedido->getDataError();
                } elseif ($detallePedido->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalle de pedido eliminado correctamente';
                } else {
                    $result['error'] = 'No se pudo eliminar el detalle del pedido';
                }
                break;
            // Acción para leer un detalle de pedido específico.
            case 'readOne':
                if ($result['dataset'] = $detallePedido->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se pudo obtener el detalle del pedido';
                }
                break;
            // Acción para leer todos los detalles de pedidos.
            case 'readAll':
                if ($result['dataset'] = $detallePedido->readAll()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se encontraron detalles de pedidos';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
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
?>