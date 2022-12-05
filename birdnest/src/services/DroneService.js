import React ,{ useEffect, useState} from "react";
import axios from 'axios'
import XMLParser from 'react-xml-parser';

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

export default {
  DroneData: DroneData,
};