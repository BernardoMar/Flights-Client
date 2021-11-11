import React, { Component } from "react";
import axios from "axios";

const SERVER_URL_AIRPLANES = "http://localhost:3000/airplanes.json";
// const SERVER_URL_USERS = "http://localhost:3000/users.json";
// const SERVER_URL_FLIGHTS = "http://localhost:3000/flights.json";
// const SERVER_URL_RESERVATIONS = "http://localhost:3000/reservations.json";

class Airplanes extends Component {
  constructor(){
    super();
    this.state = {
      airplanes: [],
    }

    this.saveAirline = this.saveAirline.bind(this);
  }

  componentDidMount(){
    const fetchAirlines = () => {
      axios(SERVER_URL_AIRPLANES).then((response) => {
        this.setState({airplanes: response.data});
        setTimeout(fetchAirlines, 1000);
      });
    };

    fetchAirlines();
  }

  saveAirline(name, row, column){
    axios.post(SERVER_URL_AIRPLANES, {name: name, row: row, column: column}).then((response) => {this.setState({airplanes: [...this.state.airplanes, response.data]});
    });
  }

  render(){
    return (
      <div style={{border: "1px solid black", paddingBottom: "40px", paddingTop: "15px", borderRadius: "20px", background: "#f0f0f0", }}>
        <h1>Virgin Airlines</h1>
        <CreateAirlineForm onSubmit={ this.saveAirline} />
        <SeatsDiagram airplanes={ this.state.airplanes }/>
      </div>
    );
  }
}

class CreateAirlineForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      row: "",
      column: ""
    };

    this._handleChangeName = this._handleChangeName.bind(this);
    this._handleChangeRow = this._handleChangeRow.bind(this);
    this._handleChangeColumn = this._handleChangeColumn.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(this.state.name, this.state.row, this.state.column);
    this.setState({
      name: "",
      row: "",
      column: ""
    });

  }

  _handleChangeName(event){
    this.setState({name: event.target.value});
  }

  _handleChangeRow(event){
    this.setState({row: Number(event.target.value)});
  }

  _handleChangeColumn(event){
    this.setState({column: Number(event.target.value)});
  }

  render(){
    return (
      <form onSubmit={ this._handleSubmit }>
        <input onChange={ this._handleChangeName} type="text" value={ this.state.name } placeholder="name" required/>
        <input onChange={ this._handleChangeRow} type="text" value={ this.state.row } placeholder="rows" required/>
        <input onChange={ this._handleChangeColumn} type="text" value={ this.state.column } placeholder="columns" required/>
        <input type="submit" value="Save"/>
      </form>
    );
  }
}

const SeatsDiagram = (props) => {
  const createdAirplane = props.airplanes.slice(-1)[0];
  let name;
  let rows;
  let columns;

  if (createdAirplane !== undefined){
    name = createdAirplane.name;
    rows = createdAirplane.row;
    columns = createdAirplane.column;
  }

  let colTable = [];
  let rowTable = [];

  for (let i = 0; i < rows; i ++){
    rowTable.push(1);
  }
  for (let i = 0; i < columns; i ++){
    colTable.push(1);
  }

  return (
    <div>
      Name:{ name }
      Rows: { rows }
      Columns: { columns }
      {
        rowTable.map((n) =>
        <table key={Math.random()}>
          <tr key={Math.random()}>
            { colTable.map(() => <td style={{background: "red", height: "30px", width: "30px"}}></td>) }
          </tr>
        </table>)
      }
    </div>
  );
};

export default Airplanes;
