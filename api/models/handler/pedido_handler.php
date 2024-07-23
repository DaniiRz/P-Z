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
// Ejemplo del método startOrder
public function startOrder()
{
    if ($this->getOrder()) {
        return true;
    } else {
        // Debug: Verificar valor de direccion_pedido
      //  error_log("Direccion Pedido: " . $this->direccion_pedido);

        // Se realiza la inserción del pedido al carrito 
        $sql = 'INSERT INTO tb_pedidos(direccion_pedido, estado_pedido, id_cliente, fecha_pedido) VALUES (?, ?, ?, NOW())';
        $this->direccion_pedido = 'En confirmación...';
        $this->estado = 'Pendiente';
        $params = array($this->direccion_pedido,$this->estado, $_SESSION['idCliente']);
        
        // Ejecutar la inserción
        
        if ($_SESSION['idPedido'] = Database::getLastRow($sql, $params)) {
            return true;
        } else {
            return false;
        }
    }
}

public function searchRows()
{
    $value = '%' . Validator::getSearchValue() . '%';
    $sql = 'SELECT 
                pe.id_pedido AS id_pedido,
                CONCAT(cl.nombre_cliente, " ", cl.apellido_cliente) AS nombre_cliente,
                cl.correo_cliente AS correo_cliente,
                pe.fecha_pedido AS fecha_pedido,
                pe.direccion_pedido AS direccion_pedido,
                pe.estado_pedido AS estado_pedido,
                dp.id_detalle AS id_detalle_pedido
            FROM 
                tb_pedidos pe
            INNER JOIN 
                tb_clientes cl ON pe.id_cliente = cl.id_cliente
            INNER JOIN 
                tb_detalle_pedido dp ON pe.id_pedido = dp.id_pedido
            WHERE 
                pe.id_pedido LIKE ? OR
                CONCAT(cl.nombre_cliente, " ", cl.apellido_cliente) LIKE ? OR
                cl.correo_cliente LIKE ? OR
                pe.fecha_pedido LIKE ? OR
                pe.direccion_pedido LIKE ? OR
                pe.estado_pedido LIKE ?
            ORDER BY 
                pe.id_pedido';
    
    $params = array($value, $value, $value, $value, $value, $value);
    return Database::getRows($sql, $params);
}

   // Método para agregar un producto al carrito de compras.
public function createDetail()
{
       // Consulta SQL para insertar un detalle del pedido
    $sql = 'INSERT INTO tb_detalle_pedido (id_detalle_producto, precio_producto, cantidad_producto, id_pedido)
            VALUES (
                (SELECT id_detalle_producto FROM tb_detalle_productos WHERE id_color = ? AND id_talla = ? LIMIT 1),
                (SELECT precio_producto FROM tb_detalle_productos WHERE id_color = ? AND id_talla = ? LIMIT 1),
                ?, ?
            )';
       // Parámetros para la consulta
    $params = array($this->color, $this->talla, $this->color, $this->talla, $this->cantidad, $_SESSION['idPedido']);
       // Ejecuta la consulta y retorna el resultado
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
         dp.id_detalle, ddp.img_producto, ddp.id_talla, ddp.id_color, dp.cantidad_producto, 
         dp.precio_producto, p.nombre_producto, c.nombre_color, t.numero_talla
    FROM 
     tb_detalle_pedido dp
    INNER JOIN 
        tb_detalle_productos ddp ON dp.id_detalle_producto = ddp.id_detalle_producto
    INNER JOIN
        tb_productos p ON ddp.id_producto = p.id_producto
    INNER JOIN 
        tb_colores c ON ddp.id_color = c.id_color
    INNER JOIN
        tb_tallas t ON ddp.id_talla = t.id_talla
    WHERE 
        dp.id_pedido = ?';
    $params = array($_SESSION['idPedido']);
    return Database::getRows($sql, $params);
}


// Método para obtener los productos que se encuentran en el pedido.
public function readDetallesPedidoAdmin()
{
    $sql = 'SELECT 
    dp.id_detalle, 
    ddp.img_producto, 
    t.numero_talla AS numero_talla, 
    c.nombre_color AS nombre_color, 
    dp.cantidad_producto, 
    dp.precio_producto,
    p.nombre_producto,
    pe.estado_pedido,
    pe.id_pedido
FROM 
    tb_detalle_pedido dp
INNER JOIN 
    tb_detalle_productos ddp ON dp.id_detalle_producto = ddp.id_detalle_producto
INNER JOIN
    tb_productos p ON ddp.id_producto = p.id_producto
INNER JOIN
    tb_pedidos pe ON dp.id_pedido = pe.id_pedido
INNER JOIN
    tb_tallas t ON ddp.id_talla = t.id_talla
INNER JOIN
    tb_colores c ON ddp.id_color = c.id_color
WHERE 
    dp.id_pedido = ?';
    $params = array($this->id_pedido);
    return Database::getRows($sql, $params);
}

    // Método para leer todos los pedidos
    public function readAll() {
        // Consulta SQL para obtener los datos necesarios
        $sql = 'SELECT p.id_pedido, 
                CONCAT(cl.nombre_cliente, " ", cl.apellido_cliente) AS nombre_cliente, 
                cl.correo_cliente,
                p.direccion_pedido,
                p.fecha_pedido AS fecha_pedido, 
                p.estado_pedido
                FROM tb_pedidos p
                JOIN tb_clientes cl ON p.id_cliente = cl.id_cliente
                ORDER BY p.fecha_pedido DESC';  // Ordenar por fecha_pedido de manera descendente
        // Ejecutar la consulta y devolver los resultados
        return Database::getRows($sql);
    }

        // Método para generar reporte todos los pedidos
        public function obtenerPedidosPorEstado() {
            // Consulta SQL para obtener los datos necesarios
            $sql = 'SELECT p.id_pedido, 
                    CONCAT(cl.nombre_cliente, " ", cl.apellido_cliente) AS nombre_cliente, 
                    cl.correo_cliente,
                    p.direccion_pedido,
                    p.fecha_pedido AS fecha_pedido, 
                    p.estado_pedido
                    FROM tb_pedidos p
                    JOIN tb_clientes cl ON p.id_cliente = cl.id_cliente
                    WHERE p.estado_pedido = ?';
            $params = array($this->estado);
            return Database::getRows($sql, $params);
        }

    // Método para leer todos los pedidos pendientes
    public function readAllPending() {
    $sql = 'SELECT p.id_pedido, 
        cl.nombre_cliente, 
        cl.correo_cliente,
        p.direccion_pedido,
        CURRENT_DATE() AS fecha_actual, 
        p.estado_pedido
        FROM tb_pedidos p
        JOIN tb_clientes cl ON p.id_cliente = cl.id_cliente
        WHERE  p.estado_pedido = "Pendiente"';
    
    // Ejecutar la consulta y devolver los resultados
    return Database::getRows($sql);
}



    // Método para actualizar el estado pedido de un pedido
    public function updateEstado()
    {
        $sql = 'UPDATE tb_pedidos SET estado_pedido = ? WHERE id_pedido = ?';
        $params = array($this->estado, $this->id_pedido);
        return Database::executeRow($sql, $params);
    }

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        $this->estado = 'Completado';
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
