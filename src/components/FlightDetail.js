import React from "react";
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import axios from "axios";

const FlightDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { flightId } = params;
  console.log(flightId);

  return (
    <div>
      coming
    </div>
  );

};

export default FlightDetail;
