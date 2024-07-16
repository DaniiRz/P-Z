<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla clientes.
 */
class ClienteHandler {
    
    // Declaración de atributos para el manejo de datos.
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $dui = null;
    protected $telefono = null;
    protected $correo = null;
    protected $clave = null;
    protected $estado = null;
    protected $direccion = null;
    protected $genero = null;

    /*
     *  Métodos para gestionar la cuenta del cliente.
     */

    // Método para verificar si la contraseña es correcta
    public function checkPassword($clave)
    {
        $sql = 'SELECT clave_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        $data = Database::getRow($sql, $params);
        
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($clave, $data['clave_cliente'])) {
            return true;
        } else {
            return false;
        }
    }

    // Método para cambiar la contraseña del cliente
    public function changePassword()
    {
        $sql = 'UPDATE tb_clientes
                SET clave_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->clave, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    // Método para verificar las credenciales del cliente al iniciar sesión
    public function checkUser($email, $contraseña)
    {
        $sql = 'SELECT id_cliente, correo_cliente, clave_cliente, estado_cliente
                FROM tb_clientes
                WHERE correo_cliente = ?';
        $params = array($email);
        $data = Database::getRow($sql, $params);
        
        // Verifica si la contraseña coincide con el hash almacenado y establece los datos del cliente si es válido
        if (password_verify($contraseña, $data['clave_cliente'])) {
            $this->id = $data['id_cliente'];
            $this->correo = $data['correo_cliente'];
            $this->estado = $data['estado_cliente'];
            return true;
        } else {
            return false;
        }
    }

    // Método para verificar y establecer el estado activo del cliente
    public function checkStatus()
    {
        if ($this->estado) {
            $_SESSION['idCliente'] = $this->id;
            $_SESSION['correoCliente'] = $this->correo;
            return true;
        } else {
            return false;
        }
    }

    // Método para cambiar el estado activo/inactivo del cliente
    public function changeStatus()
    {
        $sql = 'UPDATE tb_clientes
                SET estado_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    // Método para buscar registros de clientes con un valor de búsqueda específico
    public function searchRows() {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, dui_client, telf_cliente, correo_cliente, direccion_cliente
                FROM tb_clientes
                WHERE apellido_cliente LIKE ? OR nombre_cliente LIKE ?
                ORDER BY apellido_cliente';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    // Método para leer el perfil del cliente actual
    public function readProfile()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, dui_client, telf_cliente, correo_cliente, direccion_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        return Database::getRow($sql, $params);
    }

    // Método para actualizar el perfil del cliente actual
    public function editProfile()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, dui_client = ?, telf_cliente = ?, direccion_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->correo,$this->dui, $this->telefono,$this->direccion, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    // Método para crear un nuevo registro de cliente
    public function createRow()
    {
        $sql = 'INSERT INTO tb_clientes(nombre_cliente, apellido_cliente, dui_client, telf_cliente, correo_cliente, clave_cliente, direccion_cliente, genero_cliente)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->telefono, $this->correo, $this->clave, $this->direccion, $this->genero);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener todos los registros de clientes
    public function readAll()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, dui_client, telf_cliente, direccion_cliente, genero_cliente
                FROM tb_clientes
                ORDER BY apellido_cliente';
        return Database::getRows($sql);
    }

    // Método para obtener un registro de cliente específico por su ID
    public function readOne()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, dui_client, telf_cliente, direccion_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // Método para actualizar un registro de cliente específico por su ID
    public function updateRow()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, dui_client = ?, telf_cliente = ?, direccion_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->dui, $this->telefono, $this->id, $this->direccion);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un registro de cliente específico por su ID
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}