const cors = require('cors')
const http = require('http')
const express = require('express')
const app = express()
const Drone = require('./models/drone.js')
const fetch = require('./module/fetch')
require('dotenv').config()


app.use(express.json())
app.use(cors())
app.use(express.static('build'))



app.get('/api/drones', (req, response) => {
    Drone.find({}).then(drones => {
        response.json(drones)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)


//cursed interval to fetch data every 3 seconds
const interval = setInterval(() => {
    fetch.updateDatabase();
  }, 3000);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});