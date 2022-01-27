<?php
include_once('./Model/ClassUser.php');
include_once('./Model/ClassJWT.php');
//Usaremos Request_method para ver las variables de metodos que nos pasan
//GET para hacer lecturas de los recursos
//POST creacion de nuevas entidades o recursos
if($_SERVER['REQUEST_METHOD']==='GET'){
    $user=new ClassUser();
    // $user->getUsers();
    $user->loginUser();
}//else if(($_SERVER['REQUEST_METHOD']==='POST'){
    
// }