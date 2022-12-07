import React, { useEffect, useState } from "react";
import DroneService from "./services/DroneService";
import XMLParser from 'react-xml-parser';
import ListComponent from "./components/ListDrones";
import FilterController from "./components/FilterController";
import Radar from "./components/DroneGrid";
import RadarService from "./services/RadarService";
import './index.css';

function App() {
  const [droneData, setDroneData] = useState([]); //all drones within the radar
  const [insideNDZ, setInsideNDZ] = useState([]); //drones currently within the NDZ
  const [time, setTime] = useState(); //current time of the birdnest touchpoint server
  const [TenMinuteData, setTenMinuteData] = useState([]); //Drones that entered NDZ in the last 10 minutes


  useEffect(() => {
    const droneUpdate = async (response) => {
        var xml = await new XMLParser().parseFromString(response) //Response XML-data to array
        setTime(Date.parse(xml.children['1'].attributes.snapshotTimestamp))
        var DroneDataObject = DroneService.DroneDataObject(xml.children['1'].children, Date.parse(xml.children['1'].attributes.snapshotTimestamp)) //create more coherent object for drone to handle later
        setDroneData(DroneDataObject) //set list of drones to variable (this is used for coordinate mapping graph)
        setInsideNDZ(FilterController.FilterInsideNDZ(DroneDataObject))
    }
    const updateDroneData = setInterval(()=> { //interval to track drones and changes
      DroneService.XMLDroneData().then(response => {
        droneUpdate(response);
      })
    }, 2000); //Loop every 2 seconds to fetch current drone positions
    return () => {
    clearInterval(updateDroneData);
    };
  }, []);

  useEffect(() => {
      setTenMinuteData(FilterController.DronesInNDZ10Minutes(TenMinuteData, insideNDZ, time))
      RadarService.setupRadar();
      RadarService.updateRadar({droneData});
    }, [droneData])

 

  return (
    <div>
      <p>Time: {time}</p>
      <p>Inside NDZ (last 10 minutes):</p>
      <ListComponent droneData={TenMinuteData} />
      <p>Radar</p>
      <Radar className='radarcanvas' droneData={droneData} />
      <p>All drones:</p>
      <ListComponent droneData={droneData}/>
      <p>Inside NDZ:</p>
      <ListComponent droneData={insideNDZ} />
    </div>
  );
}

export default App;
