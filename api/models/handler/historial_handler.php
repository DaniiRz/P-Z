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
    $sql = 'SELECT id_pedido, fecha_pedido, nombre_producto, desc_producto, cantidad_producto, precio_producto, (cantidad_producto * precio_producto) as total
            FROM pedidos
            INNER JOIN productos ON pedidos.id_producto = productos.id_producto
            WHERE estado_pedido = "Completado" AND id_cliente = ?
            ORDER BY fecha_pedido DESC';
    
    // Ejecuta la consulta con el parámetro del ID del cliente
    return Database::getRows($sql, array($_SESSION['idCliente']));
}

}