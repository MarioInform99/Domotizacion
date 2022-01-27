import React from "react";
import "./PopUp.css";
import raspbLogo from "../../../../img/Raspberry_logo.png";
import Raspb from "../Content/Raspb";
export default class PopUpSerialNumber extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      data: [],
      serie: "",
      ip: props.ip,
      status: false,
      mensajeErro: "",
      mensajeExito: "",
      statusPopUpSerie: false,
      statusPopUpIP: true,
      idUser: props.idUser,
      serialNumber: props.serialNumber,
      msgData: [],
    };
  }
  componentDidMount() {
    console.log(this.dataUser);
    let loginToken = localStorage.getItem("loginToken");
    fetch("http://localhost/Domotizacion/API/Raspberry-Data.php", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          ...this.state,
          data: res,
        });
      });
  }
  render() {
    const OnChangeValue = (e) => {
      if (e.target.name == "numeroSerie") {
        this.setState({
          ...this.state,
          serie: e.target.value,
        });
      } else if (e.target.name == "numeroIP") {
        this.setState({
          ...this.state,
          ip: e.target.value,
        });
      }
    };
    const OnClickValue = (event) => {
      event.preventDefault();
      console.log("click");
      let seria = this.state.data.map((data) => {
        console.log(data["ID"]);
        return data["ID"];
      });
      if (seria.includes(this.state.serie)) {
        this.setState({
          ...this.state,
          statusPopUpSerie: true,
          statusPopUpIP: false,
        });
      } else {
        this.setState({
          ...this.state,
          mensajeErro:
            "El numero de serie no coincide con ninguna raspberry de la base de datos",
        });
      }
    };

    const SubmitDatas =async (event) => {
      console.log("Click IP");
      event.preventDefault();
      let ips = this.state.data.map((data) => {
        console.log(data["IP"]);
        return data["IP"];
      });
      if (ips.includes(this.state.ip)) {
        let loginToken = localStorage.getItem("loginToken");
        console.log("Datos enviados");

        let dataServer = {
          status: "",
          mensaje: "",
        };
        let datas = [
          {
            serie: this.state.serie,
            ip: this.state.ip,
            userId: this.state.idUser,
          },
        ];
        let user = JSON.stringify(datas);
       let datServer= await fetch("http://localhost/Domotizacion/API/UpdateUser.php", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
          body: user,
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            return res
          });

        console.log(datServer);
        if(datServer.status==0){
          console.log('Incoorrecto');
          this.setState({
                  ...this.state,
                  mensajeErro: "Los datos no coinciden",
                });
        }else{
          console.log("Correcto");
          this.setState({
                  ...this.state,
                  status: true,
                  statusPopUpIP: false,
                  statusPopUpSerie: true,
                  serialNumber: this.state.serie,
                });
        }
      } else {
        this.setState({
          ...this.state,
          mensajeErro: "Dirección IP incorrecto",
        });
      }
    };

    let errorMsg = "";
    let exitoMsg = "";
    if (this.state.mensajeErro && this.state.status == false) {
      errorMsg = (
        <div className="alert alert-danger w-3" role="alert">
          {this.state.mensajeErro}
        </div>
      );
    }
    if (this.state.mensajeExito) {
      exitoMsg = (
        <div className="alert alert-success" role="alert">
          {this.state.mensajeExito}
        </div>
      );
    }
    console.log(this.state);
    if (this.state.serialNumber == "0000000000") {
      return (
        <div className="container">
          <div
            className="PopUpSerialNumber"
            id="PopUpSerialNumber"
            hidden={this.state.statusPopUpSerie}
          >
            <img src={raspbLogo} alt="logo" />
            <h4>Por favor añada el numero de serie de su raspberry pi</h4>
            <form>
              <input
                type="text"
                name="numeroSerie"
                id="numeroSerie"
                placeholder="0000000000"
                minLength="10"
                maxLength="17"
                value={this.state.serie}
                onChange={OnChangeValue}
                autoComplete="off"
              />
              <br />
              {errorMsg}
              <br />
              <input
                type="button"
                name="enviarSerie"
                value="Siguente"
                id="boton"
                className="btn btn-success"
                onClick={OnClickValue}
              />
            </form>
          </div>
          <div className="PopUpIP" hidden={this.state.statusPopUpIP}>
            <img src={raspbLogo} alt="logo" />
            <h4>Introduzca la dirección IP de la raspberry</h4>
            <form>
              <input
                type="text"
                name="numeroIP"
                id="numeroIP"
                placeholder="192.168.xxx.xxx"
                autoComplete="off"
                value={this.state.ip}
                onChange={OnChangeValue}
              />
              <br />
              {errorMsg}
              <br />
              <input
                type="button"
                name="enviarIp"
                value="Siguente"
                id="botonIp"
                className="btn btn-success"
                onClick={SubmitDatas}
              />
            </form>
          </div>
        </div>
      );
    } else {
      console.log("Raspb positivo");
      return (
        <Raspb
          idUser={this.state.idUser}
          Ip={this.state.ip}
          serialNumber={this.state.serialNumber}
        />
      );
    }
  }
}
