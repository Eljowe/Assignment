import React from "react";
import DroneListItem from "./DroneListItem";

const ListComponent = ({droneData}) => {
    return(
        <ul>
            {Object.keys(droneData).map(drone => 
            <DroneListItem key={droneData[drone].serialNumber} droneData={droneData} drone={drone}/>
        )}
        </ul>
    )
};

export default ListComponent;

