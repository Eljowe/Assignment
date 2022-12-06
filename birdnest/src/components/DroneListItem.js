import React from "react";
import FilterByDistance from "./FilterByDistance";

const DroneListItem = ({droneData, drone}) => {
    return(
        <li>{droneData[drone].children[0].value} distance to nest: {Math.round((FilterByDistance.distanceToNest(droneData, drone))/1000)}</li>
    )
    };

export default DroneListItem;