'use strict';
export default class Developer extends React.Component{
    constructor(props){
        super(props);
        this.created=React.createElement;
    }

    render(){
        const d=this.created('div',{className:"Hola"},"Desarrollador");
        return d;
    }
}