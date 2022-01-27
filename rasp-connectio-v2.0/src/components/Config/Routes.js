import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import InicioSesion from "../Pages/Inicio-Sesion/Inicio-Sesion.js";
import Registro from '../Pages/Registrarse/Registrase.js';

const RouterConfig = (props) => {
  const menus = props.menus;
  console.log(menus);
  let listLink = props.menus.map((menus) => (
    <li>
      <Link to={menus.path}>{menus.name}</Link>
    </li>
  ));
  return (
    <Router>
      <div className="Menu">
        <ul>{listLink}</ul>
        <Switch>
          <Route exact path="/" component={InicioSesion}/>
          <Route path="/inicio-sesion" comoponent={InicioSesion}/>
          <Route path="/registrarse" component={Registro}/>
        </Switch>
      </div>
    </Router>
  );
};

export default RouterConfig;
