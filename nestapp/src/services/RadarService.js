
function drawPoint(x, y, context) {
    context.save();
    context.fillStyle = '#0000FF';
    context.beginPath();
    context.arc(x, y, 6, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }

const updateRadar = ({allDrones}) => {
    if (allDrones !== undefined) {
        allDrones = allDrones.filter(Boolean) //remove possible undefined objects
        var c = document.getElementById("radarcanvas");
        var context = c.getContext("2d");
        context.font = "14px Courier New";
        Object.keys(allDrones).forEach(drone => {
            drawPoint(allDrones[drone].x/1000, 500 -allDrones[drone].y/1000, context) //draw a point presenting a drone in the grid
            context.fillText([allDrones[drone].serialNumber], allDrones[drone].x/1000 - 55, 500 - allDrones[drone].y/1000 + 20); //nametag for the drone
        })
        context.font = "20px Courier New";
        context.fillText('No-Fly Zone', 190, 255); //tag in the center of the circle
        context.save();
        context.strokeStyle = '#ff0000'
        context.lineWidth = 3;
        context.beginPath();
        context.arc(250, 250, 100, 0, 2 * Math.PI, false); //NDZ marked with red circle
        context.stroke();
        context.restore();
    }
};

const setupRadar = () => { //draw grid
    var c = document.getElementById("radarcanvas");
    var context = c.getContext("2d");
    context.clearRect(0, 0, c.width, c.height);
    const p = 0;
    for (var x = 0; x <= c.width; x += 25) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, c.height + p);
    }
    for (var x = 0; x <= c.height; x += 25) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(c.width + p, 0.5 + x + p);
    }
    context.strokeStyle = "#ffd9d9";
    context.stroke()
}

export default {
    updateRadar: updateRadar,
    setupRadar: setupRadar
};