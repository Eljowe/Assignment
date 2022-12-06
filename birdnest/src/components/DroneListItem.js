import React from "react";

const DroneListItem = ({droneData, drone}) => {
    return(
        <li>{droneData[drone].children[0].value} y: {droneData[drone].children['7'].value} x: {droneData[drone].children['8'].value}</li>
    )
    };

export default DroneListItem;