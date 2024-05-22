<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/categoria_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */

 class CategoriaData extends CategoriaHandler{

    private $data_error = null; 
    private $filename = null; 

    //metodos para validar los datos
    public function setId($value){
        if(Validator:: validateNaturalNumber($value)){
            $this -> id = $value;
            return true; 

        }else{
            $this -> data_error = 'Identificador de categoría incorrecto'; 
            return false; 
        }
    }

    public function setNombre($value, $min = 4, $max =30){
        
        if(!Validator::validateAlphanumeric($value)){
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        }elseif (Validator::validateLength($value, $min, $max)) {
            $this -> nombre = $value;
            return true;
          }else{
            $this-> data_error = 'El nombre debe de tener una longitud entre' .$min. 'y' .$max; 
            return false; 
        }
    }


 }