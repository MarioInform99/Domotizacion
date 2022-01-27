import React from "react";
import { CodeSlash } from "react-bootstrap-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Tooltip,
  Area,
} from "recharts";
import CountUser from "./CountUser";
import "./BarChart.css";
export default class renderLineChart extends React.Component {
  state = {
    data: [],
    estd: {
      fecha: "",
      numCont: "",
    },
  };
  compararfecha(num, array) {
    for (let index = 0; index < array.length; index++) {
      if (array[index] == num) {
        return false;
      }
    }
    return true;
  }

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
    console.log(this.state.data);
    const UserCount = this.state.data.length;
    console.log(UserCount);
    let fecha = this.state.data.map((data) => {
      return data["FECHA-INCRIPCIÓN"];
    });
    console.log(fecha);
    //Implementamos código para evitar que se repita el enunciado
    let fechaFin = [];
    fecha.forEach((item) => {
      //pushes only unique element
      if (!fechaFin.includes(item)) {
        fechaFin.push(item);
      }
    });
    console.log(fechaFin);
    let counUse = [];
    for (let index = 0; index < fechaFin.length; index++) {
      for (let i = 0; i < UserCount; i++) {
        if (fechaFin[index] == this.state.data[i]["FECHA-INCRIPCIÓN"]) {
          console.log(this.state.data[i]["FECHA-INCRIPCIÓN"]);
          counUse.push({
            fecha: this.state.data[i]["FECHA-INCRIPCIÓN"],
            user: 1,
          });
        }
      }
    }
    console.log(counUse);
    let countUser = [];
    let countA = [];
    for (let index = 0; index < counUse.length; index++) {
      let count = 0;
      for (let j = 0; j < counUse.length; j++) {
        if (counUse[index].fecha == counUse[j].fecha) {
          count++;
          if (this.compararfecha(counUse[index].fecha, countUser)) {
            countUser[index] = counUse[index].fecha;
          }
        }
      }
      if (counUse[index] != 0) {
        countA.push(count);
        console.log(`fecha: ${counUse[index]} se repite ${count}`);
      }
    }
    let countFinal = [];
    countA.forEach((item) => {
      //pushes only unique element
      if (!countFinal.includes(item)) {
        countFinal.push(item);
      }
    });
    //Valores para calcular la tabla
    console.log(fechaFin);
    console.log(countFinal);
    let data = [];
    //Creacion del array data
    for (let index = 0; index < countFinal.length; index++) {
      data.push({ name: fechaFin[index], uv: countFinal[index] });
    }

    return (
      <div className="containerHome">
        <div className="estadisticas">
        <h2>Usuarios registrados</h2>
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
        <div>

        </div>
        <div className="countUser">
          <CountUser />
        </div>
      </div>
    );
  }
}
