import React from 'react';
import TableUser from "../UI/TableUser.js";
export default class User extends React.Component{
    constructor(){
        super();
        this.state=({
            db:[]
        });
        this.mostrarUsuarios();
    }

    mostrarUsuarios(){
        fetch('http://localhost/Domotizacion/raspb/config/index.php')
        .then((response)=>response.json())
        .then((responseJSON)=>{
            this.setState({
                db:responseJSON
            });
            console.log(this.state.db);
        });
    }
    render(){
        return(<div>
            <TableUser arUser={this.state.db}/>
        </div>);
    }

}