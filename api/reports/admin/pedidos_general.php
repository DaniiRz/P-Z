<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once ('../../helpers/report.php');

// Se incluyen las clases para la transferencia y acceso a datos.
require_once ('../../models/data/pedido_data.php');

// Ruta del directorio y archivo que almacena el número de reporte
$directorioReportes = '../admin/Registro de reportes/Registro de pedidos';
$reporteNumeroArchivo = $directorioReportes . '/reporte_pedidos_general.txt';

// Crear la carpeta si no existe
if (!file_exists($directorioReportes)) {
    mkdir($directorioReportes, 0777, true);
}

// Leer el número de reporte actual desde el archivo
if (file_exists($reporteNumeroArchivo)) {
    // Leer el último número de reporte desde el archivo
    $reporteNumeroData = file($reporteNumeroArchivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($reporteNumeroData) {
        // Extraer el último número de reporte y actualizarlo
        $ultimoRegistro = end($reporteNumeroData);
        preg_match('/Reporte #(\d+)/', $ultimoRegistro, $matches);
        $reporteNumero = isset($matches[1]) ? (int) $matches[1] : 0;
    } else {
        $reporteNumero = 0; // Inicializar a 0 si el archivo no tiene datos
    }
} else {
    $reporteNumero = 0; // Inicializar a 0 si el archivo no existe
}

// Incrementar el número de reporte
$reporteNumero++;

// Obtener la fecha actual en formato dd/mm/yy
$fechaReporte = date('d/m/y');

// Guardar el nuevo número de reporte y la fecha en el archivo
file_put_contents($reporteNumeroArchivo, "Reporte #$reporteNumero - Fecha de registro $fechaReporte\n", FILE_APPEND);

// Instancia de la clase para generar el reporte PDF
$pdf = new Report;

// Se instancian las entidades correspondientes.
$pedido = new PedidoData;

// Se verifica si se recibió un valor para el estado
if (isset($_GET['estadoPedidoGeneral'])) {
    $estado = $_GET['estadoPedidoGeneral'];

    // Inicia el reporte con el encabezado adecuado
    $pdf->startReport('Pedidos por estado ' . $estado);

    // Mostrar el número de reporte
    $pdf->setFont('times', 'I', 11);
    $pdf->cell(0, -5, $pdf->encodeString('Número de Reporte: ') . $reporteNumero, 0, 1, 'R');

    // Añadir un espacio después del título para el número de reporte
    $pdf->Ln(10); // Añadir espacio después del título

    if ($pedido->setEstadoPedido($_GET['estadoPedidoGeneral'])) {
        // Obtener los pedidos según el estado seleccionado
        $dataPedidos = $pedido->obtenerPedidosPorEstado();

        // Verifica si hay datos para mostrar en el reporte
        if ($dataPedidos) {
            // Se establece un color de relleno para los encabezados.
            $pdf->setFillColor(174, 186, 199);
            // Se establece la fuente para los encabezados.
            $pdf->setFont('Arial', 'B', 11);
            $pdf->cell(35, 10, 'CLIENTE', 'TB', 0, 'C', true);
            $pdf->cell(60, 10, 'CORREO ELECTRONICO', 'TB', 0, 'C', true);
            $pdf->cell(45, 10, $pdf->encodeString('DIRECCIÓN'), 'TB', 0, 'C', true);
            $pdf->cell(45, 10, 'FECHA DE REGISTRO', 'TB', 1, 'C', true);

            // Añadir un espacio después de la primea fila
            $pdf->Ln(2);

            // Se establece la fuente para los datos de los productos.
            $pdf->setFont('Arial', '', 11);

            foreach ($dataPedidos as $pedido) {
                // Determina el estado del pedido
                switch ($pedido['estado_pedido']) {
                    case 'Pendiente':
                        $estado = 'Pendiente';
                        break;
                    case 'Completado':
                        $estado = 'Completado';
                        break;
                    case 'Cancelado':
                        $estado = 'Cancelado';
                        break;
                    case 'Anulado':
                        $estado = 'Anulado';
                        break;
                    default:
                        $estado = 'Desconocido';
                        break;
                }

                // Agrega los datos del pedido al reporte PDF
                $pdf->cell(35, 10, $pdf->encodeString($pedido['nombre_cliente']), 'B', 0, 'L');
                $pdf->cell(60, 10, $pdf->encodeString($pedido['correo_cliente']), 'B', 0, 'C');
                $pdf->cell(45, 10, $pdf->encodeString($pedido['direccion_pedido']), 'B', 0, 'C');
                $pdf->cell(45, 10, $pedido['fecha_pedido'], 'B', 1, 'C');
            }
        } else {
            // Si no hay datos, muestra un mensaje en el PDF
            $pdf->cell(0, 10, $pdf->encodeString('No hay pedidos para el estado seleccionado'), 1, 1);
        }

        // Finaliza el reporte y envía al navegador para descarga
        $pdf->output('I', 'pedidos.pdf');
    } else {
        // Manejo de caso donde no se recibió el estado correctamente
        print ('Estado no especificado');
    }
}