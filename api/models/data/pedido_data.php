    <?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/pedido_handler.php');
/*
*	Clase para manejar el encapsulamiento de los datos de las tablas PEDIDO y DETALLE_PEDIDO.
*/
class PedidoData extends PedidoHandler
{
    // Atributo genérico para manejo de errores.
    private $data_error = null;

    /*
    *   Métodos para validar y establecer los datos.
    */
    public function setIdPedido($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_pedido = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del pedido es incorrecto';
            return false;
        }
    }

    public function setIdDetalle($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_detalle = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del detalle pedido es incorrecto';
            return false;
        }
    }

    public function setCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cliente = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del cliente es incorrecto';
            return false;
        }
    }

    public function setDetalleProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->detalle_producto = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del detalle producto es incorrecto';
            return false;
        }
    }

    public function setColor($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->color = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del color es incorrecto';
            return false;
        }
    }

    public function setTalla($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->talla = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la talla es incorrecto';
            return false;
        }
    }

    public function setCantidad($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cantidad = $value;
            return true;
        } else {
            $this->data_error = 'La cantidad del producto debe ser mayor o igual a 1';
            return false;
        }
    }
    public function setEstadoPedido($value)
    {
        if (Validator::validateAlphabetic($value)) {
            $this->estado = $value;
            return true;
        } else {
            $this->data_error = 'El estado es inexistente o invalido';
            return false;
        }
    }
    public function setDireccionPedido($value)
    {
        if (Validator::validateAlphanumeric($value)) {
            $this->cantidad = $value;
            return true;
        } else {
            $this->data_error = 'La cantidad del producto debe ser mayor o igual a 1';
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}
