<?php
// Se incluyen las credenciales para conectar con la base de datos.
require_once('config.php');

/*
 *   Clase para realizar las operaciones en la base de datos.
 */
class Database
{
    // Propiedades de la clase para manejar las acciones respectivas.
    private static $connection = null;
    private static $statement = null;
    private static $error = null;

    /*
     *   Método para ejecutar las sentencias SQL.
     *   Parámetros: $query (sentencia SQL) y $values (arreglo con los valores para la sentencia SQL).
     *   Retorno: booleano (true si la sentencia se ejecuta satisfactoriamente o false en caso contrario).
     */
    public static function executeRow($query, $values)
    {
        try {
            // Se crea la conexión mediante la clase PDO con el controlador para MariaDB.
            self::$connection = new PDO('mysql:host=' . SERVER . ';dbname=' . DATABASE, USERNAME, PASSWORD);
            // Se prepara la sentencia SQL.
            self::$statement = self::$connection->prepare($query);
            // Se ejecuta la sentencia preparada y se retorna el resultado.
            return self::$statement->execute($values);
        } catch (PDOException $error) {
            // Se obtiene el código y el mensaje de la excepción para establecer un error personalizado.
            self::setException($error->getCode(), $error->getMessage());
            return false;
        }
    }
}