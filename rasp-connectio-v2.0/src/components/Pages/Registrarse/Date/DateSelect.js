import React, { useState } from "react";
const days = parseInt(31);
const month = parseInt(12);
const dateObj = new Date();
const maxYear = parseInt(dateObj.getFullYear() - 14);
const minYear = parseInt(dateObj.getFullYear() - 90);
const SelectDate = () => {
  console.log(minYear, maxYear);
  let daysDataList = "";
  let monthDatalist = "";
  let yearDataList = "";
  for (let index = 1; index <= days; index++) {
    daysDataList += `<option value='${index}'/>`;
  }
  for (let index = 1; index <= month; index++) {
    monthDatalist += `<option value='${index}'/>`;
  }
  for (let i = minYear; i <= maxYear; i++) {
    yearDataList += `<option value="${i}"/>`;
  }
  const stateDate = {
    fecha: {
      diaNacimiento: "",
      mesNacimiento: "",
      anioNacimiento: "",
    },
  };


  const [stateDates, setStateDate] = useState(stateDate);
  const onChangeValue = (e) => {
      setStateDate({
        ...stateDates,
        fecha: {
          ...stateDates.fecha,
          [e.target.name]: parseInt(e.target.value),
        },
      });
  };
  return (
    <div>
        <label>FECHA DE NACIMIENTO: </label>
      <input
        type="number"
        name="diaNacimiento"
        id="diaNacimiento"
        onChange={onChangeValue}
        min="1"
        max="31"
        list="listDays"
        placeholder="Dia"
        value={stateDates.fecha.diaNacimiento}
      />
      <datalist
        id="listDays"
        dangerouslySetInnerHTML={{ __html: daysDataList }}
      ></datalist>
      <input
        type="number"
        name="mesNacimiento"
        id="mesNacimiento"
        onChange={onChangeValue}
        min="1"
        max="12"
        list="listMonth"
        placeholder="Mes"
      />
      <datalist
        id="listMonth"
        dangerouslySetInnerHTML={{ __html: monthDatalist }}
      ></datalist>
      <input
        type="number"
        name="anioNacimiento"
        id="anioNacimiento"
        onChange={onChangeValue}
        min={minYear}
        max={maxYear}
        list="listYear"
        placeholder="Año"
      />
      <datalist
        id="listYear"
        dangerouslySetInnerHTML={{ __html: yearDataList }}
      ></datalist>
    </div>
  );
};
export default SelectDate;
