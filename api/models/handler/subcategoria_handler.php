<?php

// Se incluye la clase
require_once ('../../helpers/database.php');

class CategoriaHandler
{

    // Declaracion de atributos
    protected $id = null;
    protected $nombresubcategoria = null;
    protected $idcategoria = null;

    public function createRows()
    {
        $sql = 'INSERT INTO tb_sub_categorias(nombre_sub_categoria);
                VALUES (?)';
        $params = array($this->nombresubcategoria);
        return Database::executeRow($sql, $params);
    }

    public function deleteRows()
    {
        $sql = 'DELETE FROM tb_sub_categorias
                WHERE id_sub_categoria = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function updateRows()
    {
        $sql = 'UPDATE nombre_sub_categoria
                FROM tb_sub_categorias
                WHERE P.id_producto = ?';
        $params = array($this->nombresubcategoria, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT nombre_sub_categoria
                FROM tb_sub_categorias';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT nombre_sub_categoria
                FROM tb_sub_categorias
                WHERE id_sub_categoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}