import React, { useEffect, useState } from "react";
import DroneService from "./services/DroneService";
import XMLParser from 'react-xml-parser';
import ListComponent from "./components/ListDrones";
import FilterByDistance from "./components/FilterByDistance";

function App() {
  const [droneData, setDroneData] = useState([]);
  const [insideNDZ, setInsideNDZ] = useState([]);
  const [time, setTime] = useState();
  const [TenMinuteData, setTenMinuteData] = useState([])

  useEffect(() => {
    const updateDroneData = setInterval(()=> {
      DroneService.DroneData().then(response => {
        var xml = new XMLParser().parseFromString(response) //Response XML-data to array
        setTime(Date.parse(xml.children['1'].attributes.snapshotTimestamp))
        var DroneDataObject = DroneService.DroneDataObject(xml.children['1'].children, time)
        setDroneData(DroneDataObject) //set list of drones to variable (this is used for coordinate mapping graph)
        setInsideNDZ(FilterByDistance.FilterInsideNDZ(DroneDataObject)) //List of drones inside 100m range
      }).then(setTenMinuteData(FilterByDistance.DronesInNDZ10Minutes(TenMinuteData,insideNDZ, time)))
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
      <p>Inside NDZ (last 10 minutes):</p>
      <ListComponent droneData={TenMinuteData} />
    </div>
  );
}

export default App;
