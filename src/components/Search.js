import React, {Component} from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios';


const SERVER_URL_FLIGHTS = "http://localhost:3000/flights.json";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      flights: []
    };
    this.searchFlight = this.searchFlight.bind(this);
  }

searchFlight( origin, destination) {
  axios.get(SERVER_URL_FLIGHTS, { origin: origin, destination: destination }).then((response) => {
    let flights =[]

    for (let i = 0; i < response.data.length; i ++){
      if (response.data[i].origin === origin && response.data[i].destination === destination)
      {
        flights.push(response.data[i]);
      }
    }

    this.setState({flights: flights});
  });
}

  render() {
    return (
      <div>
      <h1> Virgin Airlines Flights </h1>
        <SearchForm onSubmit={ this.searchFlight } />
        <SearchResults flights={ this.state.flights } />
      </div>
    );
  }
}

class SearchForm extends Component {
  constructor() {
    super();
    this.state = { origin: '', destination:''};
    this._handleChangeOrigin = this._handleChangeOrigin.bind(this);
    this._handleChangeDestination = this._handleChangeDestination.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }


_handleChangeOrigin(event) {
  this.setState({origin: event.target.value});
}

_handleChangeDestination(event) {
  this.setState({destination: event.target.value});
}

_handleSubmit(event) {
  event.preventDefault();
  this.props.onSubmit(this.state.content);
  this.setState({ origin: '', destination:''});
}

render() {
  return (
    <form onSubmit={ this._handleSubmit }>


        <input onChange={ this._handleChangeOrigin} type="text" value={ this.state.origin } placeholder="Origin" required/>
        <input onChange={ this._handleChangeDestination} type="text" value={ this.state.destination } placeholder="Destination" required/>

        <input type="Submit" value="Flights" />
      </form>
  );
 }
}

const SearchResults = (props) => {
  return (
    <div>
    { props.flights.map((flight) =>

    <p key={flight.id}>

      Flight Number: { flight.flight_number } Origin: { flight.origin } Destination: {flight.destination } Date: { flight.date } Plane Number: { flight.airplane_id }

    </p>) }

    </div>
  )
}

export default Search;
