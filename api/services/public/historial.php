<?php
require_once('../../models/data/historial_data.php');

if (isset($_GET['action'])) {
    session_start();
    $pedido = new PedidoData;
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'error' => null, 'exception' => null, 'dataset' => null);

    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;

        switch ($_GET['action']) {
            case 'readHistorial':
                $dataset = $pedido->readHistorial();
                if ($dataset) {
                    $result['status'] = 1;
                    $result['dataset'] = $dataset;
                } else {
                    $result['error'] = 'No existen pedidos finalizados';
                }
                break;

            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        switch ($_GET['action']) {
            case 'readHistorial':
                $result['error'] = 'Debe iniciar sesión para ver el historial de compras';
                break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }

    $result['exception'] = Database::getException();
    header('Content-type: application/json; charset=utf-8');
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
?>
