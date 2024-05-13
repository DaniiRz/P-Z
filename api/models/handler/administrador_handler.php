<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../api/helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */

 class AdministradorHandler{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $clave = null;


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, correo_admin, clave_admin
                FROM tb_admins
                WHERE apellido_admin LIKE ? OR nombre_admin LIKE ?
                ORDER BY apellido_admin';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_admins(nombre_admin, apellido_admin, correo_admin, clave_admin)
                VALUES(?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->clave);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, correo_admin
                FROM tb_admins
                ORDER BY apellido_admin';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, correo_admin
                WHERE id_admin = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_admins
                SET nombre_admin = ?, apellido_admin = ?, correo_admin = ?
                WHERE id_admin = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_admins
                WHERE id_admin = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

 }