<?php

// Se incluyen las clases
require_once ('../../helpers/validator.php');
require_once ('../../models/handler/colores_handler.php');

// Clase para manejar el encapsulamiento de datos
class ColorData extends ColorHandler
{

    // Artributo adicional
    private $data_error = null;

    public function setIdColor($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del color es incorrecto';
            return false;
        }
    }

    public function setIdSubCategoria($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idsubcategoria = $value;
            return true;
        } else {
            $this->data_error = '2';
            return false;
        }
    }

    public function setNombreColor($value, $min = 2, $max = 255)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombrecolor = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Metodo adicional de error
    public function getDataError()
    {
        return $this->data_error;
    }
}