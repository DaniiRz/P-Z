<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se verifica si existe un valor para la categoría, de lo contrario se muestra un mensaje.
if (isset($_GET['idCategoria'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/categoria_data.php');
    require_once('../../models/data/productos_data.php');
    // Se instancian las entidades correspondientes.
    $categoria = new CategoriaData;
    $producto = new ProductoData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($categoria->setId($_GET['idCategoria']) && $producto->setCategoria($_GET['idCategoria'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowCategoria = $categoria->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Productos de la categoría: ' . $rowCategoria['nombre_categoria']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataProductos = $producto->productosCategoria()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(225);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 11);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(62, 10, 'Nombre', 1, 0, 'C', 1);
                $pdf->cell(62, 10, 'Fecha de registro', 1, 0, 'C', 1);
                $pdf->cell(62, 10, $pdf->encodeString('Descripción'), 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 11);
                
                // Se recorren los registros fila por fila.
                foreach ($dataProductos as $rowProducto) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(62, 10, $pdf->encodeString($rowProducto['nombre_producto']), 1, 0, 'C');
                    $pdf->cell(62, 10, $pdf->encodeString($rowProducto['fecha_registro_produc']), 1, 0, 'C');
                    $pdf->MultiCell(62, 5, $pdf->encodeString($rowProducto['desc_producto']), 1, 'J'); // 'J' para justificar el texto
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay productos para la categoría'), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'categoria.pdf');
        } else {
            print('Categoría inexistente');
        }
    } else {
        print('Categoría incorrecta');
    }
} else {
    print('Debe seleccionar una categoría');
}