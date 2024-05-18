<?php

// Se incluye la clase del modelo.
require_once ('../../models/data/categoria_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {

    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();

    // Se instancia la clase correspondiente.
    $Categoria = new CategoriaData;

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {

        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createRows':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Categoria->setNombreCategoria($_POST['nombreCategoria'])
                ) {
                    $result['error'] = $Categoria->getDataError();
                } 
                
                elseif ($Categoria->createRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoria creado correctamente';
                } 
                
                else {
                    $result['error'] = 'Ocurrió un problema al crear la Categoria';
                }
                break;

            case 'readAll':
                if ($result['dataset'] = $Categoria->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } 
                
                else {
                    $result['error'] = 'No existen Categorias registradas';
                }
                break;

            case 'readOne':
                if (!$Categoria->setIdCategoria($_POST['idCategoria'])) {
                    $result['error'] = $Categoria->getDataError();
                } 
                
                elseif ($result['dataset'] = $Categoria->readOne()) {
                    $result['status'] = 1;
                } 
                
                else {
                    $result['error'] = 'Categoria inexistente';
                }
                break;

            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Categoria->setIdCategoria($_POST['idCategoria'])
                ) {
                    $result['error'] = $Categoria->getDataError();
                } 
                
                elseif ($produCategoriacto->updateRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoria modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                } 
                
                else {
                    $result['error'] = 'Ocurrió un problema al modificar la Categoria';
                }
                break;

            case 'deleteRow':
                if (
                    !$Categoria->setIdCategoria($_POST['idCategoria'])
                ) {
                    $result['error'] = $Categoria->getDataError();
                } 
                
                elseif ($Categoria->deleteRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoria eliminada correctamente';
                } 
                
                else {
                    $result['error'] = 'Ocurrió un problema al eliminar la Categoria';
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
    print (json_encode($result));
} 

else {
    print(json_encode('Recurso no disponible'));
}