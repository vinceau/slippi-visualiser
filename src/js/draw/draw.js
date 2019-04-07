import { Vec2D } from "../utils/Vec2D";

// SETUP LAYERS
export let bg1 = 0;
export let bg2 = 0;
export let fg1 = 0;
export let fg2 = 0;
export let ui = 0;
export const c = 0;
export const canvasMain = 0;
export const layers = {
  BG1 : 0,
  BG2 : 0,
  FG1 : 0,
  FG2 : 0,
  UI : 0
};
const layerSwitches = {
  BG1 : true,
  BG2 : true,
  FG1 : true,
  FG2 : true,
  UI : true
};

export function clearScreen (){
  bg2.clearRect(0, 0, layers.BG2.width, layers.BG2.height);
  fg2.clearRect(0, 0, layers.FG2.width, layers.FG2.height);
  ui.clearRect(0, 0, layers.UI.width, layers.UI.height);
}

export function setupLayers() {
  layers.BG1 = document.getElementById("background1Canvas");
  bg1 = layers.BG1.getContext("2d");
  layers.BG2 = document.getElementById("background2Canvas");
  bg2 = layers.BG2.getContext("2d");
  layers.FG1 = document.getElementById("foreground1Canvas");
  fg1 = layers.FG1.getContext("2d");
  layers.FG2 = document.getElementById("foreground2Canvas");
  fg2 = layers.FG2.getContext("2d");
  layers.UI = document.getElementById("uiCanvas");
  ui = layers.UI.getContext("2d");
  bg1.fillStyle = "rgb(0, 0, 0)";
  bg1.fillRect(0, 0, layers.BG1.width, layers.BG1.height);
}

export function renderToMain (){
  var keys = Object.keys(layers);
  for (var i = 0; i < keys.length; i++) {
    if (layerSwitches[keys[i]]) {
      c.drawImage(layers[keys[i]], 0, 0)
    }
  }
}

export function rotateVector(vecx, vecy, ang) {
    return new Vec2D(
        vecx * Math.cos(ang) - vecy * Math.sin(ang),
        vecx * Math.sin(ang) + vecy * Math.cos(ang));
}

export function drawArrayPathCompress (can, col, face, tX, tY, path, scaleX, scaleY, rotate, rpX, rpY, extra) {
  can.save();
  if (extra !== undefined) {
    extra();
  }
  can.translate(tX - rpX, tY - rpY);
  can.rotate(rotate);

  can.fillStyle = col;
  can.lineWidth = 1;
  can.strokeStyle = col;
  can.beginPath();
  // for each shape
  if(path !== undefined && path !== null && path.length !== undefined) {

    for (var j = 0; j < path.length; j++) {
        // first 2 numbers are starting vector points
        var x = (path[j][0] * scaleX * face) + rpX;
        var y = (path[j][1] * scaleY) + rpY;
        can.moveTo(x, y);
        // starting from index 2, each set of 6 numbers are bezier curve coords
        for (var k = 2; k < path[j].length; k += 6) {
            can.bezierCurveTo((path[j][k] * scaleX * face) + rpX, (path[j][k + 1] * scaleY) + rpY, (path[j][k + 2] * scaleX *
                face) + rpX, (path[j][k + 3] * scaleY) + rpY, (path[j][k + 4] * scaleX * face) + rpX, (path[j][k + 5] *
                scaleY) + rpY);
        }
    }
  }
  can.closePath();
  //can.fill();
  can.stroke();
  can.restore();
}