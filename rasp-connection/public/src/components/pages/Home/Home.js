"use strict";

import BoxShadow from "../../UI/BoxShadow.js";
import Form from "../../UI/Form.js";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.created = React.createElement;
    this.form = new Form();
    this.BoxShadow=new BoxShadow();
  }
  getForm() {
  }
  
  getBoxShadow(){
    this.BoxShadow.setTitle("Prueba");
    const array=[this.BoxShadow.render()];
    this.BoxShadow.setTitle("Test1");
    const newOb=this.BoxShadow.render();
    array.push(newOb); 
    return array;
  }
  render() {
    // const i=this.created('input',{class:"Hola",type:"number"},);
    const d = this.created("div", { className: "Hola", id: "containerApp" },this.getBoxShadow());
    return d;
  }
}
