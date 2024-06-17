<?php

// Se incluye la clase
require_once ('../../helpers/database.php');

class ColorHandler
{
    // Declaracion de atributos
    protected $id = null;
    protected $nombrecolor = null;
    protected $idsubcategoria = null;

    public function searchRows()
    {
        $value = '%' . validator::getSearchValue() . '%';
        $sql = 'SELECT id_color, nombre_color
                FROM tb_colores
                WHERE nombre_color LIKE ?
                ORDER BY nombre_color';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRows()
    {
        $sql = 'INSERT INTO tb_colores(nombre_color)
                VALUES (?)';
        $params = array($this->nombrecolor);
        return Database::executeRow($sql, $params);
    }

    public function deleteRows()
    {
        $sql = 'DELETE FROM tb_colores
                WHERE id_color = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function updateRows()
    {
        $sql = 'UPDATE tb_colores
                SET nombre_color = ?
                WHERE id_color = ?';
        $params = array($this->nombrecolor, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_color, nombre_color
                FROM tb_colores';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT nombre_color, id_color
                FROM tb_colores
                WHERE id_color = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}