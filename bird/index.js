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

let drones = [
    {
        serialNumber: 'test',
        closestToNest: 1,
        lastSeen: undefined,
        timeOnList: 120,
        x: 250,
        y: 251,
        pilotInformation: null
      }
]

const generateId = () => {
const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
return maxId + 1
}



app.get('/api/drones', (req, res) => {
    res.json(drones)
})


app.post('/api/drones/', (request, response) => {
    const body = request.body;

    if (drones.filter(drone => drone.serialNumber===body.serialNumber).length > 0) {
    return 0
    }

    const drone = {
        serialNumber: body.serialNumber,
        closestToNest: body.closestToNest,
        lastSeen: body.lastSeen,
        timeOnList: body.timeOnList,
        x: body.x,
        y: body.y,
        pilotInformation: body.pilotInformation
      }
    drones = drones.concat(drone)
    response.json(drone)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});