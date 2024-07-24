<?php
// Se incluye la clase para trabajar con la base de datos.
require_once ('../../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla clientes.
 */
class ClienteHandler
{

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
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, dui_client, telf_cliente, correo_cliente
                FROM tb_clientes
                WHERE apellido_cliente LIKE ? OR nombre_cliente LIKE ?
                ORDER BY apellido_cliente';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    // Método para leer el perfil del cliente actual
    public function readProfile()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, dui_client, telf_cliente, correo_cliente, genero_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        return Database::getRow($sql, $params);
    }

    // Metodo para leer el perfil del cliente movil
    public function readOneCorreo($correo)
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, dui_client, telf_cliente, correo_cliente, genero_cliente
                FROM tb_clientes
                WHERE correo_cliente = ?';
        $params = array($correo);
        return Database::getRow($sql, $params);
    }

    // Método para actualizar el perfil del cliente actual
    public function editProfile()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, dui_client = ?, telf_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->dui, $this->telefono, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    // Método para crear un nuevo registro de cliente
    public function createRow()
    {
        $sql = 'INSERT INTO tb_clientes(nombre_cliente, apellido_cliente, dui_client, telf_cliente, correo_cliente, clave_cliente, genero_cliente)
                VALUES(?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->telefono, $this->correo, $this->clave, $this->genero);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener todos los registros de clientes
    public function readAll()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, dui_client, telf_cliente, genero_cliente
                FROM tb_clientes
                ORDER BY apellido_cliente';
        return Database::getRows($sql);
    }

    // Método para obtener un registro de cliente específico por su ID
    public function readOne()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, dui_client, telf_cliente, genero_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // Método para actualizar un registro de cliente específico por su ID
    public function updateRow()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, dui_client = ?, telf_cliente = ?, genero_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->dui, $this->telefono, $this->genero, $this->id, );
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

    // Metodo para visualizar la cantidad de genero por clientes
    public function porcentajeGeneroUsuarios()
    {
        $sql = 'SELECT genero_cliente, ROUND((COUNT(id_cliente) * 100.0 / (SELECT COUNT(id_cliente) FROM tb_clientes)), 2) porcentaje
                FROM tb_clientes
                GROUP BY genero_cliente ORDER BY porcentaje DESC';
        return Database::getRows($sql);
    }

    
    /*
    *   Métodos para generar reportes.
    */
public function pedidosCliente()
{
    $sql = 'SELECT p.id_pedido, p.fecha_pedido, p.estado_pedido, p.direccion_pedido, c.nombre_cliente, c.apellido_cliente, c.telf_cliente, c.correo_cliente
            FROM tb_pedidos p
            JOIN tb_clientes c ON p.id_cliente = c.id_cliente
            WHERE c.id_cliente = ?
            AND p.estado_pedido IN ("Completado", "Cancelado", "Anulado")
            ORDER BY p.fecha_pedido';
    $params = array($this->id);
    return Database::getRows($sql, $params);
}

// Esta función nos da las reseñas del cliente con toda la información relevante en función del ID del cliente que pasemos como parámetro.
public function obtenerReseñasCliente()
{
    $sql = 'SELECT 
                c.nombre_cliente,
                c.apellido_cliente,
                p.nombre_producto,
                v.comentario_cliente,
                v.fecha_valoracion,
                v.estado_valoracion
            FROM 
                tb_valoracion v
            JOIN 
                tb_clientes c ON v.id_cliente = c.id_cliente
            JOIN 
                tb_productos p ON v.id_producto = p.id_producto
            WHERE 
                c.id_cliente = ?';
    $params = array($this->id); //$this->id contiene el ID del cliente
    return Database::getRows($sql, $params);
}
}