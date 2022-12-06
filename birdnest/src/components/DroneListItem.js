import React from "react";
import DroneService from "../services/DroneService";

const DroneListItem = ({droneData, drone}) => {
    console.log(DroneService.PilotInformation(droneData[drone].serialNumber))
    return(
        <li>{droneData[drone].serialNumber} distance to nest: {Math.round((droneData[drone].closestToNest)/1000)}</li>
    )
    };

export default DroneListItem;