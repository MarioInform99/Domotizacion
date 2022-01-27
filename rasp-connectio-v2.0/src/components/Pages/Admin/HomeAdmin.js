import React, { useContext } from "react";
import { MyContext } from "../../Config/Context.js";
import TableUser from './ContentAdmin/TableUser';
import MenuAdmin from './MenuAdmin/MenuAdmin.js';
import './HomeAdmin.css';
const HomeAdmin=()=>{
    
  const { rootState, logoutUser } = useContext(MyContext);
  console.log(rootState)
  const { theUser } = rootState;
    return (
      <div className='containerAdmin'>
        <MenuAdmin/>
        </div>
      );
}
export default HomeAdmin;

        // <div className="userAdmin">
        //  <TableUser/>
        //   <div className="img">
        //   </div>
        //   <h1>{theUser.NOMBRE}</h1>
        //   <div className="_email">
        //     <span>{theUser.CORREO}</span>
        //   </div>
        //   {/* <iframe src="http://192.168.88.253:8082"></iframe> */}
        //   <button onClick={logoutUser}>Logout</button>