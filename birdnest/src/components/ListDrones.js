import React from "react";
import DroneListItem from "./DroneListItem";
import FilterByDistance from "./FilterByDistance";
import DroneService from "../services/DroneService";

const ListComponent = ({droneData}) => {
    return(
        <table border="1">
                <tr>
                    <th>Serial number</th>
                    <th>Distance to nest</th>
                    <th>Pilot ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Phone number</th>
                    <th>Email</th>
                </tr>
            {Object.keys(droneData).map(drone => 
            <DroneListItem key={droneData[drone].serialNumber} droneData={droneData} drone={drone}/>
        )}
        </table>
    )
};

export default ListComponent;

