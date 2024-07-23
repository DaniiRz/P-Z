<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se verifica si se recibió un valor para el estado
if (isset($_GET['estadoPedido'])) {
    $estado = $_GET['estadoPedido'];

    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/pedido_data.php');
    
    // Se instancian las entidades correspondientes.
    $pedido = new PedidoData;// Asignamos el estado al objeto PedidoData

    // Obtener los pedidos según el estado seleccionado
    $dataPedidos = $pedido->obtenerPedidosPorEstado();

    // Instancia de la clase para generar el reporte PDF
    $pdf = new Report;

    // Inicia el reporte con el encabezado adecuado
    $pdf->startReport('Pedidos por estado ' . $estado);

    // Verifica si hay datos para mostrar en el reporte
    if ($dataPedidos) {
        // Configura el reporte según los datos obtenidos
        $pdf->setFillColor(225);
        $pdf->setFont('Arial', 'B', 11);
        $pdf->cell(80, 10, 'Nombre Cliente', 1, 0, 'C', 1);
        $pdf->cell(60, 10, 'Correo Cliente', 1, 0, 'C', 1);
        $pdf->cell(80, 10, 'Dirección', 1, 0, 'C', 1);
        $pdf->cell(40, 10, 'Fecha Pedido', 1, 0, 'C', 1);
        $pdf->cell(30, 10, 'Estado', 1, 1, 'C', 1);

        $pdf->setFont('Arial', '', 11);
        foreach ($dataPedidos as $pedido) {
            $estado = ($pedido['estado_pedido'] == 1) ? 'Pendiente' : (($pedido['estado_pedido'] == 2) ? 'Completado' : (($pedido['estado_pedido'] == 3) ? 'Cancelado' : 'Anulado'));
            $pdf->cell(80, 10, $pdf->encodeString($pedido['nombre_cliente']), 1, 0);
            $pdf->cell(60, 10, $pdf->encodeString($pedido['correo_cliente']), 1, 0);
            $pdf->cell(80, 10, $pdf->encodeString($pedido['direccion_pedido']), 1, 0);
            $pdf->cell(40, 10, $pedido['fecha_pedido'], 1, 0);
            $pdf->cell(30, 10, $estado, 1, 1);
        }
    } else {
        $pdf->cell(0, 10, $pdf->encodeString('No hay pedidos para el estado seleccionado'), 1, 1);
    }

    // Finaliza el reporte y envía al navegador
    $pdf->output('I', 'pedidos.pdf');
} else {
    // Manejo de caso donde no se recibió el estado correctamente
    print('Estado no especificado');
}
?>
