<?php

// Se incluyen las clases
require_once('../../helpers/validator.php');
require_once('../../models/handler/detalle_pedido_handler.php');

// Clase para manejar el encapsulamiento de datos
class DetallePedidoData extends DetallePedidoHandler
{
    // Atributo adicional
    private $data_error = null;

    // Métodos para validar y establecer los datos
    public function setIdDetalle($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idDetallePedido = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del detalle del pedido es incorrecto';
            return false;
        }
    }

    public function setCantidadProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cantidadProducto = $value;
            return true;
        } else {
            $this->data_error = 'La cantidad del producto es incorrecta';
            return false;
        }
    }

    public function setPrecioProducto($value)
    {
        if (Validator::validateMoney($value)) {
            $this->precioProducto = $value;
            return true;
        } else {
            $this->data_error = 'El precio del producto es incorrecto';
            return false;
        }
    }

    public function setIdPedido($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idPedido = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del pedido es incorrecto';
            return false;
        }
    }

    public function setIdDetalleProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idDetalleProducto = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del detalle del producto es incorrecto';
            return false;
        }
    }

    // Método adicional de error
    public function getDataError()
    {
        return $this->data_error;
    }
}
?>
