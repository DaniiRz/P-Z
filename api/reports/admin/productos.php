<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se incluye la clase con las operaciones de productos.
require_once('../../models/data/productos_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se instancia el handler de productos.
$producto = new ProductoData;

// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Listado de productos');

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataProductos = $producto->productosConCategoriaYDescripcion()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(225);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(50, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(40, 10, 'Categoria', 1, 0, 'C', 1);
    $pdf->cell(95, 10, 'Descripcion', 1, 1, 'C', 1);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Arial', '', 11);
    
    // Se recorren los registros fila por fila.
    foreach ($dataProductos as $rowProducto) {
        // Se imprimen las celdas con los datos de los productos.
        $pdf->cell(50, 10, $pdf->encodeString($rowProducto['nombre_producto']), 1, 0, 'C');
        $pdf->cell(40, 10, $pdf->encodeString($rowProducto['nombre_categoria']), 1, 0, 'C');
        $pdf->MultiCell(95, 10, $pdf->encodeString($rowProducto['desc_producto']), 1, 'J'); // 'J' para justificar el texto
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay productos disponibles'), 1, 1);
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'productos.pdf');
