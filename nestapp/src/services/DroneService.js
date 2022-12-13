import axios from 'axios'
import FilterController from "./FilterController.js"

const XMLDroneData = () => { //GET request to fetch drone data
  const res = axios //the XML data is fetched from custom proxy, due to CORS-policy
    .get('https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/drones')
    .catch(function (error) { 
      console.log(error);
      return {};
    });
    return res.then(response => response.data);
};

const PilotInformation = async (serialNumber) => { //GET request to fetch pilot information
  const res = await axios
    .get(`https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
    .catch(function (error) { 
      console.log(error);
      return {};
    });
    return await res.data;
};


 //Creates more coherent drone object for easier data handling
const DroneDataObject = (droneData, time) => {
  const obj = []
  Object.keys(droneData).map(drone => 
    obj.push(
      {
        serialNumber: droneData[drone].children['0'].value,
        closestToNest: FilterController.distanceToNest(droneData, drone),
        lastSeen: time,
        timeOnList: null,
        x: droneData[drone].children['8'].value,
        y: droneData[drone].children['7'].value,
        pilotInformation: null,
      }
    )
  )
  return obj;
};

export default {
  XMLDroneData: XMLDroneData,
  DroneDataObject: DroneDataObject,
  PilotInformation: PilotInformation
};