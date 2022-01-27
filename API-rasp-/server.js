const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const app=express();
const port=5002;
app.use(cors());    
app.use(express.json()); 

const pool=mysql.createPool({
    connectionLimit:10,
    host:'192.168.88.254',
    user:'root',
    password:'',
    database:'domotizacion'

});

app.get('',(req,res)=>{
    res.set({
       'Content-Type':'application/json',
       'charset':'UTF-8',
       'Access-Control-Allow-Headers':' Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        "Access-Control-Allow-Methods": "GET",
        'Allow': 'GET',
    })
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`Conexion establecidad ${connection.threadId}`)

        connection.query('SELECT * FROM usuarios',(err,rows)=>{
            connection.release();
            if(!err){
                res.send(rows);
            }else{
                console.error(err);
            }
        });
    })
})

app.get('/rasp',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err)throw err
        console.log('Peticion de raspberry, a la tabla raspberrydatas');
        let id='00000000dba6c620';
                connection.query('SELECT * FROM raspberrydatas WHERE `ID-RASPB`="00000000dba6c620"',(err,rows)=>{
            connection.release();
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        });
    })
})

app.listen(port,()=>{console.log(`Serve listen port ${port}`)});
