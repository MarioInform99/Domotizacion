import React from 'react';
import FormRegister from '../Pages/Registrarse/UI/Form.js';
import FormInicio from '../Pages/Inicio-Sesion/UI/Form.js';
const BoxShadow=()=>{
    const ruta={
        'inicio-sesion':FormInicio(),
        'registrarse':FormRegister()
    };
    let URL=window.location.href;
    let URLs=URL.split('/');
    let indiceURL=URLs[3];
    let template=ruta[indiceURL];
    return (<div className="containerBox">
        {template}
    </div>);
}
export default BoxShadow;