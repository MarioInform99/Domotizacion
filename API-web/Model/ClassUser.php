<?php
include_once("./Model/BaseDatos.php");
include_once('./Model/ClassJWT.php');
// include_once('./Model/ClassAuthJWT.php');
//Creamos nuestra propia api para poder comunicarnos con react
class ClassUser extends BaseDatos{

    public function __constructor(){
        $this->ObjJWT=new ClassJWT();
    }

    public function getUsers(){
        $Users=$this->conectedBD()->prepare('SELECT * FROM usuarios');
        $Users->execute();
        $json=array();
        $i=0; //contador
        while($fetch=$Users->fetch(PDO::FETCH_ASSOC)){
            $json[$i]=[
                "ID"=>$fetch['ID'],
                "CORREO"=>$fetch['CORREO'],
                "NOMBRE"=>$fetch['NOMBRE'],
                "APELLIDOS"=>$fetch['APELLIDOS'],
                "CONTRASEÑA"=>$fetch['PASSWORD']
            ];
            $i++;
        }
        header('Access-Control-Allow-Origin:*');
        header('Content-type:application/json');
        echo json_encode($json);
    }
    public function createUser(){
        
    }

    public function loginUser(){
    }

    public function menssage($exito,$status,$msg,$file=[]){
        //Juntos los arrays
        return array_merge([
            'exito'=>$exito,
            'status'=>$status,
            'mensaje'=>$msg,
        ],$file);
    }
}