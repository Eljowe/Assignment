import React from "react";
import DroneService from "../services/DroneService";

const DroneListItem = ({droneData, drone}) => {
    if (droneData[drone].pilotInformation !== null) {
        return(
            <li>
                <div>
                    {droneData[drone].serialNumber} distance to nest: {Math.round((droneData[drone].closestToNest)/1000)}
                    <br/>
                    Pilot ID: {droneData[drone].pilotInformation.pilotId}
                    <br/>
                    Name: {droneData[drone].pilotInformation.firstName}
                    <br/>
                    Surname: {droneData[drone].pilotInformation.lastName}
                    <br/>
                    Phone number: {droneData[drone].pilotInformation.phoneNumber}
                    <br/>
                    Email: {droneData[drone].pilotInformation.email}
                    <br/>
                </div>
            </li>
        )
    }
    return(
        <li>
            <div>
                {droneData[drone].serialNumber} distance to nest: {Math.round((droneData[drone].closestToNest)/1000)}
            </div>
        </li>
    )
    };

export default DroneListItem;