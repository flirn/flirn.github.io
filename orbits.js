let lineRotate, satRotate, c;
let x = 0;
var beamRotation = [];
var lineRange = [];
var orbitSizeX = [];
var orbitSizeY = [];
var orbitRotationSpeed = [];
var sat1Speed = [];
var sat2Speed = [];
var planetColors = [];
function setup() {
  planetColors = [color(255, 0, 255, 128), color(255, 255, 0, 128), color(0, 255, 255, 128), color(255, 255, 255)];
  for (let i = 0; i<16; i++){
    beamRotation.push(random(0, 360));
    lineRange.push(random(-30, 30));
    orbitSizeX.push(random(30, 100));
    orbitSizeY.push(random(30, 100));
    sat1Speed.push(random(-20, 20));
    sat2Speed.push(random(-20, 20));
    orbitRotationSpeed.push(random(-20, 20));
  }
  createCanvas(800, 800);
}

function drawPlanet(pos1, pos2, zustand, version) {
  angleMode(DEGREES);

  
  //Line
  push();
  translate(pos1, pos2);
  stroke('white');
  strokeWeight(2);
  let linePos = lineRange[version]*sin(zustand)
  line(0+linePos, -75, 0-linePos, 75);
  
  //FirstOrbit
  noFill();
  stroke('white');
  strokeWeight(2);
  circle(0, 0, 100);
  
  //PlanetMiddle
  fill('white');
  noStroke();
  circle(0, 0, 50);
  
  //FirstSatellite
  push();
  satRotate= zustand/sat1Speed[version];
  rotate(satRotate);
  circle(35, 35, 20);
  pop();
  
  //SecondSatellite
  push();
  rotate(zustand/sat2Speed[version]);
  circle(50, 50, 10);
  pop();
  
  //SecondOrbit
  push()
  ellipseMode(CENTER);
  noFill();
  stroke('white');
  strokeWeight(2);
  rotate(zustand/orbitRotationSpeed[version]);
  ellipse(0, 0, orbitSizeX[version], orbitSizeY[version]);
  pop();
  
  //beam
  push();
  ellipseMode(CENTER);
  noFill();
  stroke('white');
  strokeWeight(2);
  rotate(beamRotation[version]);
  ellipse(20, 0, 5, 50);
  ellipse(30, 0, 5, 30);


  pop();
  pop();
  
}

function draw() {
  background(000); //Für schwarzen Hintergrund
  //clear(); //bei Transparentem Hintergrund
  k=0;
  for (let i = 0; i<4; i++){
    for (let j = 0; j<4; j++){
      drawPlanet(100+i*200, 100+j*200, x, k);
      k++;
    }
  }
  x++;
}