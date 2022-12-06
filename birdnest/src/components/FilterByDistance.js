import React from "react";

const distanceToNest = (droneData, drone) => {
    return Math.sqrt(Math.pow(250000-droneData[drone].children['8'].value, 2)+Math.pow(250000-droneData[drone].children['7'].value, 2)) //simple formula of distance between two points
};

const FilterInsideNDZ = (droneData) => {
    const filteredDrones = Object.keys(droneData)
    .filter(drone => droneData[drone].closestToNest < 100000)
    .reduce((cur, drone) => { return Object.assign(cur, { [drone]: droneData[drone] })}, []);
    return filteredDrones //return array with drones inside NDZ
};

const DronesInNDZ10Minutes = (TenMinuteData, droneData, time) => {
    if (droneData.length > 0) {
        const result = Object.keys(droneData)
        .map(drone => {
            const index = TenMinuteData.findIndex(object => object.serialNumber === droneData[drone].serialNumber);
            if (index === -1) { //add 
                TenMinuteData.push(droneData[drone]);
            } else {
                if (droneData[drone].closestToNest < TenMinuteData[index].closestToNest) { //
                    TenMinuteData[index].closestToNest=droneData[drone].closestToNest
                }
            }
        })
    }
    const result = Object.keys(TenMinuteData).filter(obj => time-TenMinuteData[obj].firstSeen > 60000)
    //console.log(result)
    return TenMinuteData;
};

export default {
    FilterInsideNDZ: FilterInsideNDZ,
    distanceToNest: distanceToNest,
    DronesInNDZ10Minutes: DronesInNDZ10Minutes
};