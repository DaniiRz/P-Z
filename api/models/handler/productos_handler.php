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
        $sql = 'INSERT INTO tb_productos(nombre_producto,desc_producto, id_categoria) VALUES (?, ?, ?, ?)';
        $params = array($this->nombreproducto, $this->descproducto, $this->idcategoria);
        return Database::executeRow($sql, $params);
    }

    public function updateRows()
    {
        $sql = 'UPDATE P.nombre_producto, P.Desc_producto
                FROM tb_detalle_productos AS D 
                JOIN tb_productos AS P ON D.id_producto = P.id_producto
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
        $sql = 'SELECT P.nombre_producto, C.nombre_categoria
                FROM tb_productos AS P 
                JOIN tb_detalle_productos AS D ON P.id_producto = D.id_producto
                JOIN tb_categorias AS C ON C.id_categoria = C.id_categoria';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT P.nombre_producto, P.Desc_producto, P.precio_producto,  D.img_producto,
                FROM tb_detalle_productos AS D 
                JOIN tb_productos AS P ON D.id_producto = P.id_producto
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}