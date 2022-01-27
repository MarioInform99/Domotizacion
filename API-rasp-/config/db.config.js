'user strict';
const mysql=require('mysql');
const conexion=mysql.createConnection({
    host:'192.168.88.253',
    user:'root',
    password:'',
    database:'domotizacion'
});
conexion.connect((err)=>{
    if(err){
        return console.error(err);
    }
    console.log('Database Conected');
});
module.exports=conexion;