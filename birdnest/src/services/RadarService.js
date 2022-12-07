
function drawPoint(x, y, context) {
    context.save();
    context.fillStyle = '#0000FF';
    context.beginPath();
    context.arc(x, y, 6, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }

const updateRadar = ({droneData}) => {
    droneData = droneData.filter(Boolean)
    var c = document.getElementById("radarcanvas");
    var context = c.getContext("2d");
    context.font = "14px Courier New Bold";
    Object.keys(droneData).map(drone => {
        drawPoint(droneData[drone].x/1000, 500 -droneData[drone].y/1000, context)
        context.fillText([droneData[drone].serialNumber], droneData[drone].x/1000 - 50, 500 - droneData[drone].y/1000 + 20);
    })
    context.font = "20px Courier New Bold";
    context.fillText('No-Fly Zone', 200, 255);
    context.save();
    context.strokeStyle = '#ff0000'
    context.lineWidth = 3;
    context.beginPath();
    context.arc(250, 250, 100, 0, 2 * Math.PI, false);
    context.stroke();
    context.restore();
};

const setupRadar = () => {
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
    context.strokeStyle = "#5c5c5c";
    context.stroke()
}

export default {
    updateRadar: updateRadar,
    setupRadar: setupRadar
};