import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MensajeAdmin from "../MensajesAdmin";
import TablaUser from '../ContentAdmin/TableUser';
import './router.confi.css';
import renderLineChart from '../ContentAdmin/BarChart';
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
      <div className="MenuAdmin">
        <ul>{listLink}</ul>
      </div>
      <Switch>
      <Route exact path="/" component={renderLineChart}/>
          <Route path="/mensajes" component={MensajeAdmin}/>
          <Route path="/listado" component={TablaUser}/>
        </Switch>
    </Router>
  );
};

export default RouterConfig;
