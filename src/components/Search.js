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
        <SearchForm onSubmit={ this.saveSearch } />
        <SearchResults results={ this.state.flights } />
      </div>
    );
  }
}

class SearchForm extends Component {
  constructor() {
    super();
    this.state = { flight_number: '', origin: '', destination:'', date:'', plane:'', airplane_id:''};
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

_handleChange(event) {
  this.preventDefault
}

}



export default Search;
