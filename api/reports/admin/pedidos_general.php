<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/pedido_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Pedidos Pull&Zara');
// Se instancia el modelo de pedido para obtener los datos.
$pedido = new PedidoData;
// Se verifica si existen registros de pedidos realizados por clientes para mostrar, de lo contrario se imprime un mensaje.
if ($dataPedido = $pedido->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(150);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11); 
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(45, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(45, 10, $pdf->encodeString('Correo electrónico'), 1, 0, 'C', 1);
    $pdf->cell(45, 10, $pdf->encodeString('Dirección pedido'), 1, 0, 'C', 1);
    $pdf->cell(45, 10, 'Estado', 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los pedidos realizados.
    $pdf->setFont('Arial', '', 10);

    // Se recorren los registros fila por fila.
    foreach ($dataPedido as $rowPedido) {
        // Se imprimen las celdas con los datos de los pedidos.
        $pdf->cell(45,10, $rowPedido['nombre_cliente'], 1, 0); 
        $pdf->cell(45,10, $rowPedido['correo_cliente'], 1, 0); 
        $pdf->cell(45,10, $pdf->encodeString($rowPedido['direccion_pedido']), 1, 0); 
        $pdf->cell(45,10, $pdf->encodeString($rowPedido['estado_pedido']), 1, 1); 
    }
} else {
    $pdf->cell(0, 10, 'No hay pedidos para mostrar', 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'pedidos.pdf');
