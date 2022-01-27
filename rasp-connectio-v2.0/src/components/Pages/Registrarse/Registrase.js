import React, { useContext, useState } from "react";
import { MyContext } from "../../Config/Context.js";
import "./Registrarse.css";
const Registro = () => {
  const { loginIn } = useContext(MyContext);

  const stateDatas = {
    DataUser: {
      nombre: "",
      apellidos: "",
      correo: "",
      password: "",
      fecha: "",
    },
    erroMsg: "",
  };

  const [useStateDatas, setStateDatas] = useState(stateDatas);

  const onChangeValue = (e) => {
    setStateDatas({
      ...useStateDatas,
      DataUser: {
        ...useStateDatas.DataUser,
        [e.target.name]: e.target.value,
      },
    });
  };
  const checkPassword = () => {
    const pass1 = document.getElementById("password");
    const pass2 = document.getElementById("contrasenia2");
    if (pass1.value !== pass2.value) {
      setStateDatas({
        ...useStateDatas,
        erroMsg: "Las contraseñas no coinciden",
      });
      return false;
    }
    return true;
  };
  const sendDatas = async (event) => {
    console.log(useStateDatas.DataUser);
    event.preventDefault();
    /**Me registro */
    if (checkPassword()) {
      let registerUser = JSON.stringify(useStateDatas.DataUser);
      let responseData = await fetch(
        "http://localhost/Domotizacion/API/registrer.php",
        {
          method: "POST",
          body: registerUser,
        }
      )
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          return responseJSON;
        });
      console.log("Test regist");
      console.log(responseData);
      //Compruebo el estado
      if (responseData.exito === 1 && responseData.status === 201) {
        console.log("Login status");
        //Invio a la zona del usuario al
        let user = JSON.stringify(useStateDatas.DataUser);
        let test = await fetch("http://localhost/Domotizacion/API/login.php", {
          method: "POST",
          body: user,
        })
          .then((response) => response.json())
          .then((responseJSON) => {
            return responseJSON;
          });
        console.log(test);
        if (test.token && test.exito) {
          localStorage.setItem("loginToken", test.token);
          await loginIn();
        }
      } else {
        setStateDatas({
          ...useStateDatas,
          erroMsg: responseData.mensaje,
        });
      }
    }
  };
  // const submitForm = async (event) => {
  //   event.preventDefault();
  //   console.log(estado.UserDatas);
  //   let user = JSON.stringify(estado.UserDatas);
  //   let test = await fetch("http://localhost/Domotizacion/API/login.php", {
  //     method: "POST",
  //     body: user,
  //   })
  //     .then((response) => response.json())
  //     .then((responseJSON) => {
  //       console.log(responseJSON);
  //       return responseJSON;
  //     });
  //   console.log(test);
  //   if (test.token && test.exito) {
  //     setEstado({
  //       ...inicioEstado,
  //     });
  //     console.log(estado);
  //     localStorage.setItem("loginToken", test.token);
  //     await loginIn();
  //   } else {
  //     setEstado({
  //       ...estado,
  //       exitoMsg: "",
  //       errorMsg: test.mensaje,
  //     });
  //   }
  //   // console.log(data);
  // };
  let errorMsg = "";
  let exitoMsg='';
  if (useStateDatas.erroMsg) {
    errorMsg = <div className="alert alert-danger w-3" role="alert">{useStateDatas.erroMsg}</div>;
  }
  if (useStateDatas.mensajeExito) {
    exitoMsg = <div className="alert alert-success" role="alert">{useStateDatas.mensajeExito}</div>;
  }
  return (
    <div className="formRegistro">
    <h2>Registrarse</h2>
    <form action="" method="POST" id="form-registro">
      <fieldset>
        <div className="content-text">
          <label>NOMBRE</label><br/>
          <input
            type="text"
            id="nombre"
            name="nombre"
            autoComplete="off"
            value={useStateDatas.DataUser.nombre}
            onChange={onChangeValue}
          /><br/>
          <label>APELLIDOS</label><br/>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            autoComplete="off"
            value={useStateDatas.DataUser.apellidos}
            onChange={onChangeValue}
          />
        </div>
        <div className="content-text">
          <label>CORREO ELECTRONICO </label><br/>
          <input
            type="email"
            id="correo"
            name="correo"
            autoComplete="off"
            value={useStateDatas.DataUser.correo}
            onChange={onChangeValue}
          />
        </div>
        <div className="content-text">
          <label>CONTRASEÑA </label><br/>
          <input
            type="password"
            id="password"
            name="password"
            value={useStateDatas.DataUser.contrasenia}
            onChange={onChangeValue}
          />
          <button className="btn btn-primary input-group-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
            >
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path>
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path>
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path>
            </svg>
          </button>
        </div>
        <div className="content-text">
          <label>REPITE LA CONTRASEÑA</label><br/>
          <input type="password" id="contrasenia2" name="contrasenia2" />
          <button className="btn btn-primary input-group-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
            >
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path>
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path>
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path>
            </svg>
          </button>
        </div>
        {errorMsg}<br/>
        {exitoMsg}
        <div className="button-register">
          <input
            type="button"
            name="registrar"
            id="registrar"
            onClick={sendDatas}
            className="btn btn-primary"
            value="Registrase"
          />
        </div>
      </fieldset>
    </form>
    </div>
  );
};
export default Registro;
