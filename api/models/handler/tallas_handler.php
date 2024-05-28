<?php

// Se incluye la clase
require_once ('../../helpers/database.php');

class TallaHandler
{
    // Declaracion de atributos
    protected $id = null;
    protected $numerotalla = null;
    protected $idsubcategoria = null;

    public function searchRows()
    {
        $value = '%' . validator::getSearchValue() . '%';
        $sql = 'SELECT id_talla, numero_talla
                FROM tb_tallas
                WHERE numero_talla LIKE ?
                ORDER BY numero_talla';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRows()
    {
        $sql = 'INSERT INTO tb_tallas(numero_talla)
                VALUES (?)';
        $params = array($this->numerotalla);
        return Database::executeRow($sql, $params);
    }

    public function deleteRows()
    {
        $sql = 'DELETE FROM tb_tallas
                WHERE id_talla = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function updateRows()
    {
        $sql = 'UPDATE tb_tallas
                SET numero_talla = ?
                WHERE id_talla = ?';
        $params = array($this->numerotalla, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT numero_talla, id_talla
                FROM tb_tallas';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT numero_talla, id_talla
                FROM tb_tallas
                WHERE id_talla = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}