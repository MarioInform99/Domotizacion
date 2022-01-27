'use strict';
export default class Historial1 extends React.Component{
    constructor(key){
        super(key);
        this.created=React.createElement;
    }

    render(){
        const d=this.created('div',{className:"Hola"},'Historial');
        return d;
    }
}