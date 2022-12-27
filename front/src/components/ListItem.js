import React from "react";

const ListItem = ({droneData, drone, time}) => {
    
    if (droneData[drone].pilotInformation !== null) { //Pilot information is set if drone enters NDZ
        const timeOnList = time - droneData[drone].lastSeen
        const minutes = Math.floor(timeOnList / 60000); //time formatting
        var seconds = (((timeOnList) % 60000) / 1000).toFixed(0);
        seconds = ("0" + seconds).slice(-2);
        return(
            <tr>
                <th>{droneData[drone].serialNumber}</th>
                <th>{Math.round((droneData[drone].closestToNest)/1000)} meters</th>
                <th>{JSON.parse(droneData[drone].pilotInformation[0]).pilotId}</th>
                <th>{JSON.parse(droneData[drone].pilotInformation[0]).firstName}</th>
                <th>{JSON.parse(droneData[drone].pilotInformation[0]).lastName}</th>
                <th>{JSON.parse(droneData[drone].pilotInformation[0]).phoneNumber}</th>
                <th>{JSON.parse(droneData[drone].pilotInformation[0]).email}</th>
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