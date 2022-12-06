import React from "react";
import DroneListItem from "./DroneListItem";

const ListComponent = ({droneData}) => {
    return(
        <table border="1">
            <tbody>
                <tr>
                    <th>Serial number</th>
                    <th>Distance to nest</th>
                    <th>Pilot ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Since last seen</th>
                </tr>
            {Object.keys(droneData).map(drone => 
            <DroneListItem key={droneData[drone].serialNumber} droneData={droneData} drone={drone}/>
        )}
            </tbody>
        </table>
    )
};

export default ListComponent;

