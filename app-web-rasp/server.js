const express=require('express');
const http=require('http');
const port=3000;
const app=express();
const server=http.createServer(app);

server.listen(port,(error)=>{
    if(error){
       return  console.error(error);
    }
    console.log(`Se ha iniciado la conexión al servidor en el puerto ${port}`);
});

app.use(express.static('public'),()=>{

    console.log("Redirigiendo a la carpeta public");
});