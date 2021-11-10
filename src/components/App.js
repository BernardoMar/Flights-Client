import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Airplanes from './Airplanes';
import Flights from './Flights';
import Search from './Search';
import FlightDetail from "./FlightDetail";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/airplanes">Airplanes</Link>
          </li>
          <li>
            <Link to="/flights">Flights</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/airplanes">
            <Airplanes />
          </Route>
          <Route path="/flights" exact>
            <Flights />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/flights/:flightId">
            <FlightDetail />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
