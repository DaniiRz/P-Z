<?php

// Se incluyen las clases
require_once('../../helpers/validator.php');
require_once('../../models/handler/productos_handler.php');

// Clase para manejar el encapsulamiento de datos
class ProductoData extends ProductoHandler
{

    // Artributo adicional
    private $data_error = null;

    // Metodos para validar y establecer los datos
    public function setIdProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto es incorrecto';
            return false;
        }
    }

    public function setNombreproducto($value, $min = 2, $max = 255)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombreproducto = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setCategoria($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idcategoria = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la categoria es incorrecto';
            return false;
        }
    }

    public function setDescripcion($value, $min = 2, $max = 255)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'La descripción contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descproducto = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Metodo adicional de error
    public function getDataError()
    {
        return $this->data_error;
    }
}