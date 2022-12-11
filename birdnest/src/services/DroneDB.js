import axios from "axios";
const baseUrl = 'http://localhost:8080/api/drones'
///api/drones
const listDrones = () => {
    const res = axios.get(baseUrl);
    return res.then(response => response.data);
};

const addDrone = obj => {
    const res = axios.post(baseUrl, obj);
    return res.then(response => response.data);
};

const listDronesTenMinutes = () => {
    const res = axios.get('http://localhost:8080/api/dronesTenMinutes');
    return res.then(response => response.data);
};

const addDronesInTenMinutes = obj => {
    const res = axios.post('http://localhost:8080/api/dronesTenMinutes', obj);
    return res.then(response => response.data);
};

const deleteDrone = serialNumber => {
    const res = axios.delete(`/api/drones/${serialNumber}`);
    return res.then(response => response.data);
  };

export default {
    listDrones: listDrones,
    addDrone: addDrone,
    listDronesTenMinutes: listDronesTenMinutes,
    addDronesInTenMinutes: addDronesInTenMinutes
};