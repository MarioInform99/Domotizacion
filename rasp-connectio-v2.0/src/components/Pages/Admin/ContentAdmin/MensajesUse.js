import React from "react";

export default class MensajesUser extends React.Component {
  state = { dataMensaj: [] };

  componentDidMount() {
    let loginToken = localStorage.getItem("loginToken");
    fetch("http://localhost/Domotizacion/API/MensajesUser.php", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ dataMensaj: res });
      });
  }

  render() {
    console.log(this.state.dataMensaj);
    const datos = this.state.dataMensaj;
    console.log(datos);
    let nombre = datos.map((dato) => (
      <tbody>
        <tr>
          <td>{dato["NOMBRE"] + " " + dato["APELLIDOS"]}</td>
          <td>{dato["CORREO"]}</td>
          <td>{dato["MENSAJE"]}</td>
          <td></td>
        </tr>
      </tbody>
    ));
    console.log(nombre);
    return (
      <div className="mensajesUser">
        <table className="table">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>CORREO</th>
              <th>MENSAJE</th>
              <td></td>
            </tr>
          </thead>
          {nombre}
        </table>
      </div>
    );
  }
}
