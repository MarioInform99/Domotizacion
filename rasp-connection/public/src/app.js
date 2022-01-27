"use strict";
import Home from "../src/components/pages/Home/Home.js";
import Config from "../src/components/pages/Config/Config.js";
import Historial from "../src/components/pages/Historial/Historial.js";
import Developer from "../src/components/pages/Developer/Developer.js";
document.addEventListener("DOMContentLoaded", () => {
  const e = React.createElement;
  window.addEventListener("DOMContentLoaded", () => {
    const inicio = document.getElementById("Inicio");
    const config = document.getElementById("Configuracion");
    const historial = document.getElementById("Historial");
    const desarrollador=document.getElementById("Desarrollador");
    const btn=document.getElementById('boton0');
    //Pagamos y encendemos
    //No hace falta instanciar un objeto, mientras exista en la clase una funcion llamada render
    //Mostramos el contenido
    inicio.onclick = () => {
      ReactDOM.render(e(Home), app);
    };
    config.onclick = () => {
      ReactDOM.render(e(Config), app);
    };
    historial.onclick = () => {
      ReactDOM.render(e(Historial), app);
    };
    desarrollador.onclick=()=>{
      ReactDOM.render(e(Developer),app);
    }
  });
  /******************/
  let URL = window.location.hash;
  let indiceURL = URL.substr(2); //Devuelve la ruta en la que estamos
  switch (indiceURL) {
    case "historial":
      ReactDOM.render(e(Historial), app);
      break;
    case "configuracion":
      ReactDOM.render(e(Config), app);
      break;
    case "inicio":
    default:
      ReactDOM.render(e(Home), app);
      break;
  }
});
