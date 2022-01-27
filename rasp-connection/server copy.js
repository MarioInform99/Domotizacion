const express=require('express');
const app=express();
const url = require('url');
const path = require('path');
const port=8081;
const handler=(req,res)=>{
  fs.readFile(__dirname + '/index.html', (err, data)=>{ //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }

    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    console.log('filename='+filename);
    var extname = path.extname(filename);
    if (filename=='/') {
      console.log('retrieving default index.html file');
      filename= './index.html';
    }
    
    // Initial content type
    var contentType = 'text/html';
    
    // Check ext and set content type
    switch(extname) {
	case '.js':
	    contentType = 'text/javascript';
	    break;
	case '.css':
	    contentType = 'text/css';
	    break;
	case '.json':
	    contentType = 'application/json';
	    break;
	case '.png':
	    contentType = 'image/png';
	    break;
	case '.jpg':
	    contentType = 'image/jpg';
	    break;
	case '.ico':
	    contentType = 'image/png';
	    break;
    }

    console.log("Conexion establecida en el puerto 8081");
    res.writeHead(200, {'Content-Type': contentType}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}
const http=require('http').createServer(handler);
const fs=require('fs');
const io=require('socket.io')(http);
http.listen(port);

// app.use(express.static('public'),()=>{
//     console.log("Redirigiendo a la carpeta public dir");
// });

// app.listen(port,()=>{
//     console.log(`El servidor esta corriendo en el puerto ${port} dir`);
// });


// io.sockets.on('connection', (socket)=>{// WebSocket Connection
//   let lightvalue = 0; //static variable for current status
//   socket.on('light', (data)=>{ //get light switch status from client
//     lightvalue = data;
//     if (lightvalue) {
//       console.log(lightvalue); //turn LED on or off, for now we will just show it in console.log
//     }
//   });
// });
