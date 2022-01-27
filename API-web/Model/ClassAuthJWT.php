<?php
include_once('./Model/ClassJWT.php');
class ClassAuthJWT extends ClassJWT{
    
    protected $db;
    protected $headers;
    protected $token;
    
    public function __construct($db,$headers){
        parent::__construct();
        $this->db=$db;
        $this->header=$headers;
    }

    public function isAuth(){
        if(array_key_exists('Authorization',$this->header) && !empty(trim($this->header['Authorization']))){
            $this->token=explode(' ',trim($this->header['Authorization']));
            if(isset($this->token[1]) && !empty(trim($this->token[1]))){
                $data=$this->jwtDecodeData($this->token[1]);
                if(isset($data['auth']) && isset($data['data']->userid) && $data['auth']){
                    $user=$this->fetchUser($data['data']->userid);
                    return $user;
                }
            }
        }
    }

    public function fetchUser($userid){

        try{
            $sntAdmin=$this->db->prepare("SELECT * FROM administradores WHERE ID = :id ;");
            $sntAdmin->bindParam(':id',$userid,PDO::PARAM_INT);
            $sntAdmin->execute();
            $snt=$this->db->prepare("SELECT * FROM usuarios WHERE ID  = :id ;");
            $snt->bindParam(':id',$userid,PDO::PARAM_INT);
            $snt->execute();

            if($sntAdmin->rowCount()!=0){
                $row=$sntAdmin->fetch(PDO::FETCH_ASSOC);
                return [
                    'exito'=>1,
                    'status'=>200,
                    'rol'=>'admin',
                    'user'=>$row
                ];
            }else if($snt->rowCount()!=0){
                $row=$snt->fetch(PDO::FETCH_ASSOC);
                return [
                    'exito'=>1,
                    'status'=>200,
                    'rol'=>'user',
                    'user'=>$row
                ];
                
            }
            return null;
        }catch(PDOException $ex){
            echo  $ex->getMessage();
        }
    }



}