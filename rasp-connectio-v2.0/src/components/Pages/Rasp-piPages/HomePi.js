import React, { useContext } from "react";
import { MyContext } from "../../Config/Context.js";
import NavMenu from '../../UI/NavMenu.js';
import './HomePi.css';
import HomeAdmin from '../Admin/HomeAdmin.js';
import PopUpSerialNumber from './Pages-RaspPi/PopUp.js';
const HomePi = () => {
  const { rootState, logoutUser } = useContext(MyContext);
  console.log(rootState)
  const { isAuth, theUser,rolAdmin } = rootState;
  console.log('test');
  console.log(isAuth);
  console.log(theUser);
  if (isAuth && rolAdmin==='user') {
    return (
      <div className="userInfo">
      <PopUpSerialNumber idUser={theUser.ID} serialNumber={theUser['SERIAL-RASPB']} ip={theUser['IP']}/>
      </div>
    );
  }else if( rolAdmin==='admin' && isAuth){
    console.log('Administrador');
    return <HomeAdmin/>
  }else{
    console.log('NavMenu');
      return  <NavMenu/>
  }
};

export default HomePi;

// <div className="_img">
// </div>
// <h1>{theUser.NOMBRE}</h1>
// <div className="_email">
//   <span>{theUser.CORREO}</span>
// </div>
// {/* <iframe src="http://192.168.88.253:8082"></iframe> */}
// <button onClick={logoutUser}>Logout</button>