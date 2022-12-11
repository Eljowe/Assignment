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

const deleteDrone = serialNumber => {
    const res = axios.delete(`/api/drones/${serialNumber}`);
    return res.then(response => response.data);
  };

export default {
    listDrones: listDrones,
    addDrone: addDrone,
};