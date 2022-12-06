import React, { useEffect, useState } from "react";
import DroneService from "./services/DroneService";
import XMLParser from 'react-xml-parser';
import ListComponent from "./components/ListDrones";
import FilterByDistance from "./components/FilterByDistance";

function App() {
  const [droneData, setDroneData] = useState([]); //all drones within the radar
  const [insideNDZ, setInsideNDZ] = useState([]); //drones currently within the NDZ
  const [time, setTime] = useState(); //current time of the birdnest touchpoint server
  const [TenMinuteData, setTenMinuteData] = useState([]); //


  useEffect(() => {
    const droneUpdate = async (response) => {
        var xml = await new XMLParser().parseFromString(response) //Response XML-data to array
        setTime(Date.parse(xml.children['1'].attributes.snapshotTimestamp))
        var DroneDataObject = DroneService.DroneDataObject(xml.children['1'].children, Date.parse(xml.children['1'].attributes.snapshotTimestamp))
        setDroneData(DroneDataObject) //set list of drones to variable (this is used for coordinate mapping graph)
        setInsideNDZ(FilterByDistance.FilterInsideNDZ(DroneDataObject)) //List of drones inside 100m range
    }
    const updateDroneData = setInterval(()=> {
      DroneService.DroneData().then(response => {
        droneUpdate(response);
      })
    }, 2000); //Loop every 2 seconds to fetch current drone positions
    return () => {
    clearInterval(updateDroneData);
    };
  }, []);

  useEffect(() => {
      setTenMinuteData(FilterByDistance.DronesInNDZ10Minutes(TenMinuteData,insideNDZ, time))
  }, [droneData])

 

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
