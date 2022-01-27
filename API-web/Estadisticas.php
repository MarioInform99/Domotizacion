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
$lanzardos=[
    'exito'=>0,
    'status'=>401,
    'mensaje'=>'No autorizado'
];
$data=json_decode(file_get_contents("php://input"),true);
if(array_key_exists('Authorization',$headerAll) && !empty(trim($headerAll['Authorization']))){
        $token=explode(' ',trim($headerAll['Authorization']));
        if(isset($token[1]) && !empty(trim($token[1]))){
            $token=$obJWT->jwtDecodeData($token[1]);
            if(isset($data['fecha']) && !empty($data['fecha'])){
                $fecha=$data['fecha'];
                $query=$conexion->prepare('SELECT * FROM  `usuarios` WHERE `FECHA-INCRIPCIÓN`=:fecha ;');
                $query->bindParam(':fecha',$fecha);
                $query->execute();
                $lanzardos=$query->fetchAll(PDO::FETCH_ASSOC);
            }
        }
    }
    echo json_encode($lanzardos);
