"use strict";
import NavMenu from "./components/UI/NavMenu.js";
document.addEventListener("DOMContentLoaded", () => {
  console.log("App principal");
  
  const e = React.createElement;
  const root = document.getElementById("root");
  console.log("test");
  //No hace falta instanciar un objeto, mientras exista en la clase una funcion llamada render
  ReactDOM.render(e(NavMenu), root);
  
});
