<?php

// Se incluyen las clases
require_once('../../helpers/validator.php');
require_once('../../models/handler/detalles_handler.php');

// Clase para manejar el encapsulamiento de datos
class DetalleData extends DetalleHandler
{

    // Artributo adicional
    private $data_error = null;
    private $filename = null;

    // Metodos para validar y establecer los datos
    public function setIdProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idproducto = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto es incorrecto';
            return false;
        }
    }

    public function setIdDetalle($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->iddetalle = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del detalle producto es incorrecto';
            return false;
        }
    }

    public function setIdcolor($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idcolor = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del color es incorrecto';
            return false;
        }
    }

    public function setnumeroTalla($value)
    {
        if (Validator::validateAlphabetic($value)) {
            $this->numeroTalla = $value;
            return true;
        } else {
            $this->data_error = 'El numero de la talla es incorrecto';
            return false;
        }
    }
    
    public function setnombreColor($value)
    {
        if (Validator::validateAlphabetic($value)) {
            $this->nombreColor = $value;
            return true;
        } else {
            $this->data_error = 'El nombre del color es incorrecto';
            return false;
        }
    }

    public function setIdtalla($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idtalla = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del talla es incorrecto';
            return false;
        }
    }

    public function setExistencias($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->existencias = $value;
            return true;
        } else {
            $this->data_error = 'Las existencias debe ser un número entero positivo';
            return false;
        }
    }

    public function setImagen($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 1000)) {
            $this->imgproducto = Validator::getFileName();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imgproducto = $filename;
            return true;
        } else {
            $this->imgproducto = 'default.png';
            return true;
        }
    }

    // Metodo adicional de error
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}