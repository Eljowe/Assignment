const cors = require('cors')
const http = require('http')
const express = require('express')
const app = express()
var morgan = require("morgan");


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)
app.use(morgan("tiny"));
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token("Body", req => JSON.stringify(req.body));


let drones = []

const generateId = () => {
const maxId = dronesTenMinutes.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
return maxId + 1
}

app.get('/api/drones', (req, res) => {
    res.json(drones)
})

app.post('/api/drones/', (request, response) => {
    const body = request.body;
    console.log(body)
    if (drones.filter(drone => drone.serialNumber===body.serialNumber).length > 0) { 
        objIndex = drones.findIndex((obj => obj.serialNumber == body.serialNumber));
        drones[objIndex].lastSeen = body.lastSeen
        if (drones[objIndex].firstSeen === null){
            drones[objIndex].firstSeen.lastSeen = body.lastSeen
        }
        if (drones[objIndex].pilotInformation === null) {
            drones[objIndex].pilotInformation = body.pilotInformation
        }
        drones[objIndex].timeOnList = body.timeOnList
        console.log('updated last seen value')
        return 0
    }
    drones = drones.concat(body)
    response.json(body)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});