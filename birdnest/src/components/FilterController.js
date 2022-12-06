import DroneService from "../services/DroneService";

const distanceToNest = (droneData, drone) => { //simple formula to calculate distance between drone and nest
    return Math.sqrt(Math.pow(250000-droneData[drone].children['8'].value, 2)+Math.pow(250000-droneData[drone].children['7'].value, 2)) //simple formula of distance between two points
};

const FilterInsideNDZ = (droneData) => {
    const filteredDrones = Object.keys(droneData)
    .filter(drone => droneData[drone].closestToNest < 100000)
    .reduce((cur, drone) => { return Object.assign(cur, { [drone]: droneData[drone] })}, []);
    return filteredDrones //return array with drones inside NDZ
};

const TenMinuteFilter = (TenMinuteData, time) => {
    Object.keys(TenMinuteData).map(obj => {
        TenMinuteData[obj].timeOnList = time - TenMinuteData[obj].lastSeen;
    })
    const result = Object.keys(TenMinuteData).filter(obj => time-TenMinuteData[obj].lastSeen < 600000)
    .reduce((cur, drone) => { return Object.assign(cur, { [drone]: TenMinuteData[drone] })}, []);
    return result;
}

const DronesInNDZ10Minutes = (TenMinuteData, droneData, time) => {
    if (droneData.length > 0) {
        Object.keys(droneData)
        .map(drone => {
            TenMinuteData.filter(Boolean)
            if (!TenMinuteData.includes(undefined)) {
                const index = TenMinuteData.findIndex(object => object.serialNumber === droneData[drone].serialNumber)
                if (index === -1) { //Drone isn't in the ten minute buffer list and is therefore added
                    DroneService.PilotInformation(droneData[drone].serialNumber)
                    .then(response => {
                        droneData[drone].pilotInformation = response;
                    })
                    TenMinuteData.push(droneData[drone]);
                } else {
                    TenMinuteData[index].lastSeen = time; //if the drone is in NDZ, the 10 minute timer is reseted
                    if (droneData[drone].closestToNest < TenMinuteData[index].closestToNest) { //
                        TenMinuteData[index].closestToNest=droneData[drone].closestToNest
                    }
                }
        }})
    }
    return TenMinuteFilter(TenMinuteData, time);
};

export default {
    FilterInsideNDZ: FilterInsideNDZ,
    distanceToNest: distanceToNest,
    DronesInNDZ10Minutes: DronesInNDZ10Minutes,
    TenMinuteFilter: TenMinuteFilter
};