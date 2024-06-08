<?php

// Se incluye la clase
require_once ('../../helpers/database.php');

class SubcategoriaHandler
{

    // Declaracion de atributos
    protected $id = null;
    protected $nombresubcategoria = null;
    protected $idcategoria = null;
    protected $descripcion = null;
    protected $imagen = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/subcategorias/';

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_subcategoria, nombre_subcategoria, imagen_subcategoria, descripcion_subcategoria
                FROM tb_sub_categorias
                WHERE nombre_subcategoria LIKE ? OR descripcion_subcategoria LIKE ?
                ORDER BY nombre_subcategoria';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_sub_categorias(nombre_subcategoria, imagen_subcategoria, descripcion_subcategoria)
                VALUES(?, ?, ?)';
        $params = array($this->nombresubcategoria, $this->imagen, $this->descripcion);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_subcategoria, nombre_subcategoria, imagen_subcategoria, descripcion_subcategoria
                FROM tb_sub_categorias
                ORDER BY nombre_subcategoria';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_subcategoria, nombre_subcategoria, imagen_subcategoria, descripcion_subcategoria
                FROM tb_sub_categorias
                WHERE id_subcategoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_subcategoria
                FROM tb_subcategorias
                WHERE id_subcategoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_sub_categorias
                SET imagen_subcategoria = ?, nombre_subcategoria = ?, descripcion_subcategoria = ?
                WHERE id_subcategoria = ?';
        $params = array($this->imagen, $this->nombresubcategoria, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_sub_categorias
                WHERE id_subcategoria = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}