import React, { useEffect, useState } from "react";
import axios from 'axios'
import XMLParser from 'react-xml-parser';
import DroneData from "./services/XMLDrones";

function App() {
  const [droneData, setDroneData] = useState('');
  useEffect(() => {
    setDroneData(DroneData());
  }, [])
  return (
    <div>
      <p>Hello world</p>
      {droneData}
    </div>
  );
}

export default App;
