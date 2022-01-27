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
$data=json_decode(file_get_contents("php://input"),true);
$lanzandar=[
    'exito'=>0,
    'status'=>401,
    'mensaje'=>'No autorizado'
];
if(array_key_exists('Authorization',$headerAll) && !empty(trim($headerAll['Authorization']))){
        $token=explode(' ',trim($headerAll['Authorization']));
        if(isset($token[1]) && !empty(trim($token[1]))){
            $token=$obJWT->jwtDecodeData($token[1]);
            if(isset($data[0]["serie"]) && !empty($data[0]["serie"]) && isset($data[0]["ip"]) && !empty($data[0]["ip"]) && isset($data[0]["userId"]) && !empty($data[0]["userId"])){
                $queryDos=$conexion->prepare('SELECT*FROM `home-raspberry` WHERE ID=:id AND IP=:ipRasp ;');
                $queryDos->bindParam(':id',$data[0]["serie"]);
                $queryDos->bindParam(':ipRasp',$data[0]["ip"]);
                $queryDos->execute();
                if($queryDos->rowCount()!=0){
                    $query=$conexion->prepare("UPDATE `usuarios` SET `SERIAL-RASPB`=:rasp WHERE `ID`=:id ;");
                    $query->bindParam(':rasp',$data[0]['serie']);
                    $query->bindParam(':id',$data[0]['userId']);
                    $query->execute();
                    $lanzandar=[
                        'status'=>1,
                        'mensaje'=>'Se ha registrado correctamente la raspberry'
                    ];
                }else{
                    $lanzandar=[
                        'status'=>0,
                        'mensaje'=>'Los datos no coinciden'
                    ];
                }
            }
        }
    }
    echo json_encode($lanzandar);
