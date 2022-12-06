import React from "react";
import FilterByDistance from "./FilterByDistance";

const DroneListItem = ({droneData, drone}) => {
    return(
        <li>{droneData[drone].serialNumber} distance to nest: {Math.round((droneData[drone].closestToNest)/1000)}</li>
    )
    };

export default DroneListItem;