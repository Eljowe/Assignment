import axios from "axios";
const baseUrl = 'http://localhost:8080/api/drones'
///api/drones
const listDrones = () => {
    const res = axios.get(baseUrl);
    return res.then(response => response.data);
};

export default {
    listDrones: listDrones,
};