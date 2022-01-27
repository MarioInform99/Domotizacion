<?php
require_once('./Model/ClassAuthJWT.php');
require_once('./Model/BaseDatos.php');
$ObjBD=new BaseDatos();
$conexion=$ObjBD->conectedBD();
//Intercambio de recursos de origen cruzado
header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json; charset:UTF-8'); //Tipo de contenido y codificacion
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST"); 
header("Allow: POST");

$headerAll=getallheaders();
$ObjAuthJWT=new ClassAuthJWT($conexion,$headerAll);

$data=[
    'exito'=>0,
    'status'=>401,
    'mensaje'=>'No autorizado'
];

if($ObjAuthJWT->isAuth()){
    $data=$ObjAuthJWT->isAuth();
}

echo json_encode($data);