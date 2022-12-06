import React, { useEffect, useState } from "react";
import axios from 'axios'
import DroneService from "./services/DroneService";
import XMLParser from 'react-xml-parser';
import ListComponent from "./components/ListDrones";
import FilterByDistance from "./components/FilterByDistance";

function App() {
  const [droneData, setDroneData] = useState('');
  const [insideNDZ, setInsideNDZ] = useState({});
  const [time, setTime] = useState();

  useEffect(() => {
    const updateDroneData = setInterval(()=> {
      DroneService.DroneData().then(response => {
        var xml = new XMLParser().parseFromString(response) //Response XML-data to array
        var DroneDataObject = DroneService.DroneDataObject(xml.children['1'].children, time)
        setDroneData(DroneDataObject) //set list of drones to variable
        setTime(xml.children['1'].attributes.snapshotTimestamp)
        setInsideNDZ(FilterByDistance.FilterInsideNDZ(DroneDataObject)) //List of drones inside 100m range
      })
    }, 2000); //Loop every 2 seconds to fetch current drone positions
    return () => {
    clearInterval(updateDroneData);
    };
  }, []);
  return (
    <div>
      <p>Time: {time}</p>
      <p>Drones:</p>
      <ListComponent droneData={droneData}/>
      <p>Inside NDZ:</p>
      <ListComponent droneData={insideNDZ} />
    </div>
  );
}

export default App;
