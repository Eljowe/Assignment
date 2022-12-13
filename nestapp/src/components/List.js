import React from "react";
import ListItem from "./ListItem";

const ListComponent = ({droneData, time}) => { //Table listing component
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
                    <th>Time since last in NDZ</th>
                </tr>
                    {Object.keys(droneData).map(drone => 
                    <ListItem key={droneData[drone].serialNumber} droneData={droneData} drone={drone} time={time}/>
                    )}
            </tbody>
        </table>
    )
};

export default ListComponent;

