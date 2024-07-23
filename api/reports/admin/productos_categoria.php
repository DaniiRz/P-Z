<?php
// Obtener el nombre de la categoría para usarlo en el nombre del archivo
if (isset($_GET['idCategoria'])) {
    require_once ('../../models/data/categoria_data.php');
    $categoria = new CategoriaData;
    if ($categoria->setId($_GET['idCategoria']) && $rowCategoria = $categoria->readOne()) {
        $nombreCategoria = $rowCategoria['nombre_categoria'];
    } else {
        $nombreCategoria = 'desconocida';
    }
} else {
    $nombreCategoria = 'desconocida';
}

// Limpiar el nombre de la categoría para que sea un nombre de archivo válido
$nombreArchivoReporte = preg_replace('/[^a-zA-Z0-9_]/', '_', $nombreCategoria);

// Ruta del directorio para guardar el archivo de número de reporte
$directorioReportes = '../admin/Registro de categorias';

// Crear el directorio si no existe
if (!is_dir($directorioReportes)) {
    mkdir($directorioReportes, 0755, true);
}

// Ruta del archivo que almacena el número de reporte
$reporteNumeroArchivo = $directorioReportes . '/reporte_numero_' . $nombreArchivoReporte . '.txt';

// Leer el contenido del archivo y determinar el último número de reporte
if (file_exists($reporteNumeroArchivo) && filesize($reporteNumeroArchivo) > 0) {
    $lineas = file($reporteNumeroArchivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $ultimaLinea = end($lineas);
    // Obtener el último número de reporte de la última línea
    if (preg_match('/Número de Reporte: (\d+)/', $ultimaLinea, $coincidencias)) {
        $reporteNumero = (int) $coincidencias[1];
    } else {
        $reporteNumero = 0; // Inicializar a 0 si el formato no es el esperado
    }
} else {
    $reporteNumero = 0; // Inicializar a 0 si el archivo no existe o está vacío
}

// Incrementar el número de reporte
$reporteNumero++;

// Obtener la fecha actual en formato dd/mm/aa
$fechaRegistro = date('d/m/y');

// Guardar el nuevo número de reporte y la fecha en el archivo
file_put_contents($reporteNumeroArchivo, 'Número de Reporte: ' . $reporteNumero . ' - Fecha de registro: ' . $fechaRegistro . PHP_EOL, FILE_APPEND);

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

            // Mostrar el número de reporte
            $pdf->setFont('times', 'I', 11);
            $pdf->cell(0, -5, $pdf->encodeString('Número de Reporte: ') . $reporteNumero, 0, 1, 'R');

            // Añadir un espacio después del título para el número de reporte
            $pdf->Ln(10); // Añadir espacio después del título

            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataProductos = $producto->productosCategoria()) {
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 11);

                // Establecer color de fondo y color de texto para los encabezados
                $pdf->setFillColor(174, 186, 199); // Color de fondo (azul claro)
                $pdf->setTextColor(0, 0, 0); // Color del texto (negro)

                // Establecer la fuente para los encabezados
                $pdf->setFont('Arial', 'B', 11);

                // Imprimir celdas con los encabezados y aplicar el color de fondo
                $pdf->cell(62, 10, $pdf->encodeString('DESCRIPCIÓN'), 'TB', 0, 'C', true);
                $pdf->cell(62, 10, 'NOMBRE', 'TB', 0, 'C', true);
                $pdf->cell(62, 10, 'FECHA DE REGISTRO', 'TB', 1, 'C', true);

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
                    $pdf->multiCell(62, 9, $pdf->encodeString($rowProducto['desc_producto']), 'B', 'L');
                    $descHeight = $pdf->getY() - $yPos;

                    // Se regresa a la posición inicial
                    $pdf->setXY($xPos + 62, $yPos);

                    // Se imprime el nombre del producto ajustado
                    $pdf->cell(62, $descHeight, $pdf->encodeString($rowProducto['nombre_producto']), 'B', 0, 'C');

                    // Se imprime la fecha de registro ajustada
                    $pdf->cell(62, $descHeight, $pdf->encodeString($rowProducto['fecha_registro_produc']), 'B', 1, 'C');

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