import React from "react";

const ListItem = ({droneData, drone}) => {
    if (droneData[drone].pilotInformation !== null) { //Pilot information is set if drone enters NDZ
        const minutes = Math.floor(droneData[drone].timeOnList / 60000); //time formatting
        var seconds = (((droneData[drone].timeOnList) % 60000) / 1000).toFixed(0);
        seconds = ("0" + seconds).slice(-2);
        return(
            <tr>
                <th>{droneData[drone].serialNumber}</th>
                <th>{Math.round((droneData[drone].closestToNest)/1000)} meters</th>
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

export default ListItem;