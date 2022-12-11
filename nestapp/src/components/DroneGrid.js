import React from "react";

const Radar = () => { //Component for Radar canvas
    const canvasStyle = {
        border : '1px',
        border : 'solid',
    }
    return(
        <canvas id="radarcanvas" width="500" height="500"></canvas>
    )
}


export default Radar;