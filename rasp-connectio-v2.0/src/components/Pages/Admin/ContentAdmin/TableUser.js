import React from "react";
import DataTable from "react-data-table-component";
import './TableUser.css';
import NotifacionList from './Notification';
export default class TableUser extends React.Component {
  state = { data: "" };

  componentDidMount() {
    let loginToken = localStorage.getItem("loginToken");
    fetch("http://localhost/Domotizacion/API/DataTableUser.php", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ data: res });
      });
  }
  render() {
    const columnas = [
        
      {
        name: 'SERIAL-RASPB',
        selector: 'SERIAL-RASPB',
        sortable: true,
      },
      {
        name: "ID",
        selector: "ID",
        sortable: true,
      },
      {
        name: "NOMBRE",
        selector: "NOMBRE",
        sortable: true,
      },
      {
        name: "APELLIDOS",
        selector: "APELLIDOS",
        sortable: true,
      },
      {
        name: "CORREO",
        selector: "CORREO",
        sortable: true,
      },
    ];
    return (
      <div className="tableUser">
        <DataTable
          columns={columnas}
          data={this.state.data}
          title="Lista de usuarios"
          pagination
          className="tabla"
        />
        <NotifacionList/>
      </div>
    );
  }
}