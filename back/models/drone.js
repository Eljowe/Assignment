const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const droneSchema = new mongoose.Schema({
        serialNumber: String,
        closestToNest: Number,
        lastSeen: Number,
        timeOnList: Number,
        x: Number,
        y: Number,
        pilotInformation: Array,
})

droneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('Drone', droneSchema)