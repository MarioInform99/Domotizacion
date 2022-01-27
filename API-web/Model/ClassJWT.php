<?php
require './vendor/firebase/php-jwt/src/JWT.php';
require './vendor/firebase/php-jwt/src/ExpiredException.php';
require './vendor/firebase/php-jwt/src/SignatureInvalidException.php';
require './vendor/firebase/php-jwt/src/BeforeValidException.php';

use \Firebase\JWT\JWT;

class ClassJWT{

    protected $jwt_secret;
    protected $token;
    protected $timeUsing;
    protected $expiration;
    protected $jwt;
    //Al iniciar el constructor daremos un tiempo para 
    //la validacion del Token
    public function __construct(){
        //Controlamos la hora a la que se usa el token
        date_default_timezone_set('Europe/Madrid');
        $this->timeUsing=time();
        //Expiracion del tiempo de uso del token
        $this->expiration=($this->timeUsing+3600);
        $this->jwt_secret='secret';
    }

    //Codificamos los datos
    public function jwtEncodeData($iss,$data){
        //generamos el token
        $this->token=array(
            'iat'=> $this->timeUsing,//inicio del tiempo del token
            'exp'=>$this->expiration, //Tiempo que expira el token 
            'iss'=>$iss,
            'aud'=>$iss,
            'data'=>$data

        );
        $this->jwt=JWT::encode($this->token,$this->jwt_secret);
        return $this->jwt;        
    }

    public function jwtDecodeData($jwt_token){
        $decode=JWT::decode($jwt_token,$this->jwt_secret,array('HS256'));
        return [
            'auth'=>1,
            'data'=>$decode->data
        ];
    }

}