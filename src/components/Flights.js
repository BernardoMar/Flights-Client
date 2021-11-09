import React, {Component} from 'react';
import CreateFlights from './CreateFlights'
import FlightsForm from './Flights'
import FlightsTable from './FlightsTable'

class Flights extends Component {
  render() {
    return (
      <div>
        <CreateFlights />
        <FlightsForm />
        <FlightsTable />
      </div>
    );
  }
}

export default Flights;
