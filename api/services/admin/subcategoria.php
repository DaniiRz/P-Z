<?php

// Se incluye la clase del modelo.
require_once('../../models/data/subcategoria_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {

    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();

    // Se instancia la clase correspondiente.
    $Subcategoria = new SubcategoriaData;

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {

        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $Subcategoria->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;

            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Subcategoria->setNombreSubCategoria($_POST['nombreSubcategoria']) or
                    !$Subcategoria->setImagenSubcategoria($_FILES['imagenSubcategoria'])or
                    !$Subcategoria->setIdCategoria($_POST['idCategoria']) 
                ) {
                    $result['error'] = $Subcategoria->getDataError();
                } elseif ($Subcategoria->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Subcategoria creada correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenSubcategoria'], $Subcategoria::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la Subcategoria';
                }
                break;
            case 'readAll':
                if (!isset($_POST['idCategoria']) || !$Subcategoria->setIdCategoria($_POST['idCategoria'])) {
                    $result['error'] = 'Categoría no válida';
                } elseif ($result['dataset'] = $Subcategoria->readAll()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Subcategorias inexistentes';
                }
                break;
            case 'readOne':
                if (!$Subcategoria->setIdSubCategoria($_POST['id_sub_categoria'])) {
                    $result['error'] = $Subcategoria->getDataError();
                } elseif ($result['dataset'] = $Subcategoria->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Subcategoria inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Subcategoria->setIdSubCategoria($_POST['id_sub_categoria']) or
                    !$Subcategoria->setFilename() or
                    !$Subcategoria->setNombreSubCategoria($_POST['nombreSubcategoria']) or
                    !$Subcategoria->setImagenSubcategoria($_FILES['imagenSubcategoria'], $Subcategoria->getFilename())
                ) {
                    $result['error'] = $Subcategoria->getDataError();
                } elseif ($Subcategoria->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Subcategoria modificada correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenSubcategoria'], $Subcategoria::RUTA_IMAGEN, $Subcategoria->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la Subcategoria';
                }
                break;

            case 'deleteRow':
                if (
                    !$Subcategoria->setIdSubCategoria($_POST['id_sub_categoria'])
                ) {
                    $result['error'] = $Subcategoria->getDataError();
                } elseif ($Subcategoria->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Subcategoria eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la Subcategoria';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    }

    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();

    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');

    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
