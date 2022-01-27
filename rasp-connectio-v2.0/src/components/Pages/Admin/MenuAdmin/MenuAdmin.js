import React,{useState} from 'react';
import './MenuAdmin.css';
import Router from './router.config.js';
import {ChatLeftText} from 'react-bootstrap-icons';
import {BarChartLine} from 'react-bootstrap-icons';
import {CalendarCheck} from 'react-bootstrap-icons';
import {ListUl} from 'react-bootstrap-icons';
import {HouseDoorFill} from 'react-bootstrap-icons';
import{LightbulbFill} from 'react-bootstrap-icons';
import {Bell} from 'react-bootstrap-icons';
import {Gear} from 'react-bootstrap-icons';
import logoAdmin from '../../../../img/adminFoto.svg.png';
import Ajustes from '../ContentAdmin/Ajustes';
const MenuAdmin=()=>{
  const state=[{
    notificacion:false,
  }];
  const [States,setStates]=useState(state);
  const CheckingBox=()=>{
    if(States.notificacion){
    setStates({
      notificacion:false
    });
    }else{
      setStates({
        notificacion:true
      });
    }
  } 
  
    const menu = [
      {
        name:<LightbulbFill color="white" size={30}/>,
      },
      {
        name:<HouseDoorFill color="white" size={30}/>,
        path:"/"
      },
    {
      name: <ChatLeftText color="white" size={30}/>,
      path: "/mensajes",
    },
    {
      name:<CalendarCheck  color="white" size={30}/>,
      path:'/calendario'
    },
    {
      name:<ListUl color="white" size={30}/>,
      path:'/listado'
    }
  ];
    return(
    <div className='contanierMenu'>
    <div className="headerAdmin">
      <Bell color="white" size={30} className="notificaciones"/>
      <Ajustes estado={States.notificacion}/>
      <a onClick={CheckingBox}>
      <Gear color="white" size={30} className="iconAjustes"/></a>
      <img src={logoAdmin} alt="logo" className="foto"/>
    </div>
        <Router menus={menu}/>
    </div>)
}
export default MenuAdmin;