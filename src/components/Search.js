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

      <div style={{border: "1px solid black", paddingBottom: "40px", paddingTop: "15px", borderRadius: "20px", background: "#f0f0f0", }}>
       <h1 style={{textAlign: "centre"}}> Search For Available Flights: </h1>
        <SearchForm onSubmit={ searchFlight }/>
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

      <input type="Submit" value="Search" style={{
      color: "white",
      border: "gray",
      background: "#373333"}}/>
    </form>
  );
};

const SearchResults = (props) => {
  return (
    <div>
      { props.flights.map((flight) => <ul key={flight.id}>
         <li>Flight Number: <Link to={`/flights/${flight.id}`}>
      { flight.flight_number }</Link></li>
         <li>Origin: { flight.origin }</li>
         <li>Destination: {flight.destination } </li>
         <li>Date: { flight.date }
         <li>Plane Number: { flight.plane }</li>
         </li>
         </ul>
       )};
    </div>
  );
};

export default Search;
