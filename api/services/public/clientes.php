<?php
// Se incluye la clase del modelo.
require_once('../../models/data/cliente_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $cliente = new ClienteData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'recaptcha' => 0, 'message' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'getUser':
                if (isset($_SESSION['correoCliente'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correoCliente'];
                    $result['name'] = $cliente->readOneCorreo($_SESSION['correoCliente']);
                } else {
                    $result['error'] = 'Correo de usuario indefinido';
                    $result['name'] = 'No se pudo obtener el usuario';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión cerrada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            case 'readProfile':
                if ($result['dataset'] = $cliente->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
            case 'editProfile':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setNombre($_POST['nombreClientePerfil']) or
                    !$cliente->setApellido($_POST['apellidoClientePerfil']) or
                    !$cliente->setCorreo($_POST['correoClientePerfil']) or
                    !$cliente->setDui($_POST['duiClientePerfil']) or
                    !$cliente->setTelefono($_POST['telefonoClientePerfil'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el perfil';
                }
                break;
            case 'changePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$cliente->checkPassword($_POST['claveActual'])) {
                    $result['error'] = 'Contraseña actual incorrecta';
                } elseif ($_POST['claveNueva'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$cliente->setContraseña($_POST['claveNueva'])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->changePassword($correoCliente)) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;

            default:
                $result['error'] = 'Ya existe una sesion iniciada.';
        }
    } else {
        // Se compara la acción a realizar cuando el cliente no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'signUp':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setNombre($_POST['nombreCliente']) or
                    !$cliente->setApellido($_POST['apellidoCliente']) or
                    !$cliente->setCorreo($_POST['correoCliente']) or
                    !$cliente->setDui($_POST['duiCliente']) or
                    !$cliente->setTelefono($_POST['telefonoCliente']) or
                    !$cliente->setGenero($_POST['generoCliente']) or
                    !$cliente->setContraseña($_POST['contraseñaCliente']) or
                    !$cliente->setconfirmarContraseña($_POST['confirmarcontraseñaCliente'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST['contraseñaCliente'] != $_POST['confirmarcontraseñaCliente']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta registrada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar la cuenta';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if (!$cliente->checkUser($_POST['correoClienteLogin'], $_POST['contraseñaClienteLogin'])) {
                    $result['error'] = 'Datos incorrectos';
                } elseif ($cliente->checkStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'La cuenta ha sido desactivada';
                }
                break;
            case 'verifUs':
                // Verifica que el campo correoCliente esté definido en $_POST
                if (!isset($_POST['correoCliente']) || empty(trim($_POST['correoCliente']))) {
                    $result['error'] = 'El correo electrónico no está definido o está vacío.';
                } elseif (!$cliente->setCorreo($_POST['correoCliente'], false)) {
                    // Verifica el error en setCorreo()
                    $result['error'] = $cliente->getDataError();
                } elseif ($dataset = $cliente->verifUs()) {
                    // Asigna el resultado de verifUs() a dataset
                    $result['dataset'] = $dataset;
                    $result['status'] = 1;
                    $_SESSION['correoCliente'] = $dataset['id_cliente'];
                } else {
                    $result['error'] = 'Correo inexistente';
                }
                break;
            case 'changePasswordMovil':
                // Validar que las contraseñas coincidan
                if ($_POST['claveNueva'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                    break;
                }

                // Verificar si el correo electrónico está presente en la solicitud
                if (!isset($_POST['correoCliente']) || empty($_POST['correoCliente'])) {
                    $result['error'] = 'Correo electrónico no proporcionado';
                    break;
                }

                // Establecer la nueva contraseña
                if (!$cliente->setContraseña($_POST['claveNueva'])) {
                    $result['error'] = $cliente->getDataError();
                    break;
                }

                // Intentar cambiar la contraseña, usando el correo electrónico para identificar al cliente
                $changeResult = $cliente->changePassword($_POST['correoCliente']);
                if ($changeResult) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;
            case 'verifPin':
                header('Content-Type: application/json');
                // Obtiene el código de recuperación del POST
                $pin = $_POST['codigo_recuperacion'] ?? '';
                $result = [];
                // Verifica si el código de recuperación está presente
                if ($pin) {
                    // Asegúrate de que el método para verificar el código esté implementado en el objeto $cliente
                    // Este método debería validar el código de recuperación en la base de datos
                    if ($cliente->verificarCodigoRecuperacion($pin)) {
                        $result['status'] = 1;
                        $result['message'] = 'Código de recuperación verificado correctamente';
                    } else {
                        $result['error'] = 'Código de recuperación incorrecto';
                    }
                } else {
                    $result['error'] = 'Código de recuperación no proporcionado';
                }
                break;
            default:
                $result['message'] = 'Debes iniciar sesion en una cuenta primero.';
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
