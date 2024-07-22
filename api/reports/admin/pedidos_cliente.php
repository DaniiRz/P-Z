<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/cliente_data.php');

// Obtener el ID del cliente desde los parámetros de la URL.
$idCliente = isset($_GET['id']) ? $_GET['id'] : die('ERROR: Cliente ID no definido.');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Pedidos del Cliente');

// Se instancia el modelo ClienteData para obtener los datos.
$cliente = new ClienteData($idCliente);

// Se verifica si existen registros de pedidos para mostrar, de lo contrario se imprime un mensaje.
if ($dataPedidos = $cliente->pedidosCliente()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(150);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(20, 10, 'ID Pedido', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Fecha', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Estado', 1, 0, 'C', 1);
    $pdf->cell(60, 10, 'Dirección', 1, 0, 'C', 1);
    $pdf->cell(50, 10, 'Cliente', 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los pedidos.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataPedidos as $rowPedido) {
        // Se imprimen las celdas con los datos de los pedidos.
        $pdf->cell(20, 10, $rowPedido['id_pedido'], 1, 0);
        $pdf->cell(30, 10, $rowPedido['fecha_pedido'], 1, 0);
        $pdf->cell(30, 10, $rowPedido['estado_pedido'], 1, 0);
        $pdf->cell(60, 10, $rowPedido['direccion_pedido'], 1, 0);
        $pdf->cell(50, 10, $rowPedido['nombre_cliente'] . ' ' . $rowPedido['apellido_cliente'], 1, 1);
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay pedidos para mostrar'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'pedidos_cliente.pdf');
?>
