<?php

// Se incluye la clase del modelo.
require_once ('../../models/data/talla_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {

    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();

    // Se instancia la clase correspondiente.
    $Talla = new TallaData;

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {

        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createRows':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Talla->setNumeroTalla($_POST['numeroTalla'])
                ) {
                    $result['error'] = $Talla->getDataError();
                } 
                
                elseif ($Talla->createRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Talla creado correctamente';
                } 
                
                else {
                    $result['error'] = 'Ocurrió un problema al crear la Talla';
                }
                break;

            case 'readAll':
                if ($result['dataset'] = $Talla->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } 
                
                else {
                    $result['error'] = 'No existen Tallas registradas';
                }
                break;

            case 'readOne':
                if (!$Talla->setNumeroTalla($_POST['numeroTalla'])) {
                    $result['error'] = $Talla->getDataError();
                } 
                
                elseif ($result['dataset'] = $Talla->readOne()) {
                    $result['status'] = 1;
                } 
                
                else {
                    $result['error'] = 'Talla inexistente';
                }
                break;

            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$Talla->setIdTalla($_POST['idTalla'])
                ) {
                    $result['error'] = $Talla->getDataError();
                } 
                
                elseif ($Talla->updateRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Talla modificada correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                } 
                
                else {
                    $result['error'] = 'Ocurrió un problema al modificar la Talla';
                }
                break;

            case 'deleteRow':
                if (
                    !$Talla->setIdTalla($_POST['idTalla'])
                ) {
                    $result['error'] = $Talla->getDataError();
                } 
                
                elseif ($Talla->deleteRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Talla eliminada correctamente';
                } 
                
                else {
                    $result['error'] = 'Ocurrió un problema al eliminar la Talla';
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