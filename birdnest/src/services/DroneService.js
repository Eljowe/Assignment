import axios from 'axios'
import FilterController from "../components/FilterController";

//https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/drones'
//https://damp-oasis-94494.herokuapp.com/assignments.reaktor.com/birdnest/drones
const XMLDroneData = () => {
  const res = axios //the XML data is fetched from custom proxy, as the original server had CORS-policy trouble
    .get('https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/drones')
    .catch(function (error) { 
      console.log(error);
      return {};
    });
    return res.then(response => response.data);
};

const PilotInformation = async (serialNumber) => {
  const res = await axios
    .get(`https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
    .catch(function (error) { 
      console.log(error);
      return {};
    });
    return await res.data;
};

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
        pilotInformation: null
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