<?php

// Se incluyen las clases
require_once('../../helpers/validator.php');
require_once('../../models/handler/subcategoria_handler.php');

// Clase para manejar el encapsulamiento de datos
class SubcategoriaData extends SubcategoriaHandler
{
    
    // Artributo adicional
    private $data_error = null;
    private $filename = null;

    // Metodos para validar y establecer los datos
    public function setIdSubCategoria($value){
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } 
        
        else {
            $this->data_error = 'El identificador de la categoria es incorrecto';
            return false;
        }
    }

    public function setIdCategoria($value){
        if (Validator::validateNaturalNumber($value)) {
            $this->idcategoria = $value;
            return true;
        }  else {
            $this->data_error = 'El identificador de la categoria es incorrecto';
            return false;
        }
    }

    public function setNombreSubCategoria($value, $min = 2, $max= 255){
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } 
        
        elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombresubcategoria = $value;
            return true;
        } 
        
        else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setImagenSubcategoria($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 500)) {
            $this->imagen = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagen = $filename;
            return true;
        } else {
            $this->imagen = 'default.png';
            return true;
        }
    }    
    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['imagen_subcategoria'];
            return true;
        } else {
            $this->data_error = 'Subcategoría inexistente';
            return false;
        }
    }

    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}