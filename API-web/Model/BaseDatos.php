<?php 
 class BaseDatos{
    public $host_db='localhost';
    public $db_name='domotizacion';
    public $user='root';
    public $password='';

    public function conectedBD(){
        try{
            $conexion=new PDO("mysql:host=$this->host_db;dbname=$this->db_name;charset:utf-8",$this->user,$this->password);
            return $conexion;
        }catch(PDOException $e){
            echo $e->getMessage();
        }
        
    }
}