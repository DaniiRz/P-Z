<?php

// Se incluye la clase
require_once('../../helpers/database.php');

class ProductoHandler
{

    // Declaracion de atributos
    protected $id = null;
    protected $nombreproducto = null;
    protected $descproducto = null;
    protected $idcategoria = null;

    // Metodos de las operaciones SCRUD
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT P.id_producto, P.nombre_producto, P.desc_producto, C.nombre_categoria
                FROM tb_productos AS P
                INNER JOIN tb_categorias AS C ON P.id_categoria = C.id_categoria
                WHERE P.nombre_producto LIKE ? OR P.desc_producto LIKE ?
                ORDER BY P.nombre_producto';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRows()
    {
        $sql = 'INSERT INTO tb_productos(nombre_producto, desc_producto, id_categoria) 
                VALUES (?, ?, ?)';
        $params = array($this->nombreproducto, $this->descproducto, $this->idcategoria);
        return Database::executeRow($sql, $params);
    }

    public function updateRows()
    {
        $sql = 'UPDATE tb_productos
                SET nombre_producto = ?, Desc_producto = ?, id_categoria = ?
                WHERE id_producto = ?';
        $params = array($this->nombreproducto, $this->descproducto, $this->idcategoria, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRows()
    {
        $sql = 'DELETE FROM tb_productos
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT P.id_producto, P.nombre_producto, P.desc_producto, C.nombre_categoria
                FROM tb_productos AS P
                INNER JOIN tb_categorias AS C ON P.id_categoria = C.id_categoria
                ORDER BY P.nombre_producto';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT P.id_producto, P.nombre_producto, P.desc_producto, C.nombre_categoria, P.id_producto, P.id_categoria
                FROM tb_productos AS P
                INNER JOIN tb_categorias AS C ON P.id_categoria = C.id_categoria
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readProductosCategoria()
    {
        $sql = 'SELECT P.id_producto, D.id_producto, D.img_producto, P.nombre_producto
                FROM tb_productos AS P
                INNER JOIN tb_categorias AS C ON P.id_categoria = C.id_categoria
                INNER JOIN tb_detalle_productos AS D ON P.id_producto = D.id_producto
                WHERE P.id_categoria = ?
                GROUP BY P.id_producto
                ORDER BY P.nombre_producto';
        $params = array($this->idcategoria);
        return Database::getRows($sql, $params);
    }
    public function readProductosCategoriaMobile()
    {
        // Consulta SQL para seleccionar productos de una categoría específica
        $sql = 'SELECT P.id_producto, P.nombre_producto, P.desc_producto, D.precio_producto, D.existencias, D.img_producto, C.nombre_categoria
                FROM tb_productos AS P
                INNER JOIN tb_categorias AS C ON P.id_categoria = C.id_categoria
                INNER JOIN tb_detalle_productos AS D ON P.id_producto = D.id_producto
                WHERE C.id_categoria = ?  -- Añadir condición para filtrar por categoría
                ORDER BY P.nombre_producto;';
        // Parámetros para la consulta SQL (probablemente el ID de la categoría)
        $params = array($this->idcategoria);
        // Ejecutar la consulta utilizando un método como Database::getRows
        return Database::getRows($sql, $params);
    }

    /*
    *   Métodos para generar reportes.
    */
    public function productosCategoria()
    {
        $sql = 'SELECT P.nombre_producto, P.desc_producto, P.fecha_registro_produc, C.nombre_categoria
                FROM tb_productos AS P
                INNER JOIN tb_categorias AS C ON P.id_categoria = C.id_categoria
                WHERE P.id_categoria = ?
                ORDER BY P.nombre_producto';
        $params = array($this->idcategoria);
        return Database::getRows($sql, $params);
    }
}