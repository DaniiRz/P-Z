<?php

// Se incluye la clase Database y Validator
require_once('../../helpers/database.php');
require_once('../../helpers/validator.php');

class DetallePedidoHandler
{
    // Declaración de atributos
    protected $idDetallePedido = null;
    protected $cantidadProducto = null;
    protected $precioProducto = null;
    protected $idPedido = null;
    protected $idDetalleProducto = null;

    // Metodos de las operaciones CRUD

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT D.id_detalle, D.cantidad_producto, D.precio_producto, P.id_pedido, DP.id_detalle_producto
                FROM tb_detalle_pedido AS D
                INNER JOIN tb_pedidos AS P ON D.id_pedido = P.id_pedido
                INNER JOIN tb_detalle_productos AS DP ON D.id_detalle_producto = DP.id_detalle_producto
                WHERE P.id_pedido LIKE ? OR DP.id_detalle_producto LIKE ?
                ORDER BY D.id_detalle';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_detalle_pedido(cantidad_producto, precio_producto, id_pedido, id_detalle_producto) 
                VALUES (?, ?, ?, ?)';
        $params = array($this->cantidadProducto, $this->precioProducto, $this->idPedido, $this->idDetalleProducto);
        return Database::executeRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_detalle_pedido
                SET cantidad_producto = ?, precio_producto = ?, id_pedido = ?, id_detalle_producto = ?
                WHERE id_detalle = ?';
        $params = array($this->cantidadProducto, $this->precioProducto, $this->idPedido, $this->idDetalleProducto, $this->idDetallePedido);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_detalle_pedido
                WHERE id_detalle = ?';
        $params = array($this->idDetallePedido);
        return Database::executeRow($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT D.id_detalle, D.cantidad_producto, D.precio_producto, P.id_pedido, DP.id_detalle_producto
                FROM tb_detalle_pedido AS D
                INNER JOIN tb_pedidos AS P ON D.id_pedido = P.id_pedido
                INNER JOIN tb_detalle_productos AS DP ON D.id_detalle_producto = DP.id_detalle_producto
                WHERE D.id_detalle = ?';
        $params = array($this->idDetallePedido);
        return Database::getRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT D.id_detalle, D.cantidad_producto, D.precio_producto, P.id_pedido, DP.id_detalle_producto
                FROM tb_detalle_pedido AS D
                INNER JOIN tb_pedidos AS P ON D.id_pedido = P.id_pedido
                INNER JOIN tb_detalle_productos AS DP ON D.id_detalle_producto = DP.id_detalle_producto
                ORDER BY D.id_detalle';
        return Database::getRows($sql);
    }
}
?>
