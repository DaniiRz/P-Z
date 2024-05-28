<?php

// Se incluye la clase
require_once ('../../helpers/database.php');

class ProductoHandler
{

    // Declaracion de atributos
    protected $id = null;
    protected $nombreproducto = null;
    protected $descproducto = null;
    protected $cantproducto = null;
    protected $precioproducto = null;
    protected $idsubcategoria = null;
    protected $idcategoria = null;
    protected $existencias = null;
    protected $imgproducto = null;
    protected $idcolor = null;
    protected $idtalla = null;
    protected $registro = null; 

    // Metodos de las operaciones SCRUD
    public function createRows()
    {
        $sql = 'CALL insertar_producto
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombreproducto, $this->descproducto, $this->cantproducto, $this->precioproducto, $this->idsubcategoria, $this->idcategoria, 
                        $this->existencias, $this->imgproducto, $this->idcolor, $this->idtalla);
        return Database::executeRow($sql, $params);
    }

    public function updateRows()
    {
        $sql = 'UPDATE P.nombre_producto, P.Desc_producto, D.existencias, C.nombre_color, T.nombre_talla
                FROM tb_detalle_productos AS D 
                JOIN tb_productos AS P ON D.id_producto = P.id_producto
                JOIN tb_color AS C ON D.id_color = C.id_color
                JOIN tb_talla AS T ON D.id_talla = T.id_talla
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRows()
    {
        $sql = 'DELETE D, P
                FROM tb_detalle_productos AS D
                INNER JOIN tb_productos AS P ON D.id_producto = P.id_producto
                WHERE P.id_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT D.img_producto, P.nombre_producto, P.precio_producto, SC.nombre_sub_categoria
                FROM tb_productos AS P 
                JOIN tb_detalle_productos AS D ON P.id_producto = D.id_producto
                JOIN tb_sub_categorias AS SC ON P.id_sub_categoria = SC.id_sub_categoria
                JOIN tb_categorias AS C ON SC.id_categoria = C.id_categoria';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT P.nombre_producto, P.Desc_producto, P.cant_producto, P.precio_producto, D.existencias, D.img_producto, D.id_color, D.id_talla,
                FROM tb_detalle_productos AS D 
                JOIN tb_productos AS P ON D.id_producto = P.id_producto
                JOIN tb_color AS C ON D.id_color = C.id_color
                JOIN tb_talla AS T ON D.id_talla = T.id_talla
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}