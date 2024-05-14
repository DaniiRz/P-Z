<?php

// Se incluyen las clases
require_once('../../helpers/validator.php');
require_once('../../models/handler/productos.handler.php');

// Clase para manejar el encapsulamiento de datos
class SubCategoriaData extends CategoriaHandler
{
    
    // Artributo adicional
    private $data_error = null;

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
            $this->id = $value;
            return true;
        } 
        
        else {
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
            $this->nombre = $value;
            return true;
        } 
        
        else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }
}