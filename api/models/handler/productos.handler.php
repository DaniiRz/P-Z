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
        $sql = 'SELECT idProducto, nombreProducto, NombreCategoria, nombreSubCategoria, existencias
                FROM tbProductos
                INNER JOIN Subcategoria USING(idSubCategoria)
                WHERE nombre_producto LIKE ? OR descripcion_producto LIKE ?
                ORDER BY nombre_producto';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRows()
    {
        $sql = 'CALL InsertarDatos(nombreCategoria, nombreSubCategoria, nombreProducto, DescProducto);
        VALUES (?, ?, ?, ?)';
        $params = array($this->nombre, $this->idsubcategoria, $this->nombreproducto, $this->descproducto);
        return Database::executeRow($sql, $params);
    }

    public function updateRows()
    {
        $sql = 'UPDATE P.idProducto, P.nombreProducto, D.existencias, SC.nombreSubCategoria, C.nombreCategoria
                FROM tbProductos AS P 
                JOIN tbDetalleProducto AS D ON P.idProducto = D.idProducto
                JOIN tbSubCategoria AS SC ON P.idSubCategoria = SC.idSubCategoria
                JOIN tbCategoria AS C ON SC.idCategoria = C.idCategoria';
        return Database::getRows($sql);
    }

    public function deleteRows()
    {
        $sql = 'DELETE FROM tbDetalleProducto D
                INNER JOIN tbProductos P
                ON D.idProducto = P.idProducto
                WHERE P.idProducto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT P.idProducto, P.nombreProducto, D.existencias, SC.nombreSubCategoria, C.nombreCategoria
                FROM tbProductos AS P 
                JOIN tbDetalleProducto AS D ON P.idProducto = D.idProducto
                JOIN tbSubCategoria AS SC ON P.idSubCategoria = SC.idSubCategoria
                JOIN tbCategoria AS C ON SC.idCategoria = C.idCategoria';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT P.nombreProducto, P.DescProducto, D.existencias, D.imgProducto C.nombreColor, T.nombreTalla
                FROM tbDetalleProducto AS D 
                JOIN tbProducto AS P ON D.idProducto = P.idProducto
                JOIN tbColor AS C ON D.idColor = C.idColor
                JOIN tbTalla AS T ON D.idTalla = T.idCategoria
                WHERE idProducto = ? ';
        return Database::getRow($sql);
    }
}