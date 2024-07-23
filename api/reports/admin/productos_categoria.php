<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once ('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se verifica si existe un valor para la categoría, de lo contrario se muestra un mensaje.
if (isset($_GET['idCategoria'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once ('../../models/data/categoria_data.php');
    require_once ('../../models/data/productos_data.php');
    // Se instancian las entidades correspondientes.
    $categoria = new CategoriaData;
    $producto = new ProductoData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($categoria->setId($_GET['idCategoria']) && $producto->setCategoria($_GET['idCategoria'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowCategoria = $categoria->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Reporte de categoría: ' . $rowCategoria['nombre_categoria']);

            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataProductos = $producto->productosCategoria()) {
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 11);

                // Se imprimen las celdas con los encabezados, con bordes arriba y abajo y sin color de fondo.
                $pdf->cell(62, 10, $pdf->encodeString('Descripción'), 'TB', 0, 'C');
                $pdf->cell(62, 10, 'Nombre', 'TB', 0, 'C');
                $pdf->cell(62, 10, 'Fecha de registro', 'TB', 1, 'C');

                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 11);

                // Se recorren los registros fila por fila.
                foreach ($dataProductos as $rowProducto) {
                    // Se imprime la descripción con multilínea ajustada
                    $pdf->multiCell(62, 7.5, $pdf->encodeString($rowProducto['desc_producto']), 'B', 'J');

                    // Se guarda la posición actual
                    $xPos = $pdf->getX();
                    $yPos = $pdf->getY();

                    // Se imprime el nombre del producto ajustado
                    $pdf->setXY($xPos + 62, $yPos); // Ajuste de posición
                    $pdf->cell(62, 7.5, $pdf->encodeString($rowProducto['nombre_producto']), 'B', 0, 'C');

                    // Se imprime la fecha de registro ajustada
                    $pdf->setXY($xPos + 124, $yPos); // Ajuste de posición
                    $pdf->cell(62, 7.5, $pdf->encodeString($rowProducto['fecha_registro_produc']), 'B', 1, 'C');

                    // Verificar si se necesita agregar una nueva página antes de continuar con las filas siguientes
                    if ($pdf->getY() > 250) { // 250 es un valor aproximado, ajusta según tus necesidades
                        $pdf->addPage();

                        // Agregar encabezados nuevamente después de añadir una nueva página
                        $pdf->setFont('Arial', 'B', 11);
                        $pdf->cell(62, 10, $pdf->encodeString('Descripción'), 'TB', 0, 'C');
                        $pdf->cell(62, 10, 'Nombre', 'TB', 0, 'C');
                        $pdf->cell(62, 10, 'Fecha de registro', 'TB', 1, 'C');
                    }
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay productos para la categoría'), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'categoria.pdf');
        } else {
            print ('Categoría inexistente');
        }
    } else {
        print ('Categoría incorrecta');
    }
} else {
    print ('Debe seleccionar una categoría');
}
