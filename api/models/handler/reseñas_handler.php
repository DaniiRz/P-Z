<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../api/helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */

 class resenaHandler{

    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $comentario = null;
    protected $fecha = null;
    protected $detalle = null;
    protected $estado = null;


    /* METODOS SCRUD PARA RESEÑAS (CREAR, ELIMINAR, DESHABILITAR, LEER) */ 


    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_valoracion, comentario_cliente, fecha_valoracion, id_detalle_p, id_estado_valo
                FROM tb_valoracion
                WHERE id_valoracion LIKE ? OR id_valoracion LIKE ?
                ORDER BY id_valoracion';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_valoracion, comentario_cliente, fecha_valoracion, id_detalle_p, id_estado_valo
                FROM tb_valoracion
                WHERE id_valoracion = ?';
        $params = array($_SESSION['id_valoracion']);
        return Database::getRow($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_valoracion(id_valoracion,comentario_cliente, fecha_valoracion, id_detalle_p, id_estado_valo)
                VALUES(?, ?, ?, ?, ?)';
        $params = array($this->id,$this->comentario, $this->fecha, $this->detalle, $this->estado);
        return Database::executeRow($sql, $params);
    }
    
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_valoracion
                WHERE id_valoracion = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    
 }