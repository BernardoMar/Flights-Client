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
      <div>
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
        <input value="Cancel"/>
        <input type="submit" value="Save"/>
      </form>
    );
  }
}

const SeatsDiagram = (props) => {
  return (
    <div>
      { props.airplanes.map(airplane => <p key={ airplane.id }>Name:{ airplane.name } Rows: { airplane.row } Columns: { airplane.column }</p>) }

    </div>
  );
};

export default Airplanes;
