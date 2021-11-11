import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import Reservation from "./Reservation";

const FlightDetail = (props) => {
  const [ origin, setOrigin ] = useState("");
  const [ destination, setDestination ] = useState("");
  const [ date, setDate ] = useState("");
  const [ flightNumber, setFlightNumber ] = useState("");
  const [ planeType, setPlaneType ] = useState("");

  const [ planeRow, setPlaneRow ] = useState("");
  const [ planeColumn, setPlaneColumn] = useState("");

  const [ reservation, setReservation ] = useState([]);

  const params = useParams();
  const { flightId } = params;
  const SERVER_URL_FLIGHT = `http://localhost:3000/flights/${flightId}.json`;
  let SERVER_URL_AIRPLANES = "http://localhost:3000/airplanes.json";


  const searchPlane = () => {
    axios.get(SERVER_URL_AIRPLANES).then((response) => {
      for (let i = 0; i < response.data.length; i ++){
        if (response.data[i].name === planeType){
          setPlaneRow(response.data[i].row);
          setPlaneColumn(response.data[i].column);
        }
      }
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

  let colTable = [];
  let rowTable = [];
  let colCount = 0;
  let rowCount = 0;

  for (let i = 0; i < planeRow; i ++){
    rowCount = rowCount + 1;
    rowTable.push(rowCount);
  }
  for (let i = 0; i < planeColumn; i ++){
    colCount = colCount + 1;
    colTable.push(colCount);
  }

  const handleSelect = (n, i) => {
    console.log(typeof i);
    if (i === 1){
       i = "A";
    } else if (i === 2){
      i = "B";
    } else if (i === 3){
      i = "C";
    } else if (i === 4){
      i = "D";
    } else if (i === 5){
      i = "E";
    } else if (i === 6){
      i = "F";
    }
    setReservation([n, i]);
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

      {
        rowTable.map((i) =>
        <table key={Math.random()}>
          <tr key={Math.random()}>
            { colTable.map((n) => <td onClick={() => handleSelect(n, i)} style={{background: "red", height: "30px", width: "30px"}}>{n}</td>) }
          {i}</tr>
        </table>)
      }
      <p>Select seat: {reservation}</p>
    </div>
  );
};

export default FlightDetail;
