<?php
require_once('../../helpers/database.php');

/*
*   Clase para manejar el comportamiento de los datos de la tabla VALORACION.
*/
class ValoracionesHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $comentario = null;
    protected $fecha = null;
    protected $idProducto = null;
    protected $idCliente = null;
    protected $estadoValo = null;

    /*
    *   Métodos para realizar las operaciones CRUD (create, read, update, delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_valoracion, comentario_cliente, fecha_valoracion, id_producto, estado_valoracion
                FROM tb_valoracion
                WHERE comentario_cliente LIKE ? OR fecha_valoracion LIKE ?
                ORDER BY id_valoracion';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createValoracion()
    {
        $sql = 'INSERT INTO tb_valoracion(comentario_cliente, fecha_valoracion, id_producto, estado_valoracion)
                VALUES(?, ?, NOW(), ?)';
        $params = array($this->comentario, $this->idProducto, $this->estadoValo);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_valoracion, comentario_cliente, fecha_valoracion, id_producto, estado_valoracion
                FROM tb_valoracion';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_valoracion, comentario_cliente, fecha_valoracion, id_producto, estado_valoracion
                FROM tb_valoracion
                WHERE id_valoracion = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateValoracion()
    {
        $sql = 'UPDATE tb_valoracion
                SET comentario_cliente = ?, fecha_valoracion = ?, id_producto = ?, estado_valoracion = ?
                WHERE id_valoracion = ?';
        $params = array($this->comentario, $this->fecha, $this->idProducto, $this->estadoValo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteValoracion()
    {
        $sql = 'DELETE FROM tb_valoracion
                WHERE id_valoracion = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>