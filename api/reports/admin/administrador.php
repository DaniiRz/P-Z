<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/administrador_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Administradores Pull&Zara');
// Se instancia el modelo Administrador para obtener los datos.
$administrador = new AdministradorData;
// Se verifica si existen registros de administradores para mostrar, de lo contrario se imprime un mensaje.
if ($dataAdministradores = $administrador->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(150);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11); 
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(60, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(60, 10, 'Apellido', 1, 0, 'C', 1);
    $pdf->cell(60, 10, $pdf->encodeString('Correo electrónico'), 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los administradores.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataAdministradores as $rowAdministrador) {
        // Se imprimen las celdas con los datos de los administradores.
        $pdf->cell(60,10, $rowAdministrador['nombre_admin'], 1, 0); 
        $pdf->cell(60,10, $rowAdministrador['apellido_admin'], 1, 0); 
        $pdf->cell(60,10, $rowAdministrador['correo_admin'], 1, 1); 
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay administradores para mostrar'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'administradores.pdf');
