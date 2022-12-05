import React, { useEffect, useState } from "react";
import axios from 'axios'
import DroneService from "./services/DroneService";
import XMLParser from 'react-xml-parser';

function App() {
  const [droneData, setDroneData] = useState('');

  useEffect(() => {
    DroneService.DroneData().then(response => {
      var xml = new XMLParser().parseFromString(response) //Response XML-data to array
      setDroneData(xml.children['1'].children); //set list of drones to variable
    });
  }, []);
  return (
    <div>
      <p>Hello world</p>
      <ul>
        {Object.keys(droneData).map(drone => 
          <li key={droneData[drone].children[0].value}>{droneData[drone].children[0].value} y: {droneData[drone].children['7'].value} x: {droneData[drone].children['8'].value}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
