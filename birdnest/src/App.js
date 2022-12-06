import React, { useEffect, useState } from "react";
import axios from 'axios'
import DroneService from "./services/DroneService";
import XMLParser from 'react-xml-parser';
import ListComponent from "./components/ListDrones";
import FilterInsideNDZ from "./components/FilterByDistance";

function App() {
  const [droneData, setDroneData] = useState('');
  const [insideNDZ, setInsideNDZ] = useState({})

  useEffect(() => {
    const updateDroneData = setInterval(()=> {
      DroneService.DroneData().then(response => {
        var xml = new XMLParser().parseFromString(response) //Response XML-data to array
        setDroneData(xml.children['1'].children) //set list of drones to variable
        setInsideNDZ(FilterInsideNDZ(xml.children['1'].children))
      })
    }, 2000); //Loop every 2 seconds to fetch current drone positions
    return () => {
    clearInterval(updateDroneData);
    };
  }, []);

  return (
    <div>
      <p>Drones:</p>
      <ListComponent droneData={droneData}/>
      <p>Inside NDZ:</p>
      <ListComponent droneData={insideNDZ} />
    </div>
  );
}

export default App;
