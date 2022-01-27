import React, { useContext, useState } from "react";
import GoogleLogin from "react-google-login";
import { MyContext } from "../../Config/Context.js";
import signInGoogle from '../../UI/SignInGoogle.js';
import './Inicio-Sesion.css';
const InicioSesion = () => {
  const { loginIn } = useContext(MyContext);

  const inicioEstado = {
    UserDatas: {
      correo: "",
      password: "",
    },
    errorMsg: "",
    exitoMsg: "",
  };
  const responseGoogle = (response) => {
    console.log(response);
  }
  //creamos una variable de estado
  //estado es nuestra variable y setEstado para asignar
  const [estado, setEstado] = useState(inicioEstado);
  const onChangeValue = (e) => {
    setEstado({
      ...estado,
      UserDatas: {
        ...estado.UserDatas,
        [e.target.name]: e.target.value,
      },
    });
    console.log(estado);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    console.log(estado.UserDatas);
    let user = JSON.stringify(estado.UserDatas);
    let test = await fetch("http://localhost/Domotizacion/API/login.php", {
      method: "POST",
      body: user,
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        return responseJSON;
      });
    console.log(test);

    if (test.token && test.exito) {
      setEstado({
        ...inicioEstado,
      });
      console.log(estado);
      localStorage.setItem("loginToken", test.token);
      
      await loginIn();
    } else {
      setEstado({
        ...estado,
        exitoMsg: "",
        errorMsg: test.mensaje,
      });
    }
    // console.log(data);
  }
  /**Sign with Google */
//   function onSignIn(googleUser) { // Useful data for your client-side scripts:
//     var profile = googleUser.getBasicProfile();
//     console.log(profile);
//     console.log("ID: " + profile.getId()); // Don't send this directly to your server!
//     console.log('Full Name: ' + profile.getName());
//     console.log('Given Name: ' + profile.getGivenName());
//     console.log('Family Name: ' + profile.getFamilyName());
//     console.log("Image URL: " + profile.getImageUrl());
//     console.log("Email: " + profile.getEmail());

//     // The ID token you need to pass to your backend:
//     var id_token = googleUser.getAuthResponse().id_token;
//     console.log("ID Token: " + id_token);
// }
  /**************** */
  let exitoMsg = "";
  let errorMsg = "";
  if (estado.errorMsg) {
    errorMsg = <div  className="alert alert-danger w-3" role="alert">{estado.errorMsg}</div>;
  }
  if (estado.exitoMsg) {
    exitoMsg = <div className="alert alert-success" role="alert">{estado.exitoMsg}</div>;
  }
 
  return (
    <div className="formularioLogin">
      <h2>Iniciar sesión</h2>
      <form method="POST" action="" id="formulario">
        <div className="content-text">
          <label for="correo">CORREO ELECTRÓNICO</label><br/>
          <input
            name="correo"
            type="email"
            id="correo"
            required
            value={estado.UserDatas.correo}
            onChange={onChangeValue}
          />
        </div>
        <div className="content-text">
          <label for="password">CONTRASEÑA</label><br/>
          <input
            name="password"
            type="password"
            id="password"
            required
            value={estado.UserDatas.password}
            onChange={onChangeValue}
          />
        </div><br/>
        {errorMsg}
        {exitoMsg}<br/>
        <div className="button-submit">
          <button
            type="button"
            onClick={submitForm}
            className="btn btn-primary"
          >Iniciar sesión
          </button><br/><br/>
          <GoogleLogin
            clientId="188480538697-fhn5jrsulrnngn5sjs80ol354ul48bfd.apps.googleusercontent.com"
            buttonText="Iniciar sesión con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </form>
    </div>
  );
};
export default InicioSesion;
