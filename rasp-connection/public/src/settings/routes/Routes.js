
export default class Routings extends React.Component {
  constructor(props) {
    super(props);
    this.menuRouting = [];
    this.created=React.createElement;
  }

  setPathJSON(json) {
    console.log(`JSon en Routing`);
    this.menuRouting = json;
    console.log(this.menuRouting);
  }

  //Creamos las etiquetas para el routing de las paginas
  getTagMenu(){
    //Añadimos a una constante para despues recorrerlo con el bucle
    const jsonPaths=this.menuRouting;
    let paths=[];//Variable que contiene las rutas
    //Añadimos y creamos las etiquetas que se convertiran enlaces
    let format=jsonPaths.map((jsonPaths)=>{
      paths.push(this.created('router-link',{to:jsonPaths.path,class:"menu",id:jsonPaths.name},jsonPaths.name));
    });
    paths.push(this.created('router-view',{},''));//etiqueta para poder visualizarlo
    //Añadimos dentro del div una clase container
    const NavMenu=this.created('div',{className:"containerMenu"},paths);
    const ContainerMenu=this.created('div',{className:"containers"},NavMenu);
    return ContainerMenu;
  }
  render() {
    //Renderizamos el contenido
    console.log("Renderidar Menu");
    let tagsVueRouter=this.getTagMenu();
    return tagsVueRouter;
  }
}