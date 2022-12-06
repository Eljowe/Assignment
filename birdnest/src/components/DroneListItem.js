import React from "react";

const DroneListItem = ({droneData, drone}) => {
    if (droneData[drone].pilotInformation !== null) {
        const minutes = Math.floor(droneData[drone].timeOnList / 60000);
        const seconds = (((droneData[drone].timeOnList) % 60000) / 1000).toFixed(0);
        return(
            <tr>
                <th>{droneData[drone].serialNumber}</th>
                <th>{Math.round((droneData[drone].closestToNest)/1000)}</th>
                <th>{droneData[drone].pilotInformation.pilotId}</th>
                <th>{droneData[drone].pilotInformation.firstName}</th>
                <th>{droneData[drone].pilotInformation.lastName}</th>
                <th>{droneData[drone].pilotInformation.phoneNumber}</th>
                <th>{droneData[drone].pilotInformation.email}</th>
                <th>{minutes}:{seconds}</th>
            </tr>
        )
    }
    return(
        <tr>
            <th>{droneData[drone].serialNumber}</th>
            <th>{Math.round((droneData[drone].closestToNest)/1000)}</th>
        </tr>
    )
    };

export default DroneListItem;