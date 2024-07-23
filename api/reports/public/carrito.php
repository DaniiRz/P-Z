<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/pedido_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Reporte de compra Pull&Zara');
// Se instancia el modelo pedido para obtener los datos.
$pedido = new PedidoData;
// Se verifica si existen registros em carrito para mostrar, de lo contrario se imprime un mensaje.
if ($dataPedido = $pedido->readDetallePedido()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(239, 233, 228);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11); 
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(60, 10, 'Nombre Producto', 1, 0, 'C', 1);
    $pdf->cell(60, 10, 'Cantidad', 1, 0, 'C', 1);
    $pdf->cell(60, 10, 'Precio Unitario (US$)', 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los carrito.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataPedido as $rowPedido) {
        // Se imprimen las celdas con los datos del carrito
        $pdf->cell(60,10, $pdf->encodeString($rowPedido['nombre_producto']), 1, 0); 
        $pdf->cell(60,10, $rowPedido['cantidad_producto'], 1, 0); 
        $pdf->cell(60,10, $rowPedido['precio_producto'], 1, 1); 
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay carrito para mostrar'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'carrito.pdf');
