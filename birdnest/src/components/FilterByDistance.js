import React from "react";

const distanceToNest = (droneData, drone) => {
    return Math.sqrt(Math.pow(250000-droneData[drone].children['8'].value, 2)+Math.pow(250000-droneData[drone].children['7'].value, 2)) //simple formula of distance between two points
};

const FilterInsideNDZ = (droneData) => {
    const result = Object.keys(droneData)
    .filter(drone => droneData[drone].closestToNest < 100000)
    .reduce((cur, drone) => { return Object.assign(cur, { [drone]: droneData[drone] })}, []);
    return result //return array with drones inside NDZ
};

export default {
    FilterInsideNDZ: FilterInsideNDZ,
    distanceToNest: distanceToNest
};