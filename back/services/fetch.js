const { response } = require('express');
const https = require('https');
var xml2json = require('xml2js');
const Drone = require('../models/drone.js')

//simple formula to calculate distance between drone and nest
const distanceToNest = (x, y) => { 
    return Math.sqrt(Math.pow(250000-x, 2)+Math.pow(250000-y, 2)) //simple formula of distance between two points
};


const updateDatabase = () => {
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
                const time = Date.parse(result.report.capture[0]['$'].snapshotTimestamp)
                //poista kaikki aika yli 10min Drone.deleteMany({timeOnList:}) ehkä vasta lopussa
                Object.keys(arr).forEach(drone => {
                    //console.log(arr[drone])
                    if (distanceToNest(Number(arr[drone].positionX[0]), Number(arr[drone].positionY[0]))<100000) {
                        
                    
                        Drone.find({serialNumber: arr[drone].serialNumber[0]})
                        .then(result => {
                            if(result.length > 0) {
                                if (distanceToNest(Number(arr[drone].positionX[0]), Number(arr[drone].positionY[0]))<result[0].closestToNest) {
                                    
                                    Drone.findOneAndUpdate(
                                        { serialNumber: arr[drone].serialNumber[0]}, 
                                        {
                                            closestToNest: distanceToNest(Number(arr[drone].positionX[0]), Number(arr[drone].positionY[0])), 
                                            lastSeen: time
                                        },
                                        {'new': true },
                                        function(err, pc) {
                                            if (err) {
                                            console.log('ERROR AT UPDATE DB DRONE');
                                                throw (err);
                                            }}
                                            );
                            } else {
                                Drone.findOneAndUpdate(
                                    { serialNumber: arr[drone].serialNumber[0]}, 
                                    {
                                        lastSeen: time
                                    },
                                    {'new': true },
                                    function(err, pc) {
                                        if (err) {
                                        console.log('ERROR AT UPDATE DB DRONE');
                                            throw (err);
                                        }}
                                        );
                            }

                            //drone is seen first time
                            } else {
                                https.get(`https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/pilots/${arr[drone].serialNumber[0]}`, (res) => {
                                    let pilotdata = '';

                                    res.on('data', (chunk) => {
                                        pilotdata += chunk;
                                    });

                                    res.on('end', () => {
                                        const droneObject = new Drone({
                                            serialNumber: arr[drone].serialNumber[0],
                                            closestToNest: distanceToNest(Number(arr[drone].positionX[0]), Number(arr[drone].positionY[0])),
                                            lastSeen: time,
                                            timeOnList: -1,
                                            x: Number(arr[drone].positionX[0]),
                                            y: Number(arr[drone].positionY[0]),
                                            pilotInformation: pilotdata,
                                        })
                                        droneObject.save()
                                    });
                                });
                                
                            }
                        })
                    }
                })

                //deleting 10 minute old data
                Drone.deleteMany({lastSeen: { $lte: (time-600000)}},{'new': true },
                function(err, pc) {
                    if (err) {
                    console.log('ERROR AT UPDATE DB DRONE');
                        throw (err);
                    }}
                    );
            
            });
        });
    
    });
}

exports.updateDatabase = updateDatabase