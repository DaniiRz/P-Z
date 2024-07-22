<?php
// Se incluye la clase del modelo.
require_once('../../models/data/pedido_data.php');
require_once('../../helpers/validator.php');
// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $pedido = new PedidoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'error' => null, 'exception' => null, 'dataset' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            // Acción para obtener los productos agregados en el carrito de compras.
            case 'readDetallePedido':
                if (!$pedido->getOrder()) {
                    $result['error'] = 'No ha agregado productos al carrito';
                } elseif ($result['dataset'] = $pedido->readDetallePedido()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existen productos en el carrito';
                }
                break;
            case 'readAllPending':
                if ($result['dataset'] = $pedido->readAllPending()) {
                        $result['status'] = 1;
                        $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen pedidos registrados';
                }
            break;
            case 'readAll':
                if ($result['dataset'] = $pedido->readAll()) {
                        $result['status'] = 1;
                        $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen pedidos registrados';
                }
            break;
            case 'readOne':
                if (!$pedido->setIdPedido($_POST['idPedido'])) {
                        $result['error'] = $pedido->getDataError();
                } elseif ($result['dataset'] = $pedido->readDetallesPedidoAdmin()) {
                        $result['status'] = 1;
                } else {
                        $result['error'] = 'Pedido inexistente';
                }
            break;
            // Acción para actualizar la cantidad de un producto en el carrito de compras.
            case 'updateDetail':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$pedido->setIdDetalle($_POST['idDetalle']) or
                    !$pedido->setCantidad($_POST['cantidadProducto'])
                ) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->updateDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cantidad modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la cantidad';
                }
                break;
                
             // Acción para actualizar el estado pedido de un pedido
            case 'updateEstado':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$pedido->setEstadoPedido($_POST['estadoPedido']) or
                    !$pedido->setIdPedido($_POST['idPedido'])
                ) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->updateEstado()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cantidad modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la cantidad';
                }
                break;

            // Acción para ver los productos de un pedido
            case 'readDetalleDelPedido':
                if (!$pedido->setIdPedido($_POST['idPedido'])) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->readDetallesPedidoAdmin()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al obtener los productos del carrito.';
                }
                break;

            // Acción para remover un producto del carrito de compras.
            case 'deletePedido':
                if (!$pedido->setIdDetalle($_POST['idDetalle'])) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->deleteDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el producto';
                }
                break;
            // Acción para finalizar el carrito de compras.
            case 'finishOrder':
                if ($pedido->finishOrder()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pedido finalizado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al finalizar el pedido';
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
