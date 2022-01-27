<?php
require_once('./Model/ClassJWT.php');
require_once('./Model/BaseDatos.php');
$ObjBD=new BaseDatos();
$ObjJWT=new ClassJWT();
$conexion=$ObjBD->conectedBD();
//Intercambio de recursos de origen
header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json; charset:UTF-8'); //Tipo de contenido y codificacion
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST"); 
header("Allow: POST");

$data=json_decode(file_get_contents('php://input')); 
$lanzardatos=[];
date_default_timezone_set('UTC');
$fecheInscription=date('o-n-d');
function menssage($exito,$status,$msg,$file=[]){
    //Juntos los arrays
    return array_merge([
        'exito'=>$exito,
        'status'=>$status,
        'mensaje'=>$msg,
    ],$file);
}
//CORREO NOMBRE APELLIDOS PASSWORD FECHA NACIMIENTO
//Evitamos que se introdusca el valor
if($_SERVER['REQUEST_METHOD']!='POST'){
    $lanzardatos=menssage(0,404,'NOT FOUND');

}else if(!isset($data->nombre) || !isset($data->apellidos) || !isset($data->correo) || !isset($data->password)){
    $file=['atributos'=>['nombre','apellidos','correo','password']];
    $lanzardatos=menssage(0,442,'Required files',$file);
}else if(empty($data->nombre)){
    $lanzardatos=menssage(0,442,'Nombre vacío');
}else if(empty($data->apellidos)){
    $lanzardatos=menssage(0,442,'Apellido vacío');
}else{
    $nombre=trim($data->nombre);
    $apellidos=trim($data->apellidos);
    $correo=trim($data->correo);
    $password=trim($data->password);
    // $fecha=trim($data->fechaNaci);
    // $arryFecha=explode('/',$fecha);
    
    if(preg_match("/^[[:digit:]]+$/",$nombre)){
        $lanzardatos=menssage(0,442,'Nombre incorrecto');
    }else if(preg_match("/^[[:digit:]]+$/",$apellidos)){
        $lanzardatos=menssage(0,442,'Apellido incorrect');
    }else if(!filter_var($correo,FILTER_VALIDATE_EMAIL)){
        $lanzardatos=menssage(0,442,'Correo incorrecto');
    // }else if(count($arryFecha)!=3 || !checkdate($arryFecha[1],$arryFecha[0],$arryFecha[2])){
    //     $lanzardatos=menssage(0,442,'Fecha incorrecta');
    }else{
        try{
            $query=$conexion->prepare("SELECT * FROM usuarios WHERE CORREO=:correo");
            $query->bindParam(':correo',$correo);
            $query->execute();
            if($query->rowCount()==0){
                $serial='0000000000';
                $insertSQL=$conexion->prepare("INSERT INTO `usuarios`(`SERIAL-RASPB`,`CORREO`, `NOMBRE`, `APELLIDOS`, `PASSWORD`,`FECHA-INCRIPCIÓN`) VALUES  (:rasp,:correo,:nombre,:apellidos,:password,:fecha);");
                $insertSQL->bindParam(':rasp',$serial);
                $insertSQL->bindParam(':correo',$correo);
                $insertSQL->bindParam(':nombre',$nombre);
                $insertSQL->bindParam(':apellidos',$apellidos);
                $password=password_hash($password,PASSWORD_DEFAULT);
                $insertSQL->bindParam(':password',$password);
                $insertSQL->bindParam(':fecha',$fecheInscription);
                $insertSQL->execute();
                $info=['correo'=>$correo,'password'=>$password];
                $lanzardatos=array_merge([
                    'exito'=>1,
                    'status'=>201,
                    'mensajeExito'=>"Registrado correctamente",
                ],$info);
                
            }else{
                $lanzardatos=menssage(0,442,'Correo invalid, already exist');
            }
        }catch(PDOException $e){
            $lanzardatos=menssage(0,500,$e->getMessage());
        }
    }
}


echo json_encode($lanzardatos);