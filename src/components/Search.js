import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL_FLIGHTS = "http://localhost:3000/flights.json";

const Search = (props) => {
  const [flights, setFlights] = useState([]);

  const searchFlight = (origin, destination) => {
    axios.get(SERVER_URL_FLIGHTS).then((response) => {
      let flights =[];

      for (let i = 0; i < response.data.length; i ++){
        if (response.data[i].origin === origin && response.data[i].destination === destination ){
          flights.push(response.data[i]);
        }
      }
      setFlights(flights);
    });
  };

    return (
      <div>
        <SearchForm onSubmit={ searchFlight } />
        <SearchResults flights={ flights } />
      </div>
    );
};

const SearchForm = (props) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const _handleChangeOrigin = (event) => {
    setOrigin(event.target.value);
  };

  const _handleChangeDestination = (event) => {
    setDestination(event.target.value);
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(origin, destination);
    setOrigin("");
    setDestination("");
  };

  return (
    <form onSubmit={ _handleSubmit }>
      <input onChange={ _handleChangeOrigin } type="text" value={ origin } placeholder="Origin" required/>
      <input onChange={ _handleChangeDestination } type="text" value={ destination } placeholder="Destination" required/>

      <input type="Submit" value="Search" />
    </form>
  );
};

const SearchResults = (props) => {
  return (
    <div>
      { props.flights.map((flight) => <p key={flight.id}>Flight Number: <Link to={`/flights/${flight.id}`}>{ flight.flight_number }</Link> Origin: { flight.origin } Destination: {flight.destination } Date: { flight.date } Plane Number: { flight.plane }</p>) }
    </div>
  );
};

export default Search;
