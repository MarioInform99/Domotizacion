import React from 'react';
import './logo.css';
import piedra1 from '../../img/piedra1-sinfondo-removebg-preview.png';
//../../img/piedra1-sinfondo-removebg-preview.png
import piedra2 from '../../img/piedra1-removebg-preview.png';
const Logo=()=>{
    
    return(<svg  x="20" y="400"  width="100%" height="650" >
    <g>
        <image href={piedra1} x="500" y="500">
            <animateTransform  attributeName="transform" type="rotate" by="360" dur="5s" repeatCount="indefinite"></animateTransform>
        </image>
    </g>
    <g >
        <image href={piedra1} x="600" y="200">
            <animateMotion dur="25s" fill="freeze" repeatCount="indefinite">
                <mpath href="#piedra2"/>
            </animateMotion>
        </image>
    </g>
    <path id="piedra2" d="m0,0 h100, h-100" />
    {/* <g>
        <image href={piedra1} x="700" y="500">
            <animateMotion dur="5s" fill="freeze" repeatCount="indefinite" >
                <mpath href="#piedra3"/>
            </animateMotion>
        </image>
    </g>
    <path id="piedra3" d="m0,0 l100,-100" /> */}
    <g>
        <image href={piedra2} x="0" y="200">
            <animateMotion dur="40s" fill="freeze" repeatCount="indefinite" stroke="none">
                <mpath href="#piedra4"/>
            </animateMotion>
        </image>
    </g>
    <path id="piedra4" d="m-10,-10 h100, l100,-100 l100,100 h-10 l-5,-5 l-5,5 h-10 l-5,5 l-5,-5 h-10
    h-10 l-5,-5 l-5,5 h-10 l-5,5 l-5,-5 h-10
    h-10 l-5,-5 l-5,5 h-10 l-5,5 l-5,-5 h-10
    h-10 l-5,-5 l-5,5 h-10 l-5,5 l-5,-5 h-10
    h-10 l-5,-5 l-5,5 h-10 l-5,5 l-5,-5 h-10
    h-10 l-5,-5 l-5,5 h-10 l-5,5 l-5,-5 h-10" />
    <g>
        <image href={piedra2} x="100" y="300">
            <animateMotion dur="15s" fill="freeze" repeatCount="indefinite">
                <mpath href="#piedra5"/>
            </animateMotion>
        </image>
    </g>
    <path id="piedra5" d="m0,0 h1000, h-1000" />
    <g>
        <image href={piedra2} x="200" y="400">
            <animateMotion dur="35s" fill="freeze" repeatCount="indefinite">
                <mpath href="#piedra6"/>
            </animateMotion>
        </image>
    </g>
    <path id="piedra6" d="m0,0 h100, h-100" />
 </svg>);
}
export default Logo;