'use strict';
export default class Config extends React.Component{
    constructor(key){
        super(key);
        this.created=React.createElement;
    }

    render(){
        const d=this.created('div',{className:"Hola"},'Configuracion');
        return d;
    }
}