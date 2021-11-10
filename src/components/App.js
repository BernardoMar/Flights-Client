import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Airplanes from './Airplanes';
import Flights from './Flights';
import Search from './Search';

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
          <Route path="/flights">
            <Flights />
          </Route>
          <Route path="/search">
            <Search />
          </Route>

        </Switch>
      </div>
    </Router>

  );
}

export default App;
