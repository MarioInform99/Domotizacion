"use strict";
import Routes from "../../settings/routes/Routes.js";
export default class NavMenu extends React.Component {
  constructor(key) {
    super(key);
    this.routesMenu = new Routes();
  }

  setMenuRouting() {
    console.log("Hola");
  }

  render() {
    // Asignamos un JSON para posteriormente usarlo como menu
    console.log("Renderizado Menu");
    const routes = [
      {
        path: "/inicio",
        name: "Inicio",
      },
      {
        path: "/configuracion",
        name: "Configuracion",
      },
      {
        path: "/historial",
        name: "Historial",
      },
      {
        path:"/desarrollador",
        name:"Desarrollador",
      }
    ];
    this.routesMenu.setPathJSON(routes); // Objeto
    const ContentRouters = this.routesMenu.render();

    window.addEventListener("DOMContentLoaded", () => {
      
      const router = new VueRouter({ routes }); // short for `routes: routes`
      const app = new Vue({ router }).$mount("#root");
    });

    // Devolvemos el contenido del menu
    return React.createElement("div", {}, ContentRouters);
  }
}
