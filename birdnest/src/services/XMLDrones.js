import React ,{ useEffect, useState} from "react";
import axios from 'axios'
import XMLParser from 'react-xml-parser';

//https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/drones'
//https://damp-oasis-94494.herokuapp.com/assignments.reaktor.com/birdnest/drones
const DroneData = () => {
  axios
    .get('https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/drones',
    {
      "Content-Type": "application/xml; charset=utf-8"
    })
    .then(response => {
      const data = response.data;
      var xml = new XMLParser().parseFromString(data); 
      const res = xml.children['1'].children
      console.log(res)
      return res;
    })
};

export default DroneData;