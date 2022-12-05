import React, { useEffect, useState } from "react";
import axios from 'axios'
import XMLDrones from "./services/XMLDrones.js";
import XMLParser from 'react-xml-parser';

function App() {
  const [droneData, setDroneData] = useState('');

  useEffect(() => {
    XMLDrones.DroneData().then(response => {
      var xml = new XMLParser().parseFromString(response)
      setDroneData(xml.children['1'].children);
      console.log(xml.children['1'].children)
    });
  }, []);
  return (
    <div>
      <p>Hello world</p>
      <ul>
        {Object.keys(droneData).map(drone => {
          <li key={droneData[drone].children[0].value}>{droneData[drone].children[0].value}</li>
          console.log(droneData[drone].children[0].value)
          console.log(droneData[drone].children['7'].value) // Y-coordinate
          console.log(droneData[drone].children['8'].value) // X-coordinate
        })}
      </ul>
    </div>
  );
}

export default App;
