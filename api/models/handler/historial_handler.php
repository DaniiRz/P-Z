<?php
// Se incluye la clase para trabajar con la base de datos.
require_once ('../../helpers/database.php');

class PedidoHandler
{
    /*
     *   Método para realizar la operacion READ de los pedidos FINALIZADOS.
     */

    // Método para leer todos los pedidos finalizados del cliente en sesion 
    public function readHistorial()
{
    $sql = 'SELECT
        p.id_pedido,
        p.fecha_pedido,
        d.id_detalle,
        pr.nombre_producto,
        dp.precio_producto,
        d.cantidad_producto,
        (dp.precio_producto * d.cantidad_producto)
    FROM tb_pedidos p
    JOIN tb_detalle_pedido d ON p.id_pedido = d.id_pedido
    JOIN tb_detalle_productos dp ON d.id_detalle_producto = dp.id_detalle_producto
    JOIN tb_productos pr ON dp.id_producto = pr.id_producto
    WHERE  p.id_cliente = ?
    AND p.estado_pedido = "Completado"
    ORDER BY p.fecha_pedido DESC, p.id_pedido, d.id_detalle';
    
    // Ejecuta la consulta con el parámetro del ID del cliente
    return Database::getRows($sql, array($_SESSION['idCliente']));
}

}