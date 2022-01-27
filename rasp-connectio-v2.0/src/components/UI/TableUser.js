import React from 'react';
const TableUser =(props)=>{

    let datosUser=props.arUser;
    console.log(datosUser);
    let datos=props.arUser.map((row)=>(
        <li>{row.ID}</li>
    ));
    return(<div>
    {datos}
    </div>)
}
export default TableUser;