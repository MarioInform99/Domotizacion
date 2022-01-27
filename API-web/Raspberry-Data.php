<?php
require_once('./Model/ClassJWT.php');
require_once('./Model/BaseDatos.php');
$ObjBD=new BaseDatos();
$obJWT=new ClassJWT();
$conexion=$ObjBD->conectedBD();
//Intercambio de recursos de origen cruzado
header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json; charset:UTF-8'); //Tipo de contenido y codificacion
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST"); 
header("Allow: POST");

$headerAll=getallheaders();
$data=[
    'exito'=>0,
    'status'=>401,
    'mensaje'=>'No autorizado'
];
        
if(array_key_exists('Authorization',$headerAll) && !empty(trim($headerAll['Authorization']))){
        $token=explode(' ',trim($headerAll['Authorization']));
        if(isset($token[1]) && !empty(trim($token[1]))){
            $token=$obJWT->jwtDecodeData($token[1]);
            $query=$ObjBD->conectedBD()->prepare("SELECT * FROM `home-raspberry`");
            $query->execute();
            $data=$query->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    echo json_encode($data);
