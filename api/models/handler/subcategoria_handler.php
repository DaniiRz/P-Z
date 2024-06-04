<?php

// Se incluye la clase
require_once ('../../helpers/database.php');

class SubcategoriaHandler
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
        $sqlIf = 'SELECT c.id_categoria
                FROM tb_categorias c
                INNER JOIN tb_sub_categorias s ON c.id_categoria = s.id_categoria
                WHERE s.id_sub_categoria = ?';
        $params = array($this->id);
        return Database::executeRow($sqlIf, $params);

        // Verificar si existen datos relacionados
        if ($result->num_rows > 0) {

            // Si hay datos relacionados, mostrar un mensaje de error o realizar alguna acción adicional
            echo "No se puede eliminar la subcategoría porque existen datos relacionados en la tabla 'categoria'.";
        }
        
        else {

            // Si no hay datos relacionados, proceder con la eliminación de la subcategoría
            $sql = 'DELETE nombre_sub_categoria
                    FROM tb_sub_categorias
                    WHERE id_sub_categoria = ?';
            return Database::executeRow($sql, $params);
        }
    }

    public function updateRows()
    {
        $sql = 'UPDATE tb_sub_categorias 
                SET nombre_sub_categoria = ? 
                WHERE id_producto = ?';
        $params = array($this->nombresubcategoria, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT nombre_sub_categoria
                FROM tb_sub_categorias';
        return Database::getRows($sql);
    }

    public function readSome()
    {
        $sql = 'SELECT id_sub_categoria, nombre_sub_categoria
                FROM tb_sub_categorias
                WHERE id_categoria = ?';
                $params = array($this->idcategoria);
        return Database::getRows($sql, $params);
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