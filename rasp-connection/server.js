const express=require('express');
const http=require('http');
const port=8081;
const app=express();
const server=http.createServer(app);
// const {Server}=require('socket.io');
// const io=new Server(server);
// const Gpio=require('onoff').Gpio;
// const Led4=new Gpio(4,'out');

// let LED4Value=0;
server.listen(port,(error)=>{
    if(error){
        return console.error(error);
    }
    // Led4.writeSync(LED4Value);
    // console.log(`GPIO 4 status: ${LED4Value}`)
    console.log(`Server escuchando al en el puerto ${port}`);
});

// Ejecutar cuando termine el localhost, para apagar 
// process.on('SIGINT',()=>{
//     Led4.writeSync(0);
//     Led4.unexport();
//     process.exit();
// });

// io.on('connection',(socket)=>{
//     console.log('Conexion del cliente, Mandando estados del LED');
//     socket.emit('GPIO4',LED4Value);

//     socket.on('GPIO4T',(data)=>{
//         if(LED4Value){
//             LED4Value=0;
//         }else{
//             LED4Value=1;
//         } 
//         console.log(`Nuevo valor GPIO4 value = ${LED4Value}`)
//         Led4.writeSync(LED4Value);
//         io.emit('GPIO4',LED4Value);
//     });
    
// });

//Redirigimos las páginas del archivo
app.use(express.static('public'),()=>{
    console.log("Redirigiendo a la carpeta public dir");
});
