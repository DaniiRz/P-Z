<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se verifica si existe un valor para el estado, de lo contrario se muestra un mensaje.
if (isset($_GET['idEstado'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/pedido_data.php');
    // Se instancian las entidades correspondientes.
    $pedido = new PedidoData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($pedido->setIdPedido($_GET['idPedido']) && $pedido->setIdPedido($_GET['idPedido'])) {
        // Se verifica si el estado existe, de lo contrario se muestra un mensaje.
        if ($rowEstado = $pedido->readDetallesPedidoAdmin()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Pedidos por estado ' . $rowEstado['estado_pedido']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataPedido = $pedido->readDetallesPedidoAdmin()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(225);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 11);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(126, 10, 'Nombre Producto', 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'Precio (US$)', 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'Cantidad', 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'Estado', 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 11);
                // Se recorren los registros fila por fila.
                foreach ($dataPedido as $rowEstado) {
                    ($rowEstado['estado_pedido']) ? $estado = 'Pendiente' : $estado = 'Completado';
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(126, 10, $pdf->encodeString($rowEstado['nombre_producto']), 1, 0);
                    $pdf->cell(30, 10, $rowEstado['precio_producto'], 1, 0);
                    $pdf->cell(30, 10, $rowEstado['cantidad_producto'], 1, 0);
                    $pdf->cell(30, 10, $estado, 1, 1);
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay pedidos para el estado'), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'pedidos.pdf');
        } else {
            print('Estado inexistente');
        }
    } else {
        print('Estado incorrecto');
    }
} 
