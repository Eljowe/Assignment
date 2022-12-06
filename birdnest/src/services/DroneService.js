import React ,{ useEffect, useState} from "react";
import axios from 'axios'
import XMLParser from 'react-xml-parser';
import FilterByDistance from "../components/FilterByDistance";

//https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/drones'
//https://damp-oasis-94494.herokuapp.com/assignments.reaktor.com/birdnest/drones
const DroneData = () => {
  const res = axios
    .get('https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/drones',
    {
      "Content-Type": "application/xml; charset=utf-8"
    });
    return res.then(response => response.data);
};

const DroneDataObject = (droneData, time) => {
  const obj = []
  Object.keys(droneData).map(drone => 
    obj.push(
      {
        serialNumber: droneData[drone].children['0'].value,
        closestToNest: FilterByDistance.distanceToNest(droneData, drone),
        firstSeen: time,
        x: droneData[drone].children['8'].value,
        y: droneData[drone].children['7'].value,
      }
    )
  )
  return obj;
};

export default {
  DroneData: DroneData,
  DroneDataObject: DroneDataObject
};