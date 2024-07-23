<?php
// Se incluye la clase para generar archivos PDF.
require_once('../../libraries/fpdf185/fpdf.php');

/*
*   Clase para definir las plantillas de los reportes del sitio privado.
*   Para más información http://www.fpdf.org/
*/
class Report extends FPDF
{
    // Constante para definir la ruta de las vistas del sitio privado.
    const CLIENT_URL = 'http://localhost/P-Z/views/admin/';
    // Propiedad para guardar el título del reporte.
    private $title = null;

    /*
    *   Método para iniciar el reporte con el encabezado del documento.
    *   Parámetros: $title (título del reporte).
    *   Retorno: ninguno.
    */
    public function startReport($title)
    {
        // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en los reportes.
        session_start();
        // Se verifica si un administrador ha iniciado sesión para generar el documento, de lo contrario se direcciona a la página web principal.
        if (isset($_SESSION['idAdministrador'])) {
            // Se asigna el título del documento a la propiedad de la clase.
            $this->title = $title;
            // Se establece el título del documento (true = utf-8).
            $this->setTitle('Pull&Zara - Reporte', true);
            // Se establecen los márgenes del documento (izquierdo, superior y derecho).
            $this->setMargins(15, 15, 15);
            // Se añade una nueva página al documento con orientación vertical y formato carta, llamando implícitamente al método header()
            $this->addPage('p', 'letter');
            // Se define un alias para el número total de páginas que se muestra en el pie del documento.
            $this->aliasNbPages();
        } else {
            header('location:' . self::CLIENT_URL);
        }
    }

    /*
    *   Método para codificar una cadena de alfabeto español a UTF-8.
    *   Parámetros: $string (cadena).
    *   Retorno: cadena convertida.
    */
    public function encodeString($string)
    {
        return mb_convert_encoding($string, 'ISO-8859-1', 'utf-8');
    }

    /*
    *   Se sobrescribe el método de la librería para establecer la plantilla del encabezado de los reportes.
    *   Se llama automáticamente en el método addPage()
    */
    public function header()
    {
        // Establecer color de fondo
        $this->setFillColor(250); // Color beige frío en RGB
        $this->rect(0, 0, $this->w, 40, 'F'); // Fondo del encabezado (aumentar altura a 40 mm)

        // Se establece el logo.
        $this->image('../../images/logo.png', 10, 0, 45); // Ajusta la posición y tamaño del logo si es necesario
        // Se ubica el título.
        $this->setY(20); // Ajustar la altura del título para que quede alineado con el logo
        $this->setFont('Arial', 'B', 15);
        $this->setTextColor(0, 0, 0); // Color del texto (negro para contraste)
        $this->cell(0, 10, $this->encodeString($this->title), 0, 1, 'C');
        // Se ubica la fecha y hora del servidor.
        $this->setFont('Arial', '', 10);
        $this->cell(0, 10, 'Fecha/Hora: ' . date('d-m-Y H:i:s'), 0, 1, 'C');
        // Se agrega un salto de línea para mostrar el contenido principal del documento.
        $this->ln(10);
    }


    /*
    *   Se sobrescribe el método de la librería para establecer la plantilla del pie de los reportes.
    *   Se llama automáticamente en el método output()
    */
    function Footer()
    {
        // Se establece la posición para el número de página (a 15 milímetros del final).
        $this->SetY(-15);
        // Se establece la fuente para el número de página.
        $this->SetFont('Arial', 'I', 8);
        
        // Altura y anchura de la página en puntos (medida estándar en FPDF)
        $pageHeight = $this->GetPageHeight();
        $pageWidth = $this->GetPageWidth();
        
        // Posición Y para las imágenes (ajustada para estar más arriba del final de la página)
        $imageY = $pageHeight - 40 ; 
        
        // Posición X para la imagen de la izquierda
        $imageLeftX = 0; 
        
        // Ancho de la imagen de la derecha
        $imageWidth = 50;
        
        // Posición X para la imagen de la derecha (pegada al borde)
        $imageRightX = 190; 
        
        // Agregar la imagen en el pie de página (izquierda)
        $this->Image('../../images/reportes (1).png', $imageLeftX, $imageY, 45);
        
        // Agregar la imagen en el pie de página (derecha)
        $this->Image('../../images/reportes (1).png', $imageRightX, $imageY, 45);
        
        // Se imprime una celda con el número de página.
        $this->Cell(0, 10, $this->encodeString('Página ' ). $this->PageNo() . '/{nb}', 0, 0, 'C');
    }
}
