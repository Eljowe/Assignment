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
        var xml = await new XMLParser().parseFromString(response) //parse response XML-data to array
        setTime(Date.parse(xml.children['1'].attributes.snapshotTimestamp)) //sync server time
        var DroneDataObject = DroneService.DroneDataObject(xml.children['1'].children, Date.parse(xml.children['1'].attributes.snapshotTimestamp)) //create more coherent drone object to handle data more intuitively
        setDroneData(DroneDataObject) //set list of drones to variable (this is used for coordinate mapping graph)
        setInsideNDZ(FilterController.FilterInsideNDZ(DroneDataObject)) //update drones inside the NDZ
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

  useEffect(() => { //update radar and ten minute data when drone list is updated
      setTenMinuteData(FilterController.DronesInNDZ10Minutes(TenMinuteData, insideNDZ, time))
      RadarService.setupRadar();
      RadarService.updateRadar({droneData});
    }, [droneData])

 

  return (
    <div>
      <h1>Drones that have violated the No-fly zone (in the last 10 minutes):</h1>
      <ListComponent droneData={TenMinuteData} />
      <h1>Radar</h1>
      <Radar className='radarcanvas' droneData={droneData} />
      <h2>All drones within the radar area:</h2>
      <ListComponent droneData={droneData}/>
      <h2>Drones currently inside NDZ:</h2>
      <ListComponent droneData={insideNDZ} />
    </div>
  );
}

export default App;
