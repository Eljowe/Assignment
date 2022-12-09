import axios from "axios";
const baseUrl = '/api/drones'

const listDrones = () => {
    const res = axios.get(baseUrl);
    return res.then(response => response.data);
};

const addDrone = obj => {
    const res = axios.post(baseUrl, obj);
    return res.then(response => response.data);
};

export default {
    listDrones: listDrones,
    addDrone: addDrone,
};