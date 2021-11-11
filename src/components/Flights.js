import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL_FLIGHTS = 'http://localhost:3000/flights.json';
const SERVER_URL_AIRPLANES = "http://localhost:3000/airplanes.json";

class Flights extends Component {
  constructor() {
    super();
    this.state = {flights: []};
    this.saveFlight = this.saveFlight.bind(this);
  }

  componentDidMount() {
  const fetchFlights = () => {
    axios(SERVER_URL_FLIGHTS).then((response) => {
      this.setState({flights: response.data});
      setTimeout(fetchFlights, 5000);
    });
  };
  fetchFlights();
}

  saveFlight(flight_number, date, origin, destination, plane ) {
    axios.post(SERVER_URL_FLIGHTS, {flight_number: flight_number, date: date, origin: origin, destination: destination, plane: plane}).then((response) => {this.setState({flights: [...this.state.flights, response.data]});
    });
  }

  render() {
    return (
      <div style={{border: "1px solid black", paddingBottom: "40px", paddingTop: "15px", borderRadius: "20px", background: "white", }}>
        <h1 style={{color: "red"}}>Virgin Airlines - Create Flights</h1>
        <FlightsForm onSubmit={this.saveFlight}/>
        <FlightsTable flights={this.state.flights}/>
      </div>
    );
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

class FlightsForm extends Component {
  constructor() {
    super();
    this.state = {
      flight_number: '',
      date: '',
      origin: '',
      destination: '',
      plane: '',
      airlines: []
    };
    this._handleChangeFlight = this._handleChangeFlight.bind(this);
    this._handleChangeDate = this._handleChangeDate.bind(this);
    this._handleChangeOrigin = this._handleChangeOrigin.bind(this);
    this._handleChangeDestination = this._handleChangeDestination.bind(this);
    this._handleChangePlane = this._handleChangePlane.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  };

  _handleChangeFlight(event) {
    this.setState({flight_number: event.target.value});
  };
  _handleChangeDate(event) {
    this.setState({date: event.target.value});
  };
  _handleChangeOrigin(event) {
    this.setState({origin: event.target.value});
  };
  _handleChangeDestination(event) {
    this.setState({destination: event.target.value});
  };
  _handleChangePlane(event) {
    this.setState({plane: event.target.value});
  };

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.flight_number, this.state.date, this.state.origin, this.state.destination, this.state.plane);
    this.setState({
      flight_number: '',
      date: '',
      origin: '',
      destination: '',
      plane: '',
      airlines: []
    })
  };

  componentDidMount() {
    const fetchAirlines = () => {
      axios.get(SERVER_URL_AIRPLANES).then((response) => {
        let airlinesArr = [];
        for (let i = 0; i < response.data.length; i ++){
          airlinesArr.push(response.data[i].name);
        }
        this.setState({airlines: airlinesArr});
        setTimeout(fetchAirlines, 5000);
      });
    };
    fetchAirlines();
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <input type="text"  placeholder="Flight Number" required onChange={this._handleChangeFlight} value={this.state.flight_number}/>
        <input type="text"  placeholder="YYYY-MM-DD" required onChange={this._handleChangeDate} value={this.state.date}/>
        <input type="text"  placeholder="Origin" required onChange={this._handleChangeOrigin} value={this.state.origin}/>
        <input type="text"  placeholder="Destination" required onChange={this._handleChangeDestination} value={this.state.destination}/>
        <select onChange={this._handleChangePlane} required>
          <option>Choose Plane Type</option>
          { this.state.airlines.map((airline) => <option key={ Math.random() }>{airline}</option>) }
        </select>
        <input type="submit"  onChange={this._handleChange} value="Save"/>
      </form>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

const FlightsTable = (props) => {
    return (
      <div>
        {props.flights.map((f) =>
          <ul key={f.id}>
            <li>Flight Number: <Link to={`/flights/${f.id}`}>{f.flight_number}</Link></li>
            <li>Date: {f.date}</li>
            <li>Origin: {f.origin}</li>
            <li>Destination: {f.destination}</li>
            <li>Plane Type: {f.plane}</li>
          </ul>
        )};
      </div>
    );
  };

export default Flights;
