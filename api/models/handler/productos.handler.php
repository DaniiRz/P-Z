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
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto, nombre_categoria, estado_producto
                FROM producto
                INNER JOIN categoria USING(id_categoria)
                WHERE nombre_producto LIKE ? OR descripcion_producto LIKE ?
                ORDER BY nombre_producto';
        $params = array($value, $value);
        //return Database::getRows($sql, $params);
    }

    public function createRows()
    {
        $sql = 'INSERT INTO producto(nombre_producto, descripcion_producto, precio_producto, existencias_producto, imagen_producto, estado_producto, id_categoria, id_administrador)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        //$params = array($this->nombre, $this->descripcion, $this->precio, $this->existencias, $this->imagen, $this->estado, $this->categoria, $_SESSION['idAdministrador']);
        //return Database::executeRow($sql, $params);
    }

    public function updateRows()
    {
        $sql = 'SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto, nombre_categoria, estado_producto
                FROM producto
                INNER JOIN categoria USING(id_categoria)
                ORDER BY nombre_producto';
        //return Database::getRows($sql);
    }

    public function deleteRows()
    {
        $sql = 'DELETE FROM producto
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto, nombre_categoria, estado_producto
                FROM producto
                INNER JOIN categoria USING(id_categoria)
                ORDER BY nombre_producto';
        //return Database::getRows($sql);
    }
}