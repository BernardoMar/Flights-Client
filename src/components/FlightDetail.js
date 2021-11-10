import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";


const FlightDetail = (props) => {
  const [ origin, setOrigin ] = useState("");
  const [ destination, setDestination ] = useState("");
  const [ date, setDate ] = useState("");
  const [ flightNumber, setFlightNumber ] = useState("");
  const [ planeType, setPlaneType ] = useState("");

  const [ plane, setPlane ] = useState([]);

  const params = useParams();
  const { flightId } = params;
  const SERVER_URL_FLIGHT = `http://localhost:3000/flights/${flightId}.json`;
  let SERVER_URL_AIRPLANES = "http://localhost:3000/airplanes.json";


  const searchPlane = () => {
    axios.get(SERVER_URL_AIRPLANES).then((response) => {
      let plane = [];
      for (let i = 0; i < response.data.length; i ++){
        console.log(response.data[i]);
        console.log(planeType);
        if (response.data[i].name === planeType){
          console.log("if statement is running");
          plane.push(response.data[i]);
        }
      }
      setPlane(plane);
    });
  };

  const searchFlight = () => {
    axios.get(SERVER_URL_FLIGHT).then((response) => {
      setFlightNumber(response.data.flight_number);
      setOrigin(response.data.origin);
      setDestination(response.data.destination);
      setDate(response.data.date);
      setPlaneType(response.data.plane);
    });
  };

  return (
    <div>
      <button onClick={searchFlight}>Show Flight Details</button>
      <button onClick={searchPlane}>Show Airplane</button>
      <p>Flight Number: {flightNumber}</p>
      <p>Origin: {origin}</p>
      <p>Destination: {destination}</p>
      <p>Date: {date}</p>
      <p>Plane Type: {planeType}</p>
      <p>Row: {plane.row}</p>
      <p>Col: {plane.column}</p>
    </div>
  );
};

export default FlightDetail;
