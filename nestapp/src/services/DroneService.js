import axios from 'axios'

const XMLDroneData = () => { //GET request to fetch drone data
  const res = axios //the XML data is fetched from custom proxy, due to CORS-policy
    .get('https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/drones')
    .catch(function (error) { 
      console.log(error);
      return {};
    });
    return res.then(response => response.data);
};



 //Creates more coherent drone object for easier data handling
const DroneDataObject = (droneData, time) => {
  const obj = []
  Object.keys(droneData).map(drone => 
    obj.push(
      {
        serialNumber: droneData[drone].children['0'].value,
        closestToNest: -1,
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
};