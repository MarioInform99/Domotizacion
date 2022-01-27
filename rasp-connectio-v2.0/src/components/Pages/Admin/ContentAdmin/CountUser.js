import React from 'react';
export default class CountUser extends React.Component{
    state = { datas: [] };
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
          this.setState({ datas: res });
        });
    }

    render(){
        console.log(this.state.datas);
        return(<div></div>)
    }

}