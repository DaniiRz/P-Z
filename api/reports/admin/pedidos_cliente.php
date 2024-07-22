<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se verifica si existe un valor para el cliente, de lo contrario se muestra un mensaje.
if (isset($_GET['idCliente'])) {
    // Se incluye la clase para la transferencia y acceso a datos.
    require_once('../../models/data/cliente_data.php');
    // Se instancia la entidad correspondiente.
    $cliente = new ClienteData;
    // Se establece el valor del cliente, de lo contrario se muestra un mensaje.
    if ($cliente->setId($_GET['idCliente'])) {
        // Se verifica si el cliente existe, de lo contrario se muestra un mensaje.
        if ($rowCliente = $cliente->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Pedidos del cliente ' . $rowCliente['nombre_cliente'] . ' ' . $rowCliente['apellido_cliente']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataPedidos = $cliente->pedidosCliente()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(225);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 11);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(20, 10, 'ID', 1, 0, 'C', 1);
                $pdf->cell(40, 10, 'Fecha', 1, 0, 'C', 1);
                $pdf->cell(40, 10, 'Estado', 1, 0, 'C', 1);
                $pdf->cell(90, 10, 'Dirección', 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los pedidos.
                $pdf->setFont('Arial', '', 11);
                // Se recorren los registros fila por fila.
                foreach ($dataPedidos as $rowPedido) {
                    // Se imprimen las celdas con los datos de los pedidos.
                    $pdf->cell(20, 10, $rowPedido['id_pedido'], 1, 0);
                    $pdf->cell(40, 10, $rowPedido['fecha_pedido'], 1, 0);
                    $pdf->cell(40, 10, $rowPedido['estado_pedido'], 1, 0);
                    $pdf->cell(90, 10, $pdf->encodeString($rowPedido['direccion_pedido']), 1, 1);
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay pedidos para mostrar'), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'pedidos_cliente.pdf');
        } else {
            print('Cliente inexistente');
        }
    } else {
        print('Cliente incorrecto');
    }
} else {
    print('Debe seleccionar un cliente');
}
?>
