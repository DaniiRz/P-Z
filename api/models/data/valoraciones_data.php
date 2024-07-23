<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/valoraciones_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla VALORACION.
 */
class ValoracionesData extends ValoracionesHandler
{
    /*
     *  Atributos adicionales si es necesario.
     */
    private $data_error = null;

    /*
     *   Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la valoración es incorrecto';
            return false;
        }
    }

    public function setComentario($value, $min = 2, $max = 255)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'El comentario contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->comentario = $value;
            return true;
        } else {
            $this->data_error = 'El comentario debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setFechaValoracion($value)
    {
        // Aquí podrías implementar validaciones adicionales para la fecha si fuera necesario
        $this->fecha = $value;
        return true;
    }

    public function setIdProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idProducto = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto en la valoración es incorrecto';
            return false;
        }
    }
    public function setIdCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idCliente = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del cliente en la valoración es incorrecto';
            return false;
        }
    }

    public function setEstadoValoracion($value)
    {
        if (Validator::validateAlphabetic($value)) {
            $this->estadoValo = $value;
            return true;
        } else {
            $this->data_error = 'Estado de valoración incorrecto';
            return false;
        }
    }

    /*
     *  Métodos adicionales de negocio si es necesario.
     */

    /*
     *  Métodos para obtener el valor de los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }
}
?>
