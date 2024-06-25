<?php

// Se incluye la clase
require_once('../../helpers/database.php');

class DetalleHandler
{

    // Declaracion de atributos
    protected $idproducto = null;
    protected $iddetalle = null;
    protected $existencias = null;
    protected $imgproducto = null;
    protected $idcolor = null;
    protected $idtalla = null;
    protected $nombreColor = null;
    protected $numeroTalla = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/productos/';

    // Metodos de las operaciones SCRUD

    public function searchRowsD()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT D.id_detalle_producto, D.existencias, D.img_producto, C.nombre_color, T.numero_talla, P.id_producto
                FROM tb_detalle_productos AS D
                INNER JOIN tb_productos AS P ON D.id_producto = P.id_producto
                INNER JOIN tb_colores AS C ON D.id_color = C.id_color
                INNER JOIN tb_tallas AS T ON D.id_talla = T.id_talla
                WHERE C.nombre_color LIKE ? OR T.numero_talla LIKE ?
                ORDER BY D.id_detalle_producto';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRowsD()
    {
        $sql = 'INSERT INTO tb_detalle_productos(existencias, img_producto, id_color, id_talla, id_producto) 
                VALUES (?, ?, ?, ?, ?)';
        $params = array($this->existencias, $this->imgproducto, $this->idcolor, $this->idtalla, $this->idproducto);
        return Database::executeRow($sql, $params);
    }

    public function updateRowsD()
    {
        $sql = 'UPDATE tb_detalle_productos
                SET existencias = ?, img_producto = ?, id_color = ?, id_talla = ?
                WHERE id_detalle_producto = ?';
        $params = array($this->existencias, $this->imgproducto, $this->idcolor, $this->idtalla, $this->iddetalle);
        return Database::executeRow($sql, $params);
    }

    public function deleteRowsD()
    {
        $sql = 'DELETE FROM tb_detalle_productos
                WHERE id_detalle_producto = ?';
        $params = array($this->iddetalle);
        return Database::executeRow($sql, $params);
    }

    public function readDetails()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT D.id_detalle_producto, D.existencias, D.img_producto, C.nombre_color, T.numero_talla, P.id_producto
                FROM tb_detalle_productos AS D
                INNER JOIN tb_productos AS P ON D.id_producto = P.id_producto
                INNER JOIN tb_colores AS C ON D.id_color = C.id_color
                INNER JOIN tb_tallas AS T ON D.id_talla = T.id_talla
                WHERE P.id_producto = ? AND (C.nombre_color LIKE ? OR T.numero_talla LIKE ?)';
        $params = array($this->idproducto, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function readOneD()
    {
        $sql = 'SELECT D.id_detalle_producto, D.existencias, D.img_producto, C.nombre_color, T.numero_talla
        FROM tb_detalle_productos AS D
        INNER JOIN tb_colores AS C ON D.id_color = C.id_color
        INNER JOIN tb_tallas AS T ON D.id_talla = T.id_talla
        WHERE D.id_detalle_producto = ?';
        $params = array($this->iddetalle);
        return Database::getRow($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT P.id_producto, P.nombre_producto, P.id_categoria, G.nombre_categoria, P.desc_producto, D.img_producto,
                        C.nombre_color, T.numero_talla, E.total_existencias
                FROM tb_detalle_productos AS D
                INNER JOIN tb_productos AS P ON D.id_producto = P.id_producto
                INNER JOIN tb_colores AS C ON D.id_color = C.id_color
                INNER JOIN tb_tallas AS T ON D.id_talla = T.id_talla
                INNER JOIN tb_categorias AS G ON P.id_categoria = G.id_categoria
                INNER JOIN (SELECT id_producto, SUM(existencias) 
                            AS total_existencias
                            FROM tb_detalle_productos
                            GROUP BY id_producto) 
                            AS E ON D.id_producto = E.id_producto
                WHERE P.id_producto = ?';
        $params = array($this->idproducto);
        return Database::getRow($sql, $params);
    }

    public function readDetailsP()
    {
        $sql = 'SELECT D.id_detalle_producto, C.nombre_color, T.numero_talla, C.id_color, T.id_talla
                FROM tb_detalle_productos AS D
                INNER JOIN tb_colores AS C ON D.id_color = C.id_color
                INNER JOIN tb_tallas AS T ON D.id_talla = T.id_talla
                WHERE P.id_producto = ?';
        $params = array($this->idproducto);
        return Database::getRow($sql, $params);
    }

    public function selectColor()
    {
        $sql = 'SELECT T.numero_talla, C.id_color, T.id_talla, C.nombre_color
                FROM tb_detalle_productos AS D
                INNER JOIN tb_colores AS C ON D.id_color = C.id_color
                INNER JOIN tb_tallas AS T ON D.id_talla = T.id_talla
                WHERE C.nombre_color = ?';
        $params = array($this->nombreColor);
        return Database::getRows($sql, $params);
    }
    
    public function selectTalla()
    {
        $sql = 'SELECT C.nombre_color, C.id_color, T.id_talla, T.numero_talla
                FROM tb_detalle_productos AS D
                INNER JOIN tb_colores AS C ON D.id_color = C.id_color
                INNER JOIN tb_tallas AS T ON D.id_talla = T.id_talla
                WHERE T.numero_talla = ?';
        $params = array($this->numeroTalla);
        return Database::getRows($sql, $params);
    }

        //Recibimos el idDetalleProduto y en base a esta informacion obtenemos las tallas y colores agregadas 
        //a un detalle producto, es decir, encontramos las tallas y 
        //colores agregados a un detalle producto
    public function ObtenerTallasColoresDetalle()
        {
            $sql = ' SELECT C.nombre_color, T.numero_talla, C.id_color, T.id_talla
            FROM tb_detalle_productos AS D
            INNER JOIN tb_colores AS C ON D.id_color = C.id_color
            INNER JOIN tb_tallas AS T ON D.id_talla = T.id_talla
            WHERE D.id_detalle_producto = ?';
            $params = array($this->iddetalle);
        return Database::getRow($sql, $params);
    }
        

    public function readColor()
    {
        $sql = 'SELECT T.numero_talla, C.nombre_color, C.id_color, T.id_talla
                FROM tb_detalle_productos AS D
                INNER JOIN tb_colores AS C ON D.id_color = C.id_color
                INNER JOIN tb_tallas AS T ON D.id_talla = T.id_talla
                WHERE D.id_producto = ?';
        $params = array($this->idproducto);
        return Database::getRows($sql, $params);
    }
    
    public function readTalla()
    {
        $sql = 'SELECT C.nombre_color, T.numero_talla, C.id_color, T.id_talla
                FROM tb_detalle_productos AS D
                INNER JOIN tb_colores AS C ON D.id_color = C.id_color
                INNER JOIN tb_tallas AS T ON D.id_talla = T.id_talla
                WHERE D.id_producto = ?';
        $params = array($this->idproducto);
        return Database::getRows($sql, $params);
    }
}