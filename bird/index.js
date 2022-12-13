const cors = require('cors')
const http = require('http')
const express = require('express')
const app = express()
var morgan = require("morgan");
const Drone = require('./models/drone.js')
const fetch = require('./module/fetch')
require('dotenv').config()



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


app.get('/api/drones', (req, response) => {
    fetch.updateDatabase()
    Drone.find({}).then(drones => {
        response.json(drones)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});