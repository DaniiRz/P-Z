<?php

// Se incluye la clase
require_once ('../../helpers/database.php');

class CategoriaHandler
{

    // Declaracion de atributos
    protected $id = null;
    protected $nombrecategoria = null;
    protected $idsubcategoria = null;

    public function createRows()
    {
        $sql = 'INSERT INTO tb_categorias (nombre_categoria)
                SELECT nombre_sub_categoria
                FROM tb_sub_categorias
                WHERE id_sub_categoria = ?';
        $params = array($this->nombrecategoria, $this->idsubcategoria);
        return Database::executeRow($sql, $params);
    }

    public function deleteRows()
    {
        $sql = 'DELETE nombre_categoria
                FROM tb_categorias
                WHERE id_categoria = ?',
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function updateRows()
    {
        $sql = 'UPDATE tb_categorias 
                SET nombre_categoria = ? 
                WHERE id_categoria = ?';
        $params = array($this->nombrecategoria, $this->id);
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
        $sql = 'SELECT nombre_categoria
                FROM tb_categorias
                WHERE id_sub_categoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}