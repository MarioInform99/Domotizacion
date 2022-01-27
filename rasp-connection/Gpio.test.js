
window.addEventListener("DOMContentLoaded", () => {
  var socket = io();
  console.log("Gpio led archiv");
  const btn = document.getElementById("boton0");
  btn.onclick = () => {
    console.log("CLick");
    console.log(btn.checked);
    socket.emit('GPIO4T');
    if(btn.checked===true){
      socket.emit('GPIO4',1);
    }else{
      socket.emit('GPIO4',0);
    }
  };
  socket.on("GPIO4", (data) => {
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    btn.checked = data;
  });
});
