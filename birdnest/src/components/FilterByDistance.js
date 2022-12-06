import React from "react";

const distanceToNest = (droneData, drone) => {
    return Math.sqrt(Math.pow(250000-droneData[drone].children['8'].value, 2)+Math.pow(250000-droneData[drone].children['7'].value, 2)) //simple formula of distance between two points
};

const FilterInsideNDZ = (droneData) => {
    const result = Object.keys(droneData)
    .filter(drone => droneData[drone].closestToNest < 200000)
    .reduce((cur, drone) => { return Object.assign(cur, { [drone]: droneData[drone] })}, []);
    return result //return array with drones inside NDZ
};

const DronesInNDZ10Minutes = (TenMinuteData, droneData, time) => {
    if (droneData.length > 0) {
        const result = Object.keys(droneData)
        .map(drone => {
            const index = TenMinuteData.findIndex(object => object.serialNumber === droneData[drone].serialNumber);

            if (index === -1) {
                TenMinuteData.push(droneData[drone]);
            } else {
                console.log('here')
            }
        })
    }
    return TenMinuteData;
};

export default {
    FilterInsideNDZ: FilterInsideNDZ,
    distanceToNest: distanceToNest,
    DronesInNDZ10Minutes: DronesInNDZ10Minutes
};