<?php
// Se incluye la clase para trabajar con la base de datos.
require_once ('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class CategoriaHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $imagen = null;
    protected $idProducto = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/categorias/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_categoria, nombre_categoria, imagen_categoria
                FROM tb_categorias
                WHERE nombre_categoria LIKE ?
                ORDER BY nombre_categoria';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_categorias(nombre_categoria,imagen_categoria)
                VALUES(?, ?)';
        $params = array($this->nombre, $this->imagen);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_categoria, nombre_categoria, imagen_categoria  
                FROM tb_categorias
                ORDER BY nombre_categoria';
        return Database::getRows($sql);
    }

    public function readOneP()
    {
        $sql = 'SELECT C.id_categoria, C.nombre_categoria, P.id_categoria, P.id_producto
                FROM tb_categorias AS C
                INNER JOIN tb_productos AS P ON C.id_categoria = P.id_categoria
                WHERE P.id_producto = ?
                ORDER BY nombre_categoria';
        $params = array($this->idProducto);
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_categoria, nombre_categoria, imagen_categoria
                FROM tb_categorias
                WHERE id_categoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_categoria
                FROM tb_categorias
                WHERE id_categoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_categorias
                SET imagen_categoria = ?, nombre_categoria = ?
                WHERE id_categoria = ?';
        $params = array($this->imagen, $this->nombre, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_categorias
                WHERE id_categoria = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readProductos()
    {
        $sql = 'SELECT P.nombre_producto, SUM(D.existencias) total
                FROM tb_productos AS P
                INNER JOIN tb_detalle_productos AS D ON P.id_producto = D.id_producto
                WHERE P.id_categoria = ?
                GROUP BY P.nombre_producto
                ORDER BY total DESC';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }
}
