<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de las tablas PEDIDO y DETALLE_PEDIDO.
*/
class PedidoHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id_pedido = null;
    protected $id_detalle = null;
    protected $cliente = null;
    protected $producto = null;
    protected $detalle_producto = null;
    protected $color = null;
    protected $talla = null;
    protected $direccion_pedido = null;
    protected $cantidad = null;
    protected $estado = null;

    /*
    *   ESTADOS DEL PEDIDO
    *   Pendiente (valor por defecto en la base de datos). Pedido en proceso y se puede modificar el detalle.
    *   Finalizado. Pedido terminado por el cliente y ya no es posible modificar el detalle.
    *   Entregado. Pedido enviado al cliente.
    *   Anulado. Pedido cancelado por el cliente después de ser finalizado.
    */

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    // Método para verificar si existe un pedido en proceso con el fin de iniciar o continuar una compra.
    public function getOrder()
    {
        $this->estado = 'Pendiente';
        $sql = 'SELECT id_pedido
                FROM tb_pedidos
                WHERE estado_pedido = ? AND id_cliente = ?';
        $params = array($this->estado, $_SESSION['idCliente']);
        if ($data = Database::getRow($sql, $params)) {
            $_SESSION['idPedido'] = $data['id_pedido'];
            return true;
        } else {
            return false;
        }
    }

    // Método para iniciar un pedido en proceso.
    public function startOrder()
    {
        if ($this->getOrder()) {
            return true;
        } else {
            //se realiza la insercion del pedido al carrito 
            $sql = 'INSERT INTO tb_pedidos(direccion_pedido, id_cliente)
                    VALUES((SELECT id_cliente FROM tb_clientes WHERE id_cliente = ?), ?)';
            $params = array($_SESSION['idCliente'], $_SESSION['idCliente']);
            // Se obtiene el ultimo valor insertado de la llave primaria en la tabla pedido.
            if ($_SESSION['idPedido'] = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
    }
    

   // Método para agregar un producto al carrito de compras.
    public function createDetail()
    {
        // Se realiza una subconsulta para obtener el precio del producto.
        $sql = 'INSERT INTO tb_detalle_pedido (id_detalle_producto, precio_producto, cantidad_producto, id_pedido)
            VALUES ((SELECT id_detalle_producto FROM tb_detalle_productos WHERE id_color = ? AND id_talla = ?),
            (SELECT precio_producto FROM tb_detalle_productos WHERE id_color = ? AND id_talla = ?), ?, ?)'; //se obtiene el precio de la tabla productos
        $params = array($this->color, $this->talla, $this->color, $this->talla, $this->cantidad, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener los productos que se encuentran en el carrito de compras.
    //public function readDetail()
    //{
       // $sql = 'SELECT id_detalle, nombre_producto, detalle_pedido.precio_producto, detalle_pedido.cantidad_producto
                //FROM tb_detalle_pedido
               // INNER JOIN tb_pedidos USING(id_pedido)
                //INNER JOIN tb_productos USING(id_producto)
               // WHERE id_pedido = ?';
       // $params = array($_SESSION['idPedido']);
       // return Database::getRows($sql, $params);
   // }

// Método para obtener los productos que se encuentran en el carrito de compras.
public function readDetallePedido()
{
    $sql = 'SELECT 
         dp.id_detalle, 
        ddp.img_producto, 
        ddp.id_talla, 
        ddp.id_color, 
        dp.cantidad_producto, 
        dp.precio_producto,
        p.nombre_producto
    FROM 
     tb_detalle_pedido dp
    INNER JOIN 
        tb_detalle_productos ddp ON dp.id_detalle_producto = ddp.id_detalle_producto
    INNER JOIN
        tb_productos p ON ddp.id_producto = p.id_producto
    WHERE 
        dp.id_pedido = ?';
    $params = array($_SESSION['idPedido']);
    return Database::getRows($sql, $params);
}

    // Método para leer todos los pedidos
    public function readAll() {
        // Consulta SQL para obtener los datos necesarios
        $sql = 'SELECT cl.nombre_cliente, cl.correo_cliente, p.direccion_pedido, p.fecha_pedido, p.estado_pedido, dp.id_detalle
                FROM tb_pedidos p
                JOIN tb_clientes cl ON p.id_cliente = cl.id_cliente
                JOIN tb_detalle_pedido dp ON p.id_pedido = dp.id_pedido;';
        // Ejecutar la consulta y devolver los resultados
        return Database::getRows($sql);
    }

    // Método para leer todos los pedidos pendientes
    public function readAllPending() {
    $sql = 'SELECT 
        cl.nombre_cliente, 
        cl.correo_cliente, 
        CURRENT_DATE() AS fecha_actual,  
        p.estado_pedido
        FROM tb_pedidos p
        JOIN tb_clientes cl ON p.id_cliente = cl.id_cliente
        WHERE  p.estado_pedido = "Pendiente"';
    
    // Ejecutar la consulta y devolver los resultados
    return Database::getRows($sql);
}

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        $this->estado = 'Finalizado';
        $sql = 'UPDATE tb_pedidos
                SET estado_pedido = ?
                WHERE id_pedido = ?';
        $params = array($this->estado, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para actualizar la cantidad de un producto agregado al carrito de compras.
    public function updateDetail()
    {
        $sql = 'UPDATE tb_detalle_pedido
                SET cantidad_producto = ?
                WHERE id_detalle = ? AND id_pedido = ?';
        $params = array($this->cantidad, $this->id_detalle, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un producto que se encuentra en el carrito de compras.
    public function deleteDetail()
    {
        $sql = 'DELETE FROM tb_detalle_pedido
                WHERE id_detalle = ? AND id_pedido = ?';
        $params = array($this->id_detalle, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

}
