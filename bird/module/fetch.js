const { response } = require('express');
const https = require('https');
var xml2json = require('xml2js');
const Drone = require('../models/drone.js')


const getXML = () => {
    let arr = []
    https.get("https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/drones", (res) => {
        let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        var parser = new xml2json.Parser();
        var i = 0;
        parser.parseString(data, function(err, result){  
                arr =result.report.capture[0].drone
                const data = JSON.stringify(result.report.capture[0])
                //tähän filtterit sijainnille 
                //poista kaikki aika yli 10min Drone.remove({timeOnList:})
                Object.keys(arr).forEach(drone => {
                    //console.log(arr[drone])
                    Drone.find({serialNumber: arr[drone].serialNumber[0]})
                    .then(result => {
                        if(result.length > 0) {
                            console.log('duplicate')
                        } else {
                            const droneObject = new Drone({
                                serialNumber: arr[drone].serialNumber[0],
                                closestToNest: -1,
                                lastSeen: -1,
                                timeOnList: -1,
                                x: Number(arr[drone].positionX[0]),
                                y: Number(arr[drone].positionY[0]),
                                pilotInformation: [],
                            })
                            droneObject.save()
                        }
                    })
                })
                return arr;
            });
    });
    return arr;
    
    });
}

exports.getXML = getXML