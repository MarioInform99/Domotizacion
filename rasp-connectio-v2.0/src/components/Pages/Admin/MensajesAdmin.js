import React from 'react';
import MensajesUser from './ContentAdmin/MensajesUse';
import ApexChart from './ContentAdmin/BarChart.js';
import { LineChart, Line } from 'recharts';
import './MensajeAdmin.css';
const MensajeAdmin=()=>{
    console.log('Mensajes');
    
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
return(<div class="containerMensaje">
    <MensajesUser/> 
{/*     
  <LineChart width={400} height={400} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
  </LineChart> */}
</div>);

}
export default MensajeAdmin;