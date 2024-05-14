<?php

// Se incluye la clase
require_once ('../../helpers/database.php');

class ProductoHandler
{

    // Declaracion de atributos
    protected $id = null;
    protected $idsubcategoria = null;
    protected $nombreproducto = null;
    protected $descproducto = null;
    protected $precioproducto = null;
    protected $fecharegistro = null;

    // Metodos de las operaciones SCRUD
    public function createRows()
    {
        $sql = 'CALL InsertarDatos(nombre_categoria, nombre_sub_categoria, nombre_producto, Desc_producto);
        VALUES (?, ?, ?, ?)';
        $params = array($this->idsubcategoria, $this->nombreproducto, $this->descproducto);
        return Database::executeRow($sql, $params);
    }

    public function updateRows()
    {
        $sql = 'UPDATE P.nombre_producto, P.Desc_producto, D.existencias, C.nombre_color, T.nombre_talla
                FROM tb_detalle_producto AS D 
                JOIN tb_producto AS P ON D.id_producto = P.id_producto
                JOIN tb_color AS C ON D.id_color = C.id_color
                JOIN tb_talla AS T ON D.id_talla = T.id_talla
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRows()
    {
        $sql = 'DELETE FROM tb_detalle_producto D
                INNER JOIN tb_productos P
                ON D.id_producto = P.id_producto
                WHERE P.id_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT P.id_producto, P.nombre_producto, D.existencias, SC.nombre_sub_categoria, C.nombre_categoria
                FROM tb_productos AS P 
                JOIN tb_detalle_producto AS D ON P.id_producto = D.id_producto
                JOIN tb_sub_categoria AS SC ON P.id_sub_categoria = SC.id_sub_categoria
                JOIN tb_categoria AS C ON SC.id_categoria = C.id_categoria';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT P.nombre_producto, P.Desc_producto, D.existencias, C.nombre_color, T.nombre_talla
                FROM tb_detalle_producto AS D 
                JOIN tb_producto AS P ON D.id_producto = P.id_producto
                JOIN tb_color AS C ON D.id_color = C.id_color
                JOIN tb_talla AS T ON D.id_talla = T.id_talla
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}