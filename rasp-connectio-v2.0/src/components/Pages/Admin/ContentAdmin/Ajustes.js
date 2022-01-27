import React, { useContext } from 'react';
import {MyContext} from '../../../Config/Context';
import './Ajustes.css';
const Ajustes=(props)=>{
    const {logoutUser}=useContext(MyContext);
    console.log(props.estado);
    if(props.estado){
        return(<div className="ajusteDiv">
            <a></a>
            <a  onClick={logoutUser}>Cerrar Sesión</a>
        </div>);
    }else{
        return(<div></div>);
    }
}
export default  Ajustes;