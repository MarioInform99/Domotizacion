const express=require('express');
const app=express();
const http=require('http');
const port=3001;
const server=http.createServer(app);
server.listen(port,(err,res)=>{

    if(err){
        res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
        return console.error(err);
    }
    console.log(`Conexion exitosa http://localhost:${port}`);
});

app.use(express.static('./src/index.js'),()=>{
    console.log("Redirigiendo a la carpeta public");
});
