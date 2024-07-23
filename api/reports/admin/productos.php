<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se incluye la clase con las operaciones de productos.
require_once('../../models/data/productos_data.php');

// Ruta del directorio y archivo que almacena el número de reporte
$directorioReportes = '../admin/Registro de reportes/Registro de productos';
$reporteNumeroArchivo = $directorioReportes . '/reporte_productos_general.txt';

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
        $reporteNumero = isset($matches[1]) ? (int)$matches[1] : 0;
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

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se instancia el handler de productos.
$producto = new ProductoData;

// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Listado de productos');

// Mostrar el número de reporte
$pdf->setFont('times', 'I', 11);
$pdf->cell(0, -5, $pdf->encodeString('Número de Reporte: ') . $reporteNumero, 0, 1, 'R');

// Añadir un espacio después del título para el número de reporte
$pdf->Ln(10); // Añadir espacio después del título

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataProductos = $producto->productosConCategoriaYDescripcion()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(174, 186, 199);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);
    // Imprimir celdas con los encabezados y aplicar el color de fondo
    $pdf->cell(62, 10, $pdf->encodeString('DESCRIPCIÓN'), 'TB', 0, 'C', true);
    $pdf->cell(62, 10, 'NOMBRE', 'TB', 0, 'C', true);
    $pdf->cell(62, 10, 'CATEGORIA', 'TB', 1, 'C', true);

    // Añadir un espacio después de la primea fila
    $pdf->Ln(2);

    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataProductos as $rowProducto) {
        // Guardar la posición actual
        $xPos = $pdf->getX();
        $yPos = $pdf->getY();

        // Se imprime la descripción con multilínea ajustada y se obtiene la altura
        $pdf->MultiCell(62, 9, $pdf->encodeString($rowProducto['desc_producto']), 'B', 'L');
        $descHeight = $pdf->getY() - $yPos;

        // Se regresa a la posición inicial
        $pdf->setXY($xPos + 62, $yPos);

        // Se imprime el nombre de producto
        $pdf->cell(62, $descHeight, $pdf->encodeString($rowProducto['nombre_producto']), 'B', 0, 'C');

        // Se imprime el nombre de la categoria
        $pdf->cell(62, $descHeight, $pdf->encodeString($rowProducto['nombre_categoria']), 'B', 1, 'C');

        // Verificar si se necesita agregar una nueva página antes de continuar con las filas siguientes
        if ($pdf->getY() > 250) { // 250 es un valor aproximado, ajusta según tus necesidades
            $pdf->addPage();

            // Agregar encabezados nuevamente después de añadir una nueva página
            $pdf->setFont('Arial', 'B', 11);
            $pdf->cell(62, 10, 'NOMBRE', 'TB', 0, 'C', true);
            $pdf->cell(62, 10, 'CATEGORIA', 'TB', 0, 'C', true);
            $pdf->cell(62, 10, $pdf->encodeString('DESCRIPCIÓN'), 'TB', 1, 'C', true);
        }
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay productos disponibles'), 1, 1);
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'productos.pdf');