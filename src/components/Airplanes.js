import React, {Component} from 'react';
import CreatePlane from './CreatePlane'
import PlaneForm from './PlaneForm'
import PlaneDiagram from './PlaneDiagram'

class Airplanes extends Component {
  render() {
    return (
      <div>
        <CreatePlane/>
        <PlaneForm/>
        <PlaneDiagram/>
      </div>
    );
  }
}

export default Airplanes;
