<?php
require_once('./Model/ClassJWT.php');
require_once('./Model/BaseDatos.php');
$ObjBD=new BaseDatos();
$ObjJWT=new ClassJWT();
$conexion=$ObjBD->conectedBD();
//Intercambio de recursos de origen cruzado
header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json; charset:UTF-8'); //Tipo de contenido y codificacion
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST"); 
header("Allow: POST");
//Access-Control-Allow-Headers: se usa para la respuesta a una solicitud  Prefligth
// una petición CORS (Cross-Origin Resource Sharing)

function menssage($exito,$status,$msg,$file=[]){
    //Juntos los arrays
    return array_merge([
        'exito'=>$exito,
        'status'=>$status,
        'mensaje'=>$msg,
    ],$file);
}

$lanzarDatos=[];
$data=json_decode(file_get_contents("php://input"),true);
if($_SERVER['REQUEST_METHOD']!='POST'){
    $lanzarDatos=menssage(0,404,'Not Found!');

}else if(!isset($data['correo']) || !isset($data['password']) || empty($data['correo']) || empty($data['password'])){
    //Nos servira para ver lo siguiente campos de la tabla
    $atributos=['atributos'=>['correo','password']];
    $lanzarDatos=menssage(0,442,'Please Fill in all Required Fields',$atributos);
}else{
    $email=trim($data['correo']);
    $password=trim($data['password']);

    if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
        $lanzarDatos=menssage(0,422,'Correo incorrecto');
    }else if(strlen($password)<3){
        $lanzarDatos=menssage(0,422,'Your password is 4');
    }else{
        try{
            $queryAdmin=$conexion->prepare("SELECT * FROM administradores WHERE CORREO=:email ;");
            $queryAdmin->bindParam(':email',$email);
            $queryAdmin->execute();
            $queryUser=$conexion->prepare("SELECT * FROM  usuarios WHERE CORREO=:email ;");
            $queryUser->bindParam(':email',$email);
            $queryUser->execute();

            if($queryAdmin->rowCount()!=0){
                $row=$queryAdmin->fetch(PDO::FETCH_ASSOC);
                if(password_verify($password,$row['PASSWORD'])){
                    $token=$ObjJWT->jwtEncodeData(
                        'http://localhost/Domotizacion/API/',
                        array('userid'=>$row['ID'])
                    );
                    $lanzarDatos=[
                        'exito'=>1,
                        'mensaje'=>'Loggen Admin',
                        'token'=>$token
                    ];
                }else{
                    
                     $lanzarDatos=menssage(0,422,'Contraseña incorrecta');
                }

            }else if($queryUser->rowCount()){
                
                $row=$queryUser->fetch(PDO::FETCH_ASSOC);
                if(password_verify($password,$row['PASSWORD'])){
                    $token=$ObjJWT->jwtEncodeData(
                        'http://localhost/Domotizacion/API/',
                        array('userid'=>$row['ID'])
                    );
                    $lanzarDatos=[
                        'exito'=>1,
                        'mensaje'=>"Loggen in",
                        'token'=>$token
                    ];
                }else{
                    $lanzarDatos=menssage(0,442,'Contraseña incorrecta');
                }
            }else{
                $lanzarDatos=menssage(0,442,'Correo incorrecto');
            }

        }catch(PDOException $e){
            $lanzarDatos=menssage(0,500,$e->getMessage());
        }
    }
}

echo json_encode($lanzarDatos);
