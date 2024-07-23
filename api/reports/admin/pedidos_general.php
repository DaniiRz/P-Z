<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se verifica si se recibió un valor para el estado
if (isset($_GET['estadoPedido'])) {
    $estado = $_GET['estadoPedido'];

    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/pedido_data.php');

    // Se instancian las entidades correspondientes.
    $pedido = new PedidoData;

    // Aquí puedes realizar la lógica adicional según tu aplicación
    // Por ejemplo, validar el estado seleccionado y obtener los datos correspondientes.

    // Modifica según tu lógica para obtener los pedidos según el estado seleccionado
    $dataPedidos = $pedido->obtenerPedidosPorEstado();

    // Inicia el reporte con el encabezado adecuado
    $pdf->startReport('Pedidos por estado ' . $estado);

    // Verifica si hay datos para mostrar en el reporte
    if ($dataPedidos) {
        // Configura el reporte según los datos obtenidos
        $pdf->setFillColor(225);
        $pdf->setFont('Arial', 'B', 11);
        $pdf->cell(126, 10, 'Nombre Producto', 1, 0, 'C', 1);
        $pdf->cell(30, 10, 'Precio (US$)', 1, 0, 'C', 1);
        $pdf->cell(30, 10, 'Cantidad', 1, 0, 'C', 1);
        $pdf->cell(30, 10, 'Estado', 1, 1, 'C', 1);

        $pdf->setFont('Arial', '', 11);
        foreach ($dataPedidos as $pedido) {
            $estado = ($pedido['estado_pedido']) ? 'Pendiente' : 'Completado';
            $pdf->cell(126, 10, $pdf->encodeString($pedido['nombre_producto']), 1, 0);
            $pdf->cell(30, 10, $pedido['precio_producto'], 1, 0);
            $pdf->cell(30, 10, $pedido['cantidad_producto'], 1, 0);
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
