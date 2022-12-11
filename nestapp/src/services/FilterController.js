import DroneService from "./DroneService";


//simple formula to calculate distance between drone and nest
const distanceToNest = (droneData, drone) => { 
    return Math.sqrt(Math.pow(250000-droneData[drone].children['8'].value, 2)+Math.pow(250000-droneData[drone].children['7'].value, 2)) //simple formula of distance between two points
};


//filters drones that are within 100m from nest
const FilterInsideNDZ = (droneData) => {
    const filteredDrones = Object.keys(droneData)
    .filter(drone => droneData[drone].closestToNest < 100000)
    .reduce((cur, drone) => { return Object.assign(cur, { [drone]: droneData[drone] })}, []);
    return filteredDrones
};

const TenMinuteFilter = (droneData, time) => { //filters drones that have last been seen over ten minutes ago
    Object.keys(droneData).map(obj => {
        droneData[obj].timeOnList = time - droneData[obj].lastSeen; //timer starts counting from zero when the drone leaves the NDZ (timer resets to 0 when the drone is in NDZ)
    })
    const result = Object.keys(droneData).filter(obj => time-droneData[obj].lastSeen < 600000)
    .reduce((cur, drone) => { return Object.assign(cur, { [drone]: droneData[drone] })}, []);
    return result;
}

const FilterAndUpdateTimeAndDistance = (TenMinuteData, allDrones, time) => {
    allDrones = FilterInsideNDZ(allDrones, time)
    TenMinuteData = FilterInsideNDZ(TenMinuteData, time)
    if (allDrones.length > 0) {
        Object.keys(allDrones)
        .map(drone => {
            TenMinuteData.filter(Boolean)
            if (!TenMinuteData.includes(undefined)) {
                const index = TenMinuteData.findIndex(object => object.serialNumber === allDrones[drone].serialNumber)
                if (index === -1) { //Drone isn't in the ten minute buffer list and is therefore added
                    DroneService.PilotInformation(allDrones[drone].serialNumber) //Pilot information is fetched as the drone has violated NDZ
                    .then(response => {
                        allDrones[drone].pilotInformation = response;
                    })
                    TenMinuteData.push(allDrones[drone]);
                } else {
                    TenMinuteData[index].lastSeen = time; //if the drone is in NDZ, the 10 minute timer is reseted
                    if (allDrones[drone].closestToNest < TenMinuteData[index].closestToNest) { //Closest recorded distance to the nest is left is saved
                        TenMinuteData[index].closestToNest=allDrones[drone].closestToNest
                    }
                }
        }})
    }
    const result = TenMinuteFilter(TenMinuteData, time)
    return result.filter(Boolean);
};

export default {
    distanceToNest: distanceToNest,
    FilterInsideNDZ: FilterInsideNDZ,
    FilterAndUpdateTimeAndDistance: FilterAndUpdateTimeAndDistance,
};