import React from 'react';
import './Raspb.css';
const Raspb=(props)=>{
    console.log(props);
    const src="http://"+props.Ip+":8083?"+props.serialNumber;
    return(<div class="containerUser">
        <iframe src={src}></iframe>
    </div>)
}
export default Raspb;