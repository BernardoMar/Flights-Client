import React, {Component} from 'react';
import axios from 'axios';

const SERVER_URL_FLIGHTS = "http://localhost:3000/flights.json";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      flights: []
    };
    this.saveSearch = this.saveSearch.bind(this);
  }

componentDidMount() {
  const fetchFlights = () => {
    axios (SERVER_URL_FLIGHTS).then((response) => {
      this.setState({flights: response.data});
      setTimeout(fetchFlights, 5000);
    });
  };
  fetchFlights();
};



saveSearch(flight_number, origin, destination, date, plane, airplane_id) {
  axios.post(SERVER_URL_FLIGHTS, {flight_number: flight_number, origin: origin, destination: destination, date: date, plane: plane, airplane_id: airplane_id}).then((response) => {
    this.setState({flights: [...this.state.flights, response.data]});
  });
}

  render() {
    return (
      <div>
      <h1> Virgin Airlines Flights </h1>
        <SearchForm onSubmit={ this.saveSearch } />
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
    { props.flights.map((flight) => <p key={flight.id}>
    Flight Number: { flight.flight_number } Origin: { flight.origin } Destination: {flight.destination } Date: { flight.date } Plane Number: { flight.plane }{ flight.airplane_id }</p>) }
    </div>
  )
}

export default Search;
