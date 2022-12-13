import React, { useEffect, useState } from "react";
import DroneService from "./services/DroneService";
import XMLParser from 'react-xml-parser';
import ListComponent from "./components/List";
import Radar from "./components/DroneGrid";
import RadarService from "./services/RadarService";
import './index.css';
import DroneDB from "./services/DroneDB";


function App() {
  const [allDrones, setAllDrones] = useState([])
  const [drones, setDrones] = useState([])
  const [time, setTime] = useState('')

  useEffect(() => {
    const droneUpdate = async (response) => {
      var xml = await new XMLParser().parseFromString(response) //parse response XML-data to array
      setTime(Date.parse(xml.children['1'].attributes.snapshotTimestamp)) //sync server time
      
       //create more coherent drone object to handle data more intuitively
      var DroneDataObject = DroneService.DroneDataObject(xml.children['1'].children, Date.parse(xml.children['1'].attributes.snapshotTimestamp)) 
      setAllDrones(DroneDataObject)
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
    DroneDB.listDrones().then(response => {
      setDrones(response);
    })
    RadarService.setupRadar();
    RadarService.updateRadar({allDrones});
  }, [allDrones])

  return (
    <div>
      <h1>Drones that have violated the No-fly zone (in the last 10 minutes):</h1>
      <ListComponent droneData={drones} time={time} />
      <h1>Radar</h1>
      <Radar className='radarcanvas' droneData={allDrones} />
    </div>
  );
}

export default App;
