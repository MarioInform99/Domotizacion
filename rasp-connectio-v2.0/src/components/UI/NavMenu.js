import React from "react";
import "./NavMenu.css";
import Routes from "../Config/Routes";
import casa from "../../img/2036.jpg";
import Logo from "../UI/logo.js";

const NavMenus = () => {
  
  const menu = [
    {
      name: "Iniciar Sesión",
      path: "/inicio-sesion",
    },
    {
      name:"Registrarse",
      path:"/registrarse"
    }
  ];

  return (
    <div>
      <div className="navbar">
        <Routes menus={menu} />
      </div>
      <img src={casa} alt="casa" id="casa"/>
      <Logo/>
    </div>
  );
};

export default NavMenus;
